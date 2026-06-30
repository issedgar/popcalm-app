---
document: PROJECT-DECISIONS
version: 1.0.0
projectName: PopCalm
projectType: Relaxing Interactive Game
status: Draft
language: en
---

# PROJECT-DECISIONS — PopCalm

## Initial decisions

### 1. Use Vite + React + TypeScript

Reason:

The project is primarily interactive. React makes state, pointer events, components, and controls easier to manage. Vite simplifies startup and builds.

### 2. Do not use Astro for the first version

Reason:

Astro is excellent for content-first sites with islands. This project is closer to a mini interactive app where the board is the center of the experience.

### 3. Do not use a game engine

Reason:

The initial mechanic is simple and can be solved with DOM/SVG/CSS + Pointer Events. Using Phaser or PixiJS would add unnecessary complexity.

### 4. Use Pointer Events

Reason:

They handle mouse, touch, and stylus with a unified model.

### 5. Use data-driven configuration

Reason:

Shapes and palettes should be added without rewriting components.

### 6. Prioritize tactile feeling

Reason:

The main goal is stress relief. The visual and sensory experience matters as much as the logic.
