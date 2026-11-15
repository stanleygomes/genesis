# Tooltip

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober.**

## When
- A short label for an icon-only button or a hint about a truncated value. Plain text only: anything clickable or longer than one sentence is a [popover](popover.md) or [hover card](hover-card.md).

## Visual
| Property | Value |
| --- | --- |
| Box | bg `text`, color `bg`, `2px solid` `outline`, radius `4px`, no shadow |
| Text | Alegreya `15px/1.3`, max width `240px`, padding `4px 8px` |
| Position | above the trigger, centered, `8px` gap; below when there is no room. No arrow |
| Layer | `pointer-events: none`, above everything else in the page |

## States
| State | What changes |
| --- | --- |
| hidden | `hidden` / not rendered |
| shown | after `400ms` of hover, or at once on keyboard focus |

## Motion
| Event | Animation |
| --- | --- |
| show | fade in `steps(2)` `100ms` |
| hide | instant |
| `prefers-reduced-motion` | no animation, final state at once |

## Behavior
- `role="tooltip"` with an `id`; the trigger points at it with `aria-describedby` (or the tooltip text **is** the `aria-label` of an icon button).
- Shows on hover (`400ms` delay) and focus; hides on leave, blur, click and Esc. Moving to a second trigger while one is shown swaps without the delay.
- Never on disabled native buttons (no events): wrap or use `aria-disabled`.

## Never
- Essential information only in a tooltip (phones have no hover), links or buttons inside, tooltips on every element, title text repeating the visible label.
