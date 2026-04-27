# Genesis - Workstation Setup

This repository contains the **Ansible** configuration to automate the setup and maintenance of my personal computer. The goal is to turn my machine configuration into "Infrastructure as Code" (IaC), allowing me to rebuild or sync my environment quickly and consistently.

## 🚀 Quick Start (One-Liner)

To set up a fresh machine, just run:

```bash
curl -sSL https://raw.githubusercontent.com/stanleygomes/genesis/master/bootstrap.sh | bash
```

This command will install `git`, `ansible`, clone this repository, and run the setup.

---

## 🚀 Manual Getting Started


### What does this project do?
- Manages system packages (Apt, Flatpak, Snap).
- Configures development environments (Node.js/NVM, Java/SDKMAN, Python/UV, pnpm).
- Installs and configures AI tools (Gemini CLI, GitHub Copilot CLI, Antigravity IDE).
- Setups CLI/TUI tools with desktop shortcuts (LazyGit, LazyDocker, Harlequin, etc.).
- Customizes the shell (Bash prompt with git status, aliases).
- Manages GNOME settings and extensions (Tweaks, Extension Manager).

### Prerequisites

Before running the playbooks, you need to have **Ansible** installed on your machine.

#### Installation on Ubuntu/Debian:
```bash
sudo apt update
sudo apt install software-properties-common
sudo add-apt-repository --yes --update ppa:ansible/ansible
sudo apt install ansible
```

#### Installation on Fedora:
```bash
sudo dnf install ansible
```

#### Installation on Arch Linux:
```bash
sudo pacman -S ansible
```

#### Via Pip (Generic):
```bash
python3 -m pip install --user ansible
```

## 🛠️ Usage

1. Clone the repository:
   ```bash
   git clone https://github.com/stanleygomes/genesis.git
   cd genesis
   ```

2. Run the main playbook:
   ```bash
   ansible-playbook local.yml --ask-become-pass
   ```

## 📂 Project Structure

- `local.yml`: Main playbook.
- `inventory`: Host definition (usually just localhost).
- `roles/`: Different configuration categories.
- `vars/`: Configuration variables.

## 📦 Roles Included

- **AI Tools**: `antigravity`, `gemini-cli`, `github-copilot`.
- **Development**: `docker`, `nvm`, `pnpm`, `sdkman`, `python-uv`, `php`.
- **GUI Apps**: `google-chrome`, `mongodb-compass`, `dbeaver`, `postman`.
- **CLI/TUI**: `btop`, `harlequin`, `lazydocker`, `lazygit`, `lazysql`, `posting`.
- **System/UI**: `gnome-setup`, `bash-config`, `desktop-entries`.
