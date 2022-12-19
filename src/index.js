const imagemin = require('imagemin')
const path = require('path')

const advpng = require('imagemin-advpng')
const giflossy = require('imagemin-giflossy')
const gifsicle = require('imagemin-gifsicle')
const gm = require('imagemin-gm')
const jpegoptim = require('imagemin-jpegoptim')
const jpegrecompress = require('imagemin-jpeg-recompress')
const jpegtran = require('imagemin-jpegtran')
const mozjpeg = require('imagemin-mozjpeg')
const optipng = require('imagemin-optipng')
const pngcrush = require('imagemin-pngcrush')
const pngout = require('imagemin-pngout')
const pngquant = require('imagemin-pngquant')
const svgo = require('imagemin-svgo')
const webp = require('imagemin-webp')
const zopfli = require('imagemin-zopfli')

/**
 * Metalsmith plugin to minify images.
 *
 * @param {Object} options (optional)
 * @return {Function}
 */

const defaults = {
  gifsicle: {},
  jpegrecompress: { quality: 'medium', strip: true },
  pngquant: { verbose: true, strip: true, quality: [0.4, 0.6] },
  webp: { metadata: 'none' },
  svgo: {}
}

module.exports = function (options = {}) {
  if (!options.disableDefaults) {
    options = { ...defaults, ...options }
  }

  return function (files, metalsmith, done) {
    const activePlugins = []
    const availablePlugins = {
      advpng,
      giflossy,
      gifsicle,
      gm,
      jpegrecompress,
      jpegoptim,
      jpegtran,
      mozjpeg,
      optipng,
      pngcrush,
      pngout,
      pngquant,
      svgo,
      webp,
      zopfli
    }

    for (const plugin in options) {
      if (availablePlugins[plugin] && options[plugin] != null) {
        activePlugins.push(availablePlugins[plugin](options[plugin]))
      }
    }

    Promise.all(
      Object.keys(files)

        .filter((file) => /\.gif|\.png|\.svg|\.jpg|\.jpeg/.test(path.extname(file)))

        .map((file) => {
          return imagemin
            .buffer(files[file].contents, { plugins: activePlugins })
            .then((result) => (files[file].contents = result))
        })
    )

      .then(results => done(null, results))
      .catch(err => done(null, err))
  }
}
