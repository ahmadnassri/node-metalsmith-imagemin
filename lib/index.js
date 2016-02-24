'use strict'

var async = require('async')
var debug = require('debug-log')('metalsmith-Imagemin')
var Imagemin = require('imagemin')
var path = require('path')

function minify (options, files, file, done) {
  if (!/\.gif|\.png|\.svg|\.jpg|\.jpeg/.test(path.extname(file))) {
    debug('skipping none-image file: %s' + file)

    return done(null)
  }

  debug('compressing file: %s', file)

  var min = new Imagemin()
    .src(files[file].contents)
    .use(Imagemin.jpegtran(options))
    .use(Imagemin.gifsicle(options))
    .use(Imagemin.optipng(options))
    .use(Imagemin.svgo({ plugins: options.svgoPlugins || [] }))

  if (options.use) {
    options.use.forEach(function (plugin) {
      min.use(plugin)
    })
  }

  min.run(function (err, results) {
    if (err) {
      return done(err)
    }

    var totalSaved = 0
    var origSize = files[file].contents.length
    var diffSize = origSize - results[0].contents.length

    totalSaved += diffSize

    if (diffSize < 10) {
      debug('%s is already optimized', file)
    } else {
      debug('%s saved %s bytes - %s%%', file, diffSize, (diffSize / origSize * 100).toFixed())
    }

    files[file].contents = results[0].contents

    done()
  })
}

/**
 * Metalsmith plugin to minify images.
 *
 * @param {Object} options (optional)
 * @return {Function}
 */

module.exports = function (options) {
  options = options || {}

  return function (files, metalsmith, done) {
    async.each(Object.keys(files), minify.bind(null, options, files), done)
  }
}
