---
name: validate-merge-request
description: Validates the current branch diff against the default branch (main/master) before a merge or pull request. Detects the default branch automatically, analyzes changed files per architecture layer, and emits a READY / NOT READY verdict with blockers and warnings. Trigger manually only — never auto-invoke. Use when the user explicitly asks to validate, review, or check their branch/MR.
---

# Validate Merge Request

## Quick Start

Triggered only when the user explicitly asks (e.g. "valida meu MR", "review my branch", "check before merge"). Execute the full workflow below — do not skip steps.

## Workflow

### Step 1 — Detect Default Branch

```bash
git remote show origin | grep 'HEAD branch' | awk '{print $NF}'
```

If that fails or returns empty:

```bash
git branch -r | grep -E 'origin/(main|master)$' | sed 's|origin/||' | head -1
```

Store as `DEFAULT_BRANCH`. If still unresolved, ask the user.

### Step 2 — Get the Diff

```bash
git diff origin/$DEFAULT_BRANCH...HEAD --stat
git diff origin/$DEFAULT_BRANCH...HEAD
```

Use `...` (three-dot) to diff from the merge base, not the tip.

### Step 3 — Load Project Architecture Context

Before analyzing files, read the `AGENTS.md` at the repository root (same directory as `.git`).

Extract from it:

- **Layer routing** — which folder paths map to which architectural layers (e.g. "business rules → core/domain", "HTTP integrations → adapter/api-provider").
- **Dependency direction** — the declared allowed import direction between layers.
- **Anti-patterns** — explicit "do not do" rules listed in the file.
- **Local AGENTS.md files** — if the root references per-module `AGENTS.md` files, read those too for delta rules.

Build a path-to-layer map from what was extracted. Always include these universal fallback mappings regardless of project:

If no `AGENTS.md` exists at the repo root, infer layers from directory names and standard architecture conventions (e.g. `controller`, `service`, `repository`, `domain`, `adapter`, `handler`, `worker`, `job`).

### Step 4 — Analyze Changed Files

Read every changed file in full. Map each file to a layer using the path-to-layer map built in Step 3, then apply the checks from `REFERENCE.md`.

### Step 4 — Emit Verdict

```
VERDICT: READY | NOT READY

BLOCKERS:
- [LAYER] file.kt:42 — description

WARNINGS:
- [LAYER] description

INFO:
- observation
```

Rules:

- Any BLOCKER → **NOT READY**.
- Only WARNINGs/INFOs → **READY** (with caveats listed).
- Reference exact file and line for every item.
- Do not invent issues. Base every item on an actual diff hunk.
