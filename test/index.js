/* global describe, it */

'use strict'

var assert = require('assert')
var fs = require('fs')
var imagemin = require('..')
var async = require('async')

describe('metalsmith-markdown', function () {
  async.each(['gif', 'png', 'jpg'], function (ext) {
    it('should minify ' + ext, function (done) {
      var file = 'test/fixtures/test.' + ext
      var files = {}
      files[file] = { contents: fs.readFileSync(file) }

      imagemin()(files, null, function () {
        var original = fs.statSync(file).size

        assert.ok(files[file].contents.length < original, file)

        done()
      })
    })
  })
})
