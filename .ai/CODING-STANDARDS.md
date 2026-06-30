---
document: CODING-STANDARDS
version: 1.0.0
framework: AI Development Framework
language: en
scope: universal
status: stable
audience:
  - AI coding agents
  - Developers
purpose: Define reusable coding standards for AI-assisted projects.
dependsOn:
  - AGENTS.md
  - .ai/PROJECT-SPEC.md
produces:
  - Consistent code quality
  - Maintainable implementation
---

# CODING-STANDARDS.md — Coding Standards

## 1. Purpose

This document defines universal coding standards for projects built with AI agents.

It applies to frontend, backend, APIs, scripts, technical documentation, and automations.

## 2. Principles

Code must be:

- Clear.
- Maintainable.
- Predictable.
- Easy to extend.
- Easy to review.
- Consistent with the project stack.

Avoid "clever" code when it reduces readability.

## 3. Code language

Every identifier must be in English:

- Variables.
- Functions.
- Classes.
- Interfaces.
- Types.
- Components.
- Files.
- Folders.

Comments should only be used when they explain an important decision or a non-obvious part.

## 4. Naming

Use descriptive names.

```txt
Good:
ProjectCard
selectedLanguage
buildProjectUrl
getProjectDescription

Bad:
Card2
langx
fn1
dataObj
```

Do not use unnecessary abbreviations.

## 5. Components

Each component must have a clear responsibility.

Avoid:

- Giant components.
- Duplicated markup.
- Unnecessarily complex props.
- Mixing data logic, presentation, and side effects without a reason.

Prefer composition over overly configurable components.

## 6. Recommended size

As a general guide:

- UI components: keep them small and focused.
- Functions: prefer short functions with one purpose.
- Long files: split when responsibilities are mixed.

Do not split just for the sake of splitting. Split when it improves clarity.

## 7. Dependencies

Before adding a dependency, validate:

1. Whether the project really needs it.
2. Whether the current stack can solve it.
3. Whether it significantly increases bundle size.
4. Whether it is maintained.
5. Whether it complicates the code.

Do not add dependencies for convenience if the cost is not justified.

## 8. TypeScript

When the project uses TypeScript:

- Avoid `any` unless clearly justified.
- Prefer explicit types for shared structures.
- Create reusable types for domain data.
- Do not duplicate equivalent types.
- Validate external data when applicable.

## 9. Data handling

Separate:

- Configuration.
- Content.
- Types.
- Presentation.
- Transformations.

For JSON data:

- Define a clear structure.
- Document required fields.
- Document optional fields.
- Provide fallbacks for missing fields when reasonable.

## 10. Errors and states

Every feature must consider:

- Normal state.
- Empty state.
- Error state.
- Loading state, if applicable.
- Reasonable fallbacks.

Do not assume all data will always be complete.

## 11. Basic security

- Do not expose secrets.
- Do not hardcode tokens.
- Do not trust external data without validation.
- Use `rel="noopener noreferrer"` in external links with `target="_blank"`.
- Avoid `dangerouslySetInnerHTML` unless strictly necessary and safe.

## 12. Accessibility in code

Every interactive component must consider:

- Accessible labels.
- Focus states.
- Keyboard navigation.
- Alternative text.
- ARIA roles only when semantic HTML is not enough.

## 13. Performance in code

- Avoid unnecessary renders.
- Avoid heavy logic inside visual components.
- Optimize images.
- Reduce client-side JavaScript when possible.
- Do not use expensive animations without a reason.

## 14. Organization

Folder structure must reflect responsibilities.

General frontend example:

```txt
src/
  components/
  config/
  content/
  hooks/
  layouts/
  lib/
  styles/
  types/
```

Adjust to the specific framework when applicable.

## 15. Final review

Before finishing any implementation:

- Remove unused imports.
- Remove dead code.
- Validate names.
- Validate duplication.
- Validate basic accessibility.
- Validate build.
- Check that there are no production `console.log` statements.
- Confirm consistency with the specification.
