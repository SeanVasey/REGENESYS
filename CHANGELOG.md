# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2026-03-12

### Added

- Full React 18 application with Vite 6 build system.
- 6 analysis modes: Single Image, Multi-Image Hybrid, Negative Prompt,
  Metadata Assembly, Style Transfer, Variation Engine.
- 10 platform targets: Universal, Midjourney, DALL-E, Stable Diffusion,
  Flux, Runway ML, Ideogram, Kling, Sora, Leonardo.
- 3 detail levels: Concise, Standard, Production.
- Neural mesh animated background canvas.
- Glassmorphism UI component system with VASEY/AI design tokens.
- Drag-and-drop image upload with multi-file support.
- Prompt history panel with recall and removal.
- Export generated prompts as `.txt` files.
- Copy-to-clipboard for all output sections.
- Variation controls with adjustable axes (color, mood, style, composition).
- Style transfer subject input for applying extracted styles to new subjects.
- Animated analysis progress indicator.
- App favicon (SVG) with REGENESYS scanning reticle design.
- Comprehensive test suite (41 tests) covering prompts, API, constants, and
  App component rendering.
- ESLint 9 flat config with React Hooks and Refresh plugins.
- GitHub Actions CI pipeline: lint, test, build on every PR and main push.
- `.env.example` with OpenAI API key configuration.
- VASEY/AI branding throughout header, footer, and favicon.

### Changed

- README updated with full feature list, tech stack, setup instructions,
  architecture diagram, and app icon.
- CI workflow expanded from baseline file checks to include lint, test,
  and build jobs.
- MANIFEST updated to reflect application source structure.

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
