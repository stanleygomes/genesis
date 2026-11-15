# 🎬 Telegram

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Cartoon.** Confirmations and done-messages written as a telegram.

## When
- After an action finished ("PEDIDO ENVIADO STOP.") or before a destructive one (inside a [dialog](dialog.md)). One per screen.

## Visual
| Property | Value |
| --- | --- |
| Box | bg `card`, sketched outline, `radii`, shadow `6px 7px 0` |
| Top band | `TELEGRAMA` in Bevan `13px`, bg `text`, color `bg`, padding `6px 12px` |
| Body | Special Elite `15px` uppercase, line-height `1.6`, sentences end in " STOP." |
| Footer | sender + time right-aligned, Special Elite `12px` `text-soft` |
| Width | max `46ch` |

## Motion
| Event | Animation |
| --- | --- |
| appears | body types in: reveal by lines with `clip-path`, `steps(n)` per line, total `≤ 1.2s`, once |
| `prefers-reduced-motion` | no animation, final state at once |
| re-render | no typing again |

## Never
- Long paragraphs, telegrams for errors with fixes (use alert), typing that blocks the buttons.
