# Input (text, textarea, select)

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober.**

## Visual
| Property | Value |
| --- | --- |
| Element | native `<input>`, `<textarea>`, `<select>`, always with a `<label for>` |
| Box | bg `balloon`, `3px solid` `outline`, `radii-sm`, shadow `3px 3px 0` `outline` |
| Size | min height `44px`, padding `10px 12px`; textarea min `4` lines, resize vertical |
| Text | Alegreya `17px`; placeholder italic `text-soft` |
| Label | Bevan `13px` uppercase above, gap `8px` |
| Help | Alegreya `15px` `text-soft` below |
| Select | custom arrow (two `outline` triangles via gradients), `appearance: none` |

## States
| State | What changes |
| --- | --- |
| focus | border and shadow turn `teal`, shadow `4px 4px 0`; no outline ring (the border is the ring) |
| invalid | border and shadow `red`, help text `red` with the fix ("Use 8 dígitos"), `aria-invalid="true"` + `aria-describedby` |
| disabled | bg `card`, text and border `text-soft`, no shadow |
| read-only | no shadow, dashed border |

## Motion
| Event | Animation |
| --- | --- |
| focus | border/shadow swap `steps(2)` `120ms` |
| validation fails (on submit or blur) | one shake: `translateX` ±4px, `0.3s steps(4)`, once |
| `prefers-reduced-motion` | no animation, final state at once |

## Never
- Floating labels, placeholder as label, shaking while typing, red before the user left the field.
