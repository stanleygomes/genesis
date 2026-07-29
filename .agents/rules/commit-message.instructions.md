---
description: Enforces Conventional Commits formatting and length limits when writing commit messages.
applyTo: '*'
---

## Instructions
1. **Format:** `<type>(<scope>): <subject>` — scope optional, omit parens if unused.
2. **Types:** `feat`, `fix`, `refactor`, `chore`, `docs`, `test`, `perf`, `style`, `build`, `ci`. Pick exactly one.
3. **Subject:** imperative mood ("add", not "added"/"adds"), no capital first letter, no trailing period, max **50 chars**.
4. **Body (optional):** blank line after subject, wrap at **72 chars/line**, explain *why*, not *what* (diff already shows what).
5. **Breaking changes:** `!` after type/scope (`feat!:`) or a `BREAKING CHANGE:` footer — never both silently, always one of the two.
6. **Footer (optional):** issue refs (`Refs #123`, `Closes #123`), one per line.
7. **Never:** multiple unrelated changes in one commit, no vague subjects ("fix stuff", "update code"), no emoji.

## Example
```
fix(auth): reject expired refresh tokens

Expired tokens were silently re-issued instead of failing,
letting revoked sessions stay alive indefinitely.

Closes #482
```
