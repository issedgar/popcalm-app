---
document: RELEASE
version: 1.0.0
framework: AI Development Framework
language: en
status: Stable
audience:
  - AI coding agents
  - Developers
dependsOn:
  - AGENTS.md
  - .ai/TESTING.md
  - .ai/PERFORMANCE.md
  - .ai/SEO.md
  - .ai/ACCESSIBILITY.md
produces:
  - Release readiness report
  - Deployment checklist
---

# RELEASE

## Purpose

Use this prompt before deploying or publishing a project.

## Release Scope

Replace this section:

```text
Describe the release target: first production deploy, minor update, portfolio update, bug fix release, etc.
```

## Release Checks

Validate:

- Build success
- TypeScript correctness
- Main user flows
- Responsive layouts
- Accessibility basics
- SEO metadata
- Open Graph image existence
- sitemap and robots
- External links
- Image paths
- Environment variables if applicable
- No development-only logs
- No placeholder content unintentionally shipped

## Recommended Commands

Run the commands available for the project, commonly:

```bash
pnpm build
```

If available:

```bash
pnpm lint
pnpm test
```

## Output Format

Return:

1. Release readiness status: Ready / Not Ready.
2. Passed checks.
3. Blocking issues.
4. Non-blocking recommendations.
5. Deployment notes.
6. Rollback considerations when applicable.
