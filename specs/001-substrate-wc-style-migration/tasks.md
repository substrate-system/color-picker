# Tasks: Substrate Web Component Style Migration

**Input**: Design documents from `/specs/001-substrate-wc-style-migration/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Test tasks are REQUIRED. Write failing tests before implementation for behavior,
accessibility semantics, and emitted color values.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Library source: `src/`
- Tests: `test/`
- Example app: `example/`
- Specs: `specs/001-substrate-wc-style-migration/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and baseline TypeScript/Substrate tooling.

- [X] T001 Update npm scripts and package metadata for TypeScript/esbuild/vite workflow in /Users/nick/code/picker-wc/package.json
- [X] T002 Add TypeScript compiler configuration for source and declaration output in /Users/nick/code/picker-wc/tsconfig.json
- [X] T003 [P] Add build-specific compiler options for distribution output in /Users/nick/code/picker-wc/tsconfig.build.json
- [X] T004 [P] Add ESLint configuration for TypeScript code style in /Users/nick/code/picker-wc/eslint.config.js
- [X] T005 [P] Add example app entry page scaffold for Vite in /Users/nick/code/picker-wc/example/index.html
- [X] T006 Add root source entrypoint that exports component modules in /Users/nick/code/picker-wc/src/index.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared infrastructure required before implementing user stories.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [X] T007 Add color validation/parser helper utilities in /Users/nick/code/picker-wc/src/internal/color.ts
- [X] T008 [P] Add deterministic selection state helpers in /Users/nick/code/picker-wc/src/internal/selection.ts
- [X] T009 [P] Add base component stylesheet for swatch/focus states in /Users/nick/code/picker-wc/src/styles/picker-wc.css
- [X] T010 Add component registration and export wiring in /Users/nick/code/picker-wc/src/index.ts
- [X] T011 Add test harness bootstrap for component tests in /Users/nick/code/picker-wc/test/setup.ts

**Checkpoint**: Foundation ready; user story implementation can now begin.

---

## Phase 3: User Story 1 - Use Swatch Picker as Substrate Web Component (Priority: P1) 🎯 MVP

**Goal**: Deliver the swatch picker web component extending `@substrate-system/web-component` with deterministic selection behavior.

**Independent Test**: Instantiate component with a swatch array, perform click + keyboard selection, and verify deterministic `change` events with selected CSS color values.

### Tests for User Story 1 (REQUIRED) ⚠️

> **NOTE**: Write these tests FIRST, ensure they FAIL before implementation.

- [X] T012 [P] [US1] Add failing render-order and default-selection test in /Users/nick/code/picker-wc/test/picker-wc.test.ts
- [X] T013 [P] [US1] Add failing change-event detail contract test in /Users/nick/code/picker-wc/test/picker-wc.test.ts
- [X] T014 [P] [US1] Add failing keyboard navigation and ARIA semantics test in /Users/nick/code/picker-wc/test/a11y.test.ts

### Implementation for User Story 1

- [X] T015 [US1] Implement `PickerWC` class extending `@substrate-system/web-component` in /Users/nick/code/picker-wc/src/picker-wc.ts
- [X] T016 [US1] Implement swatch array property/attribute handling and deterministic rendering in /Users/nick/code/picker-wc/src/picker-wc.ts
- [X] T017 [US1] Implement pointer and keyboard selection transitions using selection helpers in /Users/nick/code/picker-wc/src/picker-wc.ts
- [X] T018 [US1] Implement `change` event emission with `{ value, index, source }` detail in /Users/nick/code/picker-wc/src/picker-wc.ts
- [X] T019 [US1] Implement accessibility roles, `aria-checked`, and visible focus class updates in /Users/nick/code/picker-wc/src/picker-wc.ts
- [X] T020 [US1] Wire component stylesheet import and host styling application in /Users/nick/code/picker-wc/src/picker-wc.ts

**Checkpoint**: User Story 1 is fully functional and testable independently.

---

## Phase 4: User Story 2 - Build and Publish with Preferred Tooling (Priority: P2)

**Goal**: Replace legacy build pipeline with Substrate-style TypeScript + esbuild outputs (ESM/CJS/types) and maintain lint/test workflows.

**Independent Test**: Run build and verify generated `dist/*.js`, `dist/*.cjs`, and `dist/*.d.ts` artifacts from TypeScript sources without webpack.

### Tests for User Story 2 (REQUIRED) ⚠️

- [X] T021 [P] [US2] Add failing build artifact verification test/fixture in /Users/nick/code/picker-wc/test/build-artifacts.test.ts
- [X] T022 [P] [US2] Add failing package exports/types smoke test in /Users/nick/code/picker-wc/test/exports.test.ts

### Implementation for User Story 2

- [X] T023 [US2] Replace webpack build scripts with esbuild + tsc scripts in /Users/nick/code/picker-wc/package.json
- [X] T024 [US2] Add/replace build orchestration script for CJS/ESM/min outputs in /Users/nick/code/picker-wc/scripts/build.js
- [X] T025 [US2] Remove obsolete webpack configuration and references in /Users/nick/code/picker-wc/webpack.config.js
- [X] T026 [US2] Update package entry fields and exports map for TS-built outputs in /Users/nick/code/picker-wc/package.json
- [X] T027 [US2] Add declaration generation path alignment for distributed types in /Users/nick/code/picker-wc/tsconfig.build.json
- [X] T028 [US2] Update lint command to target TypeScript source and tests in /Users/nick/code/picker-wc/package.json

