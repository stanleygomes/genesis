#!/bin/bash

# Genesis Workstation Bootstrap Script
# This script installs Ansible, clones the repository, and runs the configuration.

set -e

# --- Configuration ---
REPO_URL="https://github.com/stanleygomes/genesis.git"
TARGET_DIR="$HOME/projects/genesis"

echo "🚀 Starting Genesis Workstation Setup..."

# 1. Update and install dependencies
echo "📦 Installing prerequisites (git, curl, make, software-properties-common)..."
sudo apt update
sudo apt install -y git curl make software-properties-common

# 2. Install Ansible
if ! command -v ansible &> /dev/null; then
    echo "🤖 Installing Ansible..."
    sudo apt install -y ansible
else
    echo "✅ Ansible is already installed."
fi

# 3. Clone the repository
if [ ! -d "$TARGET_DIR" ]; then
    echo "📂 Cloning Genesis repository..."
    mkdir -p "$(dirname "$TARGET_DIR")"
    git clone "$REPO_URL" "$TARGET_DIR"
else
    echo "📂 Genesis repository already exists at $TARGET_DIR. Updating..."
    cd "$TARGET_DIR"
    git pull
fi

# 4. Run the setup
echo "🛠️ Running Ansible playbook..."
cd "$TARGET_DIR"

# Check if Makefile exists to use 'make run', otherwise run ansible-playbook directly
export LC_ALL=C
if [ -f "Makefile" ]; then
    make run < /dev/tty
else
    ansible-playbook -i inventory local.yml --ask-become-pass < /dev/tty
fi

echo "✨ Setup complete!"
