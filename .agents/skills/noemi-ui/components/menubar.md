# Menubar

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober.** The menus it opens are [dropdown menus](dropdown-menu.md).

## When
- Desktop-style apps with many commands (editor, the desktop app window): "Arquivo · Editar · Ver". Websites use [nav](nav.md); a single "Ações" button is a dropdown menu.

## Visual
| Property | Value |
| --- | --- |
| Bar | `role="menubar"`, height `40px`, bg `card`, `3px solid` `outline` (or only the bottom line when it spans the window), no radius, no shadow |
| Top item | Bevan `13px` uppercase `+0.06em`, padding `0 14px`, full bar height, no border |
| Separator between items | none; gap `0` |
| Menus | dropdown menu panel, left-aligned to the top item, `0` gap below the bar's line |

## States
| State | What changes |
| --- | --- |
| hover (bar closed) | bg `outline` at 8% |
| open / focused while open | bg `text`, color `bg` (like the selected tab) |
| focus-visible (bar closed) | `3px` `teal` outline, `-3px` offset (inside the bar) |
| disabled top item | color `text-soft` |

## Motion
| Event | Animation |
| --- | --- |
| first open | panel drops from `-6px`, `steps(2)` `120ms` |
| moving between open menus | instant (no drop each time) |
| `prefers-reduced-motion` | no animation, final state at once |

## Behavior
- One tab stop for the whole bar (roving `tabindex`). ArrowLeft/Right move between top items (wrap); ArrowDown, Enter or Space open the menu and highlight its first item.
- While a menu is open: ArrowLeft/Right close it and open the neighbour's; hovering another top item switches menus without a click.
- Inside a menu: keys of the dropdown menu. Esc closes the menu and focuses its top item; Tab closes everything and leaves the bar.

## Never
- Menubar on a marketing page or phone layout, top items that run an action directly (each one opens a menu), more than ~7 top items, icons in the top items.
