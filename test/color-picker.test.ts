import { test } from '@substrate-system/tapzero'

import { ColorPicker } from '../src/index'

test('renders swatches in provided order with deterministic default selection', (t) => {
    const picker = new ColorPicker()
    picker.swatches = ['#000000', '#ffffff', '#ff0000']
    picker.value = '#ffffff'
    picker.render()

    const swatches = picker.querySelectorAll('[role="radio"]')
    t.equal(swatches.length, 3)
    t.equal((swatches[0] as HTMLElement).dataset.value, '#000000')
    t.equal((swatches[1] as HTMLElement).getAttribute('aria-checked'), 'true')
})

test('dispatches change event with value/index/source detail', async (t) => {
    const picker = new ColorPicker()
    picker.swatches = ['#000000', '#ffffff']
    picker.render()

    const eventPromise = new Promise<CustomEvent>((resolve) => {
        picker.addEventListener('change', (ev) => resolve(ev as CustomEvent), { once: true })
    })

    picker.selectByIndex(1, 'programmatic')
    const ev = await eventPromise

    t.deepEqual(ev.detail, {
        value: '#ffffff',
        index: 1,
        source: 'programmatic'
    })
})
