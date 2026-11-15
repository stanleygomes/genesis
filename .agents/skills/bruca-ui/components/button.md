# Button

Tokens, fonts and the merge rule from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
The **everyday** button. For the one hero action of a screen there is [ticket-button.md](ticket-button.md).

## When
- Any action on the current page: save, send, cancel, open a dialog, filter, toolbar actions. One `primary` per view or group.
- Not for navigation between pages: that is a link (nav or inline text).

## Anatomy
1. **Body**: plain rectangle with small uneven corners (it reads as hand-cut, not rounded).
2. **Outline**: hand-drawn (`#sketch` filter on a `::before`), never on the label.
3. **Shadow**: hard, offset down-right, no blur, on the button itself (no wrapper needed).
4. **Label**: one to three words, verb first. Optional icon on the left.

## Visual
| Property | Value |
| --- | --- |
| Element | native `<button>` (`type="button"` unless it submits) |
| Min height | `44px`; small `32px`; large `52px` |
| Padding | `10px 18px`; small `6px 12px`; large `14px 24px` |
| Label | Bevan `14px` uppercase `+0.06em`, line-height `1`; small `12px`; large `16px` |
| Icon | `16px` (large `20px`), gap `8px`, color = label color |
| Radii | `8px 10px 7px 9px / 9px 7px 10px 8px` |
| Outline | `3px` `outline` token, sketched |
| Shadow | `4px 4px 0` `outline`; small `3px 3px 0` |

## Variants
| Variant | Background | Label | Use |
| --- | --- | --- | --- |
| `primary` | `mustard` | `on-mustard` (dark in both themes) | the main action of the group |
| `neutral` | `card` | `text` | everything else: cancel, secondary, toolbar |
| `danger` | `red` | `bg` | destructive (delete, revoke); always confirmed (telegram) |
| `flat` | any of the above, **no shadow** | same | dense places: table rows, inline in text, inside a card's corner |
| icon-only | any of the above, square (`44px`/`32px`/`52px`), padding `0` | icon | toolbars; `aria-label` required |

Buttons in a group: gap `12px`, `primary` last (rightmost) in dialogs and forms.

## States
| State | What changes |
| --- | --- |
| default | as in Visual |
| hover | lifts `translate(-2px,-2px)`, shadow grows to `6px 6px 0`; the outline may boil while hovered (stops on leave). `flat`: no lift, background mixes `8%` of `outline` |
| active (pressed) | sinks onto its shadow: `translate(4px,4px)`, shadow `0` (`flat`: `translate(1px,1px)`) |
| focus-visible | `3px` `teal` outline, `3px` offset; keyboard only |
| disabled | no lift, no shadow, bg `card`, label and outline `text-soft`, cursor `not-allowed`; native `disabled` (or `aria-disabled="true"` when it must stay focusable to explain why) |
| loading | `aria-busy="true"`, not clickable, width locked, label keeps its text + dots appearing `steps(3)`, outline boils; all of it stops the moment the work ends |
| toggled | `aria-pressed="true"`: stays sunk (active look) with bg `teal`, label `bg` |

## Behavior
- Enter and Space activate (native button). Never a `div` with a click handler.
- State changes are stepped: `steps(2)`, `≤ 120ms`. No easing curves, no bounce.
- `prefers-reduced-motion`: states switch instantly, no boil.
- Double submit: loading starts on the first click and blocks the next ones.
- Dark theme: same rules; the `outline` token turns light, so the shadow does too.

## Never
- Pill or perfectly round shape, blurred shadow, gradient fill, tilted button.
- Two `primary` buttons in the same group, or a `danger` without confirmation.
- Icon-only without `aria-label`, label longer than three words, all-lowercase label.
- Infinite animation in any state (loading included: it stops with the work).
