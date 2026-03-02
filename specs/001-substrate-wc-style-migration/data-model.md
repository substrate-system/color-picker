# Data Model: Substrate Swatch Picker Component

## Entity: SwatchOption

Fields:
- `index: number` (required, non-negative, stable by input order)
- `value: string` (required, valid CSS color string)
- `isSelected: boolean` (derived from `SelectionState.selectedIndex`)
- `isFocused: boolean` (derived from `SelectionState.activeIndex`)

Validation:
- `value` MUST parse as CSS color.
- Duplicate `value` entries are allowed and are distinguished by `index`.

## Entity: SelectionState

Fields:
- `activeIndex: number | null`
- `selectedIndex: number | null`
- `selectedValue: string | null`
- `lastInteraction: 'pointer' | 'keyboard' | 'programmatic' | null`

Validation:
- `activeIndex` and `selectedIndex` MUST be within `swatches` bounds or `null`.
- `selectedValue` MUST equal `swatches[selectedIndex]` when `selectedIndex !== null`.

State transitions:
- `uninitialized -> ready`: component receives swatch input and renders.
- `ready -> focused`: user tabs into component.
- `focused -> selected`: user activates swatch by click/Enter/Space.
- `selected -> selected`: user changes selection to different index.
- `selected -> ready`: swatch list becomes empty or selected index is removed.

## Entity: PickerConfig

Fields:
- `swatches: string[]` (ordered CSS color strings)
- `value?: string` (optional initial selected CSS color)
- `disabled?: boolean`
- `label?: string` (accessible name)

Validation:
- `swatches` order MUST be preserved as given.
- `value`, if provided, MUST match at least one `swatches` entry by first index.
- Empty `swatches` is valid and yields non-interactive state.

## Relationships

- `PickerConfig.swatches` materializes `SwatchOption[]` at render time.
- `SelectionState` references `SwatchOption` by index.
- Component events emit values from `SelectionState.selectedValue`.
