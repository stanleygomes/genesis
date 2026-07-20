# Genesis Repository Instructions

This repository manages Ansible-based setup for a Linux workstation. Keep changes aligned with the existing local-machine install flow and the patterns already used in the playbooks and roles.

## General Approach

- Prefer the smallest focused change that fits the existing role or playbook.
- Keep task names descriptive and in English.
- Preserve idempotency in roles and playbooks.
- Do not introduce new abstractions unless they clearly reduce duplication.

## Ansible Conventions

- Prefer native Ansible modules over `shell` or `command` when a native module fits the job.
- Use `shell` or `command` when bootstrapping external CLIs, doing repository-specific checks, or when a native module is awkward or unavailable.
- Follow the probe-then-act pattern: check whether something exists first, then install or configure only when needed.
- Mark pure checks with `changed_when: false` when appropriate.

## Playbook Structure

- Target `localhost` with `connection: local`.
- Keep `become: true` at the play level when the play installs or configures system software.
- Keep `gather_facts: false` in the main plays and gather facts in `pre_tasks` as the normal user when `ansible_env` matters.
- Keep optional role toggles consistent with the existing playbook variables: `when: install_<role> | default(false) | bool` for optional roles.
- Convert hyphens in role names to underscores when building `install_*` variables.

## Variables and Defaults

- Put shared values in [ansible/group_vars/all.yml](file:///home/stanley/projects/genesis/ansible/group_vars/all.yml).
- Put role-specific defaults in `ansible/roles/<name>/defaults/main.yml`.
- Keep role variables and defaults close to the role that uses them.

## Maintaining Ansible Roles

When refactoring, debugging, or improving roles:
- **Scope**: Trace inputs in `ansible/roles/<name>/defaults/main.yml`, tasks in `ansible/roles/<name>/tasks/main.yml`, and shared variables in [ansible/group_vars/all.yml](file:///home/stanley/projects/genesis/ansible/group_vars/all.yml).
- **Structure**: Tasks should have clear purposes (probe, install, configure, validate). Use `ignore_errors: true` only on probes.
- **Idempotency**: Use `creates:` (for shell/command) or `stat:` checks to skip completed tasks.
- **Documentation**: Write comments to explain *why* a task exists rather than *what* it does.

## Repository Workflow

- Use the existing install/check commands as the first validation step when changing behavior: `make check`, `make syntax`, `make list`, and `make run`.
- Follow the established flow in `bootstrap.sh` and the `ansible/playbooks/*.yml` files when adding new roles or menus. `bootstrap.sh` dynamically scans `ansible/playbooks/*.yml` (ignoring `common.yml`) to build its `whiptail` checklist, then invokes `ansible-playbook` directly.
- Keep the role names aligned with the role directory names.

## Examples of Good Changes

- Add a new role by placing its defaults in `ansible/roles/<name>/defaults/main.yml` and wiring it into the relevant playbook.
- Add a package install check by probing first, then skipping the install task when the package is already present.

## Documentation Maintenance

When adding, deleting, renaming, or modifying the purpose of roles or playbooks:
- Always update the **Available Roles** table and the **Playbooks & Mapped Roles** list in [README.md](file:///home/stanley/projects/genesis/README.md).
- Keep descriptions brief and accurate.
- Maintain formatting, ordering alphabetically in the roles table.
