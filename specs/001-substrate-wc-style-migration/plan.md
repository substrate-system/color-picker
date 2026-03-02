# Implementation Plan: Substrate Web Component Style Migration

**Branch**: `001-substrate-wc-style-migration` | **Date**: 2026-03-01 | **Spec**: [/Users/nick/code/color-picker/specs/001-substrate-wc-style-migration/spec.md](/Users/nick/code/color-picker/specs/001-substrate-wc-style-migration/spec.md)
**Input**: Feature specification from `/specs/001-substrate-wc-style-migration/spec.md`

## Summary

Convert this repository from legacy webpack + JavaScript structure to a
TypeScript-based web component package that extends
`@substrate-system/web-component`, while preserving the constitution's
swatch-first color selection behavior and adding a maintained example workflow.

## Technical Context

**Language/Version**: TypeScript 5.9.x + Node.js 20+  
**Primary Dependencies**: `@substrate-system/web-component`, `esbuild`, `vite`, `@typescript-eslint/*`, `@substrate-system/tapzero`/`tapout`  
**Storage**: N/A (in-memory component state only)  
**Testing**: Node-based component tests using `@substrate-system/tapzero` + `tapout`; lint with ESLint TypeScript rules  
**Target Platform**: Modern browsers with Custom Elements support (Chrome/Edge/Firefox/Safari current stable)  
**Project Type**: Web component library + example app  
**Performance Goals**: Initial swatch render under 50ms for up to 64 swatches on reference laptop; keyboard navigation updates within one frame  
**Constraints**: Preserve swatch-only UX, deterministic output, and backward-safe CSS color string contract; no slider controls  
**Scale/Scope**: One primary component migration, build/test pipeline replacement, and one example app refresh

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Pre-research gate review:
- [x] Swatch-first scope is preserved; no RGB/HSV/HSL/opacity slider controls are added.
- [x] Data contract uses an ordered array of CSS color strings as input and emits selected CSS color strings.
- [x] Accessibility is specified: keyboard traversal, visible focus, semantic roles, and ARIA state.
- [x] Deterministic behavior is documented for render order and selected output given the same inputs.
- [x] Test-first delivery is planned: failing tests exist for behavior, emitted values, and accessibility semantics.
- [x] Any exception is linked to an approved constitution amendment.

Gate status: PASS

## Project Structure

### Documentation (this feature)

```text
specs/001-substrate-wc-style-migration/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── web-component-api.md
└── spec.md
```

### Source Code (repository root)

```text
src/
├── index.ts
├── picker-wc.ts
├── styles/
│   └── picker-wc.css
└── internal/
    ├── color.ts
    └── selection.ts

test/
├── picker-wc.test.ts
└── a11y.test.ts

example/
├── index.html
├── main.ts
└── style.css

scripts/
└── (build helpers if still needed)
```

**Structure Decision**: Single-package TypeScript library with dedicated `example/`
app and Node test directory. Keep source small and web-component-centric.

## Phase 0: Research Plan

Research tasks derived from technical context unknowns and choices:

1. Research best-practice migration from webpack JS library to TypeScript + esbuild.
2. Research recommended extension patterns for `@substrate-system/web-component`.
3. Research preferred test stack patterns from Substrate-style component repos.
4. Research example app conventions using Vite for local interactive validation.
5. Research API surface design for deterministic swatch selection contracts.

Output artifact: `research.md` with decisions, rationale, alternatives.

## Phase 1: Design & Contracts Plan

1. Model entities and state transitions for swatch options and selection behavior in
   `data-model.md`.
2. Define public component contract (attributes, properties, events, methods,
   accessibility semantics) in `contracts/web-component-api.md`.
3. Author `quickstart.md` for install, dev, build, test, and example execution.
4. Update agent context via
   `/Users/nick/code/color-picker/.specify/scripts/bash/update-agent-context.sh codex`.
5. Re-check constitution gate after design artifacts are complete.

Post-design gate review:
- [x] Swatch-first scope confirmed in contract and data model.
- [x] CSS color array in / selected color out confirmed in contract.
- [x] Accessibility semantics and keyboard behavior explicitly specified.
- [x] Deterministic behavior and index-based tie-handling documented.
- [x] Test-first sequencing captured in quickstart and plan.
- [x] No constitutional exceptions introduced.

Gate status: PASS

## Complexity Tracking

No constitutional violations require justification.
