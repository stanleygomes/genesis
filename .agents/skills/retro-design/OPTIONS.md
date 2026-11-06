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
