# Metalsmith Imagemin [![version][npm-version]][npm-url] [![License][npm-license]][license-url]

> [Metalsmith](http://www.metalsmith.io/) plugin to minify images.

[![Build Status][travis-image]][travis-url]
[![Downloads][npm-downloads]][npm-url]
[![Code Climate][codeclimate-quality]][codeclimate-url]
[![Coverage Status][codeclimate-coverage]][codeclimate-url]
[![Dependency Status][dependencyci-image]][dependencyci-url]
[![Dependencies][david-image]][david-url]

## Install

```bash
npm install --production --save metalsmith-imagemin
```

## Usage

I recommend using an optimized build matching your Node.js environment version, otherwise, the standard `require` would work just fine with any version of Node `>= v4.0` .

```js
/*
 * Node 7
 */
const metalsmith-imagemin = require('metalsmith-imagemin/lib/node7')

/*
 * Node 6
 */
const metalsmith-imagemin = require('metalsmith-imagemin/lib/node6')

/*
 * Node 4 (Default)
 * Note: additional ES2015 polyfills may be required
 */
var metalsmith-imagemin = require('metalsmith-imagemin')
```

## API

Pass `options` to the imagemin plugin and pass it to Metalsmith with the `use` method:

```js
var Metalsmith = require('metalsmith')
var imagemin = require('metalsmith-imagemin');

var metalsmith = new Metalsmith(__dirname)
  .use(imagemin({
    optimizationLevel: 3,
    svgoPlugins: [{ removeViewBox: false }]
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

----
> :copyright: [ahmadnassri.com](https://www.ahmadnassri.com/) &nbsp;&middot;&nbsp;
> License: [ISC][license-url] &nbsp;&middot;&nbsp;
> Github: [@ahmadnassri](https://github.com/ahmadnassri) &nbsp;&middot;&nbsp;
> Twitter: [@ahmadnassri](https://twitter.com/ahmadnassri)

[license-url]: http://choosealicense.com/licenses/isc/

[travis-url]: https://travis-ci.org/ahmadnassri/metalsmith-imagemin
[travis-image]: https://img.shields.io/travis/ahmadnassri/metalsmith-imagemin.svg?style=flat-square

[npm-url]: https://www.npmjs.com/package/metalsmith-imagemin
[npm-license]: https://img.shields.io/npm/l/metalsmith-imagemin.svg?style=flat-square
[npm-version]: https://img.shields.io/npm/v/metalsmith-imagemin.svg?style=flat-square
[npm-downloads]: https://img.shields.io/npm/dm/metalsmith-imagemin.svg?style=flat-square

[codeclimate-url]: https://codeclimate.com/github/ahmadnassri/metalsmith-imagemin
[codeclimate-quality]: https://img.shields.io/codeclimate/github/ahmadnassri/metalsmith-imagemin.svg?style=flat-square
[codeclimate-coverage]: https://img.shields.io/codeclimate/coverage/github/ahmadnassri/metalsmith-imagemin.svg?style=flat-square

[david-url]: https://david-dm.org/ahmadnassri/metalsmith-imagemin
[david-image]: https://img.shields.io/david/ahmadnassri/metalsmith-imagemin.svg?style=flat-square

[dependencyci-url]: https://dependencyci.com/github/ahmadnassri/metalsmith-imagemin
[dependencyci-image]: https://dependencyci.com/github/ahmadnassri/metalsmith-imagemin/badge?style=flat-square
