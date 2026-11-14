# Optional Modules: Retro Design

**Ask the user before using any of these** (see SKILL.md §1). Each lists where it fits and what ruins it.

## CRT tube
- **Where:** dark game screens only (intro/boot, STAGE CLEAR, LED signs). Never over token, JSON, forms or paragraphs.
- **What sells it:** the whole viewport is the tube (`position: fixed; inset: 1.5vmin`), period content (e.g. a fictional 90s BIOS in `VT323`), warm black `radial-gradient(#0C0608 → #000)`. An effect on a modern bright image looks fake.
- **Layers:** corners `4× radial-gradient(… rgb(0 0 0/.85) → transparent 55%)` · scanlines `repeating-linear-gradient(transparent 0 2px, rgb(0 0 0/.45) 3px 4px)` multiply, masked to fade at edges · bulge overlay (light center, dark rim) · glass reflection top-left.
- **Phosphor:** glow only on highlighted text: `0 0 1px` + `0 0 8px` + `0 0 22px` warm. Glow on everything + chroma = pink haze.
- **Chroma:** SVG filter splitting channels: red `feOffset dx=.6`, blue `dx=-.6`, recombined with `feBlend mode=screen`. Not colored `drop-shadow`s (looks like 3D glasses).
- **Grain:** WebGL (or small 2D canvas) noise in `mix-blend-mode: overlay`, ~12–24 fps.
- **Flicker:** rare and irregular (two short dips every ~7s). Power on: line expands + brightness flash `steps(5)`.

## Analog glitch
- **Allowed:** horizontal tear (3–4 cloned slices, `clip-path` + `translateX`, ~180ms) · vertical hold (roll `steps(9)`, 0.7s) · jitter (1–2px, 0.26s) · static burst (grain up, brightness `.55`, 0.16s) · degauss (`hue-rotate` + `skewX` decaying, 1s) · VHS tracking (noise band at bottom, color bleed, 1.3s).
- **Tie to meaning:** invalid signature/error = tear + static; screen on/theme switch = degauss; game over = vertical hold. Ambient at most every 12–20s, subtle ones only.
- **Never:** digital glitch, glitch over text being read, under `prefers-reduced-motion`.

## Stage floor (perspective)
- **Grid (default pick):** 160×100 canvas, pixelated; 1px lines in `blue` ramp, amber horizon, dithered sky, pixel sun with cut bands, 12 fps.
- **Mode 7:** checkered floor running to the horizon in 16-bit ramps (F-Zero/Mario Kart). More color and motion; busier behind text.
- All: dark game screens only, never behind forms. Redraw pixel floors only when the 12 fps step changes.

## Ink & paper (neobrutalism × 1930s cartoon)
- **What it is:** one look from two print traditions on the same skeleton (ink line, hard shadow, flat fill, paper): neobrutalism gives the structure and the loud blocks, 1930s hand-drawn cartoons (Fleischer, early studio shorts) give the line, the fonts and the props. Borrow the **era**, never a specific game or show (no characters, art or screens from Cuphead or any other title).
- **Where:** a whole product identity (not a game-screen module); works on long-use apps only with the effects kept faint. Replaces the print layer's look: no 8-bit/16-bit mixed in, no dot background.
- **Merge rule:** structure is **crisp** (grid, dividers, color blocks: straight `3px` lines); objects are **hand-drawn** (cards, buttons, balloons, stamps, mascot: ink filter + uneven radii). Never wobble the grid, never square off an object.
- **Tokens (`light-dark()`: aged paper / projection room):** `paper` `#EFE2C4`/`#17110C` · `card` `#F8EFD9`/`#241A13` · `ink` `#24170F`/`#F1E4C6` · `ink-soft` `#6A5442`/`#B9A588` · `line` `#24170F`/`#E9DABA` · `red` `#B5322A`/`#E0574A` · `mustard` `#D49A2E`/`#E8B34A` · `teal` `#2F6F6B`/`#5FA8A1` · `balloon` `#FFF8E8`/`#2E2219`. Background: paper + two faint watercolor washes (mustard top-left, teal bottom-right, `radial-gradient` ≤18% alpha). One meaning per accent, max 3 per screen.
- **Fonts:** title `Limelight` (stroke `2px` ink + `4px 4px 0` ink shadow, fill mustard) · labels/buttons and giant number `Bevan` · body `Alegreya` (italic for taglines) · logs, meta, caption tags, telegrams `Special Elite`.
- **Structure (neobrutalism):** visible grid with `3px` dividers and ink caption tags (`01`, `02`) · color blocks: full-width solid section (`mustard` or `teal`) with `3px` top/bottom lines instead of card-in-card · giant number: one per screen, Bevan `clamp(44px, 8vw, 92px)`, accent on part of it.
- **Ink line (cartoon):** outlines on a `::before` with a **still** `filter: url(#ink)` (`feTurbulence` fractalNoise `0.035`, fixed seed, `feDisplacementMap scale≈1.2`, filter region `-10%/120%`). Never on text. Uneven radii (`16px 20px 14px 18px / 18px 14px 20px 16px`), `3px` line, `6px 7px 0` hard shadow. The "boiling" version (seed cycling with `<animate calcMode=discrete>`) only on small elements and only while something happens (hover, agent working), never looping on panels.
- **Interaction:** lift hover `translate(-2px,-2px)` + shadow `6px 7px → 8px 9px`; active sinks to the shadow with no shadow. Cards at `±0.5deg` alternating, straighten on hover.
- **Highlight:** rubber stamps (double border, `rotate(-3deg)`) for status and "new"; at most **one** loud stamp per screen (`red` or `mustard` fill), the rest in ink outline.
- **Components:** speech balloons with tail (agent/chat) · film-reel progress bar (sprocket holes, fill `steps(5)`) · confirmations as a **telegram** (`Special Elite`, ends in "STOP.") · ticket buttons (notched sides via `mask` radial-gradients, `3px 4px 0` drop shadow) · nav as a theater program (dotted leaders) · ribbon banner for the tagline.
- **Film layer (keep it light and still):** fixed overlay, `pointer-events: none` · grain canvas ~320×200, ~2600 specks in the ink color (alpha ≤ `.12`), canvas opacity `.4`, painted once and repainted only on theme change · vignette `transparent 68% → rgb(70 40 15/.3)` (`.5` black on dark). Animated grain, scratches and brightness flicker are for a showcase page only, never an app used all day.
- **Mascot:** original rubber-hose character tied to the product (pie-cut eyes, white 4-finger gloves, hose limbs), drawn in SVG with the ink filter. Bob `steps(3)` / wave `steps(2)` only on hover or a real state, with a finite iteration count. Never a lookalike of an existing character.
- **Motion:** stepped only. View change = iris close/open (`box-shadow: 0 0 0 300vmax` hole, `steps(6)`/`steps(7)`, ~0.65s total). All of it off under `prefers-reduced-motion` (also remove the SVG `<animate>`).
- **Performance:** no `infinite` animation anywhere in an app. In WebKit (Wails/Tauri on Linux) any looping animation repaints the window and re-runs the SVG filters on every large `.inked` panel: measured ~90% CPU vs 0–5% with everything still.
- **Never:** heavy grain, flicker, scratches or boil at full strength (it reads as broken), boil on paragraphs or panels, everything tilted or overlapping, more than one loud stamp, neon or random garish colors, pixel fonts.
