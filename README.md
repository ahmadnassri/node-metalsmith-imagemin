# Metalsmith Imagemin [![version][npm-version]][npm-url] [![License][license-image]][license-url]

> [Metalsmith](http://www.metalsmith.io/) plugin to minify images.

[![Build Status][travis-image]][travis-url]
[![Downloads][npm-downloads]][npm-url]
[![Code Climate][codeclimate-quality]][codeclimate-url]
[![Coverage Status][codeclimate-coverage]][codeclimate-url]
[![Dependency Status][dependencyci-image]][dependencyci-url]
[![Dependencies][david-image]][david-url]

## Install

```bash
npm install --only=production --save metalsmith-imagemin
```

## Available plugins and defaults

For installed plugins see index.js.

## API

Pass `options` to the imagemin plugin and pass it to Metalsmith with the `use` method:

```js
const Metalsmith = require('metalsmith')
const imagemin = require('metalsmith-imagemin');

const metalsmith = new Metalsmith(__dirname)
  .use(imagemin({
    optimizationLevel: 3,
    svgoPlugins: [{ removeViewBox: false }]
  }))
```

### To configure plugin

Default jpegrecompress options will be overwritten:

```js
const Metalsmith = require('metalsmith')
const imagemin = require('metalsmith-imagemin');

const metalsmith = new Metalsmith(__dirname)
  .use(imagemin({
    optimizationLevel: 3,
    svgoPlugins: [{ removeViewBox: false }],
    
    jpegrecompress: { quality: 'veryhigh' }
  }))
```

### To disable/replace a default plugin

By default there are 4 plugins enabled (see index.js).

To disable a default plugin use `pluginname: null`.

E.g. disable default `jpegrecompress` and replace it with another plugin (`mozjpeg`):

```js
const Metalsmith = require('metalsmith')
const imagemin = require('metalsmith-imagemin');

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
> :copyright: [ahmadnassri.com](https://www.ahmadnassri.com/) &nbsp;&middot;&nbsp;
> License: [ISC][license-url] &nbsp;&middot;&nbsp;
> Github: [@ahmadnassri](https://github.com/ahmadnassri) &nbsp;&middot;&nbsp;
> Twitter: [@ahmadnassri](https://twitter.com/ahmadnassri)

[license-url]: http://choosealicense.com/licenses/isc/
[license-image]: https://img.shields.io/github/license/ahmadnassri/metalsmith-imagemin.svg?style=flat-square

[travis-url]: https://travis-ci.org/ahmadnassri/metalsmith-imagemin
[travis-image]: https://img.shields.io/travis/ahmadnassri/metalsmith-imagemin.svg?style=flat-square

[npm-url]: https://www.npmjs.com/package/metalsmith-imagemin
[npm-version]: https://img.shields.io/npm/v/metalsmith-imagemin.svg?style=flat-square
[npm-downloads]: https://img.shields.io/npm/dm/metalsmith-imagemin.svg?style=flat-square

[codeclimate-url]: https://codeclimate.com/github/ahmadnassri/metalsmith-imagemin
[codeclimate-quality]: https://img.shields.io/codeclimate/github/ahmadnassri/metalsmith-imagemin.svg?style=flat-square
[codeclimate-coverage]: https://img.shields.io/codeclimate/coverage/github/ahmadnassri/metalsmith-imagemin.svg?style=flat-square

[david-url]: https://david-dm.org/ahmadnassri/metalsmith-imagemin
[david-image]: https://img.shields.io/david/ahmadnassri/metalsmith-imagemin.svg?style=flat-square

[dependencyci-url]: https://dependencyci.com/github/ahmadnassri/metalsmith-imagemin
[dependencyci-image]: https://dependencyci.com/github/ahmadnassri/metalsmith-imagemin/badge?style=flat-square
