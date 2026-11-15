# 🎬 Marquee

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Cartoon** (the cinema sign with bulbs); the `ticker` variant is sober.

## When
- 🎬 sign: one headline of a showcase page or a big moment ("Orçamento fechado"). One per screen, never in an app used all day.
- `ticker`: a short line of news that does not fit (`3–6` items). If it fits, it does not move.

## Visual (🎬 sign)
| Property | Value |
| --- | --- |
| Frame | bg `card`, sketched outline, `radii`, shadow `6px 7px 0`, padding `14px 18px` |
| Bulbs | rows top and bottom, `10px` circles `mustard` with `2px` `outline` ring, every `20px`; unlit bulbs `mustard` `30%` over `card` |
| Kicker | optional, Bevan `12px` uppercase `+0.12em`, centered above the board (`AGORA EM CARTAZ`) |
| Board | bg `text`, color `bg`, `3px solid` `outline`, radius `4px`, padding `12px 20px`, thin `bg` `15%` line between rows (letter slots) |
| Letters | Bevan `clamp(18px, 3vw, 26px)` uppercase `+0.12em`, centered, `1–3` rows, one row = one line |

## Variants
| Variant | Change |
| --- | --- |
| 🎬 sign | as above |
| `ticker` (sober) | band `40px` high, bg `text`, color `bg`, `3px solid` `outline` top and bottom, Special Elite `14px` items separated by `·` `mustard` |

## States
| State | What changes |
| --- | --- |
| bulbs idle | all lit, still |
| ticker hover / focus inside | paused where it is |
| ticker fits | static, no copy, no motion |

## Motion
| Event | Animation |
| --- | --- |
| sign appears / the moment happens | bulbs chase: lit and unlit swap `0.3s` `steps(2)` × `6` (`1.8s`), then all lit |
| ticker | only when it overflows: `2` passes at about `60px/s`, stepped at `10` frames/s, then rests at the start; the one motion allowed past `1.8s`, because reading speed sets it |
| `prefers-reduced-motion` | sign still and lit; ticker static, wraps to more lines |

## Behavior
- Sign: the board text is the real text (a heading or `<p>`); bulbs are `aria-hidden`.
- Ticker: content duplicated once for the seamless pass, the copy `aria-hidden`; a link inside pauses it on focus.

## Never
- Infinite scroll, bulbs blinking forever, more than one sign per screen, flashing faster than `3` times per second, the ticker as the only place for important news.
