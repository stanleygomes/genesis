#!/usr/bin/env bash
# Liga o SOUL.md de cada bot do Orca ao repo do Solomon (ver tasks/bots.yml).
# Uso: link-bots.sh <~/.orca/bots> <~/projects/solomon/bots>
set -e
dir="$1" src="$2"
[ -d "$src" ] || { echo "no-src"; exit 0; }
if [ -L "$dir" ]; then  # jeito antigo: a pasta inteira era link pro repo
  rm "$dir"
  echo "unlinked"
fi
mkdir -p "$dir"

# relink <alvo> <link>: falha (1) se já aponta pro alvo. Link pra outro lugar (o clone
# antigo em ~/.config/solomon) é só trocado; arquivo de verdade vira .bak antes.
relink() {
  [ -L "$2" ] && [ "$(readlink "$2")" = "$1" ] && return 1
  if [ -e "$2" ] && [ ! -L "$2" ]; then
    mv "$2" "$2.bak-$(date +%Y%m%d-%H%M%S)" || exit 1
  fi
  ln -sfn "$1" "$2" || exit 1  # set -e não vale dentro do if que chama
}

if [ -f "$src/.ai-memory.toml" ] && relink "$src/.ai-memory.toml" "$dir/.ai-memory.toml"; then
  echo "linked:.ai-memory.toml"  # ai-memory: projeto orca-bots
fi
seen=" "
for json in "$dir"/*/bot.json; do  # o nome vem do bot.json: a pasta nem sempre bate
  [ -f "$json" ] || continue
  bot="$(dirname "$json")"
  name="$(sed -n 's/.*"name": *"\([^"]*\)".*/\1/p' "$json" | head -1 | tr 'A-Z' 'a-z')"
  soul="$src/$name/SOUL.md"
  [ -f "$soul" ] || continue
  seen="$seen$name "
  mkdir -p "$bot/scripts"  # scripts Python do bot nesta máquina (fora do git)
  if relink "$soul" "$bot/SOUL.md"; then
    echo "linked:$name"
  fi
done
for soul in "$src"/*/SOUL.md; do
  name="$(basename "$(dirname "$soul")")"
  case "$seen" in *" $name "*) ;; *) echo "missing:$name" ;; esac
done
