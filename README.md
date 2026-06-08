# 🌎 Genesis

This repository contains the **Ansible** configuration to automate the setup and maintenance of my personal computer, vps and more. The goal is to turn my machine configuration into "Infrastructure as Code" (IaC), allowing me to rebuild or sync my environment quickly and consistently.

![screenshot](https://github.com/stanleygomes/genesis/raw/HEAD/assets/screenshot.png)

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
- Installs and configures AI tools (Antigravity CLI, GitHub Copilot CLI, Antigravity IDE etc).
- Setups CLI/TUI tools with desktop shortcuts (LazyDocker, etc).
- Customizes the shell and terminal (Zsh with Oh My Zsh, Bash, aliases, GNOME Terminal settings).

### Requisites

Before running the playbooks, you need to have **Ansible** installed on your machine. If you use `bootstrap.sh`, you don't need to install Ansible manually.

> [!NOTE]
> How to install: https://docs.ansible.com/projects/ansible/latest/installation_guide/intro_installation.html

## Usage

### 1. Interactive Installer (CLI)

The easiest way to set up or update the environment is using the interactive CLI. When you run the `bootstrap.sh` script, it automatically installs a command-line utility called `genesis` using `uv` and `Typer`.

You can use the CLI directly from any terminal:

```bash
genesis install
```
This will open an interactive menu (using `InquirerPy`) where you can select the playbooks to install.

**Available Commands:**
- `genesis install` - Opens the interactive menu to install playbooks.
- `genesis update`  - Same as install, useful for updating configurations.
- `genesis help`    - Shows the help message and available commands.

### 2. Manual Execution (via Makefile)

To run a specific configuration or multiple configurations:

```bash
make run CONFIG="bash desktop"
```

### 3. Run in dry-run mode:

```bash
make check CONFIG="desktop"
```

## 📂 Project Structure

```text
⚙️ configs/            # Specific tool configurations (VS Code, etc.)
📊 group_vars/         # Global configuration variables (all.yml)
📜 playbooks/          # Setup playbooks (common.yml, desktop.yml, etc.)
🧩 roles/              # Modular Ansible roles (terminal, docker, etc.)
🛠️ Makefile            # Helper tasks to run, check, list playbooks
🐚 bootstrap.sh        # One-liner script to bootstrap environment
💻 cli/                # Interactive Python CLI (Typer + InquirerPy)
📦 pyproject.toml      # CLI dependency management via uv
inventory              # Ansible host definition (localhost)
```
