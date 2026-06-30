---
document: AGENTS
version: 1.0.0
framework: AI Development Framework
language: en
scope: universal
status: stable
audience:
  - AI coding agents
  - Developers
purpose: Define permanent behavior rules for AI agents working inside any software project.
dependsOn: []
produces:
  - Consistent agent behavior
  - Safer implementation workflow
---

# AGENTS.md — Permanent Agent Rules

## 1. Purpose

This file defines the permanent rules that every AI agent must follow when working inside this project.

These rules apply before any task-specific prompt. If a specific prompt conflicts with this file, the agent must stop, explain the conflict, and propose a correction before continuing.

## 2. Required reading order

Before modifying code, the agent must read the files in this order:

1. `AGENTS.md`
2. `.ai/PROJECT-SPEC.md`
3. `.ai/DESIGN-SYSTEM.md`, if the work affects UI or visual experience
4. `.ai/CODING-STANDARDS.md`
5. Any task-specific prompt inside `prompts/`

If any file does not exist, the agent must continue with the available files and report what was missing.

## 3. Working principles

The agent must always prioritize:

1. Simple solutions.
2. Maintainability.
3. Clear code.
4. Accessibility.
5. Performance.
6. Security.
7. Visual consistency.
8. The smallest reasonable dependency set.

The agent must not implement a complex solution when a simple one solves the problem correctly.

## 4. Before writing code

Before changing files, the agent must briefly answer:

1. What it understood from the objective.
2. Which files it will create or modify.
3. Which risks or relevant decisions it identified.
4. Which implementation strategy it will follow.

After that, it may implement unless there is a real blocker.

## 5. Implementation rules

- Do not create nested project folders if a project already exists.
- Modify the current project only.
- Do not invent final URLs, credentials, company names, emails, or social profiles.
- Use explicit placeholders when information is missing.
- Do not add unnecessary dependencies.
- Do not convert static sections into interactive frameworks without justification.
- Do not leave dead code, `console.log`, unused imports, or duplicated components.
- Do not use lorem ipsum in final content.
- Keep file names, variables, functions, and components in English.
- Use comments only when they clarify an important decision.

## 6. Managing uncertainty

When information is missing:

- If the missing information blocks progress, ask a concrete question.
- If it does not block progress, use a clear placeholder and document it.
- Never invent information that looks real.

Correct example:

```txt
TODO: Replace with the final LinkedIn URL.
```

Incorrect example:

```txt
https://linkedin.com/in/example-real-looking-profile
```

## 7. Visual quality

When the work affects UI:

- Avoid generic AI-generated layouts.
- Respect hierarchy, rhythm, alignment, and spacing.
- Prioritize readability and clarity.
- Use microinteractions intentionally.
- Do not overuse animations.
- Do not use fully dark or fully white themes unless the specification explicitly asks for them.

## 8. Mandatory accessibility

Every UI must consider:

- Correct HTML semantics.
- Keyboard navigation.
- `focus-visible` states.
- Sufficient contrast.
- `aria-label` on interactive icons.
- Alternative text for meaningful images.
- External links with `target="_blank"` and `rel="noopener noreferrer"`.

## 9. Mandatory performance

The agent must avoid:

- Heavy dependencies without justification.
- Expensive animations.
- Unoptimized images.
- Unnecessary client-side JavaScript.
- Interactive components where HTML/CSS/SSR/SSG is enough.

## 10. Finishing tasks

Before finishing, the agent must review:

1. Build or available validation commands.
2. TypeScript errors.
3. Responsiveness.
4. Basic accessibility.
5. SEO when applicable.
6. Unused imports.
7. Unnecessary duplication.
8. Consistency with `.ai/PROJECT-SPEC.md`.

The final response must include:

- Files created or modified.
- How to validate the change.
- What remains pending, if anything.
- Any placeholder the user must replace.
