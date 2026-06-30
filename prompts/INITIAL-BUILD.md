---
document: INITIAL-BUILD
version: 1.0.0
projectName: PopCalm
projectType: Relaxing Interactive Game
recommendedStack: Vite + React + TypeScript + Tailwind CSS
status: Draft
language: en
---

# INITIAL-BUILD — PopCalm Stress Relief Game

Read the following files before writing code:

1. AGENTS.md
2. .ai/PROJECT-SPEC.md
3. .ai/PROJECT-TYPE.md
4. .ai/DESIGN-SYSTEM.md
5. .ai/CODING-STANDARDS.md
6. .ai/ACCESSIBILITY.md
7. .ai/PERFORMANCE.md
8. .ai/TESTING.md
9. .ai/PROJECT-DECISIONS.md

Then build the current project.

## Important rules

- Do not create a nested project folder.
- Modify the current project only.
- Use Vite + React + TypeScript + Tailwind CSS.
- Use pnpm.
- Do not use a heavy game engine.
- Do not add a backend.
- Do not add authentication.
- Do not add unnecessary dependencies.

## Plan before implementation

Before modifying files, present a short plan with:

- initial visual palette
- layout structure
- components to create
- strategy for geometric shapes
- strategy for pointer events and drag
- files to modify
- technical risks

Do not create an endless planning cycle. The goal is to build a strong first pass.

## Expected implementation

Build a page/game where the user can:

- select a board shape
- select a color palette
- press bubbles with click/tap
- press multiple bubbles by dragging mouse or finger
- toggle bubble state
- reset the board

## Expected visual quality

The result must look like a relaxing and well-designed digital experience, not a technical mockup.

It must have:

- soft colorful background
- board as the main visual focus
- tactile bubbles with depth
- simple and beautiful controls
- responsive design
- smooth transitions

## Final validation

At the end:

- Summarize created/modified files.
- Explain how to add new shapes.
- Explain how to add new palettes.
- Run or indicate:

```bash
pnpm dev
pnpm build
```

If `pnpm build` fails, fix the error before finishing.
