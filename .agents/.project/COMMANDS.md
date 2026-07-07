# Commands

## Setup

```powershell
bun install
```

## Validation (run in order)

```powershell
bun run typecheck
bun run lint
bun run format:check
bun run test
bun run build
```

## Engine

```powershell
bun run build:engine
```

Builds the JUCE engine to `engine/build/<preset>/singularity-engine`.

## Desktop

```powershell
bun run dev:desktop-ui  # start UI dev server on port 3000
bun run dev:desktop     # run Tauri in dev mode
bun run build:desktop   # build Tauri with engine sidecar
```

## Format/Lint Fix

```powershell
bun run format
bun run lint:fix
```

## Test Details

- `bun run test` builds shared, runs package tests, builds the engine, then runs `bun test engine/tests/integration`.
- The engine integration test intentionally verifies the `engine.shutdown` reply without asserting exit code `0` because the engine shutdown path can hang in test environments.
