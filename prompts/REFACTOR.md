---
document: REFACTOR
version: 1.0.0
framework: AI Development Framework
language: en
status: Stable
audience:
  - AI coding agents
  - Developers
dependsOn:
  - AGENTS.md
  - .ai/ARCHITECTURE.md
  - .ai/CODING-STANDARDS.md
  - .ai/TESTING.md
produces:
  - Refactored implementation
  - Behavior-preserving changes
---

# REFACTOR

## Purpose

Use this prompt when improving code structure, readability, maintainability, performance, or component boundaries without changing external behavior.

## Refactor Target

Replace this section:

```text
Describe the file, component, function, module, or area to refactor.
```

## Rules

- Preserve current behavior unless explicitly requested otherwise.
- Do not introduce a new architecture just because it is possible.
- Prefer small, incremental improvements.
- Keep public contracts stable.
- Remove duplicated logic.
- Improve naming when it increases clarity.
- Keep abstractions useful and justified.
- Do not create generic utilities prematurely.
- Keep components, functions, and modules focused.

## Required Response Before Coding

Before refactoring, explain:

1. Current problem.
2. Refactor goal.
3. Proposed changes.
4. Behavior that must remain unchanged.
5. Validation plan.

## Refactor Checklist

- [ ] Behavior preserved.
- [ ] Code is easier to read.
- [ ] Responsibilities are clearer.
- [ ] Duplicated logic reduced.
- [ ] No unnecessary abstraction added.
- [ ] TypeScript remains strict.
- [ ] Build passes.

## Final Response

Report:

1. What was refactored.
2. Why it is better.
3. Files modified.
4. Validation performed.
5. Any follow-up suggestions.
