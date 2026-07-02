#!/bin/bash

# Genesis Workstation Bootstrap Script
# This script prepares the environment and runs the Ansible playbooks directly.

set -e

# --- Configuration ---
REPO_URL="https://github.com/stanleygomes/genesis.git"
TARGET_DIR="$HOME/.config/genesis"

echo "🚀 Starting Genesis Workstation Setup..."

# 1. Install basic dependencies
echo "📦 Installing system requirements (git, whiptail, ansible, make)..."
sudo apt update
sudo apt upgrade -y
sudo apt install -y git whiptail ansible make software-properties-common

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

# 3. Configure temporary passwordless sudo
# This avoids repetitive password prompts during Ansible execution
echo "🔐 Configuring temporary sudo..."
echo "$USER ALL=(ALL) NOPASSWD:ALL" | sudo tee /etc/sudoers.d/genesis-temporary > /dev/null

# Always revoke the temporary sudo grant, even if setup fails or is interrupted
cleanup() {
    echo "🧹 Cleaning up temporary configurations..."
    sudo rm -f /etc/sudoers.d/genesis-temporary
}
trap cleanup EXIT

# 4. Ensure a Git identity is configured (needed by the git role)
git_user_name="$(git config --global user.name || true)"
git_user_email="$(git config --global user.email || true)"

if [ -z "$git_user_name" ]; then
    read -rp "Enter your Full Name (for Git): " git_user_name
fi
if [ -z "$git_user_email" ]; then
    read -rp "Enter your E-mail (for Git): " git_user_email
fi

# 5. Select which playbooks to run (no default, common included as a regular option)
mapfile -t available_playbooks < <(
    find ansible/playbooks -maxdepth 1 -name "*.yml" -printf "%f\n" |
    sed 's/\.yml$//' | sort
)

whiptail_items=()
for pb in "${available_playbooks[@]}"; do
    whiptail_items+=("$pb" "" OFF)
done

selected_playbooks=$(whiptail --title "Genesis Setup" --checklist \
    "Select the playbooks you want to run (space to toggle):" \
    20 70 10 "${whiptail_items[@]}" 3>&1 1>&2 2>&3) || true
selected_playbooks=$(echo "$selected_playbooks" | tr -d '"')

if [ -z "$selected_playbooks" ]; then
    echo "⚠️ No playbook selected. Exiting."
    exit 0
fi

playbook_files=()
for pb in $selected_playbooks; do
    playbook_files+=("playbooks/${pb}.yml")
done

# 6. Run the playbooks
echo "🚀 Running playbooks: ${playbook_files[*]}"
cd ansible
ansible-playbook -i inventory "${playbook_files[@]}" \
    -e "git_user_name=${git_user_name}" \
    -e "git_user_email=${git_user_email}"

echo "✨ Setup complete!"
