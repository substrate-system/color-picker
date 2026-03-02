import { test } from '@substrate-system/tapzero'
import './a11y.test'
import './color-picker.test'

test('all done', () => {
    if (window) {
        // @ts-expect-error tests
        window.testsFinished = true
    }
})
