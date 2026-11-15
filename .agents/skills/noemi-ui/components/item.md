# Item

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober.** One row of a list: leading icon or avatar, title, meta, trailing value or action.

## When
- Lists of objects with 1–2 facts each: transactions, contacts, tasks, settings. Many columns to compare: [table](table.md).

## Visual
| Property | Value |
| --- | --- |
| List | `<ul>` with `3px solid` `outline` frame, radius `0`, bg `card`; rows split by `2px solid` `outline` 25% |
| Row | grid `auto 1fr auto`, gap `12px`, align center, min height `64px`, padding `12px 16px` |
| Leading | icon in a `40px` box (bg `bg`, `3px solid` `outline`, `radii-sm`, icon `20px`) or a `40px` [avatar](avatar.md) |
| Title | Alegreya `17px` bold, one line, ellipsis |
| Meta | Special Elite `13px` `text-soft`, one line (date · category) |
| Trailing value | Courier Prime `15px` bold, `tabular-nums`, right; income with `+` and `teal`, expense with `−` in `text` (sign carries the meaning, not color) |
| Trailing action | `flat` small neutral [button](button.md) icon-only, or a [choice](choice.md) switch, or a `›` chevron for clickable rows |

## Variants
- `static`: plain row.
- `clickable`: the whole row is one link (title is the link, stretched over the row); chevron `›` trailing.
- `action`: trailing button or switch; the row itself is not clickable.
- `dense`: min height `48px`, padding `8px 12px`, leading `32px`, no meta.

## States
| State | What changes |
| --- | --- |
| hover (clickable) | bg `mustard` 14%, chevron moves `2px` right |
| focus-visible | `3px` `teal` outline, `-4px` offset (inside the row) |
| selected / current | bg `mustard` 22%, `4px` `mustard` inset bar left, `aria-current` or `aria-selected` |
| disabled | title and meta `text-soft`, leading box outline `text-soft`, no hover |
| unread | title + `8px` `mustard` square with `2px` `outline` before it |

## Motion
| Event | Animation |
| --- | --- |
| hover | bg swap, chevron `120ms steps(2)` |
| row added | drops in from `-6px`, `150ms steps(3)`, once |
| row removed | disappears at once |
| `prefers-reduced-motion` | no animation, final state at once |

## Behavior
- `clickable`: one link per row; extra actions are never nested inside the link (put them as siblings and keep the link stretched with a `::after`, actions above it with `z-index`).
- Icon-only actions need `aria-label` naming the row ("Apagar Feira").
- Lists over ~50 rows get [pagination](pagination.md) or "Carregar mais".

## Never
- Card per row, more than one trailing action, three lines of meta, color as the only sign of income/expense.
