import imagemin from 'imagemin'
import path from 'path'

import advpng from 'imagemin-advpng'
import giflossy from 'imagemin-giflossy'
import gifsicle from 'imagemin-gifsicle'
import gm from 'imagemin-gm'
import jpegoptim from 'imagemin-jpegoptim'
import jpegrecompress from 'imagemin-jpeg-recompress'
import jpegtran from 'imagemin-jpegtran'
import mozjpeg from 'imagemin-mozjpeg'
import optipng from 'imagemin-optipng'
import pngcrush from 'imagemin-pngcrush'
import pngout from 'imagemin-pngout'
import pngquant from 'imagemin-pngquant'
import svgo from 'imagemin-svgo'
import webp from 'imagemin-webp'
import zopfli from 'imagemin-zopfli'

/**
 * Metalsmith plugin to minify images.
 *
 * @param {Object} options (optional)
 * @return {Function}
 */

const defaults = {
  gifsicle: {},
  jpegrecompress: { quality: 'medium' },
  pngquant: { quality: '65-80' },
  svgo: {}
}

export default function (options = defaults) {
  return function (files, metalsmith, done) {
    var activePlugins = []
    var availablePlugins = {
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

    for (let plugin in options) {
      if (availablePlugins.hasOwnProperty(plugin)) {
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

    .then((results) => done(null, results))
    .catch((err) => done(null, err))
  }
}
