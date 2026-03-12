# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `CLAUDE.md` — AI-assisted development operating instructions.
- `.markdownlint-cli2.jsonc` — Markdown lint config to fix recurring CI
  failures caused by missing rule overrides.
- Repository baseline documentation, governance files, and CI validation
  workflow.

### Fixed

- CI workflow: scoped `pull_request` trigger to `main` branch only.
- CI workflow: added `CLAUDE.md` to required-files validation.
- CI workflow: use `::error::` annotation for clearer failure output.
- README: corrected incomplete repository structure diagram.
- MANIFEST: added entries for `CLAUDE.md` and `.markdownlint-cli2.jsonc`.
