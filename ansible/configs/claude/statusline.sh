#!/bin/bash
# Status line: project(+branch) | model | context | usage limits (5h, 7d, monthly)
# Every segment is skipped when its source field is missing/null.
export LC_ALL=C
input=$(cat)

# One jq call; one value per line (empty line = missing value).
mapfile -t f < <(printf '%s' "$input" | jq -r '
  (.workspace.current_dir // .cwd // ""),
  (.model.display_name // ""),
  (.context_window.total_input_tokens // ""),
  (.context_window.context_window_size // ""),
  (.context_window.used_percentage // ""),
  (.rate_limits.five_hour.used_percentage // ""),
  (.rate_limits.five_hour.resets_at // ""),
  (.rate_limits.seven_day.used_percentage // ""),
  (.rate_limits.seven_day.resets_at // ""),
  (if .rate_limits.spend_limit.period == "monthly" then (.rate_limits.spend_limit.used_percentage // "") else "" end),
  (if .rate_limits.spend_limit.period == "monthly" then (.rate_limits.spend_limit.resets_at // "") else "" end)
' 2>/dev/null)

cwd=${f[0]}; model=${f[1]}; ctx_used=${f[2]}; ctx_size=${f[3]}; ctx_pct=${f[4]}
h5_pct=${f[5]}; h5_rst=${f[6]}; d7_pct=${f[7]}; d7_rst=${f[8]}; mo_pct=${f[9]}; mo_rst=${f[10]}

RST=$'\033[0m'; DIM=$'\033[2m'; SEP="${DIM}|${RST}"
CYAN=$'\033[36m'; YEL=$'\033[33m'; GRN=$'\033[32m'; RED=$'\033[31m'; MAG=$'\033[35m'; BLU=$'\033[34m'

isnum() { [[ "$1" =~ ^[0-9]+(\.[0-9]+)?$ ]]; }
round() { printf '%.0f' "$1"; }
color_for() { # percentage -> color
  local p; p=$(round "$1")
  if [ "$p" -ge 80 ]; then printf '%s' "$RED"
  elif [ "$p" -ge 50 ]; then printf '%s' "$YEL"
  else printf '%s' "$GRN"; fi
}
fmt_tok() {
  local n; n=$(round "$1")
  if [ "$n" -ge 1000000 ]; then printf '%sM' "$(( n / 1000000 ))"
  elif [ "$n" -ge 1000 ]; then printf '%sk' "$(( n / 1000 ))"
  else printf '%s' "$n"; fi
}
fmt_reset() { # epoch, date format
  isnum "$1" || return 0
  date -d "@${1%.*}" "+$2" 2>/dev/null
}
limit_seg() { # label pct reset_epoch reset_fmt
  isnum "$2" || return 0
  local out; out="$(color_for "$2")$1 $(round "$2")%${RST}"
  local r; r=$(fmt_reset "$3" "$4")
  [ -n "$r" ] && out+=" ${DIM}↻${r}${RST}"
  printf '%s' "$out"
}

segs=()

# 1. Project (+ branch)
if [ -n "$cwd" ]; then
  top=$(git -C "$cwd" --no-optional-locks rev-parse --show-toplevel 2>/dev/null)
  if [ -n "$top" ]; then
    seg="${CYAN}$(basename "$top")${RST}"
    br=$(git -C "$cwd" --no-optional-locks symbolic-ref --short -q HEAD 2>/dev/null \
         || git -C "$cwd" --no-optional-locks rev-parse --short HEAD 2>/dev/null)
    [ -n "$br" ] && seg+=" ${YEL}${br}${RST}"
    segs+=("$seg")
  else
    segs+=("${CYAN}$(basename "$cwd")${RST}")
  fi
fi

# 2. Model
[ -n "$model" ] && segs+=("${MAG}${model}${RST}")

# 3. Context
if isnum "$ctx_pct"; then
  seg="ctx"
  if isnum "$ctx_used" && isnum "$ctx_size"; then
    seg+=" $(fmt_tok "$ctx_used")/$(fmt_tok "$ctx_size")"
  fi
  seg+=" $(round "$ctx_pct")%"
  segs+=("$(color_for "$ctx_pct")${seg}${RST}")
fi

# 4. Usage limits
s=$(limit_seg "5h" "$h5_pct" "$h5_rst" "%H:%M");       [ -n "$s" ] && segs+=("$s")
s=$(limit_seg "7d" "$d7_pct" "$d7_rst" "%a %H:%M");    [ -n "$s" ] && segs+=("$s")
s=$(limit_seg "mo" "$mo_pct" "$mo_rst" "%b %d %H:%M"); [ -n "$s" ] && segs+=("$s")

# Join with compact separators, single line
out=""
for s in "${segs[@]}"; do
  if [ -z "$out" ]; then out="$s"; else out+=" ${SEP} ${s}"; fi
done
printf '%s' "$out"
