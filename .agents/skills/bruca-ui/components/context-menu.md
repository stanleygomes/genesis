# Context menu

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober.** Panel, items and states are the [dropdown menu](dropdown-menu.md)'s; only the opening differs.

## When
- Shortcuts for actions on one object (a row, a card, a file) that are **also** reachable elsewhere (a `⋯` button on the row). Right-click is invisible: never the only way.

## Visual
| Property | Value |
| --- | --- |
| Target | the object itself; while its menu is open it gets a `3px` `mustard` inset line on the left (or bg `mustard` 14%) |
| Panel | same as dropdown menu: bg `card`, `3px solid` `outline`, `radii-sm`, shadow `4px 4px 0`, padding `6px`, min width `200px` |
| Position | top-left corner at the pointer; flipped left/up when it would leave the container or viewport (`8px` margin) |
| Items | same as dropdown menu, shortcut column recommended (it teaches the keyboard) |

## States
| State | What changes |
| --- | --- |
| target open | `mustard` marker on the target |
| item highlighted / disabled / danger | as in [dropdown-menu.md](dropdown-menu.md) |

## Motion
| Event | Animation |
| --- | --- |
| open | appears at once at the pointer, `steps(2)` `100ms` fade (no drop: it is where the pointer is) |
| close | instant |
| `prefers-reduced-motion` | no animation, final state at once |

## Behavior
- Opens on `contextmenu` (right-click, long-press) and on the keyboard with Shift+F10 or the Menu key on the focused target (then it opens at the target's bottom-left).
- `role="menu"`, first item highlighted on open; keys as in the dropdown menu. Esc, Tab, outside click, scroll or window blur close it; focus returns to the target.
- Only one context menu open at a time; a new right-click moves it.

## Never
- Replacing the browser menu on plain text, links or inputs (copy/paste must still work), actions found nowhere else, submenus.
