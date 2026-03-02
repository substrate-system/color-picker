import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

test('example wires change event output and selected color preview updates', () => {
    const code = readFileSync('example/index.ts', 'utf8')
    assert.ok(code.includes("picker.on<ChangeEvent>('change'"))
    assert.ok(code.includes('output.value'))
    assert.ok(code.includes('ev.detail.value'))
    assert.ok(code.includes("main.style.setProperty('--selected-color'"))
    assert.ok(code.includes('setSelectedColor(picker.value)'))
})
