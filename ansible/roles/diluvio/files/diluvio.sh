#!/usr/bin/env bash
# diluvio.sh - varre o disco de tudo que não presta mais.
# Uso: sudo diluvio
set -euo pipefail

if [[ $EUID -ne 0 ]]; then
  echo "❌ Precisa de sudo. Nem o Dilúvio veio sem autorização lá de cima." >&2
  exit 1
fi

REAL_USER="${SUDO_USER:-$USER}"
REAL_HOME=$(getent passwd "$REAL_USER" | cut -d: -f6)

# Uso em disco da partição raiz, em KB (para calcular o total liberado no fim).
get_used_kb() {
  df -k --output=used / | tail -1 | tr -d ' '
}

human() {
  # converte KB em algo legível (usa numfmt se existir, senão cai pro awk)
  local kb="$1"
  if command -v numfmt >/dev/null 2>&1; then
    numfmt --from-unit=1024 --to=iec "$kb"
  else
    awk -v kb="$kb" 'BEGIN { printf "%.1fM\n", kb/1024 }'
  fi
}

echo "🌊 ================================================"
echo "🌊  DILÚVIO - limpeza de disco"
echo "🌊 ================================================"
echo
echo "📊 Espaço ANTES:"
df -h /
echo

echo "📋 O que será limpo:"
echo "  1️⃣  🗞️  Journal do systemd (mantém 200M / últimos 7 dias)"
echo "  2️⃣  📦 Cache e pacotes órfãos do APT"
echo "  3️⃣  🐧 Kernels antigos (mantém o atual em uso)"
echo "  4️⃣  🧹 Arquivos temporários em /tmp e /var/tmp (+7 dias)"
echo "  5️⃣  🖼️  Cache de thumbnails do usuário"
echo "  6️⃣  📦 Revisões antigas de pacotes snap"
echo "  7️⃣  🗑️  Lixeiras (Trash) dos usuários"
echo "  8️⃣  🐳 Cache/imagens não usadas do Docker (se instalado)"
echo "  9️⃣  🧰 Caches de dev: npm, pip, gradle (~/.cache, sem tocar em .m2/.nvm/Downloads)"
echo

read -r -p "❓ Confirma a limpeza acima? [s/N] " confirm
case "$confirm" in
  [sS]|[sS][iI][mM]|[yY]|[yY][eE][sS]) ;;
  *)
    echo "🚫 Cancelado. Nenhuma água foi derramada."
    exit 0
    ;;
esac

USED_BEFORE=$(get_used_kb)

echo
echo "1️⃣  🗞️  Limitando journal do systemd a 200M / 7 dias..."
journalctl --vacuum-size=200M
journalctl --vacuum-time=7d
echo "✅ Journal enxugado."

echo
echo "2️⃣  📦 Limpando cache do APT e removendo dependências órfãs..."
apt-get clean
apt-get autoclean
apt-get autoremove --purge -y
echo "✅ APT limpo."

echo
echo "3️⃣  🐧 Removendo kernels antigos (mantendo $(uname -r))..."
dpkg --list | awk '/^ii  linux-image-[0-9]/{print $2}' | grep -v "$(uname -r)" | xargs -r apt-get -y purge
echo "✅ Kernels velhos removidos."

echo
echo "4️⃣  🧹 Limpando /tmp e /var/tmp (arquivos com +7 dias)..."
find /tmp -type f -atime +7 -delete 2>/dev/null || true
find /var/tmp -type f -atime +7 -delete 2>/dev/null || true
echo "✅ Temporários limpos."

echo
echo "5️⃣  🖼️  Limpando cache de thumbnails..."
find /home/*/.cache/thumbnails -type f -delete 2>/dev/null || true
echo "✅ Thumbnails limpos."

echo
echo "6️⃣  📦 Limpando revisões antigas de snaps (o vilão mais comum)..."
snap set system refresh.retain=2 2>/dev/null || true
echo "✅ Snaps enxugados."

echo
echo "7️⃣  🗑️  Esvaziando lixeiras dos usuários..."
find /home/*/.local/share/Trash -mindepth 1 -delete 2>/dev/null || true
echo "✅ Lixeiras vazias."

echo
echo "8️⃣  🐳 Limpando cache do Docker (se instalado)..."
if command -v docker >/dev/null 2>&1; then
  docker system prune -af --volumes || true
  echo "✅ Docker limpo."
else
  echo "⏭️  Docker não encontrado, pulando."
fi

echo
echo "9️⃣  🧰 Limpando caches de dev (npm/pip/gradle) do usuário $REAL_USER..."
if [[ -n "$REAL_HOME" ]]; then
  sudo -u "$REAL_USER" npm cache clean --force 2>/dev/null || true
  sudo -u "$REAL_USER" bash -c "rm -rf '$REAL_HOME/.cache/pip' '$REAL_HOME/.gradle/caches' '$REAL_HOME/.cache/'*" 2>/dev/null || true
  echo "✅ Caches de dev limpos."
  echo "ℹ️  Não mexi em ~/.m2 nem ~/.nvm nem ~/Downloads: são seus, decida você o que apagar."
else
  echo "⏭️  Não achei o home do usuário real, pulando."
fi

USED_AFTER=$(get_used_kb)
FREED_KB=$(( USED_BEFORE - USED_AFTER ))

echo
echo "🌊 ================================================"
echo "📊 Espaço DEPOIS:"
df -h /
echo
if (( FREED_KB > 0 )); then
  echo "🎉 Liberado: $(human "$FREED_KB")"
else
  echo "🤷 Não liberou quase nada. Talvez o problema seja mesmo o ~/Downloads."
fi
echo "✅ As águas baixaram."
echo "🌊 ================================================"
