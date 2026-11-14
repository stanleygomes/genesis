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
- **Synthwave:** magenta neon grid with glow, purple→orange sky, striped sun. Clashes with print/pixel and leans cyberpunk: only if explicitly wanted.
- All: dark game screens only, never behind forms. Redraw pixel floors only when the 12 fps step changes.

## Neobrutalism extras (print layer)
- **Lift hover:** `translate(-2px,-2px)` + shadow `5px → 7px`; active sinks `5px` with no shadow.
- **Tilted sticker:** max 1 per screen, `rotate(2–4deg)`, `3px` edge, `coin` bg, Press Start 2P `8px`, for "new"/highlight only.
- **Color blocks:** full-width solid section (`blue` or `coin`) with `3px` top/bottom borders instead of card-in-card.
- **Giant number:** one per screen, Bungee `clamp(44px, 8vw, 92px)`, accent on part of it.
- **Bare structure:** visible grid with `3px` dividers, black caption tags (`01`, `02`), mono metadata.
- **Never:** random garish palette, more than one sticker, everything rotated or overlapping.

## 1930s cartoon (rubber hose)
- **What it is:** the look of 1930s hand-drawn cartoons (Fleischer, early studio shorts): film print, boiling ink lines, sepia paper. Borrow the **era**, never a specific game or show (no characters, art or screens from Cuphead or any other title).
- **Where:** a whole product identity (not a game-screen module); works on long-use apps only with the effects kept faint. Replaces the print layer's look: no 8-bit/16-bit mixed in, no dot background.
- **Tokens (`light-dark()`: aged paper / projection room):** `paper` `#EFE2C4`/`#17110C` · `card` `#F8EFD9`/`#241A13` · `ink` `#24170F`/`#F1E4C6` · `ink-soft` `#6A5442`/`#B9A588` · `line` `#24170F`/`#E9DABA` · `red` `#B5322A`/`#E0574A` · `mustard` `#D49A2E`/`#E8B34A` · `teal` `#2F6F6B`/`#5FA8A1` · `balloon` `#FFF8E8`/`#2E2219`. Background: paper + two faint watercolor washes (mustard top-left, teal bottom-right, `radial-gradient` ≤18% alpha).
- **Fonts:** title `Limelight` (stroke `2px` ink + `4px 4px 0` ink shadow, fill mustard) · labels/buttons `Bevan` · body `Alegreya` (italic for taglines) · logs, meta, telegrams `Special Elite`.
- **Boiling line:** outlines on a `::before` with `filter: url(#boil)` (`feTurbulence` fractalNoise `0.035`, seed cycling 3 values `calcMode=discrete` over `0.9s`, `feDisplacementMap scale≈1.6`). Never on text. Uneven radii (`16px 20px 14px 18px / 18px 14px 20px 16px`), `3px` line, `6px 7px 0` hard shadow.
- **Film layer (keep it light):** fixed overlay, `pointer-events: none` · grain canvas ~240×150, ~30% of pixels at alpha 22, redrawn every ~180ms, opacity `.2` (`multiply`) / `.14` dark (`screen`) · vignette `transparent 68% → rgb(70 40 15/.3)` (`.5` black on dark) · one 1px scratch, opacity ≤ `.08`, visible a few frames every ~9s. **No brightness flicker**: too tiring.
- **Components:** speech balloons with tail (agent/chat) · rubber stamps for status (double border, `rotate(-3deg)`) · film-reel progress bar (sprocket holes, fill `steps(5)`) · confirmations as a **telegram** (`Special Elite`, ends in "STOP.") · ticket buttons (notched sides via `mask` radial-gradients, `3px 4px 0` drop shadow) · nav as a theater program (dotted leaders) · ribbon banner for the tagline.
- **Mascot:** original rubber-hose character tied to the product (pie-cut eyes, white 4-finger gloves, hose limbs, bob `steps(3)`, wave `steps(2)`), drawn in SVG with the boil filter. Never a lookalike of an existing character.
- **Motion:** stepped only. View change = iris close/open (`box-shadow: 0 0 0 300vmax` hole, `steps(6)`/`steps(7)`, ~0.65s total). Cards at `±0.5deg` alternating, straighten on hover. All of it off under `prefers-reduced-motion` (also remove the SVG `<animate>`).
- **Never:** heavy grain, flicker, scratches or boil at full strength (it reads as broken), boil on paragraphs, neon colors, pixel fonts.
