# Choice (checkbox, radio, switch)

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober.**

## Visual
| Property | Checkbox | Radio | Switch |
| --- | --- | --- | --- |
| Element | `<input type=checkbox>` | `<input type=radio>` in a `<fieldset>` | `<button role="switch" aria-checked>` or checkbox |
| Box | `22px`, `3px solid` `outline`, radius `4px`, bg `balloon` | `22px` circle, same border | track `44×24px`, `3px` border, radius `999px` |
| Checked | bg `mustard`, check mark `3px` `on-mustard` | `10px` `outline` dot | track bg `teal`, knob right |
| Knob | — | — | `14px` square-ish (`radii-sm`), bg `outline` |
| Shadow | `2px 2px 0` `outline` | same | same |
| Label | Alegreya `17px` right of the box, gap `12px`, whole row clickable | same | same |

## States
| State | What changes |
| --- | --- |
| hover | shadow `3px 3px 0` |
| focus-visible | `3px` `teal` ring, `3px` offset |
| disabled | border `text-soft`, bg `card`, label `text-soft` |
| indeterminate (checkbox) | `3px` bar instead of the check |

## Motion
| Event | Animation |
| --- | --- |
| check | mark appears in `steps(3)` `150ms` (draws left to right) |
| switch | knob jumps across in `steps(3)` `150ms` |
| `prefers-reduced-motion` | no animation, final state at once |

## Never
- Custom `div` without the native input or `role`, toggles that save without saying so, switch inside a form that needs submit (use checkbox).
