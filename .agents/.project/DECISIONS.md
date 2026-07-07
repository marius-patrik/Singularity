# Decisions

## Architecture

- **Monorepo with npm workspaces.** Bun is the package manager and script runner. Shared code lives in `packages/shared` and is built before packages that depend on it.
- **Schema ownership in `packages/shared`.** Spec 19 schemas (`plugin.ts`, `envelope.ts`, `channel.ts`, etc.) are canonical. PR #57 duplicate schemas were removed/aliased to avoid conflicts.
- **Engine IPC is length-prefixed JSON.** Envelope types (`reply`, `event`) are unified in `packages/shared/src/schemas/envelope.ts`.
- **Backend owns project state and engine bridge.** `project-store.ts` is the single mutable source of truth for the current project.
- **Tauri desktop wraps the UI and engine sidecar.** Engine binary is copied from `engine/build/<preset>/singularity-engine` before Tauri build.

## Tooling

- **Biome** for lint and format; no ESLint/Prettier.
- **Rsbuild** for desktop UI bundling.
- **Tauri v2** for desktop shell.
- **JUCE 8.0.4** via CMake FetchContent.
- **Zod** for runtime schemas.

## Process

- **Integration branch:** `integration/fl-studio-rewrite` is the current merge target for feature work.
- **PRs required** for non-trivial changes to protected branches.
- **Root verification** (`typecheck`, `lint`, `format:check`, `test`, `build`) is run before claiming completion.
- **Engine integration test** intentionally does not assert exit code `0` because the JUCE engine shutdown path can hang in test environments; only the `shutdown` reply is verified.

## Open / Deferred

- Engine clean-exit behavior should be revisited once the engine lifecycle is fully implemented.
- Spec 23 backend API implementation is still a scaffold in PR #56.
