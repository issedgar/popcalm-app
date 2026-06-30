---
document: PROJECT-SPEC
version: 1.0.0
projectName: PopCalm
projectType: Relaxing Interactive Game
recommendedStack: Vite + React + TypeScript + Tailwind CSS
packageManager: pnpm
status: Draft
language: en
purpose: Specification to build a relaxing interactive pop-it inspired web game from scratch.
---

# PROJECT-SPEC — PopCalm Stress Relief Game

## 1. Project goal

Create an interactive relaxing web game where the user can choose a shape, choose a color palette, and press bubbles similar to a pop-it toy. Bubbles must visually sink when pressed and return to their normal position when pressed again.

The goal is not to create a competitive game. The goal is to create a simple, beautiful, tactile, stress-relief experience.

## 2. Expected result

The page must allow the user to:

- Choose a board shape.
- Choose a color palette.
- Press bubbles with click/tap.
- Press multiple bubbles by dragging the mouse or finger.
- Toggle a pressed bubble back to its normal state.
- Reset the board.
- Change shape without breaking the experience.
- Work well on desktop and mobile.

## 3. Recommended stack

Use:

- Vite
- React
- TypeScript
- Tailwind CSS
- pnpm
- lucide-react for simple icons

Do not use Astro for this initial project, because the page is primarily interactive. Vite + React simplifies state, pointer events, and board rendering.

Do not use Phaser, PixiJS, or a heavy game engine for the first version. The interaction can be solved with React, CSS, Pointer Events, and SVG/DOM.

## 4. Main rules

- Do not create a backend.
- Do not create authentication.
- Do not create a database.
- Do not create user accounts.
- Do not add heavy game libraries.
- Do not add automatic audio.
- Do not require external assets.
- Do not turn this into a complex competitive game.

## 5. Visual direction

The page must feel like a relaxing, modern, polished digital experience.

It should feel:

- soft
- colorful
- tactile
- calming
- premium
- simple
- clean
- playful without feeling childish

Avoid:

- generic dashboard design
- flat white background
- full dark theme
- uncontrolled flashy colors
- excessive neon
- visual saturation
- long text blocks
- complicated controls

## 6. Visual palettes

The user must be able to select at least these palettes:

1. Aurora
   - turquoise
   - blue
   - soft pink
   - lemon yellow

2. Ocean
   - deep blue
   - cyan
   - aqua
   - light blue

3. Candy
   - pink
   - lilac
   - yellow
   - mint green

4. Sunset
   - orange
   - coral
   - pink
   - purple

5. Minimal
   - slate
   - blue-gray
   - soft cyan
   - white-tinted highlights

Palettes must affect the board, bubbles, borders, shadows, and visual details.

## 7. Board shapes

The user must be able to select at least these shapes:

- vertical strip
- circle
- square
- heart
- hexagon
- simple star or simple flower if it stays clean

Rules:

- Each shape must be generated from data, not random hardcoded positions without structure.
- Each bubble must have a unique id.
- Changing shape must reset or adapt the bubble state predictably.
- If a shape does not fit well on mobile, it must scale correctly.

## 8. Data model

Create a data model for shapes and palettes.

Example:

```ts
export type BubbleState = 'up' | 'down';

export interface Bubble {
    id: string;
    row: number;
    column: number;
    x: number;
    y: number;
    size: number;
    colorToken: string;
    state: BubbleState;
}

export interface BoardShape {
    id: string;
    label: {
        es: string;
        en: string;
    };
    rows: number;
    columns: number;
    bubbles: Bubble[];
}

export interface ColorPalette {
    id: string;
    label: {
        es: string;
        en: string;
    };
    colors: string[];
    background: string;
    surface: string;
    accent: string;
}
```

## 9. Interaction

The interaction must support:

- `pointerdown` to press or toggle a bubble.
- `pointermove` to press bubbles while dragging.
- `pointerup` and `pointercancel` to end the gesture.
- Mouse, touch, and stylus using Pointer Events.

Rules:

- If the user clicks/taps a bubble, toggle its state.
- If the user drags across multiple bubbles, all bubbles touched by the drag path must be pressed.
- During drag, do not repeatedly toggle the same bubble by accident.
- Use a temporary set to track processed bubbles during the current gesture.
- Avoid accidental text selection.
- Use `touch-action: none` only on the board area when needed.

## 10. Bubble behavior

Each bubble must have two visual states:

### Up

- Looks elevated.
- Has a soft outer shadow.
- Has a top highlight.
- Feels tactile.

### Down

- Looks sunken.
- Has an inner shadow.
- Has less highlight.
- Feels pressed.

The transition must be quick and satisfying:

- 120ms to 180ms.
- No exaggerated animations.
- No excessive bouncing.

## 11. Layout design

Recommended structure:

1. Compact header
   - game name
   - ES/EN language button if implemented
   - quick reset button

2. Short hero
   - title
   - short description
   - calming message

3. Controls panel
   - shape selector
   - palette selector
   - reset
   - optional pressed bubble counter

4. Game area
   - large board
   - centered
   - responsive
   - visually dominant

5. Minimal footer
   - short text
   - credits or optional personal link

## 12. Internationalization

Support Spanish and English if required from the start.

Rules:

- Spanish as default language.
- Store language in localStorage.
- Do not hardcode visible text in main components.
- Shape and palette names must have `es` and `en`.

## 13. Accessibility

- Each bubble should be represented as a button when using DOM.
- Each bubble must have a descriptive `aria-label`.
- Each bubble should be operable with keyboard at least individually.
- Add visible focus states.
- Respect `prefers-reduced-motion`.
- Keep enough contrast in text and controls.
- Do not rely only on color to indicate state.

## 14. Performance

- Avoid unnecessary renders.
- Keep the number of bubbles reasonable.
- Do not use heavy libraries.
- Use CSS transforms for visual states.
- Keep the board fluid on mobile.
- Avoid expensive per-bubble animations.

## 15. Recommended architecture

Suggested structure:

```txt
src/
    components/
        game/
            Bubble.tsx
            BubbleBoard.tsx
            BoardControls.tsx
            PaletteSelector.tsx
            ShapeSelector.tsx
            GameStats.tsx
        layout/
            AppShell.tsx
            Header.tsx
            Footer.tsx
        ui/
            Button.tsx
            ToggleGroup.tsx
    config/
        palettes.ts
        shapes.ts
        i18n.ts
    hooks/
        useBubbleGame.ts
        usePointerDrag.ts
        useLocalStorage.ts
    types/
        game.ts
    utils/
        shapeFactory.ts
        cn.ts
    App.tsx
    main.tsx
    index.css
```

## 16. Implementation rules

- Keep variables, functions, components, and file names in English.
- Keep components small.
- Separate shape and palette configuration.
- Do not put all logic inside `App.tsx`.
- Use hooks for state and interaction logic.
- Use CSS/Tailwind for visual depth.
- Avoid unnecessary comments.

## 17. Required initial plan

Before writing code, the agent must present a short plan with:

- visual structure
- initial palette
- initial shapes
- components to create
- files to modify
- technical risks

Do not create an endless planning cycle. The goal is to build a strong first pass.

## 18. Success criteria

- The game looks visually attractive on first load.
- The board is the main visual focus.
- Bubbles feel tactile.
- Click/tap and drag work correctly.
- Mouse and touch work using Pointer Events.
- The user can change shape.
- The user can change palette.
- The user can reset the board.
- The design is responsive.
- It does not look like a dashboard.
- It does not look like a generic template.
- There are no TypeScript errors.
- `pnpm dev` works.
- `pnpm build` works.
