import test from 'node:test'
import assert from 'node:assert/strict'
import pkg from '../package.json' with { type: 'json' }

test('package exports include import/require/types', () => {
  const rootExport = (pkg as any).exports['.']
  assert.ok(rootExport.import)
  assert.ok(rootExport.require)
  assert.ok(rootExport.types)
})
