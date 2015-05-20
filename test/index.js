/* global beforeEach, describe, it */

'use strict'

var imagemin = require('..')
var fs = require('fs')
var assert = require('assert')
var async = require('async')
var Metalsmith = require('metalsmith')

beforeEach(function (done) {
  Metalsmith('test/fixtures').use(imagemin()).build(done)
})

describe('metalsmith-markdown', function () {
  async.each(['gif', 'png', 'jpg'], function (ext, done) {
    it('should minify ' + ext, function (done) {
      var actual = fs.statSync('test/fixtures/build/test.' + ext).size
      var original = fs.statSync('test/fixtures/src/test.' + ext).size

      assert.ok(actual < original, 'minify ' + ext)

      done()
    })
  })
})
