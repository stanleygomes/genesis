# Drawer (bottom drawer, side sheet)

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober.** A [dialog](dialog.md) glued to an edge.

## When
- `bottom` drawer: details or a short choice on phones (a transaction's details, share options), content that is a level below the page.
- `side` sheet: filters, edit forms and detail panels on desktop, where the page should stay visible behind. Short confirmations stay in a dialog.

## Visual
| Property | Value |
| --- | --- |
| Element | native `<dialog>` with `showModal()`; backdrop `outline` at 55%, no blur |
| Panel | bg `card`, color `text`, `3px solid` `outline` on the inner edge(s) only, **no shadow** (it sits on the screen edge) |
| Bottom | glued to the bottom, width `min(720px, 100%)` centered, max height `85vh`, top corners `12px 14px 0 0`, `3px` line on top and sides |
| Handle (bottom) | `48×6px` bar, `outline`, radius `3px`, centered, `10px` from the top; decorative |
| Side | glued to the right (left in RTL), full height, width `min(420px, 100% - 32px)`, no radius, `3px` line on the left |
| Header | Bevan `20px`, close icon button top-right, padding `16px 20px 0` |
| Body | Alegreya `17px`, padding `16px 20px`, scrolls on its own |
| Footer | sticky bottom, buttons right, `primary` last, gap `12px`, top line `3px` `outline`, padding `14px 20px` |

## Variants
| Variant | Use |
| --- | --- |
| `bottom` | phones; on wide screens prefer `side` |
| `side` | desktop filters, forms, details |

## Motion
| Event | Animation |
| --- | --- |
| open (bottom) | slides up from `100%`, `steps(4)` `200ms`; backdrop `steps(3)` `150ms` |
| open (side) | slides in from the right, `steps(4)` `200ms` |
| close | reverse, `steps(3)` `150ms` |
| `prefers-reduced-motion` | no animation, final state at once |

## Behavior
- `aria-labelledby` the header. Focus goes to the first field (or the close button); Tab is trapped (native modal); Esc closes; focus returns to the opener.
- Backdrop click closes, **except** when it holds an edited form (then ask, as in dialog).
- Bottom drawer may also close with a swipe down on the handle area; the close button is always there.
- Page scroll is locked while open.

## Never
- Drawer over drawer, a bottom drawer taller than `85vh`, a side sheet on phones (use bottom), navigation menus as a sheet with nothing else (that is [nav](nav.md)), shadows on the glued edge.
