# Input group

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober.** An [input](input.md) glued to a prefix, suffix, icon, select or button: one box.

## When
- The unit or context belongs to the value: `R$`, `%`, `.com.br`, currency select.
- One action bound to one field: apply coupon, copy, search.
- Not for two independent fields side by side (use a form row, [field.md](field.md)).

## Visual
| Property | Value |
| --- | --- |
| Box | the group carries the border: bg `balloon`, `3px solid` `outline`, `radii-sm`, shadow `3px 3px 0`, overflow hidden |
| Inner input | no border, no shadow, no radius, transparent bg, min height `38px` (total `44px`) |
| Addon | bg `card`, padding `0 12px`, Courier Prime 700 `15px`; `3px` `outline` divider on the side touching the input |
| Icon | `18px` `text-soft`, no box, padding-left `12px`, `aria-hidden` |
| Select addon | bg `card`, `3px` divider right, same arrow as input select |
| Button | `neutral` (or `primary`) button with no shadow, no radius, no lift; `3px` divider left; icon-only for copy/clear |

## Variants
| Variant | Use |
| --- | --- |
| prefix | `R$ 1.240,00` |
| suffix | `15 % da renda`; suffix id in `aria-describedby` |
| icon | search |
| select | currency + amount |
| button | coupon + Aplicar, Pix key + copy |

## States
| State | What changes |
| --- | --- |
| focus (inner input) | group border and shadow `teal`, shadow `4px 4px 0` (`:focus-within`) |
| invalid | group border and shadow `red`, error line below ([field.md](field.md)) |
| disabled | group border `text-soft`, bg `card`, addons `text-soft`, no shadow |
| read-only | dashed border, no shadow |
| button hover | bg mixes `8%` `outline`; active `translate(1px,1px)`; focus ring inset (`-6px` offset) |

## Motion
| Event | Animation |
| --- | --- |
| focus | border/shadow swap `120ms steps(2)` |
| action fails (bad coupon) | group shakes once `±4px` `0.3s steps(4)` |
| `prefers-reduced-motion` | no animation, final state at once |

## Behavior
- Label points at the input (`for`), never at the group. Decorative prefix (`R$`) is `aria-hidden` when the label already says it.
- Enter in the input runs the inline button's action.
- Result message in the help line with `aria-live="polite"`.

## Never
- Two buttons in one group, addon text longer than two words, borders doubling between addon and input, shadow on the inner button, a lifting button inside the box.
