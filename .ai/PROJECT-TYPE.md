---
document: PROJECT-TYPE
version: 1.0.0
projectName: PopCalm
projectType: Relaxing Interactive Game
status: Draft
language: en
---

# PROJECT-TYPE — Relaxing Interactive Game

## Project type

This project is an interactive stress-relief web game.

## Level

Level 1.5 — Simple visual interface with one strong interaction core.

It is not a static landing page, but it also does not require backend or complex architecture.

## Priorities

1. Fluid interaction.
2. Tactile visual quality.
3. Relaxing experience.
4. Responsive mobile/desktop behavior.
5. Basic accessibility.
6. Simple and maintainable code.

## Non-priorities

- Backend.
- Login.
- Database.
- Competitive ranking.
- Advanced game engine.
- Monetization.
- Analytics.

## Recommended stack

- Vite
- React
- TypeScript
- Tailwind CSS
- pnpm

## Technical reason

The page will be primarily interactive, so Vite + React is a more direct base than Astro for this first version.

The interaction should live in React components without relying on partial hydration or mixing too many layers.