**Checkpoint**: User Story 2 build/publish workflow works independently.

---

## Phase 5: User Story 3 - Run and Verify Example App (Priority: P3)

**Goal**: Provide a runnable Vite example showing component registration, swatch configuration, and interactive selection.

**Independent Test**: Start example dev server and verify click/keyboard swatch interaction and event logging.

### Tests for User Story 3 (REQUIRED) ⚠️

- [X] T029 [P] [US3] Add failing example integration smoke test for component mount in /Users/nick/code/picker-wc/test/example-smoke.test.ts
- [X] T030 [P] [US3] Add failing interaction parity test for example behavior in /Users/nick/code/picker-wc/test/example-interaction.test.ts

### Implementation for User Story 3

- [X] T031 [US3] Implement example app bootstrap and component registration in /Users/nick/code/picker-wc/example/main.ts
- [X] T032 [US3] Implement example UI layout and swatch host markup in /Users/nick/code/picker-wc/example/index.html
- [X] T033 [US3] Implement example styles for layout/readability and focus visualization in /Users/nick/code/picker-wc/example/style.css
- [X] T034 [US3] Add example dev/build scripts and Vite config wiring in /Users/nick/code/picker-wc/package.json
- [X] T035 [US3] Update quick usage docs for new example workflow in /Users/nick/code/picker-wc/README.md

**Checkpoint**: User Story 3 example experience is independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final quality checks and documentation alignment across stories.

- [X] T036 [P] Update migration notes and API contract cross-links in /Users/nick/code/picker-wc/specs/001-substrate-wc-style-migration/contracts/web-component-api.md
- [X] T037 [P] Update quickstart commands to match finalized scripts in /Users/nick/code/picker-wc/specs/001-substrate-wc-style-migration/quickstart.md
- [X] T038 Run full lint/test/build verification and capture output notes in /Users/nick/code/picker-wc/specs/001-substrate-wc-style-migration/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion; blocks all user stories.
- **User Stories (Phases 3-5)**: Depend on Foundational completion.
- **Polish (Phase 6)**: Depends on completion of desired user stories.

### User Story Dependencies

- **US1 (P1)**: Starts after Phase 2; no dependency on US2/US3.
- **US2 (P2)**: Starts after Phase 2; may reuse US1 source entrypoints but is independently testable.
- **US3 (P3)**: Starts after Phase 2; depends on exported component API and can be validated independently.

### Dependency Graph

- Foundation -> US1 -> MVP candidate
- Foundation -> US2
- Foundation -> US3
- US1 + US2 + US3 -> Polish

### Within Each User Story

- Tests MUST be written and FAIL before implementation.
- Core model/state changes before component wiring.
- Component behavior before docs/examples finalization.
- Story must pass its independent test before moving to next priority.

---

## Parallel Execution Examples

### User Story 1

```bash
# Parallel test authoring
Task: "T012 [US1] Add failing render-order and default-selection test in /Users/nick/code/picker-wc/test/picker-wc.test.ts"
Task: "T014 [US1] Add failing keyboard navigation and ARIA semantics test in /Users/nick/code/picker-wc/test/a11y.test.ts"

# Parallel helper implementation
Task: "T007 Add color validation/parser helper utilities in /Users/nick/code/picker-wc/src/internal/color.ts"
Task: "T008 Add deterministic selection state helpers in /Users/nick/code/picker-wc/src/internal/selection.ts"
```

### User Story 2

```bash
# Parallel build/test guardrails
Task: "T021 [US2] Add failing build artifact verification test/fixture in /Users/nick/code/picker-wc/test/build-artifacts.test.ts"
Task: "T022 [US2] Add failing package exports/types smoke test in /Users/nick/code/picker-wc/test/exports.test.ts"

# Parallel config updates
Task: "T027 [US2] Add declaration generation path alignment for distributed types in /Users/nick/code/picker-wc/tsconfig.build.json"
Task: "T028 [US2] Update lint command to target TypeScript source and tests in /Users/nick/code/picker-wc/package.json"
```

### User Story 3

```bash
# Parallel example scaffolding
Task: "T031 [US3] Implement example app bootstrap and component registration in /Users/nick/code/picker-wc/example/main.ts"
Task: "T033 [US3] Implement example styles for layout/readability and focus visualization in /Users/nick/code/picker-wc/example/style.css"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 and Phase 2.
2. Complete Phase 3 (US1).
3. Validate US1 independent test criteria.
4. Demo/release MVP if acceptable.

### Incremental Delivery

1. Setup + Foundational.
2. Deliver US1 (core component behavior).
3. Deliver US2 (toolchain/publish workflow).
4. Deliver US3 (example app workflow).
5. Finish with Phase 6 polish.

### Parallel Team Strategy

1. Team completes Phase 1-2 together.
2. After foundation:
   - Engineer A: US1
   - Engineer B: US2
   - Engineer C: US3
3. Merge stories once each independent test passes.

---

## Notes

- All tasks use strict checklist format with IDs, labels, and file paths.
- `[P]` tasks are safe to run concurrently when they touch different files.
- User story tasks are independently testable by design.
