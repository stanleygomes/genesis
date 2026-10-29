#!/usr/bin/env bash
# Clean disposable system and user data after explicit confirmation.
set -euo pipefail

if [[ ${EUID} -eq 0 && -z ${SUDO_USER:-} ]]; then
  echo "Execute diluvio como usuário normal; o sudo será solicitado quando necessário." >&2
  exit 1
fi

if [[ ${EUID} -eq 0 ]]; then
  echo "Execute diluvio sem sudo para limpar a lixeira do usuário correto." >&2
  exit 1
fi

trash_dir="${XDG_DATA_HOME:-$HOME/.local/share}/Trash"

echo "🌊 Dilúvio — limpeza de espaço em disco"
echo "Serão limpos: journal arquivado com mais de 7 dias, cache do APT,"
echo "arquivos temporários conforme as regras do systemd e sua lixeira local."
echo "A lixeira será esvaziada permanentemente."
read -r -p "Confirmar limpeza? [s/N] " confirm
case "$confirm" in
  [sS]|[sS][iI][mM]|[yY]|[yY][eE][sS]) ;;
  *) echo "Limpeza cancelada."; exit 0 ;;
esac

echo "Espaço antes:"
df -h /

if command -v journalctl >/dev/null 2>&1; then
  sudo journalctl --vacuum-time=7d
fi
if command -v apt-get >/dev/null 2>&1; then
  sudo apt-get clean
fi
if command -v systemd-tmpfiles >/dev/null 2>&1; then
  sudo systemd-tmpfiles --clean
fi
if [[ -d "$trash_dir" ]]; then
  for dir in "$trash_dir/files" "$trash_dir/info"; do
    if [[ -d "$dir" && ! -L "$dir" ]]; then
      find "$dir" -mindepth 1 -maxdepth 1 -exec rm -rf -- {} +
    fi
  done
fi

echo "Espaço depois:"
df -h /
