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
# List playbooks except 'common.yml' which is mandatory
PLAYBOOKS=($(find playbooks -maxdepth 1 -name "*.yml" ! -name "common.yml" -exec basename {} .yml \; | sort))

if [ ${#PLAYBOOKS[@]} -eq 0 ]; then
    echo "❌ No optional playbooks found in playbooks/ directory!"
    exit 1
fi

for i in "${!PLAYBOOKS[@]}"; do
    echo "  $((i+1))) ${PLAYBOOKS[$i]}"
done

# Multiple selection loop
SELECTED_CONFIGS=""
while [ -z "$SELECTED_CONFIGS" ]; do
    if [ -t 0 ]; then
        read -p "Select additional configurations (numbers separated by space, or 'all') [1-${#PLAYBOOKS[@]}]: " selections
    else
        if [ -c /dev/tty ]; then
            read -p "Select additional configurations (numbers separated by space, or 'all') [1-${#PLAYBOOKS[@]}]: " selections < /dev/tty
        else
            echo "❌ Headless environment detected without /dev/tty. Please run the script interactively."
            exit 1
        fi
    fi

    if [ "$selections" = "all" ]; then
        SELECTED_CONFIGS="${PLAYBOOKS[*]}"
    else
        for selection in $selections; do
            # Validate if selection is a number
            if [[ "$selection" =~ ^[0-9]+$ ]]; then
                INDEX=$((selection-1))
                if [ $INDEX -ge 0 ] && [ $INDEX -lt ${#PLAYBOOKS[@]} ]; then
                    SELECTED_CONFIGS="$SELECTED_CONFIGS ${PLAYBOOKS[$INDEX]}"
                fi
            fi
        done
        # Trim leading space
        SELECTED_CONFIGS=$(echo $SELECTED_CONFIGS | xargs)
    fi

    if [ -z "$SELECTED_CONFIGS" ]; then
        echo "⚠️  Invalid selection. Please choose at least one playbook."
    fi
done

# Always include 'common'
FINAL_CONFIGS="common $SELECTED_CONFIGS"

# 6. Run the setup
echo "🛠️ Running Ansible playbooks ($FINAL_CONFIGS)..."

# Check if Makefile exists to use 'make run', otherwise run ansible-playbook directly
if [ -f "Makefile" ]; then
    LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8 PYTHONUTF8=1 make run CONFIG="$FINAL_CONFIGS" EXTRA_ARGS=""
else
    # Fallback if Makefile is missing (manual construction of playbook paths)
    PLAYBOOK_PATHS=""
    for cfg in $FINAL_CONFIGS; do
        PLAYBOOK_PATHS="$PLAYBOOK_PATHS playbooks/$cfg.yml"
    done
    LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8 PYTHONUTF8=1 ansible-playbook -i inventory $PLAYBOOK_PATHS
fi

# 7. Cleanup
echo "🧹 Cleaning up..."
sudo rm /etc/sudoers.d/genesis-temporary

echo "✨ Setup complete!"
