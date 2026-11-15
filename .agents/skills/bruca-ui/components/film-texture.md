# 🎬 Film texture

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Cartoon.** Old-film feel over the whole page. Optional, never on by default for apps used all day.

## Visual
| Property | Value |
| --- | --- |
| Layer | fixed overlay, `inset: 0`, `pointer-events: none`, above content |
| Grain | canvas ~`320×200`, ~2600 specks in `text` color (alpha ≤ `.12`), canvas opacity `.4`, scaled up |
| Vignette | `transparent 68% → rgb(70 40 15/.3)` (`.5` black on dark) |

## Motion
| Event | Animation |
| --- | --- |
| load / theme change | paint once |
| showcase pages only | animated grain, scratches, brightness flicker |

## Never
- Animated grain in an app, grain over forms at full strength, a second texture layer.
