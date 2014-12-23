
var debug     = require('debug')('metalsmith-imagemin');
var imagemin  = require('imagemin');
var async     = require('async');
var path      = require('path');

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin to minify images.
 *
 * @param {Object} options (optional)
 *   @property {Array} keys
 * @return {Function}
 */

function plugin (options) {
  options = options || {};

  var keys = options.keys || [];

  return function (files, metalsmith, done) {
    async.each(Object.keys(files), minify.bind(null, options, files), done);
  };
}

function minify (options, files, file, done) {
  if (!image(file)) {
    debug('skipping none-image file: %s' + file);

    return done(null);
  }

  debug('compressing file: %s', file);

  var min = new imagemin()
    .src(files[file].contents)
    .use(imagemin.jpegtran(options))
    .use(imagemin.gifsicle(options))
    .use(imagemin.pngquant(options))
    .use(imagemin.optipng(options))
    .use(imagemin.svgo({ plugins: options.svgoPlugins || [] }));

  if (options.use) {
    options.use.forEach(imagemin.use.bind(min));
  }

  min.run(function (err, results) {
    if (err) {
      return done(err);
    }

    var totalSaved = 0;
    var origSize = files[file].contents.length;
    var diffSize = origSize - results[0].contents.length;

    totalSaved += diffSize;

    if (diffSize < 10) {
      debug('%s is already optimized', file);
    } else {
      debug('%s saved %s bytes - %s%%', file, diffSize, (diffSize / origSize * 100).toFixed());
    }


    files[file].contents = results[0].contents;

    done();
  });
}

/**
 * Check if a `file` is an image.
 *
 * @param {String} file
 * @return {Boolean}
 */

function image(file){
  return /\.gif|\.png|\.jpg|\.jpeg/.test(path.extname(file));
}

