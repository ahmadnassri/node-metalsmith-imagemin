const imageminLib = require('imagemin')
const path = require('path')

const advpng = require('imagemin-advpng')
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
 * @typedef JpegRecompressOptions
 * @prop {boolean} [accurate=false] Favor accuracy over speed.
 * @prop {'low'|'medium'|'high'|'veryhigh'} [quality='medium'] Set a quality preset. Defaults to `'medium'`.
 * @prop {'mpe'|'ssim'|'ms-ssim'|'smallfry'} [method='ssim'] Set [comparison method](https://github.com/danielgtaylor/jpeg-archive#image-comparison-metrics). Defaults to `'ssim'`.
 * @prop {number} [target=0.999] Set target quality. Defaults to `0.999`.
 * @prop {number} [min=40] Minimum JPEG quality. Defaults to `40`.
 * @prop {number} [max=95] Maximum JPEG quality. Defaults to `95`.
 * @prop {number} [loops=6] Set the number of attempts. Defaults to `6`.
 * @prop {number} [defish=0] Set defish strength. Defaults to `0`.
 * @prop {boolean} [progressive=true] Enable progressive encoding. Defaults to `true`.
 * @prop {'default'|'disable'} [subsample='default'] Set subsampling method. Available values: `default`, `disable`.
 * @prop {boolean} [strip=true] Strips metadata, such as EXIF data. Defaults to `true`.
 */

/**
 * @typedef {Object} Options
 * @prop {Object} [advpng]
 * @prop {number} [advpng.optimizationLevel=3] 
 * Select an optimization level between 0 and 4:  
 * - 0 Don't compress  
 * - 1 Compress fast (zlib)  
 * - 2 Compress normal (7z)  
 * - 3 Compress extra (7z)  
 * - 4 Compress extreme (zopfli)
 * @prop {Object} [gifsicle]
 * @prop {number} [gifsicle.colors] Reduce the number of distinct colors in each output GIF to `colors` or less. Must be between 2 - 256.
 * @prop {boolean} [gifsicle.interlaced=false] Interlace gif for progressive rendering. Defaults to `false`.
 * @prop {number} [gifsicle.optimizationLevel]
 * Select an optimization level between 1 and 3:  
 * - 1 stores only the changed portion of each image.
 * - 2 also uses transparency to shrink the file further.
 * - 3 tries several optimization methods (usually slower, sometimes better results)
 * @prop {Object} [gm]
 * @prop {JpegRecompressOptions} [jpegrecompress]
 * @prop {Object} [jpegoptim]
 * @prop {boolean} [jpegoptim.progressive=false] Lossless conversion to progressive.
 * @prop {number} [jpegoptim.max] Set maximum image quality factor. (0-100).
 * @prop {number|string} [jpegoptim.size=false] Try to optimize file to given size. Target size is specified either in kilo bytes (1-n) or as percentage (1%-99%).
 * @prop {boolean} [jpegoptim.stripAll=true] Strip all markers from output file. Note: If you want to control what markers are stripped, this must be set to false.
 * @prop {boolean} [jpegoptim.stripCom=true] Strip comment markers from output file.
 * @prop {boolean} [jpegoptim.stripExif=true] Strip EXIF markers from output file.
 * @prop {boolean} [jpegoptim.stripIptc=true] Strip IPTC/Photoshop (APP13) markers from output file.
 * @prop {boolean} [jpegoptim.stripIcc=true] Strip ICC profile markers from output file.
 * @prop {boolean} [jpegoptim.stripXmp=true] Strip XMP markers markers from output file.
 * @prop {import('imagemin-mozjpeg').Options} [mozjpeg]
 * @prop {import('imagemin-optipng').Options} [optipng]
 * @prop {Object} [pngcrush]
 * @prop {boolean} [pngcrush.reduce=false] Enable lossless color-type or bit-depth reduction. Defaults to `false`.
 * @prop {Object} [pngout]
 * @prop {number} [pngout.strategy=0]
 * Select a strategy level between 0 and 4 (defaults to 0):
 * - 0. Extreme
 * - 1. Intense
 * - 2. Longest match
 * - 3. Huffman only
 * - 4. Uncompressed
 * @prop {import('imagemin-pngquant').Options} [pngquant]
 * @prop {import('imagemin-svgo').Options} [svgo]
 * @prop {import('imagemin-webp').Options} [webp]
 */

/** @type {Options} */
const defaults = {
  gifsicle: {},
  jpegrecompress: { quality: 'medium' },
  pngquant: { quality: [0.6, 0.8] },
  svgo: {}
}


/**
 * Metalsmith plugin to minify images.
 *
 * @param {Options} [options]
 * @return {import('metalsmith').Plugin}
 */
function imagemin(options) {
  options = Object.assign({}, options)

  if (!options.disableDefaults) {
    options = Object.assign(defaults, options)
  }

  return function imagemin(files, metalsmith, done) {
    var activePlugins = []
    var availablePlugins = {
      advpng,
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
      if (availablePlugins.hasOwnProperty(plugin) && options[plugin] != null) {
        activePlugins.push(availablePlugins[plugin](options[plugin]))
      }
    }

    Promise.all(
      Object.keys(files)

        .filter((file) => /\.gif|\.png|\.svg|\.jpg|\.jpeg/.test(path.extname(file)))

        .map((file) => {
          return imageminLib
            .buffer(files[file].contents, { plugins: activePlugins })
            .then((result) => (files[file].contents = result))
        })
    )

      .then(results => done(null, results))
      .catch(err => done(null, err))
  }
}

module.exports = imagemin