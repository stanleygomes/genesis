# Input OTP

Tokens, fonts and the two kinds of component from [../SKILL.md](../SKILL.md). Values only: rebuild it, never paste code.
**Sober.** One-time code in separate boxes (SMS, email, 2FA).

## When
- Short numeric codes, 4 to 8 digits, typed once. Anything longer or alphanumeric is a plain [input](input.md).

## Visual
| Property | Value |
| --- | --- |
| Element | `<fieldset>` + `<legend>` (label style); one `<input inputmode="numeric">` per digit, `aria-label="Dígito 2 de 6"`; first one `autocomplete="one-time-code"` |
| Cell | `48×56px`, bg `balloon`, `3px solid` `outline`, `radii-sm`, shadow `3px 3px 0` |
| Digit | Courier Prime 700 `24px`, centered, caret `teal` |
| Gap | `8px`; separator for 6 digits after the 3rd: `12×3px` `outline` bar |
| Help | below, Alegreya `15px` `text-soft`: where it was sent, masked ("(34) •••••-1234"); `aria-live="polite"` |
| Resend | `neutral flat` small button below |

## Variants
| Variant | Value |
| --- | --- |
| default | `48×56px`, `24px` digit |
| `sm` | `40×48px`, `20px` digit (also under `420px` width) |

## States
| State | What changes |
| --- | --- |
| focus | cell border and shadow `teal`, shadow `4px 4px 0` |
| error | all cells border/shadow `red`, help `red` with the fix and tries left |
| ok | all cells border/shadow `teal`, bg `14%` `teal` over `balloon`, help `teal`; cells disabled |
| disabled | border `text-soft`, bg `card`, no shadow |

## Motion
| Event | Animation |
| --- | --- |
| digit typed | cell pops from `scale(.85)`, `120ms steps(2)` |
| wrong code | cell row shakes once `±4px` `0.3s steps(4)` |
| focus | border/shadow `120ms steps(2)` |
| `prefers-reduced-motion` | no animation, final state at once |

## Behavior
- Typing a digit fills the cell and moves to the next; non-digits are ignored.
- Backspace on an empty cell clears the previous one and moves back. Arrows Left/Right move, Home/End jump to the ends. Focus selects the cell's digit.
- Paste anywhere (or SMS autofill) spreads all digits across the cells, ignoring spaces and dashes.
- Last digit filled = verify automatically, no submit button. Typing again after an error clears the error.

## Never
- One cell per character for long codes, auto-submitting partial codes, clearing all cells on error (keep them to fix), hiding where the code was sent, a timer that loops forever.
