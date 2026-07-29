#!/usr/bin/env zsh
# terminal.sh — Exibe um versículo bíblico aleatório a cada abertura de terminal.
# Dependências: shuf, fmt — ferramentas padrão Linux.

_evangelist_verses_file() {
  echo "${EVANGELIST_VERSES_FILE:-${HOME}/.config/evangelist/verses.txt}"
}

_evangelist_random_line() {
  local verses_file="$1"
  shuf -n 1 "${verses_file}"
}

# Separa o texto do versículo da referência (padrão: "..." — Livro X:Y)
_evangelist_parse_text() {
  echo "$1" | sed 's/ — [^—]*$//'
}

_evangelist_parse_ref() {
  echo "$1" | awk -F' — ' '{print $NF}'
}

_evangelist_wrap() {
  local text="$1" width="$2"
  printf '%s\n' "${text}" | fmt -w "${width}"
}

_evangelist_separator() {
  local width="$1"
  printf '─%.0s' $(seq 1 $((width + 2)))
}

_evangelist_render() {
  local wrapped_verse="$1" ref="$2" width="$3"

  local BLUE=$'\e[34m'
  local BOLD_WHITE=$'\e[1;97m'
  local YELLOW=$'\e[33m'
  local DIM=$'\e[2m'
  local RESET=$'\e[0m'

  local line="${BLUE}$(_evangelist_separator "${width}")${RESET}"

  printf '\n'
  printf '%b\n' "${line}"
  printf '\n'

  printf "  ${BOLD_WHITE}📖 Pare um momento${RESET}\n"
  printf '\n'

  while IFS= read -r verse_line; do
    printf "  ${YELLOW}%s${RESET}\n" "${verse_line}"
  done <<< "${wrapped_verse}"

  printf '\n'
  printf "  ${DIM}— %s${RESET}\n" "${ref}"

  printf '\n'
  printf '%b\n' "${line}"
  printf '\n'
}

_evangelist_show() {
  local TEXT_W=54  # largura máxima do texto do versículo
  local verses_file
  verses_file="$(_evangelist_verses_file)"
  [[ ! -f "${verses_file}" ]] && return 0

  local raw_line verse_text ref wrapped_verse
  raw_line="$(_evangelist_random_line "${verses_file}")"
  verse_text="$(_evangelist_parse_text "${raw_line}")"
  ref="$(_evangelist_parse_ref "${raw_line}")"
  wrapped_verse="$(_evangelist_wrap "${verse_text}" "${TEXT_W}")"

  _evangelist_render "${wrapped_verse}" "${ref}" "${TEXT_W}"
}

# Chance de 50% de exibir o versículo — nem toda abertura de terminal precisa de sermão.
if (( RANDOM % 2 == 0 )); then
  _evangelist_show
fi
