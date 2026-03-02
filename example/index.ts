import { registerColorPicker } from '../src/index'
import './style.css'

registerColorPicker()

const picker = document.querySelector('color-picker')!
const output = document.getElementById('selected') as HTMLOutputElement

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
picker.value = picker.swatched[0]

picker.addEventListener('change', (ev: CustomEvent<{ value: string }>) => {
    output.value = ev.detail?.value ?? 'none'
})
