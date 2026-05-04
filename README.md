# Genesis - Workstation Setup

This repository contains the **Ansible** configuration to automate the setup and maintenance of my personal computer. The goal is to turn my machine configuration into "Infrastructure as Code" (IaC), allowing me to rebuild or sync my environment quickly and consistently.

## Quick Start (One-Liner)

To set up a fresh machine, just run:

```bash
curl -sSL https://raw.githubusercontent.com/stanleygomes/genesis/refs/heads/master/bootstrap.sh | bash
```

This command will install `git`, `ansible`, clone this repository, and run the setup.

---

## Manual Getting Started

### What does this project do?

- Manages system packages (Apt, Flatpak, Snap etc).
- Configures development environments (Node.js/NVM, Java/SDKMAN, Python/UV, Go, PHP, pnpm).
- Installs and configures AI tools (Gemini CLI, GitHub Copilot CLI, Hermes Agent, Antigravity IDE etc).
- Setups CLI/TUI tools with desktop shortcuts (LazyGit, LazyDocker, Harlequin, etc).
- Customizes the shell (Bash prompt with git status, aliases).
- Manages GNOME settings and extensions (Tweaks, Extension Manager).

### Prerequisites

Before running the playbooks, you need to have **Ansible** installed on your machine.

> [!NOTE]
> How to install: https://docs.ansible.com/projects/ansible/latest/installation_guide/intro_installation.html

## Usage

1. Clone the repository:

```bash
git clone https://github.com/stanleygomes/genesis.git
cd genesis
```

2. Run the main playbook:

This command will run the main playbook and ask for sudo password.

```
make run
```

To run a specific configuration (e.g., `essential` or `desktop`):

```bash
make run CONFIG=bash
```

### Run in dry-run mode:

This command will run the main playbook in check mode and ask for sudo password.

```
make check
```

## Project Structure

- `playbooks/`: Folder containing multiple setup configurations (e.g., `desktop.yml`, `bash.yml`).
- `inventory`: Host definition (usually just localhost).
- `roles/`: Different configuration categories.
- `configs/`: Specific tool configurations (VS Code, etc.).

## Roles Included

- **AI Tools**: `antigravity`, `gemini-cli`, `github-copilot`, `hermes-agent`.
- **Development**: `docker`, `nvm`, `pnpm`, `sdkman`, `python-uv`, `php`.
- **GUI Apps**: `google-chrome`, `mongodb-compass`, `dbeaver`, `postman`.
- **CLI/TUI**: `btop`, `harlequin`, `lazydocker`, `lazygit`, `lazysql`, `posting`.
- **System/UI**: `gnome-setup`, `bash-config`, `desktop-entries`.
