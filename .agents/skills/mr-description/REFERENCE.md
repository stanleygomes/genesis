# MR Description — Reference Template

Apply this structure exactly. Every section beyond Title is optional — include only if it earns its space.

## Fixed Structure

```markdown
### <type>: <short imperative title, ≤ 72 chars>

**Breaking:** <what breaks and who's affected>   <!-- only if applicable -->

**Summary**
- bullet (max 3, imperative mood, what changed)

**Why**
1 sentence — only if motivation isn't obvious from Summary.

**Test Plan**
- [ ] checklist item (only manual/observable verification steps)
```

## Rules

- [ ] Title uses a conventional-commit-style prefix (`feat`/`fix`/`refactor`/`chore`/`docs`/`test`/`perf`)
- [ ] Summary has at most 3 bullets — merge related changes into one bullet rather than listing every file
- [ ] Each bullet states outcome/intent, not implementation detail (e.g. "Add retry to payment webhook", not "Add try/catch around line 42")
- [ ] Why section is omitted unless the change isn't self-explanatory from the title/summary (bug fix cause, workaround, business requirement)
- [ ] Test Plan section is omitted for docs-only or trivial changes, or when existing CI already covers it
- [ ] No restating file names/line numbers — that's what the diff view is for
- [ ] No emoji, no closing remarks, no "let me know if..." filler
- [ ] Breaking changes get a one-line callout directly under the title, before Summary — omit entirely if nothing breaks

## Length Budget

| Section | Max |
|---|---|
| Title | 72 chars |
| Summary | 3 bullets, ~15 words each |
| Why | 1 sentence |
| Test Plan | 4 checklist items |
| Total | ~600 characters |

## Omission Priority

When trimming to fit the budget, cut in this order:

1. Why (if inferable from title/summary)
2. Test Plan items that duplicate existing CI coverage
3. Least impactful Summary bullet

Never cut: the title, the single highest-impact Summary bullet, or the Breaking callout.

## Example

```markdown
### fix: prevent duplicate webhook processing on retry

**Summary**
- Add idempotency key check before processing payment webhooks
- Return 200 early on duplicate delivery instead of reprocessing

**Why**
Provider retries webhooks on timeout, causing duplicate charges.

**Test Plan**
- [ ] Send same webhook payload twice, confirm charge occurs once
```
