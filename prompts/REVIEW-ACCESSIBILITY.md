---
document: REVIEW-ACCESSIBILITY
version: 1.0.0
framework: AI Development Framework
language: en
status: Stable
audience:
  - AI coding agents
  - Developers
dependsOn:
  - .ai/ACCESSIBILITY.md
  - .ai/DESIGN-SYSTEM.md
produces:
  - Accessibility review report
  - Remediation plan
---

# REVIEW-ACCESSIBILITY

## Purpose

Use this prompt to review accessibility and inclusive usability.

## Review Scope

Replace this section:

```text
Describe what should be reviewed: full page, navigation, buttons, forms, cards, language switcher, etc.
```

## Review Areas

Review:

- Semantic HTML
- Heading hierarchy
- Keyboard navigation
- Focus visible states
- Link and button labels
- ARIA usage
- Alt text
- Color contrast
- Reduced motion
- Form labels and validation
- Screen reader clarity
- External link behavior

## Rules

- Prefer native HTML semantics over ARIA when possible.
- Do not hide focus indicators.
- Do not rely on hover only.
- Do not use icons without accessible labels.
- Keep fixes practical and production-ready.

## Output Format

Return:

1. Accessibility assessment.
2. Critical issues.
3. Important improvements.
4. Suggested code-level fixes.
5. Manual testing checklist.
