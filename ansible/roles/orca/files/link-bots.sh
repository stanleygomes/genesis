#!/usr/bin/env bash
# Liga o SOUL.md de cada bot do Orca ao repo do Solomon (ver tasks/bots.yml).
# Uso: link-bots.sh <~/.orca/bots> <~/.config/solomon/bots>
set -e
dir="$1" src="$2"
[ -d "$src" ] || { echo "no-src"; exit 0; }
if [ -L "$dir" ]; then  # jeito antigo: a pasta inteira era link pro repo
  rm "$dir"
  echo "unlinked"
fi
mkdir -p "$dir"
if [ -f "$src/.ai-memory.toml" ] && [ ! -L "$dir/.ai-memory.toml" ]; then
  ln -sfn "$src/.ai-memory.toml" "$dir/.ai-memory.toml"  # ai-memory: projeto orca-bots
  echo "linked:.ai-memory.toml"
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
  [ "$(readlink -f "$bot/SOUL.md")" = "$(readlink -f "$soul")" ] && continue
  [ -e "$bot/SOUL.md" ] && mv "$bot/SOUL.md" "$bot/SOUL.md.bak-$(date +%Y%m%d-%H%M%S)"
  ln -s "$soul" "$bot/SOUL.md"
  echo "linked:$name"
done
for soul in "$src"/*/SOUL.md; do
  name="$(basename "$(dirname "$soul")")"
  case "$seen" in *" $name "*) ;; *) echo "missing:$name" ;; esac
done
