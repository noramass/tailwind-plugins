# @windwards/plugin-dock
Dock elements to their parents quickly!

## Installation

```shell
pnpm add -D @windwards/plugin-dock
```
If you prefer yarn:
```shell
yarn add -D @windwards/plugin-dock
```
Or for npm users:
```shell
npm i -D @windwards/plugin-dock
```

## Configuration
```typescript
// In your Tailwind config file
import { type Config } from "tailwindcss"
import { dock } from "@windwards/plugin-dock"

export default {
  // ...other secions
  plugins: [
    // ...other plugins
    dock(),
  ],
} satisfies Config

```

## Usage

To mask an element, use one of the `dock` utility classes.

The format for dock classes is `dock[-{direction}]-{amount}`.

`direction` takes inspiration from padding and margin, so you can use shorthands like:
- `t`, `b`, `l`, `r` for the basic directions top, bottom, left and right
- `tl`, `tr`, `bl`, `br` as combinations
- `x` or `y` for horizontal and vertical
- leave it out for all sides!

The `amount` is any value from tailwind spacing or your own (use bracket syntax).

## Examples

```html
<!-- Docking to the top of an element -->
<div class="bg-rose-500 h-24 w-24 dock-t-0"></div>

<!-- Docking to the top and bottom -->
<div class="bg-rose-500 h-24 w-24 dock-y-12"></div>

<!-- Docking to the top left -->
<div class="bg-rose-500 h-24 w-24 dock-tl-1/2"></div>

<!-- Docking to all sides -->
<div class="bg-rose-500 h-24 w-24 dock-6"></div>

<!-- Using two different dock rules for different sides -->
<div class="bg-rose-500 h-24 w-24 dock-l-6 dock-r-12"></div>

<!-- Using modifiers -->
<div class="bg-rose-500 h-24 w-24 dock-l-12 lg:dock-l-6 hover:dock-none"></div>

<!-- Using custom dock rule sizes -->
<div class="bg-rose-500 h-24 w-24 dock-t-[20px]"></div>
```
