# Validate MR — Reference Checklist

Apply the relevant sections based on which layers were touched by the diff.

## Architecture

> Apply based on what the root `AGENTS.md` declares as the project's architecture and layer routing rules.

- [ ] Dependency direction declared in `AGENTS.md` is not violated
- [ ] Business logic is placed in the correct layer as defined by the project's routing rules — not mixed into entry points (controllers, consumers, jobs) or infrastructure (repositories, clients)
- [ ] No cross-layer direct coupling without an abstraction boundary (interface, port, gateway) between them
- [ ] External contracts (DTOs, events, API responses) are not used directly as internal domain/model objects — an explicit mapping step exists
- [ ] Shared/common modules do not depend on higher-level or application-specific modules
- [ ] Anti-patterns explicitly listed in `AGENTS.md` are not introduced

## Tests

- [ ] Every new public method with business logic has at least one unit test
- [ ] New integration/infrastructure code has an integration or contract test
- [ ] No test deleted without justification in the commit message
- [ ] Assertions are meaningful — not trivial no-op checks (e.g. assert always true, assert non-null when null is impossible)
- [ ] Happy path and at least one error/edge path covered

## Security (OWASP Top 10)

- [ ] No secrets, credentials, or tokens hardcoded anywhere in the diff — use env vars or secret managers
- [ ] Inputs validated and sanitized at all system entry points (API endpoints, message consumers, scheduled jobs)
- [ ] No query built by string concatenation with user-controlled input — use parameterized queries or ORM
- [ ] No insecure deserialization of untrusted external input
- [ ] Sensitive data (PII, tokens, passwords) not written to logs or error messages
- [ ] No new dependency with known CVEs — check version if changed in any package manifest
- [ ] Authentication and authorization enforced on every new endpoint — no accidental public exposure
- [ ] No missing authorization check when accessing resources owned by a specific user/tenant (IDOR risk)
- [ ] Rate limiting or idempotency considered for endpoints that trigger side effects (payments, notifications, writes)
- [ ] Error responses do not leak stack traces, internal paths, or system details to the caller
- [ ] External HTTP calls use timeouts — no unbounded blocking calls that can cascade into a DoS
- [ ] Cron jobs and workers validate the source/integrity of data before processing — no blind trust in queue/topic messages
- [ ] File uploads (if any) validate type, size, and are not stored or served from executable paths
- [ ] No open redirect — redirect targets validated against an allowlist if user-controlled input is involved
- [ ] Retry logic in workers/crons does not cause duplicate side effects without idempotency guarantees

## API Contracts

- [ ] No breaking changes to existing endpoints without versioning
- [ ] New response fields are additive/optional only
- [ ] OpenAPI/Swagger spec updated if endpoint signature changed
- [ ] Event/message schema changes are backward-compatible
- [ ] Error response structure follows existing conventions

## Code Quality

- [ ] No TODO/FIXME left in changed lines without a linked ticket reference
- [ ] No dead code introduced (unused methods, unreachable branches)
- [ ] No unused variables, fields, parameters, or imports
- [ ] Naming follows project conventions (classes: nouns, methods: verbs, booleans: `is`/`has`/`can` prefix)
- [ ] No single-letter or cryptic variable names (except well-known loop counters like `i`, `j`)
- [ ] No method/function doing more than one thing (Single Responsibility)
- [ ] No function longer than ~30 lines without justification
- [ ] No deeply nested conditionals (more than 3 levels) — prefer early returns or extracted methods
- [ ] No magic numbers or strings — use named constants
- [ ] No commented-out production code committed
- [ ] No incoherent, misleading, or outdated comments (comment says X, code does Y)
- [ ] No unnecessary `println`, `System.out`, or debug logging
- [ ] No duplicate logic copy-pasted across methods or classes

## Documentation

- [ ] CHANGELOG updated if observable behavior changed
- [ ] README updated if new env vars, config keys, or setup steps were added
- [ ] AGENTS.md updated if new conventions or module patterns were introduced

## Severity Classification

| Severity | When to apply                                                                       |
| -------- | ----------------------------------------------------------------------------------- |
| BLOCKER  | Architecture violation, security issue, no tests for new logic, broken API contract |
| WARNING  | Missing docs, style deviation, non-critical quality issue                           |
| INFO     | Observation worth noting but not actionable                                         |
