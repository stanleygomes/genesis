# Genesis - Workstation Setup

This repository contains the **Ansible** configuration to automate the setup and maintenance of my personal computer. The goal is to turn my machine configuration into "Infrastructure as Code" (IaC), allowing me to rebuild or sync my environment quickly and consistently.

## 🚀 Getting Started

### What does this project do?
- Manages system packages (Apt, Flatpak, Snap).
- Configures dotfiles and application preferences.
- Installs development tools (Docker, Node.js, Python, etc.).
- Customizes the user interface (Gnome, Themes, Fonts).

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
- `roles/`: Different configuration categories (system, apps, dev-tools, etc.).
- `vars/`: Configuration variables.
