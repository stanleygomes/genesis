#!/bin/bash

# Genesis Workstation Bootstrap Script
# This script prepares the environment and calls the Python installer.

set -e

# --- Configuration ---
REPO_URL="https://github.com/stanleygomes/genesis.git"
TARGET_DIR="$HOME/projects/genesis"

echo "🚀 Starting Genesis Workstation Setup..."

# 1. Install basic dependencies
echo "📦 Installing system requirements (git, python, whiptail, ansible, make)..."
sudo apt update
sudo apt upgrade -y
sudo apt install -y git python3 python-is-python3 whiptail ansible make software-properties-common

# 2. Clone or update the repository
if [ ! -d "$TARGET_DIR" ]; then
    echo "📂 Cloning Genesis repository..."
    mkdir -p "$(dirname "$TARGET_DIR")"
    git clone "$REPO_URL" "$TARGET_DIR"
else
    echo "📂 Updating existing repository..."
fi

cd "$TARGET_DIR"
if [ -d ".git" ]; then
    git pull
fi

# 3. Ensure the Python script has execution permission
chmod +x setup.py

# 4. Configure temporary passwordless sudo
# This avoids repetitive password prompts during Ansible execution
echo "🔐 Configuring temporary sudo..."
echo "$USER ALL=(ALL) NOPASSWD:ALL" | sudo tee /etc/sudoers.d/genesis-temporary > /dev/null

# 5. Run the Python installer
python3 setup.py

# 6. Cleanup
echo "🧹 Cleaning up temporary configurations..."
sudo rm /etc/sudoers.d/genesis-temporary

echo "✨ Setup complete!"
