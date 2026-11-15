# Nav

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober** by default; 🎬 `program` variant is cartoon.

## When
- Top bar for a site or app sections. Sidebar for long lists (docs, settings): same items, stacked.

## Visual (sober)
| Property | Value |
| --- | --- |
| Bar | bg `bg`, `3px solid` `outline` bottom line, height `56px` |
| Items | Bevan `13px` uppercase `+0.06em`, color `text`, gap `20px` |
| Current | `3px` `mustard` underline (bar) or left bar + `mustard` 18% bg (sidebar), `aria-current="page"` |
| Hover | underline in `outline` |
| Mobile (< `860px`) | items scroll sideways in one row; no hamburger for ≤ 6 items |

## Variants
- 🎬 `program`: theater program list. Items Bevan `14px`, dotted leaders (`border-bottom: 2px dotted text-soft`) to a Special Elite page/meta on the right. For a landing or a menu page, not app chrome.

## Motion
| Event | Animation |
| --- | --- |
| current changes | underline jumps to the new item, `steps(2)` `120ms` |
| `prefers-reduced-motion` | no animation, final state at once |

## Never
- Tilted items, more than one current, icons without labels.
