import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

test('example markup mounts color-picker host', () => {
  const html = readFileSync('example/index.html', 'utf8')
  assert.ok(html.includes('<color-picker'))
})
