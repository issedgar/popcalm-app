---
document: REVIEW-CODE
version: 1.0.0
framework: AI Development Framework
language: en
status: Stable
audience:
  - AI coding agents
  - Developers
dependsOn:
  - AGENTS.md
  - .ai/CODING-STANDARDS.md
  - .ai/ARCHITECTURE.md
  - .ai/TESTING.md
produces:
  - Code review report
  - Prioritized improvement list
---

# REVIEW-CODE

## Purpose

Use this prompt to review code quality without necessarily changing files.

## Review Scope

Replace this section:

```text
Describe what should be reviewed: whole project, specific files, recent changes, component, service, API, etc.
```

## Review Areas

Review:

- Correctness
- Architecture alignment
- Type safety
- Maintainability
- Naming
- Duplication
- Complexity
- Error handling
- Accessibility impact for UI code
- Performance impact
- Security concerns when applicable
- Testing gaps

## Rules

- Do not nitpick low-value style preferences.
- Prioritize issues by impact.
- Separate must-fix issues from nice-to-have improvements.
- Do not propose large rewrites unless clearly justified.
- Provide concrete examples and file references when possible.

## Output Format

Return:

1. Overall assessment.
2. Critical issues.
3. Important improvements.
4. Optional improvements.
5. Testing or validation gaps.
6. Suggested next action.

Use this severity scale:

- `Critical`: breaks functionality, build, security, or data correctness.
- `High`: likely to cause bugs or maintenance problems.
- `Medium`: meaningful improvement.
- `Low`: polish or optional cleanup.
