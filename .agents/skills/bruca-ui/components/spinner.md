# Spinner

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober** by default; 🎬 `film-reel` variant is cartoon.

## When
- Waiting with unknown duration on one area: a search, a fetch inside a panel.
- Known duration: [progress](progress.md). Known layout: [skeleton](skeleton.md). Inside a button: the button's own loading state.

## Visual (sober)
| Property | Value |
| --- | --- |
| Element | `role="status"` wrapper with a hidden `Carregando…` (or the visible label) |
| Ring | circle `24px` (small `16px`, large `40px`), `3px solid` `outline` at `25%`, one quarter `3px` `outline` solid |
| Label | optional, right, Special Elite `13px` `text-soft` (`buscando vagas…`) gap `12px` |

## Variants
| Variant | Change |
| --- | --- |
| sizes | `16px` inline in text, `24px` default, `40px` panel |
| `accent` | the solid quarter in `mustard` (one per screen) |
| 🎬 `film-reel` | `48–64px` reel: disc bg `card`, sketched `3px` `outline`, `5` round holes `bg`, hub `outline`, short film strip `text` leaving it; for the one big wait of a page |

## States
| State | What changes |
| --- | --- |
| busy | visible and turning |
| idle / done | removed from the page (not hidden and still turning) |
| quick work | shows only after `300ms`, so fast answers never flash it |

## Motion
| Event | Animation |
| --- | --- |
| busy (sober) | ring turns `0.8s` `steps(8)`, repeating **only while busy** |
| busy (🎬 reel) | reel turns `1.2s` `steps(12)` (30° ticks; `5` holes so every tick reads as forward), repeating **only while busy**; outline does not boil |
| done | stops and leaves at once |
| `prefers-reduced-motion` | no rotation: still ring + label (the label is required then) |

## Never
- Smooth linear spin, spinner left on screen after the work, a spinner per row of a list, the reel more than once per page.
