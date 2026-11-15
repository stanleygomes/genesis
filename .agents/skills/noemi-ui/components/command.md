# Command (palette)

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober.** A [dialog](dialog.md) with a search field and a grouped list.

## When
- Apps with many places and actions: jump to a page, run an action, find a record, with the keyboard (`Ctrl`/`⌘`+`K`). Always also reachable by a visible button (search icon in the header). Not for websites with five pages.

## Visual
| Property | Value |
| --- | --- |
| Element | native `<dialog>` with `showModal()`; backdrop `outline` at 55%, no blur |
| Panel | bg `card`, `3px solid` `outline`, `radii-sm`, shadow `8px 8px 0`, width `min(600px, 100% - 32px)`, top `12vh` (not centered: the list grows down) |
| Search row | search icon `20px` + borderless input Alegreya `19px`, height `56px`, padding `0 16px`, bottom line `3px` `outline` |
| List | padding `6px`, max height `min(360px, 60vh)`, scrolls |
| Group label | Special Elite `12px` uppercase `+0.08em` `text-soft`, padding `10px 10px 4px` |
| Item | min height `40px`, padding `8px 10px`, radius `4px`, icon `16px` + label Alegreya `16px` (match in `700`) + shortcut or meta Courier Prime `13px` `text-soft` on the right |
| Footer | Special Elite `12px` `text-soft`, padding `8px 16px`, top line `2px` `outline` 25%: "↑↓ mover · Enter abrir · Esc fechar" |
| Empty | Alegreya italic `text-soft`, centered, padding `28px` ("Nada encontrado pra “xyz”.") |

## States
| State | What changes |
| --- | --- |
| item active | bg `mustard`, text, icon and shortcut `on-mustard` |
| loading results | one line "Buscando..." with dots `steps(3)` only while the request runs |
| empty | empty line, no list |

## Motion
| Event | Animation |
| --- | --- |
| open | backdrop `steps(3)` `150ms`; panel drops from `-12px`, `steps(3)` `180ms` (as dialog) |
| filtering | list updates at once, first item active |
| close | instant |
| `prefers-reduced-motion` | no animation, final state at once |

## Behavior
- `Ctrl`/`⌘`+`K` toggles it anywhere (not while another dialog is open); the opener button works too. Opens with an empty field focused and recent/suggested items listed.
- Input `role="combobox" aria-expanded="true" aria-controls aria-autocomplete="list"`; list `role="listbox"`, groups `role="group"` + `aria-labelledby`, items `role="option"`; active item via `aria-activedescendant`.
- ArrowUp/Down move (wrap), Home/End stay in the field (text caret), Enter runs the active item and closes, Esc clears the text first, then closes; focus returns to the opener. Backdrop click closes.
- Filtering is case- and accent-insensitive, matches words anywhere, keeps group order.

## Never
- The only way to reach a feature, more than ~8 results per group without "ver todos", destructive actions run without confirmation, a palette that opens on single-letter keys.
