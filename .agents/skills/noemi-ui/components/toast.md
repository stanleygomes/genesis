# Toast

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober.**

## When
- Short news about something the user just did ("Salvo"). Never the only place an error shows.

## Visual
| Property | Value |
| --- | --- |
| Position | fixed bottom-right (`16px` + safe-area insets); bottom full-width on phones |
| Box | bg `text`, color `bg`, `3px solid` `outline`, `radii-sm`, shadow `4px 4px 0` |
| Kicker | Special Elite `12px` `mustard` (on dark bg) |
| Title | Bevan `15px` |
| Action | optional single `flat` button ("Desfazer") |
| Stack | max 3, newest on top, gap `8px` |

## Motion
| Event | Animation |
| --- | --- |
| in | slides up from `+16px`, `steps(4)` `200ms` |
| out | after `4s` (paused on hover/focus), slides down `steps(3)` `150ms` |
| `prefers-reduced-motion` | no animation, final state at once |

## Behavior
- `role="status"` (`aria-live="polite"`); no pointer events unless it has an action.

## Never
- Errors that need action, more than one action, toasts that cover the primary button.
