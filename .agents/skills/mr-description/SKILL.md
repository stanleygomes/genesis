---
name: mr-description
description: Generates a lean merge request (MR) description with a fixed, minimal structure — summary, why, and test plan only, no padding. Use when the user asks to write, generate, or draft a MR description.
---

# MR Description Generator

## Quick Start

Triggered only when the user explicitly asks for a MR description (e.g. "write the MR description"). Execute the workflow below — do not skip steps. Output must stay within the length budget in `REFERENCE.md` — trim, don't pad.

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

Use `...` (three-dot) to diff from the merge base, not the tip. The diff is the source of truth for what changed.

### Step 3 — Read Commit Messages (Signal Only)

```bash
git log origin/$DEFAULT_BRANCH..HEAD --oneline
```

Use as a hint for intent, not as a source to copy from — commit messages are often sloppy or WIP. Never quote them verbatim into the description.

### Step 4 — Classify the Change

Pick exactly one primary type: `feat` / `fix` / `refactor` / `chore` / `docs` / `test` / `perf`. If the diff mixes purposes, still pick one dominant type for the title and fold the rest into Summary bullets — never invent extra sections for it.

### Step 5 — Draft the Description

Follow the fixed template in `REFERENCE.md` exactly. Do not add sections that aren't in the template. Summarize intent and outcome — do not restate the diff line-by-line or list every touched file.

### Step 6 — Enforce the Budget

Apply the length rules and omission priority from `REFERENCE.md`. If over budget, cut the lowest-value content first, never the title or the highest-impact Summary bullet.

### Step 7 — Output

Return only the final MR description in a single fenced code block, ready to paste into the MR/PR field. No preamble, no "here's the description" commentary, no closing remarks.
