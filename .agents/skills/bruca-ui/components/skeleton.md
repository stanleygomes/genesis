# Skeleton

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober.** Placeholder in the shape of the content while it loads.

## When
- First load of a list, card or page whose layout is known, taking more than `300ms`.
- Not for actions (that is a [spinner](spinner.md) or a busy [button](button.md)) and not when the content shape is unknown.

## Visual
| Property | Value |
| --- | --- |
| Block | bg `outline` `12%` over `card`, `radii-sm`, no border, no shadow |
| Text line | height `14px`, gap `10px`; last line `60%` wide |
| Title line | height `20px`, `50%` wide |
| Avatar / icon | `44px` square, `radii-sm` |
| Media | same `aspect-ratio` as the real media |
| Container | the real component's box (card, row), so nothing jumps when data arrives |

## States
| State | What changes |
| --- | --- |
| loading | container `aria-busy="true"`, hidden text `Carregando…` in a `role="status"` |
| loaded | skeleton replaced by the content, `aria-busy` removed |
| slow (`> 10s`) | swap for a message + `Tentar de novo` (never an eternal skeleton) |

## Motion
| Event | Animation |
| --- | --- |
| while loading | one lighter band (`balloon` `60%`) crosses the block, `1.2s` `steps(6)`, repeating **only while `aria-busy`** |
| data arrives | band stops at once; content appears `steps(2)` `120ms` |
| `prefers-reduced-motion` | still blocks, content appears at once |

## Never
- Skeleton that stays after data (or after an error), smooth gradient shimmer, skeleton for content that loads in under `300ms`, a skeleton that does not match the real layout.
