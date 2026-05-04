# Genesis - Development Guide (Claude)

This document contains guidelines and useful commands for working with this Ansible configuration repository.

## Useful Commands

### Makefile (Recommended)
- **Install/Run**: `make run` (Use `CONFIG=name` to choose playbook)
- **Simulate (Dry Run)**: `make check`
- **Check Syntax**: `make syntax`
- **List Tasks**: `make list`

### Ansible (Manual)
- **Run Playbook**: `ansible-playbook playbooks/full.yml --ask-become-pass`
- **Check Syntax**: `ansible-playbook playbooks/full.yml --syntax-check`
- **Dry Run Mode**: `ansible-playbook playbooks/full.yml --check`
- **List Tasks**: `ansible-playbook playbooks/full.yml --list-tasks`

### Linting
- **Ansible Lint**: `ansible-lint playbooks/*.yml`

## Style Guidelines
- **Naming**: Use descriptive names in English for tasks.
- **Modules**: Always prefer native Ansible modules over `shell` or `command` modules.
- **Idempotency**: Ensure all roles are idempotent (can be run multiple times without side effects).
- **Variables**: Keep specific variables in the `vars/` directory and secrets (if any) in Ansible Vault.
- **Roles**: Organize logic into modular roles for easier maintenance.
- **Environment**: For tools requiring Node.js (via NVM) or Java (via SDKMAN), always source the appropriate init script in `shell` tasks.

- `playbooks/`: Setup configurations (`full.yml`, `bash.yml`, etc.).
- `roles/`: Logic separated by concern (e.g., `docker`, `git`, `gnome-setup`).
- `configs/`: External configuration files (VS Code, etc.).
- `inventory`: Host definitions.
