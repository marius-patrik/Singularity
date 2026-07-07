# Status

## Current Focus

Adopting the Dark Factory managed-repository system in `integration/fl-studio-rewrite`. The worktree `/tmp/vsdaw-integration` is checked out at commit `1b5267a`. Next steps: copy `.agents/.global/` files from `dark-factory/managed-repository-setup`, create `.agents/.project/` project-specific files (`AGENTS.md`, `PROJECT.md`, `COMMANDS.md`, `STATUS.md`, `DECISIONS.md`), update root `AGENTS.md`, copy/adapt `.darkfactory/`, run full root verification, and commit directly to `integration/fl-studio-rewrite`.

## Environment

- **Repository:** `marius-patrik/singularity`
- **Working directory:** `/Users/user/Projects/vsdaw`
- **Active worktree:** `/tmp/vsdaw-integration` on `origin/integration/fl-studio-rewrite` (`1b5267a`)
- **Dark Factory source branch:** `origin/dark-factory/managed-repository-setup`
- **Tooling:** Bun 1.3.14, TypeScript 5.9.3, Biome 1.9.4, Rsbuild, Tauri v2, JUCE 8.0.4 via FetchContent, CMake presets
- **Package manager:** `bun@1.1.0`
- **Verification commands:** `bun run typecheck`, `bun run lint`, `bun run format:check`, `bun run test`, `bun run build`

## Completed Tasks

- **Spec 18 monorepo/build system skeleton** (PR #54) created, reviewed, fixed, and merged into `integration/fl-studio-rewrite`.
- **Desktop dev script fragility fixed:** pinned UI dev server to port `3000`, added `dev:desktop-ui`/`dev:desktop`/`build:desktop`, engine sidecar copied before Tauri build.
- **PR #53 merged** into `integration/fl-studio-rewrite` with full verification.
- **PR #52 merged** into `integration/fl-studio-rewrite` with full verification (required root `typecheck`/`test` pre-build fixes).
- **Batch B branches/PRs created:** `feat/20-juce-audio-engine-foundation` → PR #55 (scaffold, later closed), `feat/23-backend-api-server` → PR #56 (scaffold).
- **PR #57 (Spec 20 JUCE engine) merged** into `integration/fl-studio-rewrite` after resolving Spec 20 / Spec 19 schema conflicts.
- **Schema/API incompatibilities fixed** and committed as `1b5267a`.

## Active Issues

- **Dark Factory adoption in progress:** files not yet written/committed.
- **Engine clean-exit hang:** `engine/tests/integration/engine-ping.test.ts` now verifies the `engine.shutdown` reply without asserting exit code `0` (PR #57 engine shutdown path hangs).
- **PR #56 (Spec 23)** is open but only a scaffold; implementation pending.

## Code State

### `packages/shared/src/index.ts`

Reconciled exports; removed duplicate `engine.ts` re-export to avoid conflicting `EngineMessageSchema`/`parseEngineFrames`/`serializeEngineFrame`.

```ts
export * from "./constants.js";
export * from "./types.js";
export * from "./utils.js";
export * from "./theme.js";
export * from "./schemas/base.js";
export * from "./schemas/time.js";
export * from "./schemas/plugin.js";
export * from "./schemas/plugins.js";
export * from "./schemas/channel.js";
// ... other schemas; engine.ts is NOT re-exported
```

### `packages/shared/src/utils.ts`

`parseEngineFrames` now parses a union of canonical envelope schemas.

```ts
const EngineFrameSchema = z.union([EngineMessageSchema, ReplySchema, EventSchema]);
type EngineFrame = z.infer<typeof EngineFrameSchema>;

export function parseEngineFrames(buffer: Uint8Array): {
  messages: EngineFrame[];
  remainder: Uint8Array;
} {
  const messages: EngineFrame[] = [];
  // ... length-prefixed frame parsing, EngineFrameSchema.parse(parsed)
  return { messages, remainder: buffer.subarray(offset) };
}
```

### `packages/backend/src/engine-bridge.ts`

Routes replies/events from the unified `messages` array using `type`/`topic`.

```ts
for (const message of messages) {
  if (message.type === "pong" && heartbeatTimeout) { ... continue; }
  if (message.type === "reply" && "inReplyTo" in message) {
    // resolve inFlight
  }
  if (message.type === "event" && "topic" in message) {
    // notify eventHandlers
  }
}
```

### `packages/backend/src/project-store.ts`

`channel.create`/`channel.update` mutations aligned with Spec 19 `ChannelSchema`, supplying required defaults (`index`, `mute`, `solo`, `volume`, `pan`, `pitch`, `output`, `settings`).

### Root `package.json`

`test` now builds the engine before running engine integration tests.

```json
{
  "test": "bun run --filter @singularity/shared build && bun run --filter '*' test && bun run build:engine && bun test engine/tests/integration",
  "build:engine": "bun run scripts/build-engine.ts"
}
```

### `scripts/build-engine.ts`

Builds a CMake preset, finds the JUCE-produced binary under `_artefacts`, and copies it to `engine/build/<preset>/singularity-engine`.

## Important Context

- **Worktree pattern:** Isolated worktrees (`/tmp/vsdaw-feat18`, `/tmp/vsdaw-integration`) are used to avoid branch-switching interference from other agents/processes.
- **Integration branch:** `integration/fl-studio-rewrite` is the current integration target. `dev` and `main` exist but are not the active merge target right now.
- **Engine build path:** binaries land at `engine/build/<preset>/singularity-engine`; Tauri sidecars are copied from there.
- **Schema reconciliation:** PR #57 introduced a second schema set (`plugins.ts`, `engine.ts`) that conflicted with Spec 19 schemas (`plugin.ts`, `envelope.ts`). Resolution kept Spec 19 as canonical and removed/aliased duplicates.
- **Dark Factory required files:** `.agents/.global/AGENT_PROTOCOL.md`, `WORKFLOW.md`, `VALIDATION.md`, `DOCS_AND_MEMORY.md`, `VERSION`, `skills/status/SKILL.md`, `skills/status/scripts/print_status.mjs`; plus `.darkfactory/managed-repository.json`, `branching-policy.md`, `release-conventions.md`, `release-policy.json`, `labels.json`, `installer-policy.json`.
