import test from 'node:test'
import assert from 'node:assert/strict'

import { PickerWC, registerPickerWC } from '../src/index'

test('renders swatches in provided order with deterministic default selection', () => {
  registerPickerWC()
  const picker = new PickerWC()
  picker.swatches = ['#000000', '#ffffff', '#ff0000']
  picker.value = '#ffffff'
  picker.render()

  const swatches = picker.querySelectorAll('[role="radio"]')
  assert.equal(swatches.length, 3)
  assert.equal((swatches[0] as HTMLElement).dataset.value, '#000000')
  assert.equal((swatches[1] as HTMLElement).getAttribute('aria-checked'), 'true')
})

test('dispatches change event with value/index/source detail', async () => {
  registerPickerWC()
  const picker = new PickerWC()
  picker.swatches = ['#000000', '#ffffff']
  picker.render()

  const eventPromise = new Promise<CustomEvent>((resolve) => {
    picker.addEventListener('change', (ev) => resolve(ev as CustomEvent), { once: true })
  })

  picker.selectByIndex(1, 'programmatic')
  const ev = await eventPromise

  assert.deepEqual(ev.detail, {
    value: '#ffffff',
    index: 1,
    source: 'programmatic'
  })
})
