const fs = require('fs')
const imagemin = require('..')
const Metalsmith = require('metalsmith')
const rimraf = require('rimraf')
const tap = require('tap')

const extensions = ['png', 'svg', 'jpg']

extensions.forEach(ext => {
  tap.test(`should minify ${ext}`, assert => {
    assert.plan(2)

    const files = {}
    const file = `test/fixtures/src/test.${ext}`
    const size = fs.statSync(file).size

    files[file] = { contents: fs.readFileSync(file) }

    imagemin()(files, null, err => {
      assert.equal(err, null, 'does not throw errors')
      assert.ok(files[file].contents.length < size, `${file} is compressed`)
    })
  })
})

tap.test('should not compress corrupted file', assert => {
  assert.plan(2)

  const files = {}
  const file = 'test/fixtures/src/test-corrupt.jpg'
  const size = fs.statSync(file).size

  files[file] = { contents: fs.readFileSync(file) }

  imagemin()(files, null, err => {
    assert.equal(err, null, 'does not throw errors')
    assert.ok(files[file].contents.length === size, file)
  })
})

tap.test('should process a folder', assert => {
  assert.plan(4)

  const smith = new Metalsmith('test/fixtures')

  smith.use(imagemin())

  smith.build(err => {
    assert.equal(err, null, 'does not throw errors')

    extensions.forEach(ext => {
      const exists = fs.existsSync(`test/fixtures/build/test.${ext}`)
      assert.ok(exists, `processed ${ext} successfully`)
    })

    rimraf('test/fixtures/build', assert.end)
  })
})
