---
document: REVIEW-PERFORMANCE
version: 1.0.0
framework: AI Development Framework
language: en
status: Stable
audience:
  - AI coding agents
  - Developers
dependsOn:
  - .ai/PERFORMANCE.md
  - .ai/ARCHITECTURE.md
produces:
  - Performance review report
  - Optimization plan
---

# REVIEW-PERFORMANCE

## Purpose

Use this prompt to review and improve performance.

## Review Scope

Replace this section:

```text
Describe what should be reviewed: whole site, images, build output, page load, JavaScript bundle, etc.
```

## Review Areas

Review:

- Image size and format
- JavaScript shipped to the browser
- Unnecessary React islands
- Rendering strategy
- Bundle size
- Fonts
- Animations
- Third-party dependencies
- Lighthouse performance risks
- Network requests
- Caching opportunities

## Rules

- Prefer removing unnecessary work before adding complexity.
- Do not introduce premature optimization.
- Keep changes measurable and practical.
- Do not sacrifice accessibility or SEO for performance.

## Output Format

Return:

1. Performance assessment.
2. Main bottlenecks or risks.
3. Recommended fixes by priority.
4. Expected impact.
5. Validation commands or tools.
