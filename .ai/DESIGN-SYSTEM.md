---
document: DESIGN-SYSTEM
version: 1.0.0
projectName: PopCalm
projectType: Relaxing Interactive Game
status: Draft
language: en
---

# DESIGN-SYSTEM — PopCalm

## Visual principle

The design must feel like a tactile digital object: soft, rounded, colorful, and calming.

It must not look like:

- dashboard
- corporate landing page
- medical app
- exaggerated children game
- generic white page

## Visual direction

Use a style called:

**Soft Tactile Calm UI**

Characteristics:

- soft backgrounds
- controlled color gradients
- rounded edges
- inner and outer shadows
- silicone / soft rubber feeling
- clean controls
- board as the main visual focus

## Backgrounds

Use backgrounds like:

- soft deep blue
- desaturated violet
- soft aqua
- subtle radial gradients
- controlled soft glass surfaces

Avoid flat white background.

## Bubbles

Each bubble must feel physical.

Up state:

- soft outer `box-shadow`
- top highlight
- slightly lighter border
- elevated center

Down state:

- inner `box-shadow`
- smaller scale
- sunken center
- slightly deeper color

## Controls

Controls must be simple:

- pill buttons
- clear active states
- visible focus
- touch-friendly size

## Motion

- Short transitions.
- No exaggerated bouncing.
- No tiring animations.
- Respect reduced motion.

## Recommended initial palette

### Aurora

- cyan: `#22d3ee`
- mint: `#86efac`
- lemon: `#fde047`
- pink: `#f9a8d4`
- violet: `#c4b5fd`

### Recommended background

- base: `#101827`
- panel: `#172033`
- soft surface: `rgba(255, 255, 255, 0.10)`
- border: `rgba(255, 255, 255, 0.16)`
- text: `#f8fafc`
- muted text: `#cbd5e1`

## First-pass visual quality rule

The first implementation must look attractive from the start.

Technical functionality is not enough.

Before finishing, the agent must review:

- whether bubbles feel tactile
- whether the board is the main visual focus
- whether colors feel pleasant
- whether the background is not flat
- whether controls are clear
- whether mobile looks good

If anything looks generic or weak, it must be fixed before delivery.
