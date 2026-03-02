import test from 'node:test'
import assert from 'node:assert/strict'

import { PickerWC, registerPickerWC } from '../src/index'

test('supports keyboard navigation and aria semantics', () => {
  registerPickerWC()
  const picker = new PickerWC()
  picker.swatches = ['#000000', '#ffffff', '#ff0000']
  picker.render()

  const radios = picker.querySelectorAll('[role="radio"]')
  assert.equal(picker.getAttribute('role'), 'radiogroup')
  assert.equal(radios.length, 3)

  picker.selectByIndex(0, 'keyboard')
  assert.equal((radios[0] as HTMLElement).getAttribute('aria-checked'), 'true')
})
