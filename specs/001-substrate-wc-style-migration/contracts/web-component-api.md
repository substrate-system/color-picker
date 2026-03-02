# Contract: Picker Web Component API

Related docs:
- Plan: `/Users/nick/code/picker-wc/specs/001-substrate-wc-style-migration/plan.md`
- Data model: `/Users/nick/code/picker-wc/specs/001-substrate-wc-style-migration/data-model.md`
- Quickstart: `/Users/nick/code/picker-wc/specs/001-substrate-wc-style-migration/quickstart.md`

## Custom Element

- Tag: `picker-wc`
- Base class: `@substrate-system/web-component`

## Public Attributes

- `value` (string): selected CSS color value.
- `disabled` (boolean): disables swatch interactions when present.
- `aria-label` (string): accessible label for control group.

## Public Properties

- `swatches: string[]`
  - Ordered array of CSS color values.
  - Setter validates values and re-renders deterministically.
- `value: string | null`
  - Reflects selected color value.
  - Setting selects first matching swatch index.
- `disabled: boolean`
  - Mirrors disabled attribute.

## Public Methods

- `setSwatches(swatches: string[]): void`
- `selectByIndex(index: number): void`
- `getValue(): string | null`

## Events

- `change`
  - Fired when selection changes.
  - `event.detail = { value: string | null, index: number | null, source: 'pointer' | 'keyboard' | 'programmatic' }`

## Accessibility Contract

- Component root uses semantic grouping role (`radiogroup` or equivalent).
- Each swatch is keyboard reachable and has role semantics (`radio` or equivalent).
- Exactly one swatch reports `aria-checked="true"` when selected.
- Visible focus indicator MUST be present for keyboard navigation.

## Determinism Rules

- Render order always matches `swatches` input order.
- Duplicate color values are addressed by first matching index for programmatic `value` set.
- Keyboard navigation traverses by index order without randomization.

## Error Handling

- Invalid color values are ignored with deterministic warning output and no crash.
- Out-of-range index selection is ignored and preserves prior state.

## Migration Notes

- Legacy webpack-based build outputs are replaced by TypeScript + esbuild artifacts.
- Legacy JS picker internals remain in repository history but are not part of this contract.
