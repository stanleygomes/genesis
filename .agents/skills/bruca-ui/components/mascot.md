# 🎬 Mascot

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Cartoon.** Only if the user said yes.

## Visual
| Property | Value |
| --- | --- |
| Character | original rubber-hose figure tied to the product: pie-cut eyes, white 4-finger gloves, hose limbs |
| Drawing | inline SVG, `3px` `outline` strokes with `#sketch`, fills from the tokens |
| Size | `64–160px`, never covering content |
| Where | empty states, onboarding, 404, celebration |

## Motion
| Event | Animation |
| --- | --- |
| hover / real state | bob `steps(3)` or wave `steps(2)`, finite (`2–3` iterations) |
| celebration | one jump `steps(4)` `0.4s` |
| `prefers-reduced-motion` | no animation, final state at once |

## Never
- A lookalike of an existing character, a mascot on every screen, idle looping.
