# Components: Retro Design

Tokens and layers from [SKILL.md](SKILL.md). Fixed values only.

## Print layer
- **Button:** pill, `10px 20px`, `3px` edge, bg `coin`, ink text, Bungee `14px`, shadow `0 5px 0`; active `translateY(5px)` + no shadow. Ghost: bg `panel`. Small: `5px 12px`, `11px`, shadow `0 3px 0`. Icon: `60px` circle, bg `blue`.
- **Input/textarea/select:** `3px` edge, radius `10px` (select `6px`), bg `panel`, padding `12px 14px`, mono `14px`, shadow `5px 5px 0`. Focus: border + shadow `blue`. Label: Bungee `13px` with a `14px` ring in the field's color. Placeholder: Press Start 2P `8px` (`INSERT TOKEN ▶ …`).
- **Syntax:** keys bold `ink`, strings `green`, numbers `blue`, `true/false/null` `red`.
- **Tabs:** radius `6px`, bg `panel`; selected bg `ink` + `▶` in `coin` blinking.
- **Nav bar:** bg `board`, Courier Prime `13px` cream, gap `32px`; hover `2px` `coin` underline; status right in `red` with blinking `●`.
- **LED board:** bg `board` + seam line at 50%, `led` mono `15px` uppercase, shadow `5px 5px 0 led`. Text flaps in (A–Z0–9 settling).
- **Status:** idle dashed + blinking 8px pixel; ok bg `ok-bg`; bad border/text `bad`, one `0.4s` shake.
- **Notice panel:** `14px` hazard stripe on top (`coin`/`#1B1B1F` at `-45deg`), `●` markers in `blue`, live numbers on a `board` chip.

## 8-bit layer
- **HUD:** top-right of header, `<dl>` `1UP` / `HI` / lives (♥ ×3, lost at `.35`, `CONTINUE?` at 0). Press Start 2P `8px`, labels `red`. Points pop `+N` (`16px`, `coin`) rising `36px` in `0.9s`.
- **Sprite:** 1–2 colors from the 8-bit palette, drawn by `box-shadow` (one per pixel) or canvas; walking = 2 frames with `steps(1)`.
- **Verdict (success only):** Press Start 2P `24px` (`48px` ≥ 760px), `green`, shadow `6px 6px 0`, `1.4s steps(14)`.
- **Boot/attract:** `board` + scanlines, `16px` cream centered, `INSERT COIN` in `coin` blinking; `≤ 1s`, once a day, skip on key, CRT collapse `0.3s`.

## 16-bit layer
- **RPG window (card/modal):** radius `8px`, ramp gradient (blue 3→2), `3px` light border + `3px` dark outer ring + `2px` inner highlight, Pixelify Sans `20px` with `2px 2px 0` shadow.
- **Inventory menu (list):** same window; rows `8px 12px`; selected row = left-to-right `coin` fade; extra info right-aligned.
- **Life bar:** track `26px` dark + `2px` light border; fill red→gold gradient with top highlight; segmented variant `repeating-linear-gradient(90deg, transparent 0 8px, board 8px 10px)`. Color: `green` > 50%, `coin` > 20%, `red` + blink ≤ 20%, `K.O.` at 0.
- **Stage map:** stages `36px` squares, `4px` edge, bg = meaning color, white pixel number `16px`; dotted path between; mascot crosses at `2×` with `steps(14)`.
- **Toast (achievement):** fixed bottom-right, `board`, cream, `3px` edge, coin disc left; kicker `8px` pixel `coin`, title Bungee `15px`; `4s`, no pointer events.
- **Bevel button (game-only screens):** gold ramp gradient, `inset 0 2px 0` light + `inset 0 -3px 0` dark, `2px` outline.
