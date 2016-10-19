# Metalsmith Imagemin [![version][npm-version]][npm-url] [![License][npm-license]][license-url]

[Metalsmith](http://www.metalsmith.io/) plugin to minify images.

[![Build Status][travis-image]][travis-url]
[![Downloads][npm-downloads]][npm-url]
[![Code Climate][codeclimate-quality]][codeclimate-url]
[![Coverage Status][codeclimate-coverage]][codeclimate-url]
[![Dependencies][david-image]][david-url]

## Install

```sh
npm install --production --save metalsmith-imagemin
```

## Usage

I recommend using an optimized build matching your Node.js environment version, otherwise, the standard `require` would work just fine.

```js
/*
 * Node 6
 * Built using `babel-preset-es2015-node6`
 */
const imagemin = require('metalsmith-imagemin/lib/node6')

/*
 * Node 5
 * Built using `babel-preset-es2015-node5`
 */
const imagemin = require('metalsmith-imagemin/lib/node5')

/*
 * Node 4
 * Built using `babel-preset-es2015-node4`
 */
const imagemin = require('metalsmith-imagemin/lib/node4')

/*
 * Node >=0.10 <=0.12
 * Built using `babel-preset-es2015`
 * Note: 
 *   - additional package is required: `babel-runtime`
 *   - npm install --save babel-runtime
 */
var imagemin = require('metalsmith-imagemin')
```

## API

Pass `options` to the imagemin plugin and pass it to Metalsmith with the `use` method:

```js
const Metalsmith from 'metalsmith'
const imagemin from 'metalsmith-imagemin'

const options = {
  gifsicle: {},
  jpegrecompress: { quality: 'medium' },
  pngquant: { quality: '65-80' },
  svgo: {}
}

let metalsmith = new Metalsmith(__dirname)
  .use(imagemin(options))
```

### Options

The options Object, is a `name` => `options` key map to imagemin [plugins](https://www.npmjs.com/browse/keyword/imageminplugin) by name, and their respective options.

## CLI

You can also use the plugin with the Metalsmith CLI by adding `metalsmith-imagemin` key to your `metalsmith.json` plugins with any [imagemin](https://github.com/imagemin/imagemin) plugins / options you want, like so:

```json
{
  "plugins": {
    "metalsmith-imagemin": {
      "gifsicle": {},
      "jpegrecompress": { "quality": "medium" },
      "pngquant": { "quality": "65-80" },
      "svgo": {}
    }
  }
}
```

----
> :copyright: [www.ahmadnassri.com](https://www.ahmadnassri.com/) &nbsp;&middot;&nbsp;
> License: [ISC](LICENSE) &nbsp;&middot;&nbsp;
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
