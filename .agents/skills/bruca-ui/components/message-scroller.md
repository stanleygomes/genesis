# Message scroller

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober** frame for a chat of 🎬 [balloons](balloon.md) (the balloons are the cartoon type of the screen).

## When
- A conversation that grows at the bottom: chat with an agent, a log of messages.
- Not for feeds that grow at the top and not for logs of code (that is [code](code.md)).

## Visual
| Property | Value |
| --- | --- |
| Frame | bg `card`, `3px solid` `outline`, `radii-sm`, shadow `4px 4px 0`, fixed height (fills the panel), [scrollbar](scrollbar.md) style |
| List | `role="log"`, `aria-live="polite"`, padding `16px 16px 28px`, gap `16px` (balloon tails need the room) |
| Day divider | centered Special Elite `12px` `text-soft` on a `2px` `outline` `25%` line (`hoje`) |
| New divider | Special Elite `12px` `teal`, `2px` `teal` line, `novas`, above the first unread |
| Jump button | `primary` `small` [button](button.md), bottom center `12px` above the frame edge: down-arrow icon + `3 novas` (or `Ir pro fim` when there are none) |

## States
| State | What changes |
| --- | --- |
| at bottom (within `48px`) | sticks: new messages scroll the list to the end, no button |
| scrolled up | new messages do **not** move the list; jump button shows and counts them |
| jump | list goes to the end at once, button leaves, counter resets |
| loading older (top) | small [spinner](spinner.md) centered at the top while fetching; scroll position kept |

## Motion
| Event | Animation |
| --- | --- |
| new message | the balloon's own pop (`steps(3)` `180ms`) |
| stick / jump | instant scroll, never smooth |
| jump button in / out | slides up `+8px` `steps(3)` `150ms` / leaves at once |
| `prefers-reduced-motion` | no animation, final state at once |

## Behavior
- Opens at the end (or at the `novas` divider). The user's own message always scrolls to the end.
- The jump button is reachable by keyboard right after the list; End inside the focused list also jumps.
- The live region reads new messages only; history loaded at the top is not announced.

## Never
- Yanking the list down while the user reads above, smooth-scroll animations, a jump button covering the input, unread counters that never clear.
