# Toggle (toggle button and toggle group)

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober.** A button that stays on or off, and a joined set of them.

## When
- Toggle: a view filter or marker that applies at once (Só pendentes, Favorito, hide values).
- Group, single choice: switch between views/periods (Dia · Semana · Mês). Up to 5 short options; more is a select.
- Group, multiple: filters that combine (Pix, Cartão, Boleto).
- A setting saved somewhere is a [switch](choice.md); an action is a [button](button.md).

## Visual
| Property | Value |
| --- | --- |
| Toggle element | `<button aria-pressed>` |
| Toggle box | min height `40px`, padding `8px 14px`, bg `card`, `3px solid` `outline`, `radii-sm`, shadow `3px 3px 0`; label Bevan `13px` uppercase `+0.06em`; icon `16px`, gap `8px` |
| Group element | single: `role="radiogroup"` + `role="radio"` items with `aria-checked`; multiple: `role="toolbar"` + `aria-pressed` items; always `aria-label` |
| Group box | one piece: bg `card`, `3px` `outline`, `radii-sm`, shadow `3px 3px 0`, overflow hidden; items divided by `3px` `outline`, min height `38px`, padding `8px 14px`, Bevan `13px` |

## Variants
| Variant | Value |
| --- | --- |
| default | `40px` |
| `sm` | `32px`, Bevan `12px`, shadow `2px 2px 0`; group items `28px` |
| icon-only | square, `aria-label` required |

## States
| State | What changes |
| --- | --- |
| off | as in Visual |
| hover | toggle lifts `translate(-2px,-2px)`, shadow `5px 5px 0`; group item bg mixes `12%` `outline` |
| on | toggle sinks `translate(3px,3px)`, no shadow, bg `teal`, label `bg`; group item bg `teal`, label `bg`, inner shadow `inset 3px 3px 0` `outline` at `45%` |
| focus-visible | `3px` `teal` outline: toggle `3px` offset; group item inset (`-6px`), `bg` color when the item is on |
| disabled | label and border `text-soft`, no shadow, no lift |

## Motion
| Event | Animation |
| --- | --- |
| press / release | sink or lift `120ms steps(2)`, bg swap same timing |
| `prefers-reduced-motion` | no animation, final state at once |

## Behavior
- Toggle: Enter/Space flip `aria-pressed`. Label stays the same in both states (no "Ligado/Desligado" text swap).
- Group: one tab stop (roving `tabindex`). Arrows move (wrap), Home/End go to the ends.
- Single choice follows the radio pattern: moving with arrows also selects; one is always on.
- Multiple: arrows only move focus, Space/Enter flips the focused item; zero on is allowed.

## Never
- `mustard` for the on state (on = `teal`, mustard is action), toggles that need a save button, a group mixing single and multiple, more than 5 items, icon-only without label.
