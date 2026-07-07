# Agent Instructions

This repository uses the Dark Factory managed-repository system.

## Quick Start

1. Read `.agents/.global/AGENT_PROTOCOL.md` for general behavior.
2. Read `.agents/.project/PROJECT.md` for project orientation.
3. Read `.agents/.project/STATUS.md` for current state.
4. Read `.agents/.project/COMMANDS.md` for validation commands.
5. Read `.agents/.project/DECISIONS.md` for durable project decisions.

## Project

Singularity — TypeScript-first DAW rewrite with JUCE audio engine, React/Tauri desktop, and Node.js backend.

## Current Integration Target

`integration/fl-studio-rewrite`

## Validation

Before claiming completion on a code change, run:

```powershell
bun run typecheck
bun run lint
bun run format:check
bun run test
bun run build
```

Report commands, pass/fail status, skipped checks, and residual risk.

## Status Skill

To print the current project status, run:

```powershell
node .agents/.global/skills/status/scripts/print_status.mjs
```
