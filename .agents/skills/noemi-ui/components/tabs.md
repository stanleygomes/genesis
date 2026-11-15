# Tabs

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober.**

## Visual
| Property | Value |
| --- | --- |
| Element | `role="tablist"` / `tab` / `tabpanel` |
| Tab | Bevan `13px` uppercase, padding `10px 16px`, bg `card`, `3px solid` `outline`, radius `6px 6px 0 0`, no bottom border |
| Selected | bg `text`, color `bg`; sits on the panel's top line |
| Panel | `3px solid` `outline`, bg `card`, padding `20px` |
| Overflow | tabs scroll sideways on phones |

## Motion
| Event | Animation |
| --- | --- |
| switch | new panel appears at once; selected tab swaps `steps(2)` `120ms` |
| `prefers-reduced-motion` | no animation, final state at once |

## Behavior
- Arrow keys move between tabs, Home/End jump, Tab goes into the panel.

## Never
- Blinking markers, nested tabs, tabs as page navigation.
