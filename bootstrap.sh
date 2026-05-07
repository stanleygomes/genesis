#!/bin/bash
# Genesis Workstation Bootstrap Script
# Este script prepara o ambiente e chama o instalador Python.

set -e

# --- Configuração ---
REPO_URL="https://github.com/stanleygomes/genesis.git"
TARGET_DIR="$HOME/projects/genesis"

echo "🚀 Iniciando Genesis Workstation Setup..."

# 1. Instalar dependências básicas
echo "📦 Instalando requisitos do sistema (git, python, whiptail, ansible)..."
sudo apt update
sudo apt install -y git python3 whiptail ansible software-properties-common

# 2. Clonar ou atualizar o repositório
if [ ! -d "$TARGET_DIR" ]; then
    echo "📂 Clonando repositório Genesis..."
    mkdir -p "$(dirname "$TARGET_DIR")"
    git clone "$REPO_URL" "$TARGET_DIR"
else
    echo "📂 Atualizando repositório existente..."
fi

cd "$TARGET_DIR"
if [ -d ".git" ]; then
    git pull
fi

# 3. Garantir que o script Python tenha permissão de execução
chmod +x scripts/setup.py

# 4. Configurar sudo temporário sem senha
# Isso evita prompts de senha repetitivos durante a execução do Ansible
echo "🔐 Configurando sudo temporário..."
echo "$USER ALL=(ALL) NOPASSWD:ALL" | sudo tee /etc/sudoers.d/genesis-temporary > /dev/null

# 5. Executar o instalador Python
# Usamos o 'exec' para que o processo do bash seja substituído pelo python
# ou apenas chamamos e limpamos depois.
python3 scripts/setup.py

# 6. Limpeza
echo "🧹 Limpando configurações temporárias..."
sudo rm /etc/sudoers.d/genesis-temporary

echo "✨ Setup concluído!"
