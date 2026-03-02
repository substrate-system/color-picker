import '../src/index.js'
import type { ChangeEvent } from '../src/index.js'
import '../src/index.css'
import './style.css'
import Debug from '@substrate-system/debug'
const debug = Debug('color-picker')

localStorage.setItem('DEBUG', 'color-picker')

const picker = document.querySelector('color-picker')!
const output = document.getElementById('selected') as HTMLOutputElement
const main = document.querySelector('main') as HTMLElement

const setSelectedColor = (value:string|null):void => {
    main.style.setProperty('--selected-color', value ?? 'transparent')
}

picker.swatches = [
    '#000000',
    '#f8fafc',
    '#ef4444',
    '#f97316',
    '#eab308',
    '#22c55e',
    '#3b82f6',
    '#8b5cf6',
    '#ec4899'
]
picker.value = picker.swatches[0]
setSelectedColor(picker.value)

picker.on<ChangeEvent>('change', (ev) => {
    output.value = ev.detail.value ?? 'none'
    setSelectedColor(ev.detail.value)
    debug('change event...', ev)
})
