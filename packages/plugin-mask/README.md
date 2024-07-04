# @windwards/plugin-mask
Your go-to tool for masking content with dynamically changing gradients!

## Installation

```shell
pnpm add -D @windwards/plugin-mask
```
If you prefer yarn:
```shell
yarn add -D @windwards/plugin-mask
```
Or for npm users:
```shell
npm i -D @windwards/plugin-mask
```

## Configuration
```typescript
// In your Tailwind config file
import { type Config } from "tailwindcss"
import { mask } from "@windwards/plugin-mask"

export default {
  // ...other secions
  plugins: [
    // ...other plugins
    mask(),
  ],
} satisfies Config

```

## Usage

To mask an element, use the `mask` utility class, along with at least one mask-defining class.

The format for mask defining classes is `mask-{direction}-{amount}`.

`direction` takes inspiration from padding and margin, so you can use shorthands like:
- `t`, `b`, `l`, `r` for the basic directions top, bottom, left and right
- `tl`, `tr`, `bl`, `br` as conbinations
- `x` or `y` for horizontal and vertical
- leave it out for all sides!

The `amount` is any value from tailwind spacing or your own (use bracket syntax).

## Examples

```html
<!-- Masking the top of an element -->
<div class="bg-rose-500 h-24 w-24 mask mask-t-12"></div>

<!-- Masking the top and bottom -->
<div class="bg-rose-500 h-24 w-24 mask mask-x-12"></div>

<!-- Masking the top left -->
<div class="bg-rose-500 h-24 w-24 mask mask-tl-1/2"></div>

<!-- Masking all sides -->
<div class="bg-rose-500 h-24 w-24 mask mask-6"></div>

<!-- Using two different masks for different sides -->
<div class="bg-rose-500 h-24 w-24 mask mask-l-6 mask-r-12"></div>

<!-- Using modifiers -->
<div class="bg-rose-500 h-24 w-24 mask mask-l-12 lg:mask-l-6 hover:mask-none"></div>

<!-- Using custom mask sizes -->
<div class="bg-rose-500 h-24 w-24 mask mask-t-[20px]"></div>
```
