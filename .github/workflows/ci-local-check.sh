#!/usr/bin/env bash
set -euo pipefail

required_files=(
  ".editorconfig"
  ".gitignore"
  "README.md"
  "LICENSE"
  "CHANGELOG.md"
  "SECURITY.md"
  "CODE_OF_CONDUCT.md"
  "CLAUDE.md"
  ".env.example"
  "docs/MANIFEST.md"
)

for file in "${required_files[@]}"; do
  if [[ ! -f "$file" ]]; then
    echo "Missing required file: $file"
    exit 1
  fi
done

echo "All required baseline files are present."
