'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = function () {
  var options = arguments.length <= 0 || arguments[0] === undefined ? defaults : arguments[0];

  return function (files, metalsmith, done) {
    var activePlugins = [];
    var availablePlugins = {
      advpng: _imageminAdvpng2.default,
      giflossy: _imageminGiflossy2.default,
      gifsicle: _imageminGifsicle2.default,
      gm: _imageminGm2.default,
      jpegrecompress: _imageminJpegRecompress2.default,
      jpegoptim: _imageminJpegoptim2.default,
      jpegtran: _imageminJpegtran2.default,
      mozjpeg: _imageminMozjpeg2.default,
      optipng: _imageminOptipng2.default,
      pngcrush: _imageminPngcrush2.default,
      pngout: _imageminPngout2.default,
      pngquant: _imageminPngquant2.default,
      svgo: _imageminSvgo2.default,
      webp: _imageminWebp2.default,
      zopfli: _imageminZopfli2.default
    };

    for (var plugin in options) {
      if (availablePlugins.hasOwnProperty(plugin)) {
        activePlugins.push(availablePlugins[plugin](options[plugin]));
      }
    }

    _promise2.default.all((0, _keys2.default)(files).filter(function (file) {
      return (/\.gif|\.png|\.svg|\.jpg|\.jpeg/.test(_path2.default.extname(file))
      );
    }).map(function (file) {
      return _imagemin2.default.buffer(files[file].contents, { plugins: activePlugins }).then(function (result) {
        return files[file].contents = result;
      });
    })).then(function (results) {
      return done(null, results);
    }).catch(function (err) {
      return done(null, err);
    });
  };
};

var _imagemin = require('imagemin');

var _imagemin2 = _interopRequireDefault(_imagemin);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _imageminAdvpng = require('imagemin-advpng');

var _imageminAdvpng2 = _interopRequireDefault(_imageminAdvpng);

var _imageminGiflossy = require('imagemin-giflossy');

var _imageminGiflossy2 = _interopRequireDefault(_imageminGiflossy);

var _imageminGifsicle = require('imagemin-gifsicle');

var _imageminGifsicle2 = _interopRequireDefault(_imageminGifsicle);

var _imageminGm = require('imagemin-gm');

var _imageminGm2 = _interopRequireDefault(_imageminGm);

var _imageminJpegoptim = require('imagemin-jpegoptim');

var _imageminJpegoptim2 = _interopRequireDefault(_imageminJpegoptim);

var _imageminJpegRecompress = require('imagemin-jpeg-recompress');

var _imageminJpegRecompress2 = _interopRequireDefault(_imageminJpegRecompress);

var _imageminJpegtran = require('imagemin-jpegtran');

var _imageminJpegtran2 = _interopRequireDefault(_imageminJpegtran);

var _imageminMozjpeg = require('imagemin-mozjpeg');

var _imageminMozjpeg2 = _interopRequireDefault(_imageminMozjpeg);

var _imageminOptipng = require('imagemin-optipng');

var _imageminOptipng2 = _interopRequireDefault(_imageminOptipng);

var _imageminPngcrush = require('imagemin-pngcrush');

var _imageminPngcrush2 = _interopRequireDefault(_imageminPngcrush);

var _imageminPngout = require('imagemin-pngout');

var _imageminPngout2 = _interopRequireDefault(_imageminPngout);

var _imageminPngquant = require('imagemin-pngquant');

var _imageminPngquant2 = _interopRequireDefault(_imageminPngquant);

var _imageminSvgo = require('imagemin-svgo');

var _imageminSvgo2 = _interopRequireDefault(_imageminSvgo);

var _imageminWebp = require('imagemin-webp');

var _imageminWebp2 = _interopRequireDefault(_imageminWebp);

var _imageminZopfli = require('imagemin-zopfli');

var _imageminZopfli2 = _interopRequireDefault(_imageminZopfli);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Metalsmith plugin to minify images.
 *
 * @param {Object} options (optional)
 * @return {Function}
 */

var defaults = {
  'gifsicle': {},
  'jpegrecompress': { quality: 'medium' },
  'pngquant': { quality: '65-80' },
  'svgo': {}
};

module.exports = exports['default'];