# color-picker
[![tests](https://img.shields.io/github/actions/workflow/status/substrate-system/color-picker/nodejs.yml?style=flat-square)](https://github.com/substrate-system/color-picker/actions/workflows/nodejs.yml)
[![types](https://img.shields.io/npm/types/@substrate-system/color-picker?style=flat-square)](README.md)
[![module](https://img.shields.io/badge/module-ESM-blue?style=flat-square)](README.md)
[![semantic versioning](https://img.shields.io/badge/semver-2.0.0-blue?logo=semver&style=flat-square)](https://semver.org/)
[![Common Changelog](https://nichoth.github.io/badge/common-changelog.svg)](./CHANGELOG.md)
[![install size](https://flat.badgen.net/packagephobia/install/@substrate-system/color-picker)](https://packagephobia.com/result?p=@substrate-system/color-picker)
[![gzip size](https://flat.badgen.net/bundlephobia/minzip/@substrate-system/color-picker)](https://bundlephobia.com/package/@substrate-system/color-picker)
[![license](https://img.shields.io/badge/license-Big_Time-blue?style=flat-square)](LICENSE)

Color picker web component.

This was originally forked from [Simonwep/pickr](https://github.com/Simonwep/pickr).

[See a live demo](https://substrate-system.github.io/color-picker/)

<details><summary><h2>Contents</h2></summary>

<!-- toc -->

- [Install](#install)
- [Example](#example)
  * [JS](#js)
  * [HTML](#html)
- [API](#api)
  * [Properties](#properties)
  * [Events](#events)
  * [Keyboard navigation](#keyboard-navigation)
- [Modules](#modules)
  * [ESM](#esm)
- [CSS](#css)
  * [Import CSS](#import-css)
  * [Customize CSS](#customize-css)
  * [Pre-built JS](#pre-built-js)

<!-- tocstop -->

</details>

## Install

```sh
npm i -S @substrate-system/color-picker
```

## Example

It registers itself under the name `color-picker`. Just import, then you can
use the tag in HTML. Set `swatches` to an array of valid CSS color strings.

### JS

```js
import '@substrate-system/color-picker'

const picker = document.querySelector('color-picker')

picker.swatches = ['#000', '#fff', '#ef4444', '#3b82f6']
picker.value = '#000'

// use the `.on` method
picker.on('change', (ev) => {
    console.log(ev.detail.value)   // selected color string
    console.log(ev.detail.index)   // index into swatches array
    console.log(ev.detail.source)  // 'pointer' | 'keyboard' | 'programmatic'
})
```

### HTML

```html
<color-picker id="picker"></color-picker>
```

## API

### Properties

| Property   | Type            | Description                          |
|------------|-----------------|--------------------------------------|
| `swatches` | `string[]`      | Array of valid CSS color values.     |
| `value`    | `string\|null`  | The currently selected color string. |
| `disabled` | `boolean`       | Disables all interaction.            |

You can also set `value` via an HTML attribute:

```html
<color-picker value="#ef4444"></color-picker>
```

### Events

#### `color-picker:change`

Fired when the selected color changes. This is a namespaced event,
[as described here](https://github.com/substrate-system/web-component#emitnamestring-opts-bubbles-cancelable-detail-boolean).
You should use the `.on` method to listen for it:

```ts
const picker = document.querySelector('color-picker')

// `.on` will convert the given 'change' event to
// the correct namespaced event name, `color-picker:change`.
picker.on('change', ev => {
  // ...
})
```

```ts
interface ChangeDetail {
    value:string|null
    index:number|null
    source:'pointer'|'keyboard'|'programmatic'
}
```

### Keyboard navigation

When a swatch has focus:

| Key                             | Action                     |
|---------------------------------|----------------------------|
| `ArrowRight` / `ArrowDown`      | Select next swatch         |
| `ArrowLeft` / `ArrowUp`         | Select previous swatch     |
| `Space` / `Enter`               | Confirm active swatch      |

## Modules

This package ships ESM via the
[package.json `exports` field](https://nodejs.org/api/packages.html#exports).

### ESM

```js
import '@substrate-system/color-picker'
```

Or import the component class:

```js
import { ColorPicker } from '@substrate-system/color-picker'
```

## CSS

### Import CSS

The component bundles its own styles. If you need to import them separately:

```js
import '@substrate-system/color-picker/css'
```

Or minified:

```js
import '@substrate-system/color-picker/min/css'
```

### Customize CSS

Override styles on the `color-picker` element:

```css
color-picker .swatch {
    width: 32px;
    height: 32px;
    border-radius: 4px;
}

color-picker .swatch[aria-checked='true'] {
    border-color: hotpink;
}
```

### Pre-built JS

Copy the minified bundle to your web server:

```sh
cp ./node_modules/@substrate-system/color-picker/dist/index.min.js ./public
```

Then reference it in HTML:

```html
<script type="module" src="./index.min.js"></script>
```
