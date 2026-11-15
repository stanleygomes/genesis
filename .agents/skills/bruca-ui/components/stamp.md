# 🎬 Stamp

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Cartoon.** A rubber stamp for a status that deserves attention. Everyday status is [badge.md](badge.md).

## When
- A verdict on a whole item: APROVADO, PAGO, VENCIDO, NOVO. At most **one loud** stamp per screen; others in ink outline.

## Visual
| Property | Value |
| --- | --- |
| Border | double: `3px` + `1px` inner at `3px` gap, sketched (`#sketch`) |
| Text | Bevan `12px` uppercase `+0.1em` |
| Padding | `6px 12px` |
| Tilt | `rotate(-3deg)` |
| Default | color `outline`, transparent bg |
| Loud | `red` (error/expired) or `mustard` (new) border + text; ok = `teal` |
| Texture | faint ink gaps: `mask` with a noise/dots pattern at ~90% |

## Motion
| Event | Animation |
| --- | --- |
| appears (status just changed) | "thunk": from `scale(1.5) rotate(-8deg)` opacity `0` to final, `0.24s steps(3)`, once |
| already there on load | no animation |
| `prefers-reduced-motion` | no animation, final state at once |

## Never
- A stamp on every row, stamping again on re-render, stamps as buttons.
