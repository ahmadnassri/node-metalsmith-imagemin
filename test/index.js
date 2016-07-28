import fs from 'fs'
import imagemin from '..'
import Metalsmith from 'metalsmith'
import rimraf from 'rimraf'
import { test } from 'tap'

const extentions = ['gif', 'png', 'svg', 'jpg']

extentions.forEach(ext => {
  test(`should minify ${ext}`, assert => {
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

test('should not compress corrupted file', assert => {
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

test('should process a folder', assert => {
  assert.plan(5)

  let smith = new Metalsmith('test/fixtures')

  smith.use(imagemin())

  smith.build(err => {
    assert.equal(err, null, 'does not throw errors')

    extentions.forEach(ext => {
      fs.exists(`test/fixtures/build/test.${ext}`, exists => assert.ok(exists, `processed ${ext} succesfully`))
    })

    rimraf('test/fixtures/build', assert.end)
  })
})
