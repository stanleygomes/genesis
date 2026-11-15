# Badge

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober.** The everyday status/label chip. The loud cartoon version is [stamp.md](stamp.md).

## Visual
| Property | Value |
| --- | --- |
| Box | `2px solid` `outline`, radius `4px`, padding `4px 8px 1px` (Special Elite sits high: the extra top padding centers the caps), no shadow |
| Text | Special Elite `12px` uppercase `+0.08em` |
| Height | `22px` |

## Variants
| Variant | Background | Text |
| --- | --- | --- |
| `neutral` | `card` | `text` |
| `ok` | `teal` | `bg` |
| `warn` | `mustard` | `on-mustard` |
| `error` | `red` | `bg` |
| `count` | `text` | `bg`, `tabular-nums`, min width `22px` centered |

## Motion
| Event | Animation |
| --- | --- |
| value changes (count) | swap `steps(2)` `120ms` |
| `prefers-reduced-motion` | no animation, final state at once |

## Never
- Tilt, sketch filter, more than one word or a number, color as the only signal (always a word).
