# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.3.0] - 2026-07-12

### Added

- Prompt history now persists across sessions via `localStorage` (capped at
  20 entries; falls back to dropping thumbnails if the storage quota is
  exceeded, and to in-memory history if storage is unavailable).
- Paste-to-upload: images on the clipboard can be pasted anywhere on the
  page (Ctrl/Cmd+V) and are added to the upload queue.
- Upload validation now enforces the advertised 20MB per-file limit and
  surfaces skipped files (wrong type or oversized) in a dismissible notice
  instead of silently ignoring them.
- History entries show a relative timestamp ("5m ago", "3h ago").
- `prefers-reduced-motion` support: UI animations and transitions are
  disabled, results scrolling is instant, and the neural mesh background
  renders as a single static frame instead of animating.
- Visible keyboard focus ring (`:focus-visible`) on all interactive
  elements.
- 21 new tests covering upload validation, history persistence, relative
  time formatting, paste-to-upload, and the upload notice (65 total).
- `CLAUDE.md` — AI-assisted development operating instructions.
- `.markdownlint-cli2.jsonc` — Markdown lint config to fix recurring CI
  failures caused by missing rule overrides.
- Repository baseline documentation, governance files, and CI validation
  workflow.

### Changed

- The version shown in the header badge and footer is now injected from
  `package.json` at build time (`__APP_VERSION__`) instead of being
  hardcoded (it previously still displayed v1.2 after the 1.2.1 release).
- **CLAUDE.md** — Rewritten with expanded security standards (auth, input
  validation, supply chain, production hardening), detailed CI/CD deployment
  guidance (Vercel, GitHub Pages, pre-deploy gates), and streamlined README
  spec with hero imagery and badge row requirements.
- **README.md** — Centered header with large app icon, full shields.io badge
  row (CI, version, license, Node, React, Vite, tests), hero preview image,
  PWA assets documented in repo structure, contributing section added.
- Updated OpenAI request token parameter handling to be model-aware (`max_completion_tokens` for GPT-5, `max_tokens` fallback for non-GPT-5) to prevent runtime failures in image analysis.
- Added complete Open Graph and Twitter card metadata in `index.html` for Vercel/social link previews, including canonical URL, title, description, and share image tags.

### Fixed

- Copy-button success timer is cleared on unmount, and repeated copies no
  longer stack timeouts.
- Patched dev-dependency advisories reported by `npm audit` (`@babel/core`,
  `form-data`, `js-yaml`); 0 vulnerabilities remaining.
- Top safe-area scrim: a single fixed, pointer-transparent layer sized to
  `env(safe-area-inset-top)` now masks page content scrolling under the iOS
  status bar / Dynamic Island. It is filled with the app background token
  (`T.bg`) plus the same viewport-fixed ambient radial glow as the page, so
  the region is an exact visual match of the active background with no seam
  or tonal band. Height resolves to 0 on devices without a top inset; layout
  and existing header inset padding are unchanged.
- Document (`html`/`body`) now paints the app background (`#090A0F`, tokens.js
  `T.bg`) via a head style in `index.html`, so the iOS status-bar/notch and
  home-indicator safe areas match the app from first paint — before React
  mounts and on cold PWA launches — instead of flashing browser-default white.
- App shell now sizes with `min-height: 100dvh` (with `100vh` fallback) so the
  background tracks the iOS Safari dynamic toolbar, with a regression test
  covering the rule.
- CI workflow: scoped `pull_request` trigger to `main` branch only.
- CI workflow: added `CLAUDE.md` to required-files validation.
- CI workflow: use `::error::` annotation for clearer failure output.
- README: corrected incomplete repository structure diagram.
- MANIFEST: added entries for `CLAUDE.md` and `.markdownlint-cli2.jsonc`.

## [1.2.1] - 2026-06-11

### Added

- Left/right iOS safe-area insets (`env(safe-area-inset-left/right)`) on the
  header, main content, and footer so the UI clears the notch and home
  indicator in landscape on iPhone (top/bottom insets were already in place).
- Regression test asserting safe-area insets are applied to header, main,
  and footer, plus footer brand-link tests (44 tests total).

### Fixed

- Updated three stale App tests that still targeted the pre-redesign header
  subtitle, footer copyright, and "Systems Online" indicator removed in the
  v1.2 header/footer redesign.

### Security

- Removed unused `to-ico` devDependency, eliminating its vulnerable
  transitive chain (`request`, `jimp`, `minimist` — 6 critical advisories).
- Patched `vite` (6.0.5 → 6.4.3) and `vitest` (4.0.18 → 4.1.8) via
  `npm audit fix`; `npm audit` now reports 0 vulnerabilities.

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
