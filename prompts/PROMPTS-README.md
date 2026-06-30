---
document: PROMPTS-README
version: 1.0.0
framework: AI Development Framework
language: en
status: Stable
audience:
  - Developers
  - AI coding agents
---

# Prompts Library

This folder contains operational prompts for the AI Development Framework.

## How to Use

Use one prompt per task. Do not paste every prompt into the agent at the same time.

For each task:

1. Choose the prompt that matches the task.
2. Replace the placeholder section with your real request.
3. Ask the agent to read the required ADF files listed in the prompt.
4. Let the agent explain the plan before coding.
5. Approve or adjust the plan.
6. Let the agent implement.
7. Validate with the required commands.

## Prompt Selection

| Task | Prompt |
|---|---|
| Build a project from scratch | `INITIAL-BUILD.md` |
| Add a new feature | `ADD-FEATURE.md` |
| Fix a bug | `BUG-FIX.md` |
| Refactor code | `REFACTOR.md` |
| Review code quality | `REVIEW-CODE.md` |
| Review UI/design | `REVIEW-DESIGN.md` |
| Review performance | `REVIEW-PERFORMANCE.md` |
| Review accessibility | `REVIEW-ACCESSIBILITY.md` |
| Prepare a release | `RELEASE.md` |
| Generate or update docs | `GENERATE-DOCUMENTATION.md` |

## Recommended Context Loading

For most tasks, ask the agent to read:

1. `AGENTS.md`
2. `.ai/PROJECT-SPEC.md`
3. `.ai/PROJECT-TYPE.md`
4. `.ai/ARCHITECTURE.md`
5. `.ai/IMPLEMENTATION-PLAN.md`
6. `.ai/DESIGN-SYSTEM.md`
7. `.ai/CODING-STANDARDS.md`
8. `.ai/PERFORMANCE.md`
9. `.ai/SEO.md`
10. `.ai/ACCESSIBILITY.md`
11. `.ai/TESTING.md`
12. `.ai/PROJECT-DECISIONS.md`

For small fixes, load only the files required by the chosen prompt.

## Rule

The prompt tells the agent what to do now. The `.ai` documents tell the agent how the project must behave and how quality is defined.
