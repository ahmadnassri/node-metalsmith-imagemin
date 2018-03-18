# Metalsmith Imagemin [![version][npm-version]][npm-url] [![License][license-image]][license-url] [![Build Status][travis-image]][travis-url] [![Downloads][npm-downloads]][npm-url] [![Coverage Status][codeclimate-coverage]][codeclimate-url]

> [Metalsmith](http://www.metalsmith.io/) plugin to minify images.

## Install

```bash
npm install --production --save metalsmith-imagemin
```

### Available plugins

```
imagemin-advpng
imagemin-giflossy
imagemin-gifsicle
imagemin-gm
imagemin-jpegoptim
imagemin-jpeg-recompress
imagemin-jpegtran
imagemin-mozjpeg
imagemin-optipng
imagemin-pngcrush
imagemin-pngout
imagemin-pngquant
imagemin-svgo
imagemin-webp
imagemin-zopfli
```

## API

Pass `options` to the imagemin plugin and pass it to Metalsmith with the `use` method:

```js
const Metalsmith = require('metalsmith')
const imagemin = require('metalsmith-imagemin')

const metalsmith = new Metalsmith(__dirname)
  .use(imagemin({
    optimizationLevel: 3,
    svgoPlugins: [{ removeViewBox: false }]
  }))
```

### To configure plugin

Default `jpegrecompress` options will be overwritten:

```js
const Metalsmith = require('metalsmith')
const imagemin = require('metalsmith-imagemin')

const metalsmith = new Metalsmith(__dirname)
  .use(imagemin({
    optimizationLevel: 3,
    svgoPlugins: [{ removeViewBox: false }],

    jpegrecompress: { quality: 'veryhigh' }
  }))
```

### To disable/replace a default plugin

By default there are 4 plugins enabled:

```
gifsicle
jpegrecompress
pngquant
svgo
```

To disable a default plugin use `pluginname: null`, to disable **ALL** the default plugins use: `disableDefaults: true`

E.g. disable default `jpegrecompress` and replace it with another plugin (`mozjpeg`):

```js
const Metalsmith = require('metalsmith')
const imagemin = require('metalsmith-imagemin')

const metalsmith = new Metalsmith(__dirname)
  .use(imagemin({
    optimizationLevel: 3,
    svgoPlugins: [{ removeViewBox: false }],

    jpegrecompress: null,
    mozjpeg: {}
  }))
```

## CLI

You can also use the plugin with the Metalsmith CLI by adding `metalsmith-imagemin` key to your `metalsmith.json` plugins with any [imagemin](https://github.com/imagemin/imagemin) options you want, like so:

```json
{
  "plugins": {
    "metalsmith-imagemin": {
        "optimizationLevel": 3,
        "svgoPlugins": [{
          "removeViewBox": false
        }]
      },
    }
  }
}
```

---
> License: [ISC][license-url] &bull; 
> Copyright: [ahmadnassri.com](https://www.ahmadnassri.com) &bull; 
> Github: [@ahmadnassri](https://github.com/ahmadnassri) &bull; 
> Twitter: [@ahmadnassri](https://twitter.com/ahmadnassri)

[license-url]: http://choosealicense.com/licenses/isc/
[license-image]: https://img.shields.io/github/license/ahmadnassri/metalsmith-imagemin.svg?style=flat-square

[travis-url]: https://travis-ci.org/ahmadnassri/metalsmith-imagemin
[travis-image]: https://img.shields.io/travis/ahmadnassri/metalsmith-imagemin.svg?style=flat-square

[npm-url]: https://www.npmjs.com/package/metalsmith-imagemin
[npm-version]: https://img.shields.io/npm/v/metalsmith-imagemin.svg?style=flat-square
[npm-downloads]: https://img.shields.io/npm/dm/metalsmith-imagemin.svg?style=flat-square

[codeclimate-url]: https://codeclimate.com/github/ahmadnassri/metalsmith-imagemin
[codeclimate-coverage]: https://api.codeclimate.com/v1/badges/93b75ed23df8226fa626/test_coverage?style=flat-square
