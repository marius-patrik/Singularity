# Singularity Agent Notes

## Project

A TypeScript-first DAW rewrite with a real-time JUCE audio engine, React/Tauri desktop UI, and a Node.js backend API server. This branch is the active integration line for the FL Studio rewrite.

## Default Tooling

- Package manager: `bun`
- Node runtime for scripts: Node.js/Bun compatible
- Monorepo: npm workspaces managed via `bun` scripts in root `package.json`
- TypeScript: strict, `moduleResolution: "bundler"`
- Lint/format: Biome
- Bundler: Rsbuild
- Desktop: Tauri v2
- Engine: JUCE 8.0.4 + CMake

## Project Commands

See `.agents/.project/COMMANDS.md` for exact commands.

Quick reference:

- `bun install`
- `bun run typecheck`
- `bun run lint`
- `bun run format:check`
- `bun run test`
- `bun run build`
- `bun run build:engine`

## Status

See `.agents/.project/STATUS.md` for current focus, completed work, active issues, and code state.

## Decisions

See `.agents/.project/DECISIONS.md` for durable project decisions.
