# Task Plan

## Session: Functionality & Design Improvements (2026-07-12)

### Goal

Ship a set of small, high-value functionality and design improvements:
persistent history, upload validation, paste-to-upload, reduced-motion
support, focus rings, and a single-source version string.

### Plan Checklist

- [x] Persist prompt history to localStorage with quota-safe fallback
  (`src/lib/history.js`).
- [x] Enforce the advertised 20MB upload limit and show a dismissible
  notice for skipped files (`src/lib/files.js`).
- [x] Add paste-to-upload (clipboard images via Ctrl/Cmd+V).
- [x] Show relative timestamps on history entries (`src/lib/format.js`).
- [x] Honor `prefers-reduced-motion` (CSS + static NeuralMesh frame +
  instant results scroll) and add a global `:focus-visible` ring.
- [x] Fix CopyBtn timeout leak on unmount.
- [x] Inject the app version from package.json via `__APP_VERSION__`
  (header badge + footer were hardcoded at v1.2).
- [x] `npm audit fix` — cleared 3 new dev-dep advisories (0 remaining).
- [x] Add 21 tests (65 total); bump version to 1.3.0; update README and
  CHANGELOG.
- [x] Verify: lint clean, 65/65 tests, build OK.

## Session: Repo Maintenance + iOS Safe Areas (2026-06-11)

### Goal

Bring the repo to a verified-green state: fix failing tests, clear all npm
audit findings, and complete iOS safe-area coverage for notched devices.

### Plan Checklist

- [x] Verify CLAUDE.md matches the canonical version (no changes needed).
- [x] Run full verification suite — found 3 failing tests and 20 npm audit
  vulnerabilities (6 critical).
- [x] Remove unused `to-ico` devDependency (source of all critical
  advisories via `request`/`jimp`/`minimist`).
- [x] `npm audit fix` — vite 6.0.5 → 6.4.3, vitest 4.0.18 → 4.1.8;
  0 vulnerabilities remaining.
- [x] Fix 3 stale App tests left over from the v1.2 header/footer redesign.
- [x] Add left/right `env(safe-area-inset-*)` padding to header, main, and
  footer (top/bottom already present; `viewport-fit=cover` already set).
- [x] Add safe-area and footer brand-link regression tests (44 tests).
- [x] Bump version to 1.2.1; update README badges, CHANGELOG, MANIFEST.
- [x] Verify: eslint clean, 44/44 tests, build OK, markdownlint clean,
  baseline file check passes, `npm audit` 0 findings.
- [x] Commit, push, open PR.

## Session: Implement REGENESYS Application (2026-03-12)

### Goal

Build the full REGENESYS visual prompt generator React application with
6 analysis modes, 10 platform targets, comprehensive tests, and CI pipeline.

### Plan Checklist

- [x] Explore current repo state and existing baseline.
- [x] Create React app scaffold with Vite, ESLint, Vitest.
- [x] Write application code with modular component architecture.
- [x] Implement design tokens, constants, API utilities, prompt builders.
- [x] Create 7 component files (Icons, NeuralMesh, UI, SubjectInput,
  VariationControls, HistoryPanel, AnalysisProgress).
- [x] Add SVG favicon for app branding.
- [x] Install dependencies and verify production build.
- [x] Create comprehensive test suite (41 tests across 4 test files).
- [x] Update CI workflow with lint, test, and build jobs.
- [x] Update README with icon, features, tech stack, setup instructions.
- [x] Update CHANGELOG, MANIFEST, and task tracking files.
- [x] Verify all tests pass, lint clean, build succeeds.
- [x] Commit and push all changes.

### Improvements Made to Original Code

- Extracted monolithic single-file app into modular components and lib files.
- Added `aria-*` attributes for accessibility (labels, roles, pressed states).
- Added keyboard navigation for interactive elements (upload zone, history).
- Used `import.meta.env.VITE_GEMINI_API_KEY` instead of hardcoded empty key.
- Added proper error message when API key is missing.
- Fixed fallback copy method positioning (off-screen instead of visible).
- Added `role="alert"` for error messages.
- Added `aria-live="polite"` for progress updates.
- Added `aria-hidden="true"` for decorative elements.
- Used `parseInt(value, 10)` with explicit radix.

### Verification

- `npx eslint src/` — 2 react-refresh warnings (advisory, not errors).
- `npx vitest run` — 41 tests passing across 4 files.
- `npx vite build` — Production build succeeds (191 KB gzipped: 60 KB).
