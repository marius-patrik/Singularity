# Branching Policy

## Default Workflow

- `main` — production-ready releases.
- `integration/fl-studio-rewrite` — active integration branch for the FL Studio rewrite.
- `feat/<spec>-short-title` — feature branches off the integration branch.
- `fix/<issue>-short-title` — fix branches off the integration branch or `main` as appropriate.

## Integration Target

Feature work currently targets `integration/fl-studio-rewrite`. Do not target `main` or `dev` unless explicitly requested.

## Merge Style

- Use merge commits for merging PRs into `integration/fl-studio-rewrite` unless the project later standardizes on rebase-merge.
- Keep feature branches focused on a single spec or fix.

## Naming

- Lowercase with hyphens.
- Prefix with `feat/`, `fix/`, `chore/`, `docs/`, or `refactor/`.

## Validation Before Merge

All root validation commands must pass locally:

```powershell
bun run typecheck
bun run lint
bun run format:check
bun run test
bun run build
```

Report the results in the PR and final handoff.
