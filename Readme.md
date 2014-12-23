
# metalsmith-imagemin

  A Metalsmith plugin to minify images.

## Installation

    $ npm install metalsmith-imagemin

## CLI Usage

  Install via npm and then add the `metalsmith-imagemin` key to your `metalsmith.json` plugins with any [imagemin](https://github.com/imagemin/imagemin) options you want, like so:

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

## Javascript Usage

  Pass `options` to the imagemin plugin and pass it to Metalsmith with the `use` method:

```js
var imagemin = require('metalsmith-imagemin');

metalsmith.use(imagemin({
  optimizationLevel: 3,
  svgoPlugins: [{ removeViewBox: false }],
  use: [mozjpeg()]
}));
```

## License

  MIT
