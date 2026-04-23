# Genesis - Development Guide (Claude)

This document contains guidelines and useful commands for working with this Ansible configuration repository.

## Useful Commands

### Makefile (Recommended)
- **Install/Run**: `make run`
- **Simulate (Dry Run)**: `make check`
- **Check Syntax**: `make syntax`
- **List Tasks**: `make list`

### Ansible (Manual)
- **Run Playbook**: `ansible-playbook local.yml --ask-become-pass`
- **Check Syntax**: `ansible-playbook local.yml --syntax-check`
- **Dry Run Mode**: `ansible-playbook local.yml --check`
- **List Tasks**: `ansible-playbook local.yml --list-tasks`

### Linting
- **Ansible Lint**: `ansible-lint local.yml`

## Style Guidelines
- **Naming**: Use descriptive names in English for tasks.
- **Modules**: Always prefer native Ansible modules over `shell` or `command` modules.
- **Idempotency**: Ensure all roles are idempotent (can be run multiple times without side effects).
- **Variables**: Keep specific variables in the `vars/` directory and secrets (if any) in Ansible Vault.
- **Roles**: Organize logic into modular roles for easier maintenance.

## Recommended Structure
- `group_vars`: Global variables.
- `roles/`: Logic separated by concern (e.g., `docker`, `zsh`, `gnome-settings`).
- `local.yml`: The unified entrypoint.
