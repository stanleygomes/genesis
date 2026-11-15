# Popover

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober** by default; 🎬 `balloon` variant is cartoon.

## When
- Small, non-modal content anchored to a button: a quick filter, a date range, a short form, details the user asked for. Actions only: [dropdown menu](dropdown-menu.md). A sentence on hover: [tooltip](tooltip.md). Blocks the page: [dialog](dialog.md).

## Visual (sober)
| Property | Value |
| --- | --- |
| Panel | bg `card`, `3px solid` `outline`, `radii-sm`, shadow `4px 4px 0` `outline`, padding `16px` |
| Width | `min(320px, 100vw - 32px)` |
| Position | absolute, `8px` below the trigger, left edges aligned (right-aligned near the right edge); no arrow |
| Title | Bevan `15px`, close icon button (`neutral flat` small) top-right |
| Body | Alegreya `16px`; fields as in [input](input.md); gap `12px` |
| Footer | optional, buttons right, `primary` last, small buttons |

## Variants
| Variant | Look | Use |
| --- | --- | --- |
| sober | as above | filters, quick edits, details |
| 🎬 `balloon` | bg `balloon`, sketched outline (`#sketch`), `radii`, shadow `4px 5px 0`, sketched tail (`18×14px`) pointing up at the trigger, Alegreya `16px`, one `primary` small button ("Entendi") | onboarding tip / coach mark pointing at a new feature: once per feature, never in daily use. Counts as the screen's [balloon](balloon.md) cartoon type |

## States
| State | What changes |
| --- | --- |
| trigger open | `aria-expanded="true"`, trigger sunk (active look) |
| closed | panel `hidden` |

## Motion
| Event | Animation |
| --- | --- |
| open | drops from `-6px`, `steps(2)` `120ms` |
| 🎬 balloon open | pops `scale(.85)` → `1` from the tail, `steps(3)` `180ms`; outline still (no boil) |
| close | instant |
| `prefers-reduced-motion` | no animation, final state at once |

## Behavior
- Trigger: `<button aria-expanded aria-controls>`; panel `role="dialog"` + `aria-labelledby` (its title), **not** modal: focus moves to the first field (or the panel itself, `tabindex="-1"`), Tab flows normally.
- Esc and outside click close; focus returns to the trigger. Clicking the trigger again toggles it.
- One popover open at a time.

## Never
- Popover over popover, a form so long it scrolls (use a [drawer](drawer.md) or dialog), opening on hover, balloon variant for errors or daily features, two balloons on screen.
