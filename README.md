# 🌎 Genesis

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
- Configures development environments (Node.js with pnpm, Java, Python, Go, PHP).
- Installs and configures AI tools (Antigravity CLI, GitHub Copilot CLI, Hermes Agent, Antigravity IDE etc).
- Setups CLI/TUI tools with desktop shortcuts (LazyGit, LazyDocker, Harlequin, etc).
- Customizes the shell and terminal (Zsh with Oh My Zsh, Bash, aliases, GNOME Terminal settings).
- Manages GNOME settings and extensions (Tweaks, Extension Manager).

### Prerequisites

Before running the playbooks, you need to have **Ansible** installed on your machine. If you use `bootstrap.sh`, you don't need to install Ansible manually.

> [!NOTE]
> How to install: https://docs.ansible.com/projects/ansible/latest/installation_guide/intro_installation.html

## Usage

### 1. Interactive Installer (Recommended)

The easiest way to set up is using the interactive installer:

```bash
./bootstrap.sh
```

This will open a menu where you can:
- Select multiple playbooks (using **Space**).
- Choose optional components for specific categories (sub-menus).
- See a summary before the installation begins.

### 2. Manual Execution (via Makefile)

To run a specific configuration or multiple configurations:

```bash
make run CONFIG="bash desktop"
```

### 3. Run in dry-run mode:

```bash
make check CONFIG="desktop"
```

## Project Structure

- `playbooks/`: Setup configurations (e.g., `common.yml`, `desktop.yml`, `ai.yml`).
- `roles/`: Modular Ansible roles.
- `scripts/`: Python interactive installer logic.
- `group_vars/`: Global configuration variables (`all.yml`).
- `inventory`: Host definition (localhost).
- `configs/`: Specific tool configurations (VS Code, etc.).

## Roles Included

- **AI Tools**: `antigravity`, `antigravity-cli`, `github-copilot`, `hermes-agent`.
- **Development**: `docker`, `node` (includes pnpm), `java`, `python`, `php`.
- **GUI Apps**: `google-chrome`, `mongodb-compass`, `dbeaver`, `postman`.
- **CLI/TUI**: `btop`, `harlequin`, `lazydocker`, `lazygit`, `lazysql`, `posting`.
- **System/UI**: `gnome-setup`, `terminal`, `desktop-entries`.
