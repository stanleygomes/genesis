---
description: Enforces Conventional Commits in Portuguese, super objective, hard 72-char limit.
applyTo: '*'
---

## Instructions
1. **Language:** commit messages MUST always be in Portuguese.
2. **Format:** `<type>(<scope>): <subject>` — Conventional Commits mandatory. Scope is optional; omit the parentheses when unused.
3. **Types:** `feat`, `fix`, `refactor`, `chore`, `docs`, `test`, `perf`, `style`, `build`, `ci`. Pick exactly one.
4. **Hard 72-char limit per line** (subject, body, and footer). NEVER exceed: it breaks the pipeline. The limit includes `type` and `scope`.
5. **Subject:** imperative mood ("adiciona", not "adicionado"), no trailing period, super objective — a single line.
6. **Body (optional):** blank line after the subject, wrap at 72 chars/line, explain *why*, not *what* (the diff already shows what).
7. **Breaking changes:** `!` after type/scope (`feat!:`) — never both silently.
8. **Footer (optional):** issue references (`Refs #123`, `Closes #123`), one per line.
9. **Authorship:** never add a `Co-Authored-By` trailer.
10. **Never:** multiple unrelated changes in one commit, vague subjects ("corrige coisas", "ajusta código"), emoji.

## Example
```
feat(auth): rejeita refresh token expirado
```
