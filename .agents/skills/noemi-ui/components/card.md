# Card

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober** by default; 🎬 `tilted` variant is cartoon.

## When
- A separate object: a product, a person, a result. Not to wrap a section (that is the [grid](grid.md)).

## Visual (sober)
| Property | Value |
| --- | --- |
| Box | bg `card`, `3px solid` `outline`, `radii-sm`, shadow `4px 4px 0` |
| Padding | `20px` |
| Title | Bevan `18px` |
| Meta | Special Elite `13px` `text-soft` |
| Media | top, full bleed, `3px` bottom line |

## Variants
- `clickable`: whole card is one link; lifts on hover like a button.
- 🎬 `tilted`: sketched outline, `radii`, shadow `6px 7px 0`, `±0.5deg` alternating, straightens on hover. For featured items, not for long lists.

## Motion
| Event | Animation |
| --- | --- |
| hover (clickable) | lift `translate(-2px,-2px)`, shadow `6px 6px 0`, `steps(2)` `120ms` |
| hover (tilted) | straightens to `0deg`, `steps(2)` |
| `prefers-reduced-motion` | no animation, final state at once |

## Never
- Card in card, more than one button row, every card tilted in a grid of 20.
