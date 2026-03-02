import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

test('example wires change event output updates', () => {
    const code = readFileSync('example/main.ts', 'utf8')
    assert.ok(code.includes("addEventListener('change'"))
    assert.ok(code.includes('output.value'))
})
