---
document: GENERATE-DOCUMENTATION
version: 1.0.0
framework: AI Development Framework
language: en
status: Stable
audience:
  - AI coding agents
  - Developers
dependsOn:
  - AGENTS.md
  - README.md
  - .ai/PROJECT-SPEC.md
produces:
  - Updated README
  - Technical documentation
  - Usage instructions
---

# GENERATE-DOCUMENTATION

## Purpose

Use this prompt to create or update project documentation after implementation.

## Documentation Scope

Replace this section:

```text
Describe what documentation should be created or updated.
```

## Documentation Rules

- Keep documentation accurate and current.
- Do not document features that do not exist.
- Do not exaggerate capabilities.
- Prefer clear instructions over marketing language.
- Include commands that actually exist in `package.json` or the project build system.
- Explain where configuration and content files live.
- Include how to add or modify project content.

## Recommended Sections

Use only the sections that apply:

1. Project overview.
2. Tech stack.
3. Folder structure.
4. Setup instructions.
5. Development commands.
6. Build commands.
7. Deployment notes.
8. Content editing guide.
9. Environment variables.
10. Screenshots or image workflow.
11. Troubleshooting.
12. Maintenance notes.

## Final Response

Report:

1. Documentation created or updated.
2. Files modified.
3. Any assumptions made.
4. Any sections that still require user-provided data.
