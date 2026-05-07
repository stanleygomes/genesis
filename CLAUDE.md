# Genesis - Development Guide (Claude)

This document contains guidelines and useful commands for working with this Ansible configuration repository.

## Useful Commands

### Makefile (Recommended)

- **Bootstrap**: `./bootstrap.sh` (Interactive installer)
- **Install/Run**: `make run` (Use `CONFIG="name1 name2"` to choose playbooks)
- **Simulate (Dry Run)**: `make check`
- **Check Syntax**: `make syntax`
- **List Tasks**: `make list`

### Ansible (Manual)

- **Run Playbook**: `ansible-playbook -i inventory playbooks/desktop.yml --ask-become-pass`
- **Check Syntax**: `ansible-playbook -i inventory playbooks/desktop.yml --syntax-check`

## Interactive Installer & Sub-options

The project uses a Python-based interactive installer (`scripts/setup.py`) that supports sub-menus.

- **Metadata**: Add `# @sub-options: role1, role2` to the top of a playbook to enable sub-menus.
- **Conditional Roles**: In playbooks, use `when: install_role_name | default(true) | bool` to make roles optional. Hyphens in role names should be converted to underscores in variable names (e.g., `hermes-agent` -> `install_hermes_agent`).

## Style Guidelines

- **Naming**: Use descriptive names in English for tasks.
- **Modules**: Always prefer native Ansible modules over `shell` or `command` modules.
- **Idempotency**: Ensure all roles are idempotent.
- **Variables**: Global variables in `group_vars/all.yml`. Role defaults in `roles/<name>/defaults/main.yml`.

## Project Structure

- `playbooks/`: Setup configurations.
- `roles/`: Logic separated by concern.
- `scripts/`: Python-based installer logic (`genesis` package).
- `group_vars/`: Global variable definitions.
- `inventory`: Host definitions.
