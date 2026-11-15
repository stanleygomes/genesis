# Data table

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober.** A [table](table.md) plus toolbar, sort, filter, selection and [pagination](pagination.md): everything in table.md still holds.

## When
- More than ~15 rows the owner needs to find, compare or act on (statement, transactions, tasks).
- Under 15 rows with nothing to act on: plain [table](table.md).

## Anatomy
1. **Toolbar**: search, filters, result count; swaps to the bulk bar while rows are selected.
2. **Table**: checkbox column, sortable headers, numbers right.
3. **Footer**: range summary left, [pagination](pagination.md) right.

## Visual
| Property | Value |
| --- | --- |
| Toolbar | flex, gap `12px`, wraps; padding `12px 0`; search = [input](input.md) `min-width 220px`; filter = `select.input`; count Special Elite `13px` `text-soft` pushed right |
| Bulk bar | replaces the toolbar: bg `text`, color `bg`, padding `8px 12px`, `3px solid` `outline`, "3 selecionadas" Bevan `13px` + small buttons (neutral, `danger` last) |
| Header | as table.md (bg `text`, color `bg`, Bevan `12px` uppercase) |
| Sort button | fills the header cell, inherits its font, indicator after the label: `↕` at `text-soft`-on-dark 60% when unsorted, `▲` asc / `▼` desc in `mustard` |
| Checkbox column | width `44px`, centered [choice](choice.md) checkbox; header one is select-all (indeterminate when some) |
| Selected row | bg `mustard` 22%, `4px` `mustard` inset bar on the left (`inset 4px 0`) |
| Numbers | Courier Prime `14px`, `tabular-nums`, right; negative with `−` sign, never color alone |
| Empty | one row spanning all columns, Alegreya italic `text-soft`, padding `28px`, plus a "Limpar filtros" flat button |
| Footer | flex space-between, padding-top `12px`, summary Special Elite `13px` `text-soft` (`1–5 de 12`) |
| Overflow | table in its own `overflow-x: auto` wrapper; toolbar and footer stay outside it |

## States
| State | What changes |
| --- | --- |
| row hover | bg `mustard` 14% (selected keeps 22%) |
| sorted column | header shows `▲`/`▼`, `aria-sort="ascending|descending"`; only one sorted column |
| sort focus-visible | `3px` `teal` outline, `-4px` offset (inside the dark header) |
| filtered to nothing | empty row; count says `0 de 12` |
| loading | `aria-busy="true"` on the table, body at 50% opacity, toolbar disabled; no skeleton shimmer |

## Motion
| Event | Animation |
| --- | --- |
| sort, filter, page | rows replaced at once, no reordering animation |
| bulk bar in | drops from `-6px`, `120ms steps(2)`, once |
| row select | bg swap, no transition |
| `prefers-reduced-motion` | no animation, final state at once |

## Behavior
- Sortable header = a `<button>` inside the `<th>`; the `<th>` carries `aria-sort` (others have none). Click cycles asc → desc. Text sorts with `localeCompare("pt-BR")`, numbers and dates by value.
- Search filters as you type (debounce `150ms`), case and accent insensitive. Filtering or sorting goes back to page 1.
- Checkboxes have names ("Selecionar Feira"); select-all only affects visible (filtered) rows. Selection survives sort and page changes.
- Result count and range live in `role="status"`. Focus stays on the control that was used.
- Row actions: `flat` small buttons in the last column; never a click on the whole row that also has checkboxes.

## Never
- Zebra, sticky everything, centered numbers, horizontal scroll on the whole page.
- Sort icons without labels, more than one sorted column, a select-all that silently selects hidden pages.
- Infinite spinner or shimmer while loading.
