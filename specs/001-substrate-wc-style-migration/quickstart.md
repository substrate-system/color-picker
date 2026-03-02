# Quickstart: Substrate Web Component Style Migration

## Prerequisites

- Node.js 20+
- npm 10+

## Install

```bash
npm install
```

## Run lint and tests (test-first workflow)

```bash
npm run lint
npm test
```

## Build library artifacts

```bash
npm run build
```

Expected outputs after migration:
- `dist/index.js` (ESM)
- `dist/index.min.js` (minified ESM)
- `dist/style.css` and `dist/style.min.css`
- `dist/index.d.ts` (Type declarations)

## Run example app

```bash
npm run start
```

Open the local Vite URL and verify:
- Swatches render in provided order.
- Click and keyboard interactions update selection.
- `change` event emits selected CSS color value.
- No continuous slider UI is present.

## Manual Accessibility Check

1. Use `Tab` to focus component.
2. Use Arrow keys to move active swatch.
3. Use `Enter` or `Space` to select swatch.
4. Confirm visible focus and `aria-checked` updates.

## Verification Log

- `npm run lint`: PASSED (exit 0 on 2026-03-02)
- `npm test`: FAILED (`test/build-artifacts.test.ts` expects `dist/index.cjs`, but build outputs are ESM/minified ESM)
- `npm run build`: PASSED (exit 0 on 2026-03-02)
