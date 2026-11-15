# 🎬 Balloon

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Cartoon.** Speech balloons for chat with an agent or person. Many balloons count as one cartoon type.

## Visual
| Property | Value |
| --- | --- |
| Box | bg `balloon`, sketched outline, `radii`, shadow `4px 5px 0` |
| Tail | sketched triangle toward the speaker: left = agent, right = user |
| Text | Alegreya `17px`, max width `68ch`, padding `12px 16px` |
| User balloon | bg `mustard` 22% over `balloon` |
| Name/time | Special Elite `12px` `text-soft` above |

## Motion
| Event | Animation |
| --- | --- |
| new message | pops in: `scale(.85)` → `1`, `steps(3)` `180ms`, from the tail side |
| agent typing | three dots `steps(3)` + outline boil, **only while typing** |
| history on load | no animation |
| `prefers-reduced-motion` | no animation, final state at once |

## Never
- Balloons for non-chat content, tails pointing nowhere, boiling idle balloons.
