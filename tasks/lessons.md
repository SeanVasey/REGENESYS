# Lessons Learned

## 2026-06-11: Repo Maintenance + iOS Safe Areas

- **Update tests in the same PR as UI redesigns**: The v1.2 header/footer
  redesign shipped without updating `App.test.jsx`, leaving 3 tests failing
  on `main`. UI copy changes must always be grepped for in the test suite.
- **Audit unused dependencies first**: All 6 critical npm advisories came
  from `to-ico`, a devDependency nothing imported. Before patching versions,
  check whether the vulnerable package is even used — removal is cleaner.
- **Safe areas need all four insets**: `viewport-fit=cover` exposes content
  on every edge; top/bottom insets alone leave landscape-notch overlap.
  Pad header/main/footer with `safe-area-inset-left/right` too.

## 2026-03-12: Initial Application Implementation

- **Modular architecture pays off**: Splitting a 1000+ line single-file React
  component into separate files (tokens, constants, API, prompts, components)
  makes testing and maintenance significantly easier.
- **ESLint JSX false positives**: ESLint's `no-unused-vars` rule cannot track
  JSX component usage without a dedicated React plugin. Use
  `varsIgnorePattern: "^[A-Z]"` to suppress false positives for components.
- **API key handling**: Never hardcode API keys (even empty strings). Use
  `import.meta.env` for Vite apps and provide clear error messages when keys
  are missing.
- **Canvas mocking**: When testing components that use `<canvas>`, mock
  `HTMLCanvasElement.prototype.getContext` and `requestAnimationFrame` in test
  setup to avoid JSDOM limitations.
