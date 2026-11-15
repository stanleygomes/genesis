# Giant number (layout)

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober.** One big figure that is the point of the section.

## When
- The single number the reader came for (balance, total, days left). One per screen.

## Visual
| Property | Value |
| --- | --- |
| Font | Bevan `clamp(44px, 8vw, 92px)`, line-height `1`, `tabular-nums` |
| Color | `text`, with **part** of it (unit, decimals, last digit) in `red` or `mustard` |
| Stroke | none in sober use; Limelight-style stroke only on a hero |
| Label | Special Elite `13px` `text-soft` above or below |

## Motion
| Event | Animation |
| --- | --- |
| first appear | counts up from `0` in `steps(12)`, `≤ 0.8s`, once |
| value change | new value swaps in `steps(2)`, no counting |
| `prefers-reduced-motion` | no animation, final state at once |

## Never
- More than one per screen, counting again on every render, decimals that wobble width (use tabular figures).
