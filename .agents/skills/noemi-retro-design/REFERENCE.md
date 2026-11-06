# Component Reference: Noemi — Retro Design

Tokens from [SKILL.md](SKILL.md). Fixed values only.

## Nav Bar (typewriter)
- bg `board`, items Courier Prime `700` `13px` uppercase `+0.15em`, cream text, gap `32px`, height `48px`.
- Hover: underline `2px` `coin`, offset `6px`. Current page: `coin` text.
- Status at the right (e.g. `● NOW BOOKING · FALL 2026`): same type in `red`, `●` blinking `1.2s steps(1)`.

## Button (arcade)
- Pill `999px`, padding `10px 20px`, border `3px solid edge`, bg `coin`, text `#1B1B1F`, Bungee `14px` `+0.05em`, gap `8px`, shadow `0 5px 0 shadow`.
- Hover `filter: brightness(1.06)` · Active `translateY(5px)` + shadow `0 0 0` (pressed) · `transition: transform 80ms`.
- Ghost: bg `panel`, text `ink`. Small: padding `5px 12px`, border `2px`, `11px`, shadow `0 3px 0`.
- Round icon (theme toggle): `60px` circle, bg `blue`, icon `#FFF`.

## Tabs
- Radius `6px`, bg `panel`. Selected: bg `ink`, text `bg`, `▶` before it in `coin`, blinking `1s steps(1)` (menu cursor).

## Input / Textarea / Select
- Border `3px solid edge`, radius `10px`, bg `panel`, padding `12px 14px`, mono `14px`, shadow `5px 5px 0 shadow`.
- Focus: border `blue`, shadow `5px 5px 0 blue`, caret `red`. Placeholder: pixel `11px`, `muted` (e.g. `INSERT TOKEN ▶ …`).
- Label: Bungee `13px` uppercase, preceded by a `14px` ring (`3px` border in the field's meaning color).
- Select: radius `6px`, Bungee `14px`, shadow `4px 4px 0`, min-width `160px`.
- Syntax colors: keys bold `ink`, strings `green`, numbers `blue`, `true/false/null` `red`.

## LED Board (motto, live text)
- bg `board` + 1px light line at 50% (split-flap seam), text `led` mono `15px` uppercase `+0.06em`, border `3px edge`, shadow `5px 5px 0 led` (amber, so it never melts into a dark board).
- Text arrives flapping: random `A–Z0–9` settling left to right in ~22 frames.

## Status
- Idle: dashed border, pixel `11px`, `muted`, blinking. OK: bg `ok-bg`, text `ok-ink`, border `edge`. Bad: border/text `bad`, shake `0.4s` once.

## HUD (top-right of header, not a strip)
- `<dl>` grid: `1UP`, `HI` (best score, persisted), `VIDAS` (♥ ×3; lost = `edge` at `.35`; `×30` with Konami; `CONTINUE?` blinking at 0).
- Pixel `10px`, labels `red`. Points pop as `+N` (pixel `12px`, `coin`, `2px` black text-shadow) floating up `36px` in `0.9s`.

## Life Bar (countdowns, expiry)
- Track: `20px` high, `3px` padding, border `3px edge`, bg `board`, shadow `4px 4px 0`.
- Fill: segmented `repeating-linear-gradient(90deg, transparent 0 8px, board 8px 10px)` over `green` (>50%), `coin` (>20%), `red` + blinking label (≤20%), `K.O.` at 0.

## Toast (achievement)
- Fixed bottom-right `16px`, max `340px`, `pointer-events: none`, bg `board`, text cream, border `3px edge`, radius `10px`, shadow `5px 5px 0`.
- Left coin disc (radial `coin` `13px` + `edge` ring). Kicker pixel `9px` `coin` ("Conquista 3/9"), title Bungee `15px`, body `14px`. Slides in, `4s` total.

## Stage Map (steps / parts of a flow)
- 3-column grid. Stage: `36px` square, border `4px edge`, bg = meaning color, pixel number `#FFF`, shadow `3px 3px 0`.
- Path: dotted `6px` dashes (`edge`) between stage centers. Mascot sprite (scale `.5`) runs across on change, `steps(14)`.

## Verdict (full screen, success only)
- Pixel `clamp(26px, 7vw, 76px)`, `green`, text-shadow `6px 6px 0 shadow`, radial `veil` behind, `pointer-events: none`, `1.4s steps(14)` pop-and-blink. Never for errors.

## Pixel Sprite (mascot)
- `4px` element; each pixel is a `box-shadow` (`x y color`). Two frames swapped with `steps(1)` keyframes for walking; patrol with `left` + `scaleX(-1)` at the turn.

## Notice Panel (transparency, rules)
- Panel + `14px` hazard stripe on top: `repeating-linear-gradient(-45deg, coin 0 14px, #1B1B1F 14px 28px)`. List markers `●` in `blue`. Live numbers: mono `700 14px`, `led` on `board` chip.

## Boot / Attract Screen
- `board` + scanlines `repeating-linear-gradient(to bottom, rgb(0 0 0/.35) 0 1px, transparent 1px 3px)`, pixel `13px` cream centered, `INSERT COIN` `coin` blinking. ≤ 1s, once a day, skip on click/key, exits with CRT collapse `0.3s`.
