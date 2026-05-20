---
name: maintain-ansible-role
description: "Use when: refactoring, debugging, or improving an existing Ansible role in Genesis. Fast checklist + validation."
---

# Maintain Ansible Role (Genesis)

Fast workflow to review, refactor, or fix an existing Ansible role while staying within Genesis conventions.

## Quick Checklist

### 1. **Understand the Role**
- [ ] Read `roles/<role>/tasks/main.yml` — what does it install/configure?
- [ ] Check `roles/<role>/defaults/main.yml` for role-specific inputs.
- [ ] Scan `group_vars/all.yml` for shared values the role depends on.
- [ ] Verify which playbooks include this role and under what conditions.

### 2. **Validate Structure**
- [ ] Task names are descriptive and in English.
- [ ] Each task has a clear purpose (probe, install, configure, or validate).
- [ ] `changed_when: false` is set on pure checks (e.g., version checks, stat checks).
- [ ] `ignore_errors: true` appears only on probes, not on install/config tasks.

### 3. **Follow Probe-Then-Act Pattern**
- [ ] Each role follows: **Check if needed → Register result → Act only if required**.
  - Example: `command: which <tool>` → `register:` → `when: result.rc != 0` for the install.
- [ ] No unnecessary installs or re-runs on repeated executions.
- [ ] Defaults preserve behavior when variables are omitted.

### 4. **Verify Variables & Defaults**
- [ ] Role-specific values are in `roles/<role>/defaults/main.yml`.
- [ ] Shared values (versions, usernames, paths) are in `group_vars/all.yml`.
- [ ] No hardcoded paths or secrets in tasks.
- [ ] Default values use sensible, idempotent choices.

### 5. **Check Ansible Best Practices**
- [ ] Prefer native modules (apt, file, copy, template, etc.) over `shell`/`command`.
- [ ] `shell` or `command` is used only for:
  - Bootstrapping external CLIs (e.g., `curl | bash`).
  - Repository-specific checks (git commands, custom scripts).
  - Cases where a native module doesn't exist or is awkward.
- [ ] No `become: true` on tasks that don't need it; use at play level instead.
- [ ] File permissions and ownership are explicit.

### 6. **Run Validation**
```bash
# Syntax check
make syntax

# List tasks in all playbooks (see role is included)
make list

# Dry run to see what would change
make check

# Full run (after dry-run confidence)
make run
```

### 7. **Document Changes**
- [ ] Task comments explain *why*, not *what* (the task name says what).
- [ ] Role-level README or inline notes if behavior is non-obvious.
- [ ] If adding a new role-specific variable, document its purpose and defaults.

## Common Improvements

**Idempotency**: Ensure the role is safe to run multiple times without side effects.
- Use `creates:` in shell/command tasks to prevent re-execution.
- Use `stat:` + `when:` to skip already-done work.
- Mark checks with `changed_when: false`.

**Clarity**: Task names should be scannable; avoid vague phrases like "Setup" or "Install stuff".
- Good: "Check if Docker is installed"
- Bad: "Docker check"

**Reusability**: If the role depends on other roles or external state, make it explicit in defaults or pre_tasks checks.

## When to Call for Help

- **Ambiguous task goal**: If it's unclear what a task achieves, simplify or add a comment.
- **Repeated logic across roles**: Consider extracting to a shared role or variable.
- **Performance issues**: Use `tags:` or `when:` to skip unnecessary work on repeated runs.
- **Broken playbook integration**: Run `make list` and `make check` to spot misconfigurations.

## Example Prompts

- `/maintain-ansible-role I'm refactoring the python role — what should I check?`
- `/maintain-ansible-role The vscode role is running slowly. How do I optimize idempotency?`
- `/maintain-ansible-role Can you review the new docker role for conventions?`
