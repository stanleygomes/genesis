# Progress

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober** by default; 🎬 `film-reel` variant is cartoon.

## Visual (sober)
| Property | Value |
| --- | --- |
| Element | native `<progress>` or `role="progressbar"` with `aria-valuenow` |
| Track | height `16px`, bg `card`, `3px solid` `outline`, `radii-sm` |
| Fill | `teal` (or `mustard` for user goals), no gradient |
| Label | Special Elite `13px` right: `62%` or `3 de 5` |

## Variants
- `segmented`: fill cut into `8px` segments with `2px` gaps (steps of a task).
- 🎬 `film-reel`: track `22px` bg `text` with sprocket holes (`bg` `6px` squares top and bottom), fill `mustard`. For the one main progress of a page.
- `indeterminate`: diagonal `outline` stripes moving `steps(4)`, **only while working**.

## Motion
| Event | Animation |
| --- | --- |
| value changes | fill jumps to the new width in `steps(5)` `250ms` |
| indeterminate | stripes `0.6s steps(4)` repeating only while busy, stop at the end |
| `prefers-reduced-motion` | no animation, final state at once |

## Never
- Smooth easing, fake progress, indeterminate that never stops.
