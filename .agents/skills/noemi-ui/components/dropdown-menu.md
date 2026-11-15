# Dropdown menu

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober.** Owns the **menu panel and menu item** look that [context-menu](context-menu.md) and [menubar](menubar.md) reuse.

## When
- A short list of **actions** behind one button ("Ações", "⋯" on a row). Picking a **value** is a [select](select.md); free content (form, text) is a [popover](popover.md).

## Visual
| Property | Value |
| --- | --- |
| Trigger | [button](button.md) (`neutral`, or icon-only `⋯` with `aria-label`), caret icon `12px` after the label |
| Panel | bg `card`, `3px solid` `outline`, `radii-sm`, shadow `4px 4px 0` `outline`, padding `6px` |
| Size | min width `200px` (or the trigger's width), max width `min(320px, 100vw - 32px)` |
| Position | absolute, `8px` below the trigger, left edges aligned (right-aligned when the trigger sits at the right edge) |
| Item | min height `36px` (`44px` on `pointer: coarse`), padding `6px 10px`, radius `4px`, Alegreya `16px/1.3`, color `text` |
| Item icon | `16px` slot on the left, gap `10px`; check/radio items use the same slot |
| Shortcut | Courier Prime `13px` `text-soft`, pushed right |
| Group label | Special Elite `12px` uppercase `+0.08em` `text-soft`, padding `8px 10px 4px` |
| Separator | `2px` line, `outline` at 25%, margin `6px 4px` |

## Variants
| Variant | Look | Use |
| --- | --- | --- |
| action item | as in Visual | default |
| checkbox item | `✓` in the icon slot when on (`menuitemcheckbox`) | toggles ("Mostrar centavos") |
| radio item | filled dot `8px` in the icon slot (`menuitemradio`) | one of a few views ("Por mês" / "Por ano") |
| danger item | text `red`; highlighted: bg `red`, text `bg` | destructive, always last, after a separator, then confirmed |

## States
| State | What changes |
| --- | --- |
| highlighted (hover or keyboard focus) | bg `mustard`, text and shortcut `on-mustard`. This fill **is** the focus indicator: no teal ring inside a menu |
| disabled | text `text-soft`, never highlighted, `aria-disabled="true"` (still reachable by arrows, not activatable) |
| trigger open | `aria-expanded="true"`: trigger sunk onto its shadow (active look), caret flipped |

## Motion
| Event | Animation |
| --- | --- |
| open | panel drops from `-6px`, `steps(2)` `120ms` |
| close | instant |
| highlight moves | instant (no transition) |
| caret | flips `steps(2)` `120ms` |
| `prefers-reduced-motion` | no animation, final state at once |

## Behavior
- WAI-ARIA menu button: trigger `aria-haspopup="menu"` + `aria-expanded` + `aria-controls`; panel `role="menu"`, items `role="menuitem"` (or `menuitemcheckbox`/`menuitemradio` with `aria-checked`), separators `role="separator"`.
- Enter, Space or ArrowDown on the trigger opens and highlights the first item; ArrowUp opens on the last.
- Inside: ArrowUp/Down move (wrap), Home/End jump, a letter jumps to the next item starting with it, Enter/Space activate and close (checkbox/radio items stay open), Esc or Tab close.
- Closes on outside click; focus returns to the trigger (except on Tab).

## Never
- Nested submenus more than one level deep (prefer none), more than ~9 items (use a [command](command.md) palette), navigation links disguised as menu items, a danger item without confirmation, menus that open on hover.
