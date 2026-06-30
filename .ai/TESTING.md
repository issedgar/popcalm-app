---
document: TESTING
version: 1.0.0
framework: AI Development Framework
language: en
status: stable
scope: universal-with-project-overrides
audience:
  - AI Coding Agents
  - Developers
  - QA
produces:
  - Testing Strategy
  - Validation Checklist
---

# TESTING.md

## 1. Purpose

This document defines the testing and validation strategy for projects built with the **AI Development Framework (ADF)**.

The goal is not to add tests for the sake of adding tests. The goal is to validate that the project works, builds, meets requirements, and does not introduce visible or technical errors.

## 2. Validation levels

The agent must consider four levels:

1. Static validation.
2. Functional validation.
3. Visual validation.
4. Build/deployment validation.

## 3. Static validation

Before finishing, the agent must review:

- TypeScript without errors.
- Valid imports.
- Unused components.
- Duplicated code.
- Unnecessary dependencies.
- Naming conventions.
- No production `console.log`.

Common command:

```bash
pnpm build
```

When scripts exist:

```bash
pnpm lint
pnpm test
```

## 4. Functional validation

The agent must verify that:

- The page loads.
- Links work.
- Buttons perform expected actions.
- The language selector changes content.
- Language preference persists.
- JSON data generates cards correctly.
- Empty states do not break the UI.
- Missing screenshots have a fallback.

## 5. Visual validation

The agent must review:

- Responsive desktop, tablet, and mobile.
- Consistent spacing.
- Clear visual hierarchy.
- Aligned cards.
- No horizontal overflow.
- No important text clipping.
- The design does not look generic or incomplete.

## 6. Accessibility validation

The agent must review what is defined in:

```txt
.ai/ACCESSIBILITY.md
```

At minimum:

- Keyboard.
- Visible focus.
- Alt text.
- ARIA labels.
- Contrast.
- Semantics.

## 7. SEO validation

The agent must review what is defined in:

```txt
.ai/SEO.md
```

At minimum:

- Metadata.
- JSON-LD.
- Sitemap.
- Robots.
- Canonical.
- Open Graph.

## 8. When to add automated tests

Add automated tests when:

- There is business logic.
- There are critical forms.
- There are utility functions.
- There is data transformation.
- There are flows that can break easily.

For a simple static portfolio, build validation, visual review, accessibility, and SEO checks may be enough.

## 9. Recommended frontend tests

When applicable:

- Unit tests for functions.
- Component tests for interactive components.
- E2E tests for critical flows.
- Visual checks for important UI.

Do not add heavy testing tools if the project does not need them.

## 10. Required final report

At the end, the agent must report:

- Created or modified files.
- Commands executed.
- `pnpm build` result.
- Validations performed.
- Issues found.
- Pending items or recommendations.

## 11. Final checklist

- [ ] The project builds.
- [ ] There are no TypeScript errors.
- [ ] There are no broken imports.
- [ ] There is no production `console.log`.
- [ ] The main UI works.
- [ ] Main links work.
- [ ] Responsiveness was considered.
- [ ] Accessibility was reviewed.
- [ ] SEO was reviewed.
- [ ] Performance was reviewed.
- [ ] The agent delivered a final report.
