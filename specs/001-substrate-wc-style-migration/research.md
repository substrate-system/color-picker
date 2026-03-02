# Phase 0 Research: Substrate Web Component Style Migration

## Decision 1: Use TypeScript + esbuild for package builds

Rationale:
- Matches the Substrate ecosystem package style observed in
  `@substrate-system/web-component` scripts.
- Produces both ESM and CJS efficiently with minimal config overhead.
- Improves maintainability and refactor safety during migration.

Alternatives considered:
- Keep webpack: rejected due to mismatch with requested style and higher config cost.
- Use tsup/rollup: viable, but esbuild aligns more directly with existing Substrate package patterns.

## Decision 2: Use Vite for example development and preview

Rationale:
- Fast local feedback for interactive swatch behavior checks.
- Common fit for lightweight examples without coupling library output to app bundling.
- Aligns with Substrate package example workflow conventions.

Alternatives considered:
- Webpack dev server: rejected as part of the requested migration away from webpack style.
- Plain static HTML only: rejected because it weakens iteration speed for example verification.

## Decision 3: Extend `@substrate-system/web-component` as the base class

Rationale:
- Explicit user requirement.
- Provides baseline web component ergonomics and consistent internal patterns.
- Reduces boilerplate around custom element lifecycle and helpers.

Alternatives considered:
- Extend `HTMLElement` directly: rejected because it does not satisfy requested style.
- Use Lit or another framework: rejected as out-of-scope and unnecessary.

## Decision 4: Adopt TypeScript ESLint rules and standard formatting conventions

Rationale:
- Enforces consistent code style during broad migration.
- Reduces regressions from ad-hoc style changes.
- Keeps implementation closer to preferred template patterns.

Alternatives considered:
- Keep existing JS-only linting: rejected due to TypeScript migration goals.
- Add Prettier separately: deferred; not required for this phase if ESLint rules are sufficient.

## Decision 5: Use Node-based test runner stack with test-first sequencing

Rationale:
- Constitution requires failing tests before implementation.
- `@substrate-system/tapzero` + `tapout` fits lightweight package workflows.
- Supports behavior and accessibility assertions without heavy framework coupling.

Alternatives considered:
- Jest/Vitest migration: possible, but not required for style parity and adds setup complexity.
- No automated tests: rejected by constitution.

## Decision 6: Define a strict swatch-array contract for deterministic behavior

Rationale:
- Required by constitution and user expectations.
- Ordered array input with index-stable behavior avoids ambiguity with duplicates.
- Ensures consistent keyboard and pointer behavior across rerenders.

Alternatives considered:
- Map/object swatch model: rejected because ordering semantics are less explicit.
- Continuous color sliders: explicitly prohibited by constitution scope.

## Clarifications Resolved

- Build tools: `esbuild` for library builds; `vite` for example app.
- Language: TypeScript as primary source language.
- Base class: `@substrate-system/web-component` mandatory.
- Testing stack: `tapzero` + `tapout` with test-first sequencing.
- Contract model: ordered CSS color string array input; selected CSS color string output.
