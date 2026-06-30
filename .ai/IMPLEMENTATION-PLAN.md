---
document: IMPLEMENTATION-PLAN
framework: AI Development Framework
version: 1.0.0
language: en
status: Stable
audience:
  - AI Coding Agents
  - Developers
scope: Phase-based implementation process for AI-assisted development
dependsOn:
  - AGENTS.md
  - .ai/PROJECT-SPEC.md
  - .ai/ARCHITECTURE.md
  - .ai/PROJECT-TYPE.md
related:
  - prompts/INITIAL-BUILD.md
  - .ai/PROJECT-DECISIONS.md
---

# IMPLEMENTATION-PLAN

## 1. Purpose

This document defines the phase-based implementation process that the AI coding agent must follow.

The goal is to prevent the agent from generating everything at once without analysis, validation, architecture, or final review.

## 2. Main Rule

The agent must work in phases.

It must not start a new phase until the previous one is complete, validated, and summarized.

## 3. Standard Phases

### Phase 0 — Context Reading

Before writing code, the agent must read:

1. `AGENTS.md`
2. `.ai/PROJECT-SPEC.md`
3. `.ai/PROJECT-TYPE.md`
4. `.ai/ARCHITECTURE.md`
5. `.ai/DESIGN-SYSTEM.md`, if it exists and applies
6. `.ai/CODING-STANDARDS.md`
7. `.ai/PROJECT-DECISIONS.md`, if it exists
8. The active prompt inside `prompts/`

Expected output:

- Goal summary.
- Detected constraints.
- Initial risks.
- Files it plans to create or modify.

### Phase 1 — Proposed Architecture

The agent must explain:

- Folder structure.
- Main components or modules.
- Data flow.
- Required state.
- Required dependencies.
- Rendering strategy.
- Validation strategy.

It must not write code before completing this phase.

### Phase 2 — Technical Foundation

Create or adjust:

- Base configuration.
- Aliases.
- Initial folder structure.
- Main types.
- Configuration files.
- Required integrations.

Validate that the project still runs.

### Phase 3 — Data Model and Content

Implement:

- JSON, Markdown, Content Collections, or base models.
- TypeScript types or DTOs.
- Basic validations.
- Centralized configuration.

Do not duplicate content inside components.

### Phase 4 — Layout and Visual Structure

Implement:

- Main layout.
- Header.
- Footer.
- Base containers.
- Main sections.
- Semantic structure.

Validate basic responsiveness before moving forward.

### Phase 5 — Main Components

Implement the core project components.

For frontend:

- Cards.
- Grids.
- Buttons.
- Badges.
- Selectors.
- Forms when applicable.

For backend:

- Controllers.
- Services.
- Repositories.
- DTOs.
- Validators.

Each component must have a clear responsibility.

### Phase 6 — Interactivity

Add interaction only where necessary.

Examples:

- Language selector.
- Filters.
- Forms.
- Menus.
- Animations.
- Loading states.

Do not convert static parts into interactive components without a reason.

### Phase 7 — Visual Polish

Apply:

- Visual hierarchy.
- Consistent spacing.
- Typography.
- Colors.
- Shadows.
- Borders.
- Hover/focus states.
- Microinteractions.

The result must not feel generic or unfinished.

### Phase 8 — Accessibility

Review:

- Semantics.
- Headings.
- Labels.
- `aria-label`.
- Contrast.
- Keyboard navigation.
- Visible focus.
- Reduced motion.

Fix issues before moving forward.

### Phase 9 — SEO and Metadata

Implement or validate:

- Title.
- Description.
- Canonical.
- Open Graph.
- Twitter Card.
- JSON-LD.
- Sitemap.
- Robots.
- `html lang`.
- Alt text.

### Phase 10 — Performance

Review:

- Bundle.
- Images.
- Client scripts.
- Dependencies.
- Animations.
- Rendering.
- Lazy loading when applicable.

### Phase 11 — Technical Validation

Run project commands, for example:

- Install.
- Development server.
- Build.
- Lint.
- Tests.
- Type check.

The agent must report commands executed and results.

### Phase 12 — Final Review

Before finishing, the agent must review:

- Duplicated code.
- Oversized components.
- Inconsistent styles.
- Missing requirements.
- Accessibility.
- SEO.
- Performance.
- Responsiveness.
- Broken links.
- Unnecessary files.

It must fix the issues found before declaring the task complete.

## 4. Interruption Rules

The agent must stop and ask for a decision only if:

- Two paths have significant impact and neither is clearly better.
- Critical information is missing and cannot be solved with placeholders.
- A credential, private URL, or business decision is required.

If the uncertainty is minor, the agent must make the best reasonable decision and document it.

## 5. Phase Completion Report

After each phase, the agent must report:

- What it did.
- What files it created or modified.
- What decisions it made.
- What it validated.
- What comes next.

## 6. Integration with PROJECT-DECISIONS

Every important decision must be recorded in `.ai/PROJECT-DECISIONS.md`.

Examples:

- Framework choice.
- Library choice.
- Architecture change.
- Omitted feature.
- Placeholder usage.
- Data strategy change.

## 7. Success Criteria

The implementation is complete if:

- All applicable phases were executed.
- There are no build errors.
- Main requirements are implemented.
- Architecture matches the specification.
- The result is maintainable.
- The agent documented how to continue or extend the project.
