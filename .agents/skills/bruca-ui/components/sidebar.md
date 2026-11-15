# Sidebar

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober.** App chrome: the main navigation of an app used all day. For a docs table of contents, [nav](nav.md) sidebar is enough.

## When
- Apps with 6+ sections or grouped sections (Dinheiro, Agenda, Ajustes).
- 5 sections or fewer: top [nav](nav.md).

## Anatomy
1. **Head**: app name (Bevan) + collapse button.
2. **Groups**: label + items (icon, label, optional count).
3. **Foot**: [avatar](avatar.md) + name, or settings.

## Visual
| Property | Value |
| --- | --- |
| Element | `<nav aria-label="Principal">`, full height, `display: flex` column |
| Panel | width `248px`, bg `card`, `3px solid` `outline` right line, radius `0` (layout), no shadow |
| Head | height `56px` (matches the top bar), padding `0 12px 0 16px`, name Bevan `16px`, `3px` `outline` bottom line |
| Group label | Special Elite `12px` uppercase `+0.1em` `text-soft`, padding `16px 16px 6px` |
| Item | min height `40px`, padding `8px 12px`, margin `0 8px`, gap `12px`, Bevan `13px` uppercase `+0.06em`, color `text`, radius `radii-sm` |
| Icon | `20px`, stroke `2.5px` `currentColor`, square caps |
| Count | [badge](badge.md) `count` at the right end |
| Current | bg `mustard` 22%, `4px` `mustard` bar at the left edge of the panel, `aria-current="page"` |
| Foot | `3px` `outline` top line, padding `12px 16px` |
| Collapsed | width `68px`: labels, group labels and counts hidden (group label becomes a `2px` `outline` 25% line); count turns into an `8px` `mustard` dot with `2px` `outline` on the icon |
| Phones (< `860px`) | not docked: opens as a drawer from the left over a `#24170F` 55% backdrop (like [dialog](dialog.md)), from a menu icon button in the top bar |

## States
| State | What changes |
| --- | --- |
| item hover | bg `outline` 8% |
| item focus-visible | `3px` `teal` outline, `-3px` offset |
| current | `mustard` 22% bg + left bar |
| collapsed + hover/focus | label shown as a tooltip to the right (bg `text`, color `bg`, Bevan `12px`, `3px solid` `outline`, `radii-sm`) |

## Motion
| Event | Animation |
| --- | --- |
| collapse / expand | width snaps `150ms steps(3)`; labels hidden at the start of collapse, shown at the end of expand |
| drawer (phones) | slides in from `-100%` `180ms steps(3)`, backdrop fades `steps(3)` |
| `prefers-reduced-motion` | no animation, final state at once |

## Behavior
- Collapse button: `aria-expanded` + `aria-controls` the nav, `aria-label` "Recolher menu"/"Expandir menu"; state remembered (`localStorage`, wrapped in try/catch).
- Collapsed items keep their accessible name (`aria-label` on the link) and a tooltip on hover and focus.
- Drawer: focus moves into it, Esc closes, focus returns to the menu button.
- Items are links (`<a>`), Tab goes through them in order.

## Never
- Nested trees deeper than one group, icons without labels when expanded, hover-to-open fly-outs.
- Shadow or sketch on the panel, more than one current item, a sidebar on both sides.
