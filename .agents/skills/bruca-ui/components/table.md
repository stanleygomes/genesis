# Table

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober.**

## Visual
| Property | Value |
| --- | --- |
| Frame | `3px solid` `outline`, radius `0` (it is layout) |
| Header | bg `text`, color `bg`, Bevan `12px` uppercase, padding `10px 12px` |
| Rows | Alegreya `16px`, padding `10px 12px`, `2px solid` `outline` 25% between rows |
| Numbers | right-aligned, `tabular-nums`, Courier Prime `14px` |
| Zebra | none; hover row bg `mustard` 14% |
| Actions | `flat` small buttons in the last column |
| Overflow | own `overflow-x: auto` container on phones |

## Motion
| Event | Animation |
| --- | --- |
| row hover | bg swap, no transition |
| sort | rows reorder at once; sorted header gets `▲`/`▼` |

## Never
- Cards for tabular data, sticky everything, centered numbers.
