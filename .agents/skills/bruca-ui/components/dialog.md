# Dialog

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober.** Destructive confirmations may hold a [telegram](telegram.md).

## Visual
| Property | Value |
| --- | --- |
| Element | native `<dialog>` with `showModal()` |
| Backdrop | `outline` at 55%, no blur |
| Panel | bg `card`, `3px solid` `outline`, `radii-sm`, shadow `8px 8px 0` `outline`, width `min(520px, 100% - 32px)` |
| Header | Bevan `20px`, close icon button top-right |
| Body | Alegreya `17px`, padding `20px` |
| Footer | buttons right, `primary`/`danger` last, gap `12px`, top line `3px` `outline` |

## Motion
| Event | Animation |
| --- | --- |
| open | backdrop in `steps(3)` `150ms`; panel drops from `-12px` `steps(3)` `180ms` |
| close | reverse, `steps(2)` `120ms` |
| `prefers-reduced-motion` | no animation, final state at once |

## Behavior
- Focus goes to the first field (or the safe button on destructive dialogs); Esc closes; focus returns to the opener.

## Never
- Dialog over dialog, closing on backdrop click when it holds a form, full-screen error dialogs.
