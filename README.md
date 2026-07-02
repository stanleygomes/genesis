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

### 1. Interactive Bootstrap Script

The easiest way to set up or update the environment is running `bootstrap.sh` (see the one-liner above). It installs the system requirements, clones/pulls this repository, and opens an interactive `whiptail` checklist to select which playbooks to run on top of `common.yml`.

After the first run, the `terminal` role installs a `genesis` shell function in your `.bashrc`/`.zshrc` that re-runs the bootstrap one-liner, so you can just type:

```bash
genesis
```

from any terminal to update or reconfigure your machine.

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

```text
⚙️ ansible/            # Ansible configuration and deployment files
  ├── configs/         # Specific tool configurations (VS Code, etc.)
  ├── group_vars/      # Global configuration variables (all.yml)
  ├── playbooks/       # Setup playbooks (common.yml, desktop.yml, etc.)
  ├── roles/           # Modular Ansible roles (terminal, docker, etc.)
  ├── ansible.cfg      # Ansible configuration settings
  └── inventory        # Ansible host definition (localhost)
🛠️ Makefile            # Helper tasks to run, check, list playbooks
🐚 bootstrap.sh        # One-liner script to bootstrap environment (playbook selection via whiptail)
```

---

## 🧩 Available Roles

Here is a list of all roles available in this repository:

| Role              | Description                                                                                                   |
| :---------------- | :------------------------------------------------------------------------------------------------------------ |
| `antigravity`     | Installs Antigravity IDE & Hub, configures workspace settings, keybindings, extensions, and desktop shortcuts. |
| `antigravity-cli` | Installs the Antigravity CLI client tool (`agy`).                                                             |
| `bruno`           | Installs Bruno API client (open-source, Git-friendly alternative to Postman/Insomnia).                        |
| `dbeaver`         | Installs DBeaver Community Edition (SQL database explorer/client).                                            |
| `docker`          | Installs Docker Engine, Docker Compose, and sets permissions/user groups.                                     |
| `filezilla`       | Installs FileZilla FTP client.                                                                                |
| `ghostty`         | Installs Ghostty terminal emulator.                                                                           |
| `git`             | Installs Git, configures user credentials, and generates/sets GitHub SSH keys.                                |
| `github-copilot`  | Installs GitHub Copilot CLI globally via NPM.                                                                 |
| `go`              | Installs Go language runtime and `golangci-lint` to `~/.local/go`.                                            |
| `google-chrome`   | Installs Google Chrome web browser.                                                                           |
| `java`            | Installs SDKMAN and configures Java development dependencies.                                                 |
| `lazydocker`      | Installs LazyDocker TUI binary for Docker container monitoring.                                               |
| `mongodb-compass` | Installs MongoDB Compass GUI client.                                                                          |
| `neovim`          | Installs latest Neovim editor via its official AppImage (including `libfuse2`), configuring it with `lazy.nvim` and plugins (Gruvbox, Telescope, Treesitter). |
| `node`            | Installs NVM, Node.js runtime, and the `pnpm` package manager.                                                |
| `php`             | Installs PHP runtime, extensions, and Composer package manager.                                               |
| `proverbs`        | Mirrors the `proverbs` repo (Skills, Agents, rules) into `~/.claude` for Claude Code. Optional (`install_proverbs`). |
| `python`          | Installs Python runtime dependencies, Astral `uv` tool, and Python 3.14.                                      |
| `system`          | Installs GNOME Tweaks and GNOME Extension Manager.                                                            |
| `terminal`        | Installs modern shell utilities (bat, btop, jq, eza, dust, fd-find, starship) and sets up Zsh + Oh My Zsh with aliases. |
| `vscode`          | Installs VS Code, syncs user settings/keybindings, and installs extensions.                                   |

---

## 📜 Playbooks & Mapped Roles

This project organises roles into the following playbooks:

### 1. Common Configuration (`common.yml`)

> Target: Core command line utilities, runtimes and development tools required for any setup.

### 2. Desktop Configuration (`desktop.yml`)

> Target: User interfaces, web browsers, IDEs, desktop entries and database tools.

### 3. Custom Setup 1 (`custom1.yml`)

> Target: Custom bundle containing browsers, Bruno, and databases.
