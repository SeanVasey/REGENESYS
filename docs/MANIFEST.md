# Repository Manifest

This manifest tracks major repository artifacts and governance files.

## Core Project Files

- `README.md` — Project overview, setup, usage, and architecture notes.
- `LICENSE` — Apache 2.0 license terms.
- `index.html` — Vite entry HTML with app metadata.
- `package.json` — Dependencies, scripts, and project metadata.

## Application Source (`src/`)

- `src/main.jsx` — React entry point.
- `src/App.jsx` — Main application component.

### Components (`src/components/`)

- `AnalysisProgress.jsx` — Animated multi-stage progress indicator.
- `HistoryPanel.jsx` — Prompt history panel with recall and removal.
- `Icons.jsx` — SVG icon components (AppIcon, VaseyLogo, UI icons).
- `NeuralMesh.jsx` — Animated canvas background with connected nodes.
- `SubjectInput.jsx` — Style transfer target subject textarea.
- `UI.jsx` — Glass panel, SectionLabel, CopyBtn, Collapsible components.
- `VariationControls.jsx` — Variation axis sliders and count selector.

### Library (`src/lib/`)

- `api.js` — `fetchWithRetry` utility with exponential backoff.
- `constants.js` — Modes, platforms, detail levels, default configs.
- `prompts.js` — System/user prompt builders and response parser.
- `tokens.js` — VASEY/AI design tokens (colors, borders, effects).

### Tests (`src/test/`)

- `setup.js` — Test environment setup (jest-dom matchers).
- `api.test.js` — API utility tests (5 tests).
- `App.test.jsx` — App component rendering tests (13 tests).
- `constants.test.js` — Constants validation tests (5 tests).
- `prompts.test.js` — Prompt builder and parser tests (18 tests).

## Static Assets (`public/`)

- `regenesys-icon.svg` — App icon on a dark iOS tile; source for the favicon,
  PWA/home-screen PNGs, and the SVG favicon.
- `regenesys-icon-optimized.svg` — Transparent-background glyph used for the
  in-app logo (`AppIcon`) and the Safari `mask-icon`.
- `favicon.ico` — Multi-resolution favicon (16/32/48) for legacy browsers.
- `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` — Rasterized home-screen
  and PWA icons generated from `regenesys-icon.svg`.
- `og-image.svg` — Social sharing image used by Open Graph/Twitter metadata.

## Build & Config

- `vite.config.js` — Vite and Vitest configuration.
- `eslint.config.js` — ESLint 9 flat config with React plugins.
- `scripts/generate-icons.mjs` — Icon asset generator (sharp). Treats the two
  root SVGs as the single source of truth: copies them into `public/` and
  writes the PWA PNGs and `favicon.ico` from `regenesys-icon.svg`. Run via
  `npm run icons`.

## Governance and Policy

- `SECURITY.md` — Vulnerability disclosure policy.
- `CODE_OF_CONDUCT.md` — Community participation standards.
- `CHANGELOG.md` — Versioned change history.

## Development Standards

- `.editorconfig` — Cross-editor formatting standards.
- `.gitignore` — Ignore rules for generated/local files.
- `.env.example` — Safe environment variable template.

## AI-Assisted Development

- `CLAUDE.md` — Operating instructions for Claude Code sessions.

## Operational Guardrails

- `.github/workflows/ci.yml` — CI pipeline: baseline checks, lint, test,
  build.
- `.github/workflows/ci-local-check.sh` — Local baseline validation script.
- `.markdownlint-cli2.jsonc` — Markdown lint configuration.
- `tasks/todo.md` — Current task planning and execution checklist.
- `tasks/lessons.md` — Lessons learned and prevention rules.
