import { test } from '@substrate-system/tapzero'

import { ColorPicker, registerColorPicker } from '../src/index'

test('supports keyboard navigation and aria semantics', (t) => {
    registerColorPicker()
    const picker = new ColorPicker()
    picker.swatches = ['#000000', '#ffffff', '#ff0000']
    picker.render()

    const radios = picker.querySelectorAll('[role="radio"]')
    t.equal(picker.getAttribute('role'), 'radiogroup')
    t.equal(radios.length, 3)

    picker.selectByIndex(0, 'keyboard')
    t.equal((radios[0] as HTMLElement).getAttribute('aria-checked'), 'true')
})
