# CLAUDE.md

This file provides guidance to AI assistants (Claude and others) working in this repository.

## Project Overview

**test-project** is a new project currently in its initial state. This file will be updated as the codebase grows.

## Repository State

- Single `README.md` with the project title
- No source code, dependencies, or build configuration yet
- Clean git history from initial commit

## Development Setup

> Update this section once the stack is chosen.

Steps to get the project running locally will be documented here. Common patterns:

```bash
# Install dependencies (update command for your package manager)
# npm install / pip install -e . / cargo build

# Run tests
# npm test / pytest / cargo test

# Start dev server (if applicable)
# npm run dev / python -m myapp
```

## Git Workflow

- **Default branch:** `master`
- **Feature branches:** Create branches from `master` for all changes
- **Branch naming:** Use descriptive names, e.g. `feat/add-auth`, `fix/login-bug`
- **Commit messages:** Use imperative mood, e.g. "Add user authentication" not "Added user authentication"
- **Never force-push to `master`**

## Code Conventions

> Update this section once a language/framework is chosen.

Common conventions to document here:
- Language and runtime versions
- Formatting tool and config (e.g. Prettier, Black, rustfmt)
- Linting tool and config (e.g. ESLint, Ruff, Clippy)
- Naming conventions (files, variables, functions, classes)
- Import ordering rules

## Testing

> Update this section once a test framework is chosen.

Document here:
- Test framework in use
- Where tests live (e.g. `src/__tests__/`, `tests/`)
- How to run tests
- Coverage requirements or thresholds
- Whether tests must pass before commits (pre-commit hooks, CI)

## Project Structure

> Update this section as directories are created.

```
test-project/
├── CLAUDE.md          # This file
└── README.md          # Project readme
```

## CI/CD

> Update this section once CI is configured.

Document here:
- CI platform (GitHub Actions, GitLab CI, etc.)
- What runs on pull requests (lint, test, build)
- Deployment process and environments

## Key Decisions & Conventions for AI Assistants

When working in this codebase, follow these principles:

1. **Minimal changes** — Only modify what is necessary for the task. Avoid refactoring unrelated code.
2. **No unused code** — Don't add placeholder functions, TODOs, or scaffolding unless explicitly requested.
3. **Read before editing** — Always read a file before modifying it.
4. **Ask before destructive actions** — Confirm before deleting files, dropping data, or force-pushing.
5. **Match existing style** — Follow the formatting and naming conventions already present in the file being edited.
6. **Update this file** — When significant new structure, dependencies, or conventions are added to the project, update this CLAUDE.md to reflect them.
