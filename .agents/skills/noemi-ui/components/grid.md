# Grid (layout)

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober.** The bare neobrutalist structure every page sits on.

## When
- Group sections of a page or a dashboard. Cells hold content directly; no card inside a cell unless the card is clickable.

## Visual
| Property | Value |
| --- | --- |
| Frame | `3px solid` `outline`, radius `0`, no shadow |
| Dividers | `3px solid` `outline` between cells, no gap |
| Cell padding | `20px 16px 28px` |
| Caption tag | opens a cell when it names it: bg `text`, color `bg`, Special Elite `12px`, padding `2px 8px` |
| Metadata | Special Elite `13px` `text-soft`, `key · value` separators |

Caption tags name what is in the cell (`estados`, `receita`); numbers (`01`, `02`) only when the order matters.

## Variants
- `columns`: 2–4 columns at ≥ `860px`, one column below.
- `split`: main cell + side cell (`minmax(0,1fr) 340px`).

## Motion
| Event | Animation |
| --- | --- |
| none | structure never moves |

## Never
- Gaps between cells, rounded frame, shadow on the grid, wobbly (sketched) lines, card-in-card.
