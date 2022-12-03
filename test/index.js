const fs = require('fs')
const imagemin = require('..')
const Metalsmith = require('metalsmith')
const tap = require('tap')

const extentions = ['png', 'svg', 'jpg']

extentions.forEach(ext => {
  tap.test(`should minify ${ext}`, assert => {
    assert.plan(2)

    let files = {}
    let file = `test/fixtures/src/test.${ext}`
    let size = fs.statSync(file).size

    files[file] = { contents: fs.readFileSync(file) }

    imagemin()(files, null, err => {
      assert.equal(err, null, 'does not throw errors')
      assert.ok(files[file].contents.length < size, `${file} is compressed`)
    })
  })
})

tap.test('should not compress corrupted file', assert => {
  assert.plan(2)

  let files = {}
  let file = 'test/fixtures/src/test-corrupt.jpg'
  let size = fs.statSync(file).size

  files[file] = { contents: fs.readFileSync(file) }

  imagemin()(files, null, err => {
    assert.equal(err, null, 'does not throw errors')
    assert.ok(files[file].contents.length === size, file)
  })
})

tap.test('should process a folder', assert => {
  assert.plan(4)

  let smith = new Metalsmith('test/fixtures')

  smith.use(imagemin())

  smith.build(err => {
    assert.equal(err, null, 'does not throw errors')

    extentions.forEach(ext => {
      const exists = fs.existsSync(`test/fixtures/build/test.${ext}`)
      assert.ok(exists, `processed ${ext} succesfully`)
    })
  })
})
