import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'

test('build creates expected dist artifacts', () => {
  assert.equal(existsSync('dist/index.js'), true)
  assert.equal(existsSync('dist/index.cjs'), true)
  assert.equal(existsSync('dist/index.d.ts'), true)
})
