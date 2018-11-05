# Metalsmith Imagemin

[![License][license-image]][license-url] [![version][npm-image]][npm-url] [![Build Status][circle-image]][circle-url]

> Metalsmith plugin to minify images.

## Install

```bash
npm install @ahmadnassri/metalsmith-imagemin
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
> Author: [Ahmad Nassri](https://www.ahmadnassri.com) &bull; 
> Github: [@ahmadnassri](https://github.com/ahmadnassri) &bull; 
> Twitter: [@ahmadnassri](https://twitter.com/ahmadnassri)

[license-url]: LICENSE
[license-image]: https://img.shields.io/github/license/ahmadnassri/metalsmith-imagemin.svg?style=for-the-badge&logo=circleci

[circle-url]: https://circleci.com/gh/ahmadnassri/workflows/metalsmith-imagemin
[circle-image]: https://img.shields.io/circleci/project/github/ahmadnassri/metalsmith-imagemin/master.svg?style=for-the-badge&logo=circleci

[npm-url]: https://www.npmjs.com/package/metalsmith-imagemin
[npm-image]: https://img.shields.io/npm/v/metalsmith-imagemin.svg?style=for-the-badge&logo=npm
