# Feature Specification: Substrate Web Component Style Migration

**Feature Branch**: `001-substrate-wc-style-migration`  
**Created**: 2026-03-01  
**Status**: Draft  
**Input**: User description: "This should be a web component that extends `@substrate-system/web-component`. I want to convert this repository to my preferred web component style, as seen here: https://github.com/substrate-system/template-web-component -- that means build tools, typescript, example, and code style"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Use Swatch Picker as Substrate Web Component (Priority: P1)

As an app developer, I can import and register a custom element that extends
`@substrate-system/web-component`, render a swatch list from CSS color strings,
and receive the selected CSS color value.

**Why this priority**: This is the core migration goal and primary user value.

**Independent Test**: Instantiate the component with a swatch array, click and
keyboard-select swatches, and verify emitted selected color values.

**Acceptance Scenarios**:

1. **Given** a valid swatch array, **When** the component renders, **Then** each
   swatch appears in input order and one selection is represented.
2. **Given** keyboard focus in the component, **When** Arrow keys/Enter are used,
   **Then** the active swatch changes deterministically and emits the selected color.

---

### User Story 2 - Build and Publish with Preferred Tooling (Priority: P2)

As a maintainer, I can build TypeScript source, emit distributable artifacts and
types, and run tests/lint using the preferred Substrate-style toolchain.

**Why this priority**: Migration is incomplete without matching build and release
workflow.

**Independent Test**: Run build and verify ESM/minified outputs, CSS artifacts, and declaration files
are generated from TypeScript entry points.

**Acceptance Scenarios**:

1. **Given** a clean checkout, **When** maintainer runs build scripts, **Then**
   distributable files are generated without webpack-specific dependencies.

---

### User Story 3 - Run and Verify Example App (Priority: P3)

As a consumer, I can run an example app that demonstrates initialization,
attributes/properties, swatch selection, and emitted events in the migrated style.

**Why this priority**: Example quality validates developer experience and usage.

**Independent Test**: Start example dev server, interact with swatches, and
confirm documented behavior matches runtime behavior.

**Acceptance Scenarios**:

1. **Given** the example project, **When** the dev server runs, **Then** the
   component can be exercised with mouse and keyboard interactions.

### Edge Cases

- Empty swatch arrays render no selectable options and emit no selection event.
- Invalid CSS color strings are rejected with explicit developer-facing warnings.
- Duplicate swatch values remain selectable by index and preserve order.
- Changing swatch arrays at runtime preserves deterministic selection rules.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST expose a custom element that extends
  `@substrate-system/web-component`.
- **FR-002**: System MUST accept an ordered array of CSS color string values as
  the swatch input model.
- **FR-003**: System MUST emit selected CSS color string values in response to
  pointer and keyboard interactions.
- **FR-004**: System MUST provide visible focus state and semantic selection
  state for accessibility.
- **FR-005**: System MUST migrate build tooling and source to TypeScript using
  the preferred Substrate-style workflow.
- **FR-006**: System MUST include a runnable example aligned with the migrated
  API and code style.
- **FR-007**: System MUST include failing tests first for swatch rendering,
  selection behavior, accessibility semantics, and emitted values.

### Constitution Alignment *(mandatory)*

- Swatch-first scope: Feature remains a discrete swatch selector with no
  continuous slider controls.
- Input/output contract: Input is ordered CSS color string array; output is
  selected CSS color string value.
- Accessibility: Keyboard traversal, visible focus, semantic roles, and ARIA
  selected state are required.
- Determinism: Identical inputs produce identical render order and selected
  output behavior.
- Test-first: Failing tests are authored before implementation changes.

### Key Entities *(include if feature involves data)*

- **SwatchOption**: A CSS color value and stable index position rendered as an
  interactive swatch.
- **SelectionState**: Active/focused/selected swatch indices and selected CSS
  color value emitted to consumers.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of component behavior tests for pointer and keyboard
  selection pass in CI.
- **SC-002**: TypeScript build emits ESM/minified bundles and declaration files with
  no webpack build step.
- **SC-003**: Example app demonstrates documented API and passes manual
  interaction checklist for swatch selection and accessibility states.
- **SC-004**: No RGB/HSV/HSL slider UI is present in migrated component.
