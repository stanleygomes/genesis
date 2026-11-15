# Calendar

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober.** One month in a grid, **week starts on Sunday**, pt-BR month and weekday names. Inline on the page, or inside a [date-picker](date-picker.md).

## When
- Picking a day or a range when seeing the month helps (due dates, vacation, agenda).
- Typing a known date (birthday) is just an input with dd/mm/aaaa.

## Visual
| Property | Value |
| --- | --- |
| Box | bg `card`, `3px solid` `outline`, `radii-sm`, shadow `4px 4px 0`, padding `12px 12px 16px`, gap `12px`; `role="group"` + label |
| Head | prev/next: `neutral flat` small icon buttons ("Mês anterior"/"Próximo mês"); title centered Bevan `15px` "Novembro 2026", `aria-live="polite"` |
| Grid | `<table role="grid">` labelled by the title; `2px` spacing; always 6 weeks (height never jumps) |
| Weekdays | `D S T Q Q S S` Special Elite `12px` uppercase `text-soft`, `<abbr title="domingo">` |
| Day | `<button>` `40×40px` (`36px` under `420px`), Courier Prime `15px` `tabular-nums`, `2px` transparent border, `radii-sm`; `aria-label` "20 de novembro de 2026, sexta" |
| Mark | `6px` square dot under the number: `red` = bill due, `teal` = income/event; add a legend (Special Elite `12px`) |

## Variants
| Variant | Use |
| --- | --- |
| single | one selected day |
| range | start and end days selected, days between filled |
| with marks | dots on days with something (and a legend) |

## States (day)
| State | What changes |
| --- | --- |
| default | no border |
| hover | border `outline`, bg `balloon` |
| today | `aria-current="date"`, border `outline`, bold |
| selected / range ends | bg `mustard`, text `on-mustard` bold, border `outline`, shadow `2px 2px 0`; cell `aria-selected="true"` |
| in range | bg `30%` `mustard`, no radius (reads as a band) |
| other month | `text-soft` at `60%`; clicking it goes to that month |
| disabled (outside min/max) | `text-soft`, line-through, not clickable |
| focus-visible | `3px` `teal` outline, `1px` offset |

## Motion
| Event | Animation |
| --- | --- |
| month change | grid enters from `±8px` (direction of travel) with fade, `150ms steps(3)` |
| day picked | day pops from `scale(.85)`, `120ms steps(2)` |
| hover | `120ms steps(2)` |
| `prefers-reduced-motion` | no animation, final state at once |

## Behavior
- One tab stop in the grid (roving `tabindex`: selected day, else today, else the 1st).
- Arrows ±1 day / ±1 week (crossing months), Home/End start/end of the week, PageUp/PageDown ±1 month, Shift+PageUp/PageDown ±1 year, Enter/Space pick.
- Range: first pick = start, second = end; picking before the start restarts. Show the chosen range in text below ("21/12/2026 a 30/12/2026").
- Dates shown to people are dd/mm/aaaa.

## Never
- Monday-first weeks, English names, month grids that change height, color as the only mark meaning (legend), round pill days, smooth slide transitions.
