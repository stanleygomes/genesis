#!/usr/bin/env zsh
# logos.sh — Exibe um versículo bíblico aleatório a cada abertura de terminal.
# Dependências: shuf, fmt — ferramentas padrão Linux.

_logos_show() {
  local verses_file="${HOME}/.config/logos/verses.txt"
  [[ ! -f "${verses_file}" ]] && return 0

  local TEXT_W=54  # largura máxima do texto do versículo

  # Cores ANSI
  local BLUE=$'\e[34m'
  local BOLD_WHITE=$'\e[1;97m'
  local YELLOW=$'\e[33m'
  local DIM=$'\e[2m'
  local RESET=$'\e[0m'

  # Seleciona uma linha aleatória
  local raw_line
  raw_line="$(shuf -n 1 "${verses_file}")"

  # Separa o texto do versículo da referência (padrão: "..." — Livro X:Y)
  local verse_text ref
  verse_text="$(echo "${raw_line}" | sed 's/ — [^—]*$//')"
  ref="$(echo "${raw_line}" | awk -F' — ' '{print $NF}')"

  # Quebra o texto em linhas de no máximo $TEXT_W caracteres
  local wrapped_verse
  wrapped_verse="$(printf '%s\n' "${verse_text}" | fmt -w ${TEXT_W})"

  # Linha separadora
  local line="${BLUE}$(printf '─%.0s' $(seq 1 $((TEXT_W + 2))))${RESET}"

  printf '\n'
  printf '%b\n' "${line}"
  printf '\n'

  # Título
  printf "  ${BOLD_WHITE}📖 Pare um momento${RESET}\n"
  printf '\n'

  # Texto do versículo
  while IFS= read -r verse_line; do
    printf "  ${YELLOW}%s${RESET}\n" "${verse_line}"
  done <<< "${wrapped_verse}"

  # Referência
  printf '\n'
  printf "  ${DIM}— %s${RESET}\n" "${ref}"

  printf '\n'
  printf '%b\n' "${line}"
  printf '\n'
}

# Apenas define a função — o .zshrc controla quando chamar.
