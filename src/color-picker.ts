import { WebComponent, isRegistered } from '@substrate-system/web-component'
import { isValidCssColor, sanitizeSwatches } from './color'
import { clampIndex, createSelectionState, nextIndex, type InteractionSource } from './selection'
import './index.css'

interface ChangeDetail {
  value: string | null
  index: number | null
  source: InteractionSource
}

export class ColorPicker extends WebComponent.create('color-picker') {
  static observedAttributes = ['value', 'disabled', 'aria-label']

  private _swatches: string[] = []
  private _state = createSelectionState()

  get swatches (): string[] {
    return [...this._swatches]
  }

  set swatches (values: string[]) {
    const sanitized = sanitizeSwatches(values)
    if (sanitized.length !== values.length) {
      console.warn('color-picker: invalid CSS color values were ignored')
    }

    this._swatches = sanitized

    if (this._swatches.length === 0) {
      this._state = createSelectionState()
      this.render()
      return
    }

    if (this._state.selectedIndex == null || this._state.selectedIndex >= this._swatches.length) {
      this.selectByIndex(0, 'programmatic')
      return
    }

    this.render()
  }

  get value (): string | null {
    return this._state.selectedValue
  }

  set value (nextValue: string | null) {
    if (nextValue == null) {
      this._state.selectedIndex = null
      this._state.selectedValue = null
      this._state.activeIndex = null
      this.render()
      return
    }

    const idx = this._swatches.findIndex((entry) => entry === nextValue)
    if (idx === -1) return
    this.selectByIndex(idx, 'programmatic')
  }

  get disabled (): boolean {
    return this.hasAttribute('disabled')
  }

  set disabled (isDisabled: boolean) {
    if (isDisabled) {
      this.setAttribute('disabled', '')
    } else {
      this.removeAttribute('disabled')
    }
    this.render()
  }

  connectedCallback (): void {
    super.connectedCallback()
    this.setAttribute('role', 'radiogroup')
    this.render()
  }

  handleChange_value (_oldValue: string, newValue: string): void {
    if (!newValue || !isValidCssColor(newValue)) return
    this.value = newValue
  }

  setSwatches (swatches: string[]): void {
    this.swatches = swatches
  }

  selectByIndex (index: number, source: InteractionSource = 'programmatic'): void {
    if (this._swatches.length === 0) return
    const max = this._swatches.length - 1
    const normalized = clampIndex(index, max)
    if (normalized < 0 || normalized > max) return

    this._state.selectedIndex = normalized
    this._state.activeIndex = normalized
    this._state.selectedValue = this._swatches[normalized]
    this._state.lastInteraction = source
    this.render()

    this.dispatch<ChangeDetail>('change', {
      detail: {
        value: this._state.selectedValue,
        index: this._state.selectedIndex,
        source
      }
    })
  }

  getValue (): string | null {
    return this._state.selectedValue
  }

  private onSwatchKeydown = (ev: KeyboardEvent): void => {
    if (this._swatches.length === 0 || this.disabled) return
    const current = this._state.activeIndex ?? 0
    const max = this._swatches.length - 1

    if (ev.key === 'ArrowRight' || ev.key === 'ArrowDown') {
      ev.preventDefault()
      this.selectByIndex(nextIndex(current, 1, max), 'keyboard')
      return
    }

    if (ev.key === 'ArrowLeft' || ev.key === 'ArrowUp') {
      ev.preventDefault()
      this.selectByIndex(nextIndex(current, -1, max), 'keyboard')
      return
    }

    if (ev.key === ' ' || ev.key === 'Enter') {
      ev.preventDefault()
      this.selectByIndex(current, 'keyboard')
    }
  }

  private onSwatchClick = (ev: Event): void => {
    if (this.disabled) return
    const target = ev.currentTarget as HTMLElement
    const idx = Number(target.dataset.index)
    this.selectByIndex(idx, 'pointer')
  }

  render (): void {
    this.setAttribute('role', 'radiogroup')

    const label = this.getAttribute('aria-label') ?? 'Color swatches'
    this.setAttribute('aria-label', label)

    const swatchesHtml = this._swatches.map((value, index) => {
      const checked = this._state.selectedIndex === index
      const active = this._state.activeIndex === index

      return `
        <button
          type="button"
          class="swatch${active ? ' is-active' : ''}"
          role="radio"
          aria-label="${value}"
          aria-checked="${checked ? 'true' : 'false'}"
          data-index="${index}"
          data-value="${value}"
          style="background:${value};"
          ${this.disabled ? 'disabled' : ''}
        ></button>
      `
    }).join('')

    this.innerHTML = `<div class="picker">${swatchesHtml}</div>`

    this.querySelectorAll<HTMLElement>('.swatch').forEach((swatch) => {
      swatch.addEventListener('click', this.onSwatchClick)
      swatch.addEventListener('keydown', this.onSwatchKeydown)
    })
  }
}

export function registerColorPicker (): void {
  if (!isRegistered(ColorPicker.TAG)) {
    ColorPicker.define()
  }
}
