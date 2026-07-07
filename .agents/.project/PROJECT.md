# Singularity

A TypeScript-first DAW rewrite with a real-time JUCE audio engine, React/Tauri desktop UI, and a Node.js backend API server.

## Purpose

Replace the legacy Singularity codebase with a modern, modular DAW designed for extensible plugin hosting, real-time audio processing, and an integrated desktop + web-compatible workflow.

## High-Level Architecture

```
┌─────────────────────────────────────────┐
│             Desktop UI                  │
│        React + Rsbuild + Tauri v2       │
└──────────────────────┬──────────────────┘
                       │ HTTP + WS
┌──────────────────────▼──────────────────┐
│            Backend API Server           │
│            Node.js / TypeScript         │
│     project state, engine bridge,       │
│     plugin registry, REST/WebSocket     │
└──────────────────────┬──────────────────┘
                       │ length-prefixed IPC
┌──────────────────────▼──────────────────┐
│           Audio Engine                  │
│         JUCE 8.0.4 + CMake              │
│   real-time audio, plugin hosting,      │
│   timeline/transport control            │
└─────────────────────────────────────────┘
```

## Key Packages

- `packages/shared` — schemas, types, constants, theme, utilities used by all TS packages.
- `packages/backend` — API server, project store, engine bridge, plugin registry.
- `packages/desktop-ui` — React UI for the desktop app.
- `packages/desktop` — Tauri shell and native glue.
- `engine/` — JUCE/CMake audio engine.

## Technology Stack

- TypeScript 5.9.3
- Bun runtime + package manager
- Biome lint/format
- Rsbuild bundler
- Tauri v2
- JUCE 8.0.4 via CMake FetchContent
- Zod for schemas
- React

## Entry Points

- Backend: `packages/backend/src/index.ts`
- Desktop UI dev: `bun run dev:desktop-ui`
- Desktop build: `bun run build:desktop`
- Engine build: `bun run build:engine`

## Important Files

- `package.json` — workspace scripts and dependencies
- `tsconfig.json` / `tsconfig.base.json` — TypeScript configuration
- `biome.json` — lint and format rules
- `packages/shared/src/index.ts` — shared exports
- `packages/backend/src/engine-bridge.ts` — engine IPC bridge
- `packages/backend/src/project-store.ts` — mutable project state
- `engine/CMakeLists.txt` — engine build
