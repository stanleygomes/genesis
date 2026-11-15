# Pagination

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober.**

## When
- Long lists where the position matters (statement pages, search results, [data-table](data-table.md)).
- Feeds read top to bottom: prefer a "Carregar mais" neutral [button](button.md) instead.

## Visual
| Property | Value |
| --- | --- |
| Element | `<nav aria-label="Paginação">` with a list of links (or buttons when it only changes the page state) |
| Page | min `36px` square, padding `0 8px`, Courier Prime `15px` bold, `tabular-nums`, bg `card`, `3px solid` `outline`, `radii-sm`, shadow `3px 3px 0` |
| Current | bg `text`, color `bg`, no shadow, sunk `translate(3px,3px)`, `aria-current="page"` |
| Prev / Next | same box, Bevan `12px` uppercase `+0.06em`, padding `0 12px`, arrow `←`/`→` beside the word |
| Gap | `8px`; ellipsis `…` plain Courier Prime `text-soft`, no box |
| Pages shown | first, last, current ±1, ellipses between (max 7 boxes) |
| Summary (optional) | Special Elite `13px` `text-soft`: `11–20 de 87` |

## Variants
- `numbered`: as above. Default.
- `compact` (phones, tight spots): Prev + `Página 3 de 12` (Special Elite `13px`) + Next.

## States
| State | What changes |
| --- | --- |
| hover | lift `translate(-2px,-2px)`, shadow `5px 5px 0` |
| active | sinks `translate(3px,3px)`, no shadow |
| focus-visible | `3px` `teal` outline, `3px` offset |
| current | `text` fill, sunk, not clickable |
| disabled (Prev on page 1, Next on the last) | bg `card`, label and outline `text-soft`, no shadow, `aria-disabled="true"` |

## Motion
| Event | Animation |
| --- | --- |
| hover / press | lift and sink, `120ms steps(2)` |
| page changes | new content and new current at once; focus stays on the control that was used |
| `prefers-reduced-motion` | everything instant |

## Behavior
- Tab through the controls, Enter (links) or Enter/Space (buttons) activates.
- Each box has an accessible name: `aria-label="Página 4"`; Prev/Next say "Página anterior"/"Próxima página".
- After the change, announce the summary in a `role="status"` region; scroll the list top into view.

## Never
- Pill or round page boxes, more than 7 boxes, hiding Prev/Next instead of disabling them, page change on hover.
