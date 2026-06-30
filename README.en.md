# PopCalm

[![ES](https://img.shields.io/badge/ES-Español-aaa?style=for-the-badge)](README.md)&nbsp;&nbsp;![EN](https://img.shields.io/badge/EN-English-0d6efd?style=for-the-badge)

PopCalm is a relaxing interactive pop-it inspired web game built with Vite, React, TypeScript, and Tailwind CSS.

The experience is intentionally simple and tactile: users choose a board shape, select a color palette, and press bubbles by clicking, tapping, or dragging across the board. It is not a competitive game; it is meant to be a short, visual, calming interaction.

## Features

- Interactive pop-it style bubble board.
- Shape selector with square, circle, strip, heart, hexagon, and flower boards.
- Palette selector with Pop-It, Aurora, Ocean, Candy, Sunset, and Minimal palettes.
- Mouse, touch, and stylus interaction through Pointer Events.
- Drag support to press or release multiple bubbles.
- Pressed bubble counter and progress bar.
- Reset controls in the header and controls panel.
- Spanish and English interface.
- Sound toggle and haptic feedback when available.
- Responsive desktop and mobile layout.
- Accessible bubble buttons with `aria-label`, `aria-pressed`, and visible focus states.
- `prefers-reduced-motion` support.

## Tech Stack

- Vite 8
- React 19
- TypeScript 6
- Tailwind CSS 4
- lucide-react
- pnpm

## Requirements

- Node.js `>=22.12.0`
- pnpm `>=11.5.3`

The package manager is defined in `package.json`:

```bash
pnpm@11.5.3
```

## Setup

```bash
pnpm install
```

```bash
pnpm dev
```

By default, Vite serves the app at:

```txt
http://localhost:5173/
```

## Available Commands

```bash
pnpm dev
```

Runs the Vite development server.

```bash
pnpm build
```

Runs TypeScript build checks and creates the production build in `dist/`.

```bash
pnpm lint
```

Runs ESLint against the project.

```bash
pnpm preview
```

Serves the production build locally after running `pnpm build`.

## Project Structure

```txt
src/
  components/
    game/
      AmbientBubbles.tsx
      BoardControls.tsx
      Bubble.tsx
      BubbleBoard.tsx
      Celebration.tsx
      OnboardingHint.tsx
      PaletteFlash.tsx
      ProgressBar.tsx
    layout/
      Footer.tsx
      Header.tsx
  config/
    i18n.ts
    palettes.ts
    shapes.ts
  hooks/
    useBubbleGame.ts
    useBreathing.ts
    useHaptic.ts
    useLocalStorage.ts
    usePopSound.ts
  types/
    game.ts
  utils/
    cn.ts
    shapeFactory.ts
  App.tsx
  index.css
  main.tsx
```

## Implementation Notes

- `src/App.tsx` composes the main experience: header, intro text, progress, controls, board, overlays, and footer.
- `src/hooks/useBubbleGame.ts` owns game state: language, shape, palette, bubble states, reset, and wave reset.
- `src/components/game/BubbleBoard.tsx` handles Pointer Events and drag behavior.
- `src/components/game/Bubble.tsx` renders each bubble as a native button.
- `src/config/shapes.ts` defines available board shapes.
- `src/utils/shapeFactory.ts` generates structured bubble positions.
- `src/config/palettes.ts` defines visual palettes.
- `src/config/i18n.ts` contains Spanish and English visible text.
- `src/index.css` contains the visual system, tactile states, responsive layout, animations, and reduced-motion rules.

## Editing Content

### Add or update a palette

Edit:

```txt
src/config/palettes.ts
```

Each palette should define `id`, Spanish and English labels, `colors`, `background`, `surface`, `accent`, and `border`.

### Add or update a shape

Edit:

```txt
src/config/shapes.ts
src/utils/shapeFactory.ts
```

Positions should be generated from structured data and each bubble must have a unique id.

### Update visible text

Edit:

```txt
src/config/i18n.ts
```

The app defaults to Spanish. Keep Spanish and English text consistent.

### Adjust visual design

Edit:

```txt
src/index.css
```

Keep the visual direction soft, tactile, colorful, and calm. Avoid heavy animations, excessive saturation, or dashboard-like layouts.

## Accessibility

- Bubbles render as `<button>` elements.
- Bubble state is exposed with `aria-pressed`.
- Icon-only controls use `aria-label`.
- External links use `target="_blank"` and `rel="noopener noreferrer"`.
- Focus states are visible.
- Motion is reduced with `prefers-reduced-motion: reduce`.
- The board uses Pointer Events for mouse, touch, and stylus.

## Validation

Before considering a change ready:

```bash
pnpm build
pnpm lint
```

Then manually verify:

- Desktop layout.
- Mobile layout.
- Tap/click on bubbles.
- Drag across bubbles.
- Shape switching.
- Palette switching.
- Board reset.
- Language toggle.
- Sound toggle.
- Keyboard focus and activation on bubble buttons.
- Reduced-motion behavior.

## Deployment

This is a static frontend app. Any host that supports Vite static output can serve it.

Production output:

```txt
dist/
```

Typical flow:

```bash
pnpm build
```

Then deploy the generated `dist/` directory.

## Environment Variables

No environment variables are required in the current version.

## Troubleshooting

### The dev server is not on port 5173

Vite may choose another port if `5173` is already in use. Check the terminal output from:

```bash
pnpm dev
```

### Mobile tap behavior feels wrong

Bubble interaction depends on Pointer Events. After changes to these files, validate on a mobile viewport or real device:

```txt
src/components/game/Bubble.tsx
src/components/game/BubbleBoard.tsx
src/index.css
```

### Styles look stale

Restart the dev server and hard-refresh the browser. If testing production output, rebuild first:

```bash
pnpm build
pnpm preview
```

## Maintenance

- Keep the app frontend-only unless a real backend requirement appears.
- Do not add heavy game engines for this interaction model.
- Keep bubble counts reasonable for mobile performance.
- Prefer semantic HTML before adding ARIA.
- Keep visible text in `src/config/i18n.ts`.
- Keep visual tokens and tactile behavior in `src/index.css`.
- Run `pnpm build` before delivery.
