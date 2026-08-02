#!/bin/bash
set -f

input=$(cat)

if [ -z "$input" ]; then
    printf "agy"
    exit 0
fi

# ── Colors ──────────────────────────────────────────────
blue='\033[38;2;0;153;255m'
orange='\033[38;2;255;176;85m'
green='\033[38;2;0;175;80m'
cyan='\033[38;2;86;182;194m'
red='\033[38;2;255;85;85m'
yellow='\033[38;2;230;200;0m'
white='\033[38;2;220;220;220m'
magenta='\033[38;2;180;140;255m'
dim='\033[2m'
reset='\033[0m'

sep=" ${dim}│${reset} "

# ── Helpers ─────────────────────────────────────────────
color_for_pct() {
    local pct=$1
    if [ "$pct" -ge 90 ]; then printf "$red"
    elif [ "$pct" -ge 70 ]; then printf "$yellow"
    elif [ "$pct" -ge 50 ]; then printf "$orange"
    else printf "$green"
    fi
}

build_bar() {
    local pct=$1
    local width=$2
    [ "$pct" -lt 0 ] 2>/dev/null && pct=0
    [ "$pct" -gt 100 ] 2>/dev/null && pct=100

    local filled=$(( pct * width / 100 ))
    local empty=$(( width - filled ))
    local bar_color
    bar_color=$(color_for_pct "$pct")

    local filled_str="" empty_str=""
    for ((i=0; i<filled; i++)); do filled_str+="●"; done
    for ((i=0; i<empty; i++)); do empty_str+="○"; done

    printf "${bar_color}${filled_str}${dim}${empty_str}${reset}"
}

format_reset_time() {
    local reset_iso=$1
    local style=$2  # "time" for 5h, "datetime" for 7d
    [ -z "$reset_iso" ] || [ "$reset_iso" = "null" ] && return

    local epoch
    epoch=$(date -d "$reset_iso" +%s 2>/dev/null)
    [ -z "$epoch" ] && return

    local result
    if [ "$style" = "time" ]; then
        result=$(date -d "@$epoch" +"%H:%M" 2>/dev/null)
    else
        result=$(date -d "@$epoch" +"%b %-d, %H:%M" 2>/dev/null | tr '[:upper:]' '[:lower:]')
    fi
    printf "%s" "$result"
}

# ── Extract JSON data ────────────────────────────────────
model_name=$(echo "$input" | jq -r '.model.display_name // "agy"')
cwd=$(echo "$input" | jq -r '.cwd // ""')
[ -z "$cwd" ] || [ "$cwd" = "null" ] && cwd=$(pwd)
dirname=$(basename "$cwd")

ctx_pct=$(echo "$input" | jq -r '.context_window.used_percentage // 0' | awk '{printf "%.0f", $1}')
agent_state=$(echo "$input" | jq -r '.agent_state // ""')
plan_tier=$(echo "$input" | jq -r '.plan_tier // ""')
terminal_width=$(echo "$input" | jq -r '.terminal_width // 80')

# ── Git info ─────────────────────────────────────────────
git_branch=""
git_dirty=""
if git -C "$cwd" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    git_branch=$(git -C "$cwd" symbolic-ref --short HEAD 2>/dev/null)
    if [ -n "$(git -C "$cwd" --no-optional-locks status --porcelain 2>/dev/null)" ]; then
        git_dirty="*"
    fi
fi

# ── Agent state icon ─────────────────────────────────────
state_icon=""
case "$agent_state" in
    working|running) state_icon="⚡ " ;;
    idle)            state_icon="" ;;
    *)               state_icon="" ;;
esac

# ── LINE 1: Model │ Context % │ Directory (branch) │ Plan ──
ctx_color=$(color_for_pct "$ctx_pct")

line1="${blue}${model_name}${reset}"
line1+="${sep}"
line1+="✍️  ${ctx_color}${ctx_pct}%${reset}"
line1+="${sep}"
line1+="${state_icon}${cyan}${dirname}${reset}"
if [ -n "$git_branch" ]; then
    line1+=" ${green}(${git_branch}${red}${git_dirty}${green})${reset}"
fi
if [ -n "$plan_tier" ] && [ "$plan_tier" != "null" ]; then
    line1+="${sep}${dim}${plan_tier}${reset}"
fi

# ── Detect model pool (3p = Claude/Anthropic, gemini = Google) ──
model_id=$(echo "$input" | jq -r '.model.id // ""' | tr '[:upper:]' '[:lower:]')
if echo "$model_id" | grep -qiE 'claude|anthropic|3p'; then
    quota_pool="3p"
else
    quota_pool="gemini"
fi

# ── Quota lines (from agy JSON — only active pool) ───────────────
bar_width=10
quota_lines=""

if [ "$quota_pool" = "3p" ]; then
    q5h_key="3p-5h"
    qwk_key="3p-weekly"
    pool_label="claude"
else
    q5h_key="gemini-5h"
    qwk_key="gemini-weekly"
    pool_label="gemini"
fi

# 5h quota
q5h_remaining=$(echo "$input" | jq -r ".quota.\"${q5h_key}\".remaining_fraction // empty")
if [ -n "$q5h_remaining" ]; then
    q5h_pct=$(echo "$q5h_remaining" | awk '{printf "%.0f", (1 - $1) * 100}')
    q5h_reset_iso=$(echo "$input" | jq -r ".quota.\"${q5h_key}\".reset_time // empty")
    q5h_bar=$(build_bar "$q5h_pct" "$bar_width")
    q5h_color=$(color_for_pct "$q5h_pct")
    q5h_pct_fmt=$(printf "%3d" "$q5h_pct")
    q5h_reset_fmt=$(format_reset_time "$q5h_reset_iso" "time")

    quota_lines+="${white}${pool_label} 5h${reset} ${q5h_bar} ${q5h_color}${q5h_pct_fmt}%${reset}"
    [ -n "$q5h_reset_fmt" ] && quota_lines+=" ${dim}⟳${reset} ${white}${q5h_reset_fmt}${reset}"
fi

# weekly quota
qwk_remaining=$(echo "$input" | jq -r ".quota.\"${qwk_key}\".remaining_fraction // empty")
if [ -n "$qwk_remaining" ]; then
    qwk_pct=$(echo "$qwk_remaining" | awk '{printf "%.0f", (1 - $1) * 100}')
    qwk_reset_iso=$(echo "$input" | jq -r ".quota.\"${qwk_key}\".reset_time // empty")
    qwk_bar=$(build_bar "$qwk_pct" "$bar_width")
    qwk_color=$(color_for_pct "$qwk_pct")
    qwk_pct_fmt=$(printf "%3d" "$qwk_pct")
    qwk_reset_fmt=$(format_reset_time "$qwk_reset_iso" "datetime")

    [ -n "$quota_lines" ] && quota_lines+="\n"
    quota_lines+="${white}${pool_label} 7d${reset} ${qwk_bar} ${qwk_color}${qwk_pct_fmt}%${reset}"
    [ -n "$qwk_reset_fmt" ] && quota_lines+=" ${dim}⟳${reset} ${white}${qwk_reset_fmt}${reset}"
fi

# ── Output ───────────────────────────────────────────────
printf "%b" "$line1"
[ -n "$quota_lines" ] && printf "\n\n%b" "$quota_lines"

exit 0
