# Components: Retro Design

Tokens, fonts and the merge rule from [SKILL.md](SKILL.md). Fixed values only. "Sketched" = still `#sketch` filter on `::before`, uneven radii, `3px` `outline`.

## Layout (straight lines)
- **Grid:** visible `3px` `outline` dividers, no gaps between cells; each cell opens with a caption tag (`01`, `02`: `text` bg, `bg` text, Special Elite `12px`, `2px 8px`).
- **Color block:** full-width solid section (`mustard` or `teal`) with `3px` top/bottom lines, instead of card-in-card. Max one in view.
- **Giant number:** Bevan, accent (`red` or `mustard`) on part of it (unit, last digit), `outline` stroke `2px`. One per screen.
- **Nav (theater program):** items in Bevan `14px` uppercase, dotted leaders to a Special Elite page/meta on the right; current item with a `mustard` underline `3px`.
- **Metadata:** Special Elite `13px` `text-soft`, `key · value` separators.

## Components (hand-drawn)
- **Card:** sketched, bg `card`, padding `20px`, shadow `6px 7px 0` `outline`, `±0.5deg`.
- **Ticket button:** notched sides via `mask` radial-gradients (`8px` notches), Bevan `14px` uppercase, padding `10px 22px`, bg `mustard` (primary) or `card` (ghost), shadow `3px 4px 0`; lift on hover, sinks on active. Danger: bg `red`, `bg` text. Small: `6px 14px`, `12px`.
- **Input/textarea/select:** sketched, bg `balloon`, padding `12px 14px`, Alegreya `16px`, shadow `3px 4px 0`. Focus: outline + shadow `teal`. Label Bevan `13px`. Placeholder italic `text-soft`.
- **Tabs:** sketched small radii, bg `card`; selected bg `text`, `bg` text, `▶` in `mustard` (still).
- **Speech balloon (chat/agent):** sketched, bg `balloon`, tail as a sketched triangle toward the speaker (left = agent, right = user), max-width `68ch`, Alegreya body.
- **Rubber stamp (status):** double border (`3px` + `1px` inner at `3px` gap), Bevan `12px` uppercase `+0.1em`, `rotate(-3deg)`. Default: `outline` color, transparent. Loud (one per screen): `red` (error) or `mustard` (new) outline + text. ok = `teal`.
- **Telegram (confirmations):** bg `card`, top band `TELEGRAM` in Bevan, body Special Elite `14px` uppercase, sentences end in "STOP.", sender line right-aligned.
- **Film-reel progress:** track `22px` bg `text` with sprocket holes (`repeating-linear-gradient` of `bg` `6px` squares top and bottom), fill `mustard` advancing `steps(5)`; label Special Elite right.
- **Notice panel:** sketched card with a `14px` ribbon banner on top (`red` bg, `bg` Bevan `12px`, notched ends), `●` markers in `teal`, numbers in a Special Elite `text`-bg chip.
- **Toast:** fixed bottom-right, sketched, bg `text`, `bg` text; kicker Special Elite `12px` `mustard`, title Bevan `15px`; `4s`, no pointer events, slides in `steps(4)`.
- **Code/JSON:** bg `balloon`, sketched, Special Elite `14px`. Keys bold `text`, strings `teal`, numbers `mustard` on dark / `text-soft` on light, `true/false/null` `red`.

## Old-film texture (fixed overlay, `pointer-events: none`)
- Grain canvas ~320×200, ~2600 specks in the `text` color (alpha ≤ `.12`), canvas opacity `.4`, painted once, repainted only on theme change.
- Vignette `transparent 68% → rgb(70 40 15/.3)` (`.5` black on dark).
- Animated grain, scratches and brightness flicker: showcase pages only, never an app used all day.

## Mascot (only if the user said yes)
- Original rubber-hose character tied to the product (pie-cut eyes, white 4-finger gloves, hose limbs), SVG with the `#sketch` filter. Never a lookalike of an existing character.
- Bob `steps(3)` / wave `steps(2)` only on hover or a real state, finite iteration count.
