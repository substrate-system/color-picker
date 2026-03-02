import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'

test('build creates expected dist artifacts', () => {
  assert.equal(existsSync('dist/index.js'), true)
  assert.equal(existsSync('dist/index.cjs'), true)
  assert.equal(existsSync('dist/index.d.ts'), true)
})

test('source structure uses src root and src/utils only', () => {
  assert.equal(existsSync('src/js'), false)
  assert.equal(existsSync('src/internal'), false)
})
