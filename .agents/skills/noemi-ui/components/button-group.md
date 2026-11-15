# Button group

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober.** [Buttons](button.md) joined into one bar, and the split button (action + menu of variations). Loose buttons with a `12px` gap are just buttons, not this.

## When
- Actions on the same object that read as one control: previous · Hoje · next; export CSV · PDF · OFX.
- Split: one main action with close variations (Salvar / Salvar e criar outro / Salvar como rascunho).
- Choosing a state (view, period) is a [toggle group](toggle.md), not this.

## Visual
| Property | Value |
| --- | --- |
| Element | `role="group"` + `aria-label` wrapping native buttons |
| Group | inline-flex, `radii-sm` on the outer corners only, **one** shadow on the group (`4px 4px 0`; `sm` `3px 3px 0`) |
| Items | button look without own shadow or radius; borders overlap (`-3px` margin) so dividers stay `3px` |
| Mix | all `neutral`, or one `primary` (last); never `danger` inside a group |
| Split caret | same variant as the action, padding `0 12px`, `14px` chevron, `aria-label`, `aria-haspopup="menu"`, `aria-expanded` |
| Menu | below the group, left-aligned, `8px` gap: bg `card`, `3px` `outline`, `radii-sm`, shadow `4px 4px 0`, min width `240px`, padding `6px 0`; items Alegreya `17px`, padding `8px 14px` |

## Variants
| Variant | Use |
| --- | --- |
| horizontal | default |
| `vertical` | stacked list of actions (sort by), items left-aligned, dividers top |
| `sm` | small buttons, smaller group shadow |
| split | action + caret + menu |

## States
| State | What changes |
| --- | --- |
| hover | **no lift** (it would break the bar): bg mixes `8%` `outline` |
| active | `translate(1px,1px)` |
| focus-visible | `3px` `teal` outline, `3px` offset, item raised above neighbors |
| pressed (`aria-pressed`) | bg `teal`, label `bg`, inner shadow `inset 3px 3px 0` `outline` at `45%`, no sink |
| disabled | that item's label `text-soft`, group keeps its shadow |
| menu item hover/focus | bg `22%` `mustard`; keyboard focus adds a `4px` `teal` inset bar on the left |

## Motion
| Event | Animation |
| --- | --- |
| press | `120ms steps(2)` |
| menu opens | drops from `-6px`, `120ms steps(2)`; caret chevron flips `120ms steps(2)` |
| `prefers-reduced-motion` | no animation, final state at once |

## Behavior
- Each item is a normal Tab stop (it is a group of buttons, not a toolbar).
- Split menu: click or ArrowDown on the caret opens and focuses the first item (ArrowUp: last). Arrows move (wrap), Home/End, Enter runs, Escape closes and returns focus to the caret, Tab or click outside closes.
- The action half always runs the default; the menu only holds variations of it.

## Never
- More than 5 items, two `primary` in one group, lifting items inside the bar, menus with unrelated actions, nested menus.
