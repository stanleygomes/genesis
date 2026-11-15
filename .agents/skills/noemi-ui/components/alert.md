# Alert

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober** by default; 🎬 `ribbon` variant is cartoon.

## When
- A message inside the page that stays until solved or dismissed (form error summary, outage, tip). Short-lived info is a [toast](toast.md).

## Visual (sober)
| Property | Value |
| --- | --- |
| Box | bg `card`, `3px solid` `outline`, `radii-sm`, shadow `4px 4px 0` |
| Left bar | `8px` solid in the meaning color (inside the border) |
| Title | Bevan `15px` |
| Body | Alegreya `17px`, max `68ch` |
| Icon | `20px`, meaning color |
| Close | small `neutral flat` icon button, top-right |

## Variants
| Variant | Bar/icon |
| --- | --- |
| `info` | `teal` |
| `warn` | `mustard` |
| `error` | `red`, `role="alert"` |
| `ok` | `teal` with check icon |
| 🎬 `ribbon` | sketched card with a `14px` ribbon banner on top (`red` bg, `bg` Bevan `12px`, notched ends), `●` markers in `teal`, numbers in a Special Elite chip. For announcements on a landing, not for form errors |

## Motion
| Event | Animation |
| --- | --- |
| appears | drops from `-6px`, `steps(2)` `120ms` |
| dismiss | collapses height in `steps(3)` `150ms` |
| `prefers-reduced-motion` | no animation, final state at once |

## Never
- Full-screen errors, more than one alert of the same kind, auto-dismissing an error.
