---
name: generate-agents-md
description: Generates a root AGENTS.md for a repository by scanning its stack, build commands, folder architecture, test conventions, and lint tools. Use when bootstrapping a new repo, onboarding a codebase, or when the root AGENTS.md is missing or stale.
---
# Skill: Generate Root AGENTS.md

## Quick Start
Run on any repository. Scan → produce a ready-to-use `AGENTS.md` at the root.

## Workflows

### Step 1 — Detect Stack
Read the primary build descriptor (`pom.xml`, `build.gradle(.kts)`, `package.json`, `pyproject.toml`, `go.mod`, `Cargo.toml`). Extract language, runtime version, and main framework + version. Never invent versions — omit and mark `TBD` if not found.

### Step 2 — Collect Build Commands
- `Makefile` present → read all phony targets and their inline/above comments
- `package.json` present → read `scripts` section
- `Taskfile.yml` / `justfile` present → read tasks
- Emit a `| Command | Description |` table with every discovered command

### Step 3 — Scan Architecture
List top-level source directories (skip `target/`, `build/`, `node_modules/`, `.git/`, `dist/`, `out/`). For each, infer responsibility from: folder name, subdirectory names, key annotations (`@RestController`, `@Service`, `@Repository`, `@Consumer`, `@Scheduled`), and any existing local `AGENTS.md` or `README`. Identify the architecture pattern (Hexagonal, Clean, Layered, MVC, Modular Monolith). Document the dependency direction as a text diagram.

### Step 4 — Map Intent to Modules
For each module/folder state what code belongs there. Add a cross-layer change order when multiple layers exist (e.g., domain → use-case → adapter → app).

### Step 5 — Test Conventions
Find test source roots. Identify naming patterns (`*Test`, `*Spec`, `*IT`, `*IntegrationTest`), frameworks (JUnit 5, Mockito, Jest, pytest), and what separates unit from integration (suffix, Maven profile, directory, annotation). Emit a `| Type | Naming | Location | Framework |` table.

### Step 6 — Lint & Cleanup
Detect formatters/linters (`ktlint`, `checkstyle`, `spotless`, `eslint`, `prettier`, `black`, `ruff`). Find invocation via Makefile, `package.json`, or plugin config. Emit a `| Command | Tool | Purpose |` table.

### Step 7 — Generate AGENTS.md
Produce the file at the repo root with this structure (fill every section with discovered data):

```
# AGENTS.md
## Overview          ← one paragraph: what the service does + stack summary
## Stack             ← | Item | Value | table
## Commands          ← | Command | Description | table
## Architecture      ← pattern + folder responsibilities
## Module Routing    ← intent → module map
## Dependency Direction ← text diagram + rules
## Anti-Patterns     ← what must NOT happen per layer (evidence-based)
## Test Conventions  ← | Type | Naming | Location | Framework | table
## Lint & Cleanup    ← | Command | Tool | Purpose | table
## On-Demand Reading ← links to docs/, local AGENTS.md files, conventions
```

## Rules
- Facts only — no aspirational or invented content
- If architecture is ambiguous after scanning, write `TBD — requires human review`
- Do not duplicate rules already in local `AGENTS.md` files — link to them instead
- Write in the same language as the existing project documentation
