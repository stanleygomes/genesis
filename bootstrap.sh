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
fi

cd "$TARGET_DIR"
if [ -d ".git" ]; then
    git pull
fi

# 4. Set up temporary passwordless sudo for the session
# This avoids "become" prompt detection issues on newer Ubuntu versions
echo "🔐 Setting up temporary passwordless sudo..."
echo "$USER ALL=(ALL) NOPASSWD:ALL" | sudo tee /etc/sudoers.d/genesis-temporary > /dev/null

# 5. Choose configuration
echo "📋 Available configurations:"
PLAYBOOKS=($(find playbooks -maxdepth 1 -name "*.yml" -exec basename {} .yml \; | sort))

if [ ${#PLAYBOOKS[@]} -eq 0 ]; then
    echo "❌ No playbooks found in playbooks/ directory!"
    exit 1
fi

for i in "${!PLAYBOOKS[@]}"; do
    echo "  $((i+1))) ${PLAYBOOKS[$i]}"
done

read -p "Select a configuration [1-${#PLAYBOOKS[@]}] (default: 1): " selection
selection=${selection:-1}
INDEX=$((selection-1))
CONFIG=${PLAYBOOKS[$INDEX]}

if [ -z "$CONFIG" ]; then
    echo "⚠️  Invalid selection, defaulting to 'desktop'"
    CONFIG="desktop"
fi

# 6. Run the setup
echo "🛠️ Running Ansible playbook ($CONFIG)..."

# Check if Makefile exists to use 'make run', otherwise run ansible-playbook directly
if [ -f "Makefile" ]; then
    LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8 PYTHONUTF8=1 make run CONFIG="$CONFIG" EXTRA_ARGS=""
else
    LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8 PYTHONUTF8=1 ansible-playbook -i inventory "playbooks/$CONFIG.yml"
fi

# 7. Cleanup
echo "🧹 Cleaning up..."
sudo rm /etc/sudoers.d/genesis-temporary

echo "✨ Setup complete!"
