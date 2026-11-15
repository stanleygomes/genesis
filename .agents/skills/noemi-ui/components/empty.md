# Empty

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober.**

## When
- A list, table or page with nothing in it yet, or a search with no results. Says why it is empty and the one next step.
- Not for errors (that is an [alert](alert.md)) and not while loading (that is a [skeleton](skeleton.md)).

## Visual
| Property | Value |
| --- | --- |
| Box | centered column, padding `32px 20px`, `3px dashed` `text-soft`, `radii-sm`, no bg, no shadow, max width `480px` |
| Icon | `48px` line drawing, `3px` strokes `text-soft`, no fill |
| Title | Bevan `20px` `text`, max `40` characters |
| Text | Alegreya `17px` `text-soft`, max width `44ch`, one or two sentences |
| Action | one `primary` [button](button.md) (or `neutral` when the screen already has a primary), gap `20px` above |

## Variants
| Variant | Change |
| --- | --- |
| `inline` | inside a table/list: no box, no icon, padding `20px`, title Bevan `15px`, text left aligned |
| `search` | title `Nada para "geladeira"`, text suggests what to change, action `Limpar filtros` (`neutral`) |
| `first-use` | bigger icon (`72px`), title says what this place is for, action creates the first item |

## Motion
| Event | Animation |
| --- | --- |
| appears | none (it is a state, not an event) |
| action creates the first item | empty leaves at once; the new item uses its own appear motion |
| `prefers-reduced-motion` | no animation, final state at once |

## Behavior
- Text in plain words about *this* list ("Nenhum gasto em novembro"), never a generic "Sem dados".
- Search empties are announced in the results' live region.

## Never
- Characters or illustrations that steal the screen, jokes in error-like empties, more than one action, an empty box with no text.
