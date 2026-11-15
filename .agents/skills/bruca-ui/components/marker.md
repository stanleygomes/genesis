# Marker

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober.** Highlighted text, like a highlighter stroke over a printed word.

## When
- The words that matter inside a paragraph: search hits, the key figure in a summary, a term being defined.
- Not for warnings (that is an [alert](alert.md)) and not for whole paragraphs.

## Visual
| Property | Value |
| --- | --- |
| Element | `<mark>` |
| Stroke | full line height behind the text, bg `mustard`, padding `0 .2em`, radius `2px 6px 3px 7px / 6px 3px 7px 2px` (uneven, like a felt tip) |
| Text | inherits font and size; color `on-mustard` (dark in both themes) |
| Line wrap | `box-decoration-break: clone` (each line gets its own stroke) |

## Variants
| Variant | Stroke | Text | Use |
| --- | --- | --- | --- |
| `mustard` (default) | `mustard` | `on-mustard` | highlight, search hit |
| `teal` | `teal` | `bg` | info, a term being defined |
| `underline` | `mustard` band, bottom `.35em` of the line only | unchanged `text` | long phrases, dense text |

## Motion
| Event | Animation |
| --- | --- |
| reveal (search result arrives, summary appears) | stroke drawn left → right, `background-size` `0 → 100%`, `300ms` `steps(4)`, once |
| page load / history | no animation |
| `prefers-reduced-motion` | no animation, final state at once |

## Behavior
- `<mark>` carries the meaning; search hits may add a hidden `resultado:` prefix for screen readers.

## Never
- Mustard stroke with `text` color on dark theme (use `on-mustard`), more than 3 marks per paragraph, red marks (red is error), marks on headings.
