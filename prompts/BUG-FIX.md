---
document: BUG-FIX
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
  - .ai/CODING-STANDARDS.md
  - .ai/TESTING.md
produces:
  - Bug fix
  - Root cause explanation
---

# BUG-FIX

## Purpose

Use this prompt when something is broken, behaving incorrectly, failing to build, failing tests, or producing unexpected UI/UX behavior.

The goal is to fix the root cause, not to patch symptoms.

## Required Reading Order

Read:

1. `AGENTS.md`
2. `.ai/PROJECT-SPEC.md`
3. `.ai/ARCHITECTURE.md`
4. `.ai/CODING-STANDARDS.md`
5. `.ai/TESTING.md`
6. `.ai/PROJECT-DECISIONS.md`

## Bug Description

Replace this section:

```text
Describe the bug, error message, reproduction steps, expected behavior, and actual behavior.
```

## Investigation Rules

- Do not rewrite large areas of the project before understanding the issue.
- Reproduce the problem mentally or through available commands.
- Identify the smallest responsible unit.
- Look for related files and existing patterns before changing code.
- Do not remove features to make the error disappear.
- Do not silence TypeScript, lint, accessibility, or build errors without solving the underlying problem.

## Required Response Before Coding

Before changing code, explain:

1. The likely root cause.
2. The files involved.
3. The fix strategy.
4. Why this fix is safer than alternatives.
5. How the fix will be validated.

## Fix Checklist

- [ ] Root cause identified.
- [ ] Minimal and targeted fix applied.
- [ ] Existing architecture respected.
- [ ] No unrelated refactor introduced.
- [ ] No unnecessary dependency added.
- [ ] No error suppressed without justification.
- [ ] Build passes.
- [ ] Related behavior is manually or automatically validated.

## Final Response

Report:

1. Root cause.
2. What changed.
3. Files modified.
4. Validation performed.
5. Any remaining risks.
