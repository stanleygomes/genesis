# Hover card

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober.**

## When
- A preview of what a link points to (a merchant, a person, an account) for pointer users. Optional sugar: the link must still work and the page must be complete without it.

## Visual
| Property | Value |
| --- | --- |
| Trigger | a normal link; dotted `2px` underline `text-soft` |
| Panel | bg `card`, `3px solid` `outline`, `radii-sm`, shadow `4px 4px 0` `outline`, padding `16px`, width `min(300px, 100vw - 32px)` |
| Position | absolute, `8px` below the link, left-aligned |
| Head | avatar square `40px` (bg `mustard`, `on-mustard` Bevan `16px` initials, `2px solid` `outline`, radius `4px`) + name Bevan `16px` + meta Special Elite `12px` `text-soft` |
| Body | Alegreya `16px`, max 2–3 lines; one figure in Courier Prime `tabular-nums` when it helps |

## States
| State | What changes |
| --- | --- |
| hidden | default |
| shown | after `500ms` hover on the link, or at once on keyboard focus |
| leaving | stays `300ms` after the pointer leaves, so the pointer can travel into the panel |

## Motion
| Event | Animation |
| --- | --- |
| show | drops from `-6px`, `steps(2)` `120ms` |
| hide | instant |
| `prefers-reduced-motion` | no animation, final state at once |

## Behavior
- Not announced as a popup: the panel content repeats what the link's page has. Give the panel an `id` and the link `aria-describedby` only if the text is short.
- Esc closes it; blur closes it; touch devices never show it (tap follows the link).

## Never
- Buttons or forms inside (that is a [popover](popover.md)), information found nowhere else, opening on click, several hover cards at once.
