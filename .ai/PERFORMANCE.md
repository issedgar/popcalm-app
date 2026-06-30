---
document: PERFORMANCE
version: 1.0.0
framework: AI Development Framework
language: en
status: stable
scope: universal-with-project-overrides
audience:
  - AI Coding Agents
  - Developers
  - Technical Leads
dependsOn:
  - AGENTS.md
  - .ai/PROJECT-SPEC.md
  - .ai/ARCHITECTURE.md
  - .ai/IMPLEMENTATION-PLAN.md
produces:
  - Performance Requirements
  - Performance Review Checklist
  - Optimization Rules
---

# PERFORMANCE.md

## 1. Purpose

This document defines the performance rules that the agent must follow in any project built with the **AI Development Framework (ADF)**.

Performance must not be treated as a final optimization pass. It must be considered from architecture, design, dependency selection, image handling, component structure, and validation.

## 2. General principles

The agent must prioritize:

1. Less client-side JavaScript.
2. Static or server-side rendering whenever possible.
3. Optimized images from day one.
4. Minimal and justified dependencies.
5. Simple, maintainable, efficient CSS.
6. Lightweight animations that respect `prefers-reduced-motion`.
7. Progressive loading without blocking the main experience.
8. Verifiable metrics before completion.

## 3. Minimum targets

For public frontend projects, the target is:

| Metric | Target |
|---|---:|
| Lighthouse Performance | 95+ |
| Lighthouse Accessibility | 100 |
| Lighthouse Best Practices | 100 |
| Lighthouse SEO | 100 |
| Largest Contentful Paint | Good |
| Cumulative Layout Shift | Low |
| First Contentful Paint | Fast |
| Total Blocking Time | Minimal |

If project constraints prevent these targets, the agent must explain why and propose alternatives.

## 4. Astro rules

When the project uses Astro:

- Prefer `.astro` components for static content.
- Use React islands only when real interaction exists.
- Avoid converting static sections into React.
- Avoid hydrating full components when only a small part needs interaction.
- Use hydration directives intentionally: `client:load`, `client:idle`, `client:visible`.
- Prefer `client:visible` for below-the-fold components.
- Keep the main content server-rendered or statically rendered.
- Avoid iframe previews for projects; use optimized screenshots.

## 5. Image rules

The agent must:

- Use modern formats: `webp` or `avif` when possible.
- Define `width` and `height` to avoid layout shift.
- Add descriptive `alt` text.
- Optimize screenshots before using them.
- Use local images for important assets.
- Avoid critical remote images when unnecessary.
- Avoid heavy decorative background images.

For the Astro portfolio, screenshots must live in:

```txt
public/projects/
```

Example:

```txt
public/projects/angular-22-feature-showcase.webp
```

## 6. Dependency rules

Before adding a dependency, the agent must justify:

- Why it is needed.
- Whether a native or simpler alternative exists.
- Whether it affects the client bundle.
- Whether it introduces unnecessary complexity.

Do not add heavy libraries for simple problems.

## 7. Animation rules

Animations must be:

- Subtle.
- Short.
- Useful.
- Non-intrusive.
- Disabled or reduced with `prefers-reduced-motion`.

Avoid:

- Exaggerated bouncing.
- Constant animations.
- Heavy parallax.
- Expensive animated backgrounds.
- Effects that make reading harder.

## 8. CSS and Tailwind rules

The agent must:

- Avoid unnecessary duplicated classes.
- Use tokens and variables when available.
- Keep spacing consistent.
- Avoid arbitrary values without justification.
- Avoid inline styles except for very specific cases.
- Avoid dead CSS.

## 9. Font rules

The agent must:

- Use few type families.
- Avoid unnecessary font weights.
- Use `font-display: swap` when applicable.
- Avoid loading external fonts in a blocking way.

## 10. Required validation

Before finishing, the agent must run or explain:

```bash
pnpm build
```

And when applicable:

```bash
pnpm dev
```

The agent must also review:

- Heavy images.
- Unnecessary dependencies.
- Components hydrated without need.
- Layout shift.
- Broken links.
- Excessive initial load.

## 11. Final checklist

- [ ] The project builds successfully.
- [ ] There are no unnecessary React components for static content.
- [ ] Main images are optimized.
- [ ] Screenshots use `webp` or another modern format.
- [ ] There are no unnecessary dependencies.
- [ ] Animations respect `prefers-reduced-motion`.
- [ ] The layout does not shift when images load.
- [ ] Lighthouse targets were considered.
- [ ] The agent reported any performance compromise.
