# Lessons Learned

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
