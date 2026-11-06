---
name: noemi-retro-design
description: Noemi's retro design system — 8-bit/16-bit arcade over vintage print, with exact fonts, colors, sizes, components, backgrounds and old references. Use when creating, styling or reviewing a retro, arcade, 8-bit, 16-bit, pixel or vintage interface. For clean modern UI, use bento-design.
---

# Skill: Noemi — Retro Design

**8-bit in the details, 16-bit in the structure, vintage print everywhere else.** Text meant to be read is never in a pixel font.

## 1. Layers
| Layer | Use for | Rules |
| --- | --- | --- |
| **Print** (base) | layout, body text, forms, buttons | flat fills, `3px` ink borders, hard shadow, no blur |
| **8-bit** | scores, HUD, hearts, coins, sprites, INSERT COIN, verdicts | closed palette (PICO-8's 16), 1–2 colors per sprite, no gradients |
| **16-bit** | cards/modals (RPG window), lists (inventory menu), life bars, stage maps | 5-tone ramps, outline + shade + highlight, dithering between bands |

## 2. Fonts (self-hosted `@fontsource/*`, never a CDN)
- Hero: `Bungee Shade` · buttons/labels: `Bungee` · body: `Overpass` 400/700 · data: `Overpass Mono`.
- Typewriter (nav, tags, status lines): `Courier Prime` 700, uppercase, `+0.15em`, `13–14px`.
- 8-bit: `Press Start 2P` **only at 8, 16 or 24px** (8px grid; other sizes blur). 16-bit: `Pixelify Sans` (short phrases).

## 3. Tokens (`light-dark()`: paper / cabinet)
- `bg` `#F2E8D5`/`#14121A` · `panel` `#FFFBF2`/`#1E1B26` · `ink` `#1B1B1F`/`#F2E8D5` · `muted` `#6B6355`/`#A39BB0`
- `edge` `#1B1B1F`/`#4A4458` · `shadow` `#1B1B1F`/`#050407` · `board` `#0E0D12` · `led` `#FFB000`
- `red` `#E4352B`/`#FF5A4E` · `blue` `#1F5FAF`/`#4D8DFF` · `green` `#1E9E5A`/`#2FD483` · `coin` `#F7B500`/`#FFC93C`
- `ok-bg` `#147A44`/`#2FD483` · `bad` `#C42A20`/`#FF5A4E`. Each accent = one meaning, max 3 per screen. Amber/yellow text only on dark.
- 8-bit palette: `#000 #1D2B53 #7E2553 #008751 #AB5236 #5F574F #C2C3C7 #FFF1E8 #FF004D #FFA300 #FFEC27 #00E436 #29ADFF #83769C #FF77A8 #FFCCAA`.
- 16-bit ramps (dark→light): red `#3B0F14 #7A1E25 #C4322F #F06A4F #FFC2A8` · blue `#0B1640 #1C3A8C #2E66D1 #63A4FF #C9E4FF` · green `#0E2B1B #1E5E32 #2F9A4A #6FD36B #D3F5B5` · gold `#3A2306 #7A4B0C #C98A16 #F5C842 #FFF1B0`.

## 4. Sizes
- Body `17px/1.55` · code `14px` · labels `13px` Bungee uppercase `+0.08em` · hero `clamp(46px, 11vw, 100px)`.
- Border `3px` · radius `10px` panels, `6px` tabs, `999px` buttons · shadow `5px 5px 0` (panels), `0 5px 0` (buttons).
- Spacing `8/12/16/20/28/32px` · `max-width: 1160px` · gutter `16px`.

## 5. Rules
- States: hover `brightness(1.06)`, active presses down, `focus-visible` `3px` blue outline.
- Pixel art: integer scale only (2×, 3×…), `image-rendering: pixelated`, never `scale(0.5)`.
- Motion stepped (`steps(n)`), `≤ 1.8s`, off under `prefers-reduced-motion`. Intro `≤ 1s`, once a day.
- Errors never full screen; celebrations may. Header clean: no strips under it. One loud element per screen.
- CSS only: sprites via `box-shadow`/canvas, patterns via gradients. No image requests, no `innerHTML`. Contrast AA.

## 6. Backgrounds
- Light: 2px dot every 16px. Dark: pixel starfield, 4 prime-sized layers, one twinkling. Floor: grass `5px` + checkered dirt.
- 16-bit scenes: color bands joined by ordered dithering (Bayer 4×4).

## 7. References (borrow, never copy)
Pac-Man, Galaga, Space Invaders (attract mode, 1UP/HI) · NES title screens, Konami code · Street Fighter II life bars · Super Mario World map · Final Fantasy/Chrono Trigger windows and menus · PICO-8 · Solari boards, LED signs · 70s enamel signs, hazard stripes.

Components: [REFERENCE.md](REFERENCE.md).
