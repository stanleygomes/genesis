# Tabs

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober.**

## Visual
| Property | Value |
| --- | --- |
| Element | `role="tablist"` / `tab` / `tabpanel` |
| Tablist | flex, gap `8px`, bottom-aligned, overlaps the panel by `3px` (`margin-bottom: -3px`, above it) |
| Tab (inactive) | recessed: Bevan `13px` uppercase, padding `8px 16px`, bg `bg`, label `text-soft`, `3px solid` `outline` all around (its bottom line is the panel's top line), radius `6px 6px 0 0` |
| Selected | folder tab: same bg as the panel (`card`), label `text`, taller (padding `12px 16px`), bottom border in `card` so the panel line disappears under it, `5px` `mustard` bar inset on top. Tab and panel read as one shape |
| Panel | `3px solid` `outline`, bg `card`, padding `20px` |
| Hover (inactive) | bg mixes `8%` `outline`, label `text` |
| Overflow | tabs scroll sideways on phones |

## Motion
| Event | Animation |
| --- | --- |
| switch | new panel appears at once; selected tab swaps `steps(2)` `120ms` |
| `prefers-reduced-motion` | no animation, final state at once |

## Behavior
- Arrow keys move between tabs, Home/End jump, Tab goes into the panel.

## Never
- A selected tab darker or louder than the panel (dark fill on the active tab makes the inactive one, same color as the panel, look selected).
- Blinking markers, nested tabs, tabs as page navigation.
