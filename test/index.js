/* global describe, it */

'use strict'

var imagemin = require('..')
var fs = require('fs')
var assert = require('assert')
var async = require('async')
var Metalsmith = require('metalsmith')

describe('metalsmith-markdown', function () {
  it('should minify images', function (done) {
    Metalsmith('test/fixtures')
      .use(imagemin())
      .build(function (err) {
        if (err) return done(err)

        async.each(['gif', 'png', 'jpg'], function (ext, done) {
          var actual = fs.statSync('test/fixtures/build/test.' + ext).size
          var original = fs.statSync('test/fixtures/src/test.' + ext).size

          assert.ok(actual < original, 'minify ' + ext)

          done()
        }, done)
      })
  })
})
