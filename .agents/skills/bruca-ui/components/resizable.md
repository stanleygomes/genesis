# Resizable

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober.** Split panes with a draggable handle.

## When
- Two views the owner compares side by side or wants to size: list + detail, editor + preview, chat + document.
- Not to fix a layout you could just choose (use the [grid](grid.md)).

## Visual
| Property | Value |
| --- | --- |
| Group | `display: flex` (row = side by side, column = stacked), `3px solid` `outline`, radius `0` (layout) |
| Pane | `overflow: auto`, `min-width: 0`, bg `card` (or `bg`); its own padding `16px` |
| Handle | `role="separator"`, hit area `12px` across the split, full length; visible line `3px` `outline` in the middle |
| Grip | centered `10px × 32px` (rotated for stacked), bg `card`, `3px solid` `outline`, `radii-sm` with two `2px` `outline` ticks inside |
| Cursor | `col-resize` (row) / `row-resize` (column) |
| Limits | each pane min `20%` (or a px min), default from the design; collapse threshold optional |

## Variants
- `row`: panes side by side (handle `aria-orientation="vertical"`).
- `column`: stacked (handle `aria-orientation="horizontal"`).
- `collapsible`: a pane can close to `0`, the handle stays visible on the edge.

## States
| State | What changes |
| --- | --- |
| hover | grip bg `mustard` |
| dragging | grip bg `mustard`, line `mustard`; panes `user-select: none`; cursor stays |
| focus-visible | `3px` `teal` outline around the grip, `3px` offset |
| at limit | nothing extra (the handle just stops) |

## Motion
| Event | Animation |
| --- | --- |
| drag | follows the pointer directly, no easing |
| keyboard step | jumps to the new size at once |
| collapse / restore (Enter) | size snaps `120ms steps(2)` |
| `prefers-reduced-motion` | everything instant |

## Behavior
- Handle: `tabindex="0"`, `aria-valuenow` (size of the first pane in %), `aria-valuemin`, `aria-valuemax`, `aria-controls` = first pane, `aria-label` ("Redimensionar lista").
- Arrows: Left/Right (row) or Up/Down (column) by `5%`; Shift + arrow `20%`; Home/End to min/max; Enter collapses the first pane and restores the previous size.
- Pointer: `pointerdown` + pointer capture, size from the pointer position, clamped to the limits. Double click resets to the default.
- Remember the size per screen (`localStorage`, wrapped in try/catch).
- Phones (< `600px`): no split; panes stack and the handle is removed.

## Never
- Invisible handles (hover-only), handles thinner than `12px` to hit, animated drag, more than 3 panes in one group.
