# Ticket button

Tokens, fonts and the merge rule from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
A **special** button. The everyday one is [button.md](button.md); states and behavior match it.

## When
- The one action a page is about: hero call to action, "enter", "buy", "join", "start". **Max one per screen.**
- Not for forms, toolbars, tables, dialogs or lists: use [button.md](button.md).
- Not for navigation between pages: that is a link (nav or inline text).

## Anatomy
1. **Body**: ticket shape, a soft rectangle with a half-circle notch cut on each side, centered vertically.
2. **Outline**: hand-drawn (`#sketch` filter on a `::before`), follows the ticket shape.
3. **Shadow**: hard, offset down-right, no blur, follows the notches.
4. **Label**: one to three words, verb first. Optional icon on the left.

## Visual
| Property | Value |
| --- | --- |
| Element | native `<button>` (`type="button"` unless it submits) |
| Min height | `44px` (touch); small: `32px` |
| Padding | `10px 22px`; small: `6px 14px` |
| Label | Bevan `14px` uppercase `+0.06em`, line-height `1`; small: `12px` |
| Icon | `16px`, gap `8px`, color = label color |
| Radii | small uneven: `8px 10px 7px 9px / 9px 7px 10px 8px` |
| Notches | `8px` radius, one per side, vertical center (cut with `mask` radial-gradients) |
| Outline | `3px` `outline` token, sketched, never on the label |
| Shadow | `3px 4px 0` `outline`; small: `2px 3px 0` |

**Gotcha:** `mask` also clips the element's own `box-shadow`, `filter` and focus `outline`. The shadow (`drop-shadow`, which follows the notches) and the focus ring live on a wrapper around the button, not on it.

## Variants
| Variant | Background | Label | Use |
| --- | --- | --- | --- |
| `primary` | `mustard` | `on-mustard` (dark in both themes) | the main action |
| `ghost` | `card` | `text` | secondary actions, cancel |
| `danger` | `red` | `bg` | destructive (delete, revoke); always confirmed (telegram) |
| icon-only | any of the above, square `44px`, padding `0` | icon `20px` | toolbars; `aria-label` required |

## States
| State | What changes |
| --- | --- |
| default | as in Visual |
| hover | lifts `translate(-2px,-2px)`, shadow grows to `5px 6px 0`; the outline may boil while hovered (small element, stops on leave) |
| active (pressed) | sinks onto its shadow: `translate(3px,4px)`, shadow `0` |
| focus-visible | `3px` `teal` ring on the wrapper, `3px` offset, following the ticket; keyboard only |
| disabled | no lift, no shadow, bg `card`, label and outline `text-soft`, cursor `not-allowed`; native `disabled` (or `aria-disabled="true"` when it must stay focusable to explain why) |
| loading | `aria-busy="true"`, not clickable, width locked to the label's width, label keeps its text + dots appearing `steps(3)`, outline boils; all of it stops the moment the work ends |
| toggled | `aria-pressed="true"`: stays sunk (active look) with bg `teal`, label `bg` |

## Behavior
- Enter and Space activate (native button). Never a `div` with a click handler.
- State changes are stepped: `steps(2)`, `≤ 120ms`. No easing curves, no bounce.
- `prefers-reduced-motion`: states switch instantly (no translate transition), no boil.
- Double submit: loading starts on the first click and blocks the next ones.
- Dark theme: same rules; the `outline` token turns light, so the shadow does too.

## Never
- Pill or perfectly round shape, blurred shadow, gradient fill, tilted button.
- Two `primary` buttons side by side, or a `danger` without confirmation.
- Icon-only without `aria-label`, label longer than three words, all-lowercase label.
- Infinite animation in any state (loading included: it stops with the work).
