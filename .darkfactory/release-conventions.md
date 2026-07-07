# Release Conventions

## Versioning

Use SemVer: `MAJOR.MINOR.PATCH`.

## Release Branches

- `release/v<major>.<minor>` — prepare a release.
- Tags are `v<version>`.

## Changelog

Maintain a `CHANGELOG.md` at the repository root. Entries follow Keep a Changelog format.

## Artifacts

- Desktop installer produced by Tauri.
- Engine binaries built via CMake and published alongside the desktop installer.
- Backend server packaged as a deployable Node.js bundle.

## Hotfixes

Open a `fix/` branch from the relevant release tag, then cherry-pick or merge back to the integration branch.
