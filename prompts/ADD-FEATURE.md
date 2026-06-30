---
document: ADD-FEATURE
version: 1.0.0
framework: AI Development Framework
language: en
status: Stable
audience:
  - AI coding agents
  - Developers
dependsOn:
  - AGENTS.md
  - .ai/PROJECT-SPEC.md
  - .ai/ARCHITECTURE.md
  - .ai/IMPLEMENTATION-PLAN.md
  - .ai/CODING-STANDARDS.md
  - .ai/PROJECT-DECISIONS.md
produces:
  - Feature implementation
  - Updated documentation when required
---

# ADD-FEATURE

## Purpose

Use this prompt when adding a new feature to an existing project that already follows the AI Development Framework.

The goal is to add functionality without breaking architecture, design consistency, accessibility, performance, SEO, or existing behavior.

## Required Reading Order

Before writing code, read these files in this order:

1. `AGENTS.md`
2. `.ai/PROJECT-SPEC.md`
3. `.ai/PROJECT-TYPE.md`
4. `.ai/ARCHITECTURE.md`
5. `.ai/IMPLEMENTATION-PLAN.md`
6. `.ai/DESIGN-SYSTEM.md`
7. `.ai/CODING-STANDARDS.md`
8. `.ai/PERFORMANCE.md`
9. `.ai/ACCESSIBILITY.md`
10. `.ai/TESTING.md`
11. `.ai/PROJECT-DECISIONS.md`

If one of these files does not exist, continue with the available files and explicitly mention which files were missing.

## Feature Request

Replace this section with the feature to implement:

```text
Describe the feature here.
```

## Execution Rules

- Do not start coding immediately.
- First explain how the feature fits into the current architecture.
- Identify all files that may need to be created or modified.
- Prefer the smallest clean change that satisfies the requirement.
- Do not introduce new dependencies unless they are clearly justified.
- Do not duplicate existing logic.
- Do not break existing public APIs, routes, components, or data formats unless explicitly requested.
- Keep code names, variables, functions, classes, and files in English.

## Required Response Before Coding

Before implementation, respond with:

1. Summary of the requested feature.
2. Proposed implementation approach.
3. Files likely to be changed.
4. Risks or compatibility concerns.
5. Validation plan.

Then proceed with implementation.

## Implementation Checklist

- [ ] Feature follows the project architecture.
- [ ] Feature follows the design system.
- [ ] Feature is accessible.
- [ ] Feature does not add unnecessary client-side JavaScript.
- [ ] Feature does not add unnecessary dependencies.
- [ ] Feature is responsive.
- [ ] Feature handles empty, loading, and error states when applicable.
- [ ] Feature keeps TypeScript strictness intact.
- [ ] Feature does not introduce duplicated code.
- [ ] Related documentation is updated when needed.

## Final Validation

At the end, validate:

```bash
pnpm build
```

If the project has linting or tests configured, also run the relevant commands.

## Final Response

At the end, report:

1. What was implemented.
2. Files created or modified.
3. How to use or test the feature.
4. Commands executed and results.
5. Any pending manual actions.
