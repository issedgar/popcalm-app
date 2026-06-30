---
document: ARCHITECTURE
framework: AI Development Framework
version: 1.0.0
language: en
status: Stable
audience:
  - AI Coding Agents
  - Developers
  - Technical Leads
scope: Reusable architecture guidance for AI-assisted projects
dependsOn:
  - AGENTS.md
  - .ai/PROJECT-SPEC.md
  - .ai/PROJECT-TYPE.md
related:
  - .ai/IMPLEMENTATION-PLAN.md
  - .ai/CODING-STANDARDS.md
  - .ai/PROJECT-DECISIONS.md
---

# ARCHITECTURE

## 1. Purpose

This document defines how an AI coding agent should reason about, propose, and implement architecture inside the **AI Development Framework (ADF)**.

It does not replace `.ai/PROJECT-SPEC.md`. The project specification defines **what must be built**. This document defines **how the solution should be technically structured**.

## 2. Architecture Principles

Every proposed architecture must prioritize, in this order:

1. Clarity.
2. Maintainability.
3. Simplicity.
4. Reasonable scalability.
5. Low coupling.
6. High cohesion.
7. Testability.
8. Performance appropriate to the project type.
9. Security by design.
10. Future evolution without overengineering.

If both a simple and a complex solution are valid, choose the simple solution unless the specification explicitly justifies the complexity.

## 3. Decision Rules

When multiple valid solutions exist, the agent must choose the one that is:

- Easier for another developer to understand.
- Easier to modify.
- Better aligned with the selected framework.
- Better aligned with the real project scope.
- Less dependent on unnecessary libraries.
- Easier to validate through build, tests, or static review.

The agent must not introduce advanced patterns just to make the solution look sophisticated.

## 4. Architecture by Project Type

### 4.1 Landing Page or Portfolio

Prioritize:

- Static rendering.
- SEO.
- Performance.
- Accessibility.
- Visual design.
- Easy-to-edit content.
- Minimal dependencies.

Avoid:

- Unnecessary global state.
- Unnecessary backend.
- Unnecessary authentication.
- Complex routing.
- Heavy UI libraries when simple components are enough.

### 4.2 Dashboard or Admin Panel

Prioritize:

- Modular architecture.
- Clear state management.
- Reusable components.
- Tables, filters, forms, and validations.
- Error handling.
- Security.
- Separation between UI, services, models, and domain logic.

Avoid:

- Giant components.
- Business logic inside views.
- Excessive global state.
- Coupling API responses directly to components.

### 4.3 API or Backend

Prioritize:

- Clear layers.
- Input validation.
- Consistent error handling.
- Security.
- Logging.
- Clear contracts.
- Separation between controllers, services, repositories, and DTOs.
- Unit and integration tests when appropriate.

Avoid:

- Business logic in controllers.
- Scattered queries without a pattern.
- Direct exposure of internal entities.
- Inconsistent responses.

### 4.4 Enterprise System

Prioritize:

- Module or domain-based architecture.
- Clear contracts.
- Traceability.
- Observability.
- Explicit error handling.
- Security.
- Incremental evolution.

Avoid:

- Microservices when a modular monolith solves the problem.
- Premature abstractions.
- Circular dependencies.
- Documentation disconnected from code.

## 5. Frontend Rules

### 5.1 Separation of Concerns

Clearly separate:

- Layout.
- Sections.
- UI components.
- Configuration.
- Content.
- Types.
- Utilities.
- Hooks or interactive logic.

A visual component should not contain complex business rules.

### 5.2 Components

Components should be:

- Small.
- Clearly named.
- Composable.
- Easy to test.
- Explicit in their props.
- Free of hidden dependencies.

Avoid components larger than 200 lines unless justified.

### 5.3 State

Use the least amount of state possible.

Prefer:

- Local state for simple interactions.
- URL state for navigable filters.
- Context only when several branches of the tree need it.
- Global state only when true cross-cutting shared state exists.

### 5.4 Data

Editable content should live outside components whenever possible:

- JSON.
- Markdown.
- Content Collections.
- Config files.
- Typed API responses.

Do not hardcode large repeated lists inside components.

## 6. Backend Rules

### 6.1 Recommended Layers

For APIs and backends, use clear separation:

- Controller / Route handler.
- Request DTO / Validation schema.
- Service / Use case.
- Repository / Data access.
- Domain model when appropriate.
- Response DTO.

### 6.2 Validation

All external input must be validated before reaching business logic.

Validate:

- Types.
- Length.
- Ranges.
- Formats.
- Required fields.
- Simple business rules.

### 6.3 Errors

Errors must be:

- Consistent.
- Safe.
- Understandable.
- Free of internal implementation details.

## 7. Astro Rules

When the project uses Astro:

- Prefer `.astro` components for static content.
- Use React islands only when real interaction exists.
- Avoid converting the entire page into React.
- Use `public/` for assets that need direct URL references.
- Use structured content for repeatable lists.
- Prioritize static builds.
- Keep client-side JavaScript minimal.

## 8. Angular Rules

When the project uses Angular:

- Prefer standalone components.
- Use signals when they improve clarity.
- Use services for shared logic.
- Keep templates clean.
- Avoid heavy logic inside templates.
- Use explicit interfaces or types.
- Keep routes and guards separated.
- Use RxJS when it adds real value.

## 9. React / Next.js Rules

When the project uses React or Next.js:

- Prefer Server Components when appropriate.
- Use Client Components only for interaction.
- Separate data components and visual components.
- Avoid unnecessary global state.
- Use metadata and routing idiomatically.
- Avoid `useEffect` for logic that can be solved on the server or at build time.

## 10. Java / Spring Boot Rules

When the project uses Java / Spring Boot:

- Keep controllers thin.
- Place business logic in services.
- Use DTOs for input and output.
- Avoid exposing JPA entities directly.
- Keep transactions in the service layer.
- Use repositories for data access.
- Avoid `@SpringBootTest` when a unit test is enough.
- Use clear names and small methods.

## 11. Folder Structure

The agent must propose the folder structure before writing code.

The structure must reflect:

- Framework.
- Project type.
- Expected size.
- Real need for modules.
- Separation between configuration, components, data, styles, and logic.

Do not create empty folders without an immediate or documented purpose.

## 12. Dependencies

Before adding a dependency, the agent must justify:

- What problem it solves.
- Why the framework or simple custom code is not enough.
- Impact on bundle, maintenance, and complexity.
- Alternatives considered and rejected.

Do not add dependencies for minor convenience.

## 13. Integration with Other ADF Documents

This document must be read together with:

- `AGENTS.md`: permanent agent behavior.
- `.ai/PROJECT-SPEC.md`: project-specific requirements.
- `.ai/PROJECT-TYPE.md`: project profile and level.
- `.ai/IMPLEMENTATION-PLAN.md`: implementation phases.
- `.ai/CODING-STANDARDS.md`: code rules.
- `.ai/PROJECT-DECISIONS.md`: decisions made and their reasoning.

## 14. Expected Output Before Coding

Before writing code, the agent must provide:

1. Proposed architecture summary.
2. Folder structure.
3. Main components, services, or modules.
4. Data and state flow.
5. Required dependencies.
6. Technical risks.
7. Final validations it will run.

## 15. Architecture Acceptance Criteria

The architecture is acceptable if:

- It matches the project type.
- It avoids overengineering.
- It allows future extension without a full rewrite.
- It separates responsibilities.
- It keeps dependencies controlled.
- It is easy to explain and review.
- It is compatible with the project validation commands.
