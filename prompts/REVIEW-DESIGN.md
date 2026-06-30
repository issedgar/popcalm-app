---
document: REVIEW-DESIGN
version: 1.0.0
framework: AI Development Framework
language: en
status: Stable
audience:
  - AI coding agents
  - Developers
  - UI reviewers
dependsOn:
  - .ai/DESIGN-SYSTEM.md
  - .ai/ACCESSIBILITY.md
  - .ai/PROJECT-SPEC.md
produces:
  - UI/UX review report
  - Prioritized visual improvements
---

# REVIEW-DESIGN

## Purpose

Use this prompt to review the visual and interaction quality of the project.

## Review Scope

Replace this section:

```text
Describe what should be reviewed: entire UI, homepage, card design, hero section, mobile layout, etc.
```

## Review Areas

Review:

- Visual hierarchy
- Typography
- Spacing rhythm
- Alignment
- Color usage
- Contrast
- Component consistency
- Responsive behavior
- Empty/loading/error states
- Motion quality
- Accessibility
- Perceived professionalism
- Whether the UI looks generic or distinctive

## Rules

- Be direct and practical.
- Prioritize changes that produce the largest visual improvement.
- Avoid subjective redesign for its own sake.
- Do not recommend excessive animation, dark-only aesthetics, or visual noise.
- Preserve the project’s intended visual direction.

## Output Format

Return:

1. Overall design assessment.
2. What is working well.
3. Highest-impact improvements.
4. Mobile-specific issues.
5. Accessibility-related design issues.
6. Suggested implementation order.
