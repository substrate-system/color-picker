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

Optional clean before build:

```bash
npm run clean
```

## Build library artifacts

```bash
npm run build
```

Expected outputs after migration:
- `dist/*.js` (ESM)
- `dist/*.cjs` (CJS)
- `dist/*.d.ts` (Type declarations)

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

- `npm install --verbose`: FAILED (`ENOTFOUND` resolving `registry.npmjs.org`, cannot fetch new dependencies in current environment)
- `npm run lint`: FAILED (`ERR_MODULE_NOT_FOUND` for `@typescript-eslint/parser` because install failed)
- `npm test`: FAILED (`esbuild: command not found` because install failed)
- `npm run build`: FAILED (`esbuild: command not found` because install failed)
