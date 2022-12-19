# Metalsmith Imagemin

Metalsmith plugin to minify images.

[![license][license-img]][license-url]
[![release][release-img]][release-url]
[![semantic][semantic-img]][semantic-url]

## Install

``` bash
npm install metalsmith-imagemin
```

### Available plugins

``` plain
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

``` js
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

``` js
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

``` plain
gifsicle
jpegrecompress
pngquant
svgo
```

To disable a default plugin use `pluginname: null`, to disable **ALL** the default plugins use: `disableDefaults: true`

E.g. disable default `jpegrecompress` and replace it with another plugin (`mozjpeg`):

``` js
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

You can also use the plugin with the Metalsmith CLI by adding `metalsmith-imagemin` key to your `metalsmith.json` plugins with any [imagemin][] options you want, like so:

``` json
{
  "plugins": {
    "metalsmith-imagemin": {
      "optimizationLevel": 3,
      "svgoPlugins": [{
        "removeViewBox": false
      }]
    }
  }
}
```

  [imagemin]: https://github.com/imagemin/imagemin

----
> Author: [Ahmad Nassri](https://www.ahmadnassri.com/) &bull;
> Twitter: [@AhmadNassri](https://twitter.com/AhmadNassri)

[license-url]: LICENSE
[license-img]: https://badgen.net/github/license/ahmadnassri/metalsmith-imagemin

[release-url]: https://github.com/ahmadnassri/metalsmith-imagemin/releases
[release-img]: https://badgen.net/github/release/ahmadnassri/metalsmith-imagemin

[semantic-url]: https://github.com/ahmadnassri/metalsmith-imagemin/actions?query=workflow%3Arelease
[semantic-img]: https://badgen.net/badge/📦/semantically%20released/blue
