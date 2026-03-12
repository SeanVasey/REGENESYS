# Task Plan

## Session: Establish repository baseline

### Goal
Create a production-ready repository baseline with required governance docs, development defaults, and CI validation.

### Non-goals
- Implementing product runtime code
- Defining final production infrastructure

### Plan Checklist
- [x] Inspect existing files and current baseline.
- [x] Add required repository documents and standards files.
- [x] Add initial CI workflow for baseline validation.
- [x] Verify changes with best-available local checks.
- [x] Commit with conventional commit message.

### Risks / Tradeoffs
- Placeholder contact emails in policy docs must be replaced by maintainers.
- CI currently validates repository baseline rather than application runtime checks because the project has no executable stack yet.

### Verification Plan
- `git status --short`
- `find . -maxdepth 3 -type f | sort`
- `bash .github/workflows/ci-local-check.sh`

### Review
Baseline docs, guardrails, and CI are now present so future feature work can build on standardized repo hygiene.
