---
name: design-definition
description: Authoritative design system tokens, typography scales, spacing rules, and structural guidelines for UI interfaces. Use when creating, styling, or reviewing UI layouts, components, and tokens.
---

# Skill: Design System Definition

## 1. Color System (Exact Tokens & High Contrast)
- `color-primary`: `#009739`
- `color-primary-hover`: `#007A2F`
- `color-primary-active`: `#006325`
- `color-secondary`: `#0F172A`
- `color-secondary-hover`: `#1E293B`
- `color-secondary-active`: `#020617`
- `color-accent`: `#10B981`
- `color-accent-hover`: `#059669`
- `color-accent-active`: `#047857`
- `color-warning`: `#D97706`
- `color-error`: `#DC2626`
- `color-info`: `#2563EB`
- `color-success`: `#009739`
- `surface-app`: `#F1F5F9`
- `surface-card`: `#FFFFFF`
- `surface-highlight`: `#009739`
- `surface-primary-subtle`: `#E6F4EA`
- `surface-primary-subtle-hover`: `#D1FAE5`
- `text-primary`: `#0F172A` (Bold high-contrast slate)
- `text-muted`: `#475569` (WCAG AAA compliant secondary text)
- `text-inverse`: `#FFFFFF`
- `border-default`: `#E2E8F0`
- `border-hover`: `#CBD5E1`
- `border-focus`: `#009739`
- `border-error`: `#DC2626`

## 2. Typography Rules (Bold & Readable)
- **Provider:** Google Fonts
- **Font Family:** `"Inter", sans-serif` (Weights: `400`, `500`, `600`, `700`, `800`)
- **Heading 1 (Display):** Size `32px`, Weight `800`, Line-height `40px`
- **Heading 2 (Card Title):** Size `24px`, Weight `700`, Line-height `32px`
- **Body:** Size `16px`, Weight `400`, Line-height `24px`
- **Caption / Secondary:** Size `14px`, Weight `500`, Line-height `20px`
- **Label / Action:** Size `14px`, Weight `700`, Line-height `20px`

## 3. Surface & Card Rules
- **Card Default:** Background `surface-card`, Border `1.5px solid border-default`, Border-radius `24px`, Padding `32px`.
- **Card Highlight:** Background `surface-highlight`, Border `1.5px solid border-focus`, Border-radius `24px`, Padding `32px`, Text `text-inverse`.
- **Card Clickable States:** Hover Border `1.5px solid border-hover`, Active Border `1.5px solid border-focus`.
- **Shadow:** `none` (Crisp flat solid border style).

## 4. Spacing Scale & Layout Margins
- **Scale Tokens:** `space-xs`: `4px`, `space-sm`: `8px`, `space-md`: `16px`, `space-lg`: `24px`, `space-xl`: `32px`.
- **Page Canvas:** Padding `32px` (standard desktop work area).
- **Major Section Rhythm:** Margin-bottom `24px` between Breadcrumb, Page Header, and Content blocks.
- **Card & List Stacks:** Margin-bottom `16px` (or Gap `16px` in flex/grid layouts).
- **Form Controls Stack:** Margin-bottom `16px` between input groups. Label Margin-bottom `8px`.
- **Alert Margin-Bottom:** `20px` above destination content.

## 5. Animation & Motion Tokens
- **Duration Tokens:** `duration-fast`: `150ms` (hover, colors, micro-interactions), `duration-normal`: `200ms` (dropdowns, tabs, fades), `duration-slow`: `300ms` (modals, overlays).
- **Easing Tokens:** `ease-standard`: `cubic-bezier(0.4, 0, 0.2, 1)`, `ease-out`: `cubic-bezier(0, 0, 0.2, 1)`.
- **Default Transition:** `all 150ms cubic-bezier(0.4, 0, 0.2, 1)` for interactive controls.
- **Motion Accessibility:** Enforce `0ms` duration when `prefers-reduced-motion: reduce`.

## 6. Component Catalog & References
All interactive components and controls are strictly detailed in [REFERENCE.md](REFERENCE.md):
- **Buttons:** Solid, Outline, Ghost, Circle/Icon (Height `48px`, Radius `12px`, Weight `700`).
- **Input Fields & Forms:** Label (`14px` / `700`), idle, hover, focus, error, disabled, prefix icon.
- **Breadcrumb:** Soft green pill link, separator `›`, bold current page. Margin-bottom `16px`.
- **Alert / Callout:** Status box with semantic icon (Warning, Error, Info, Success). Margin-bottom `20px`.
- **Badge / Status Pill:** Pill tag with uppercase text (`12px` / `700`).
- **Avatar:** Squircle `56px` x `56px` with soft green background and primary border.
- **Dropdown Menu (User Popover):** Trigger pill, user info header, standard item, danger action.
- **Tabs:** Pill variant (contained) and Underline variant (line border-bottom).
- **Metadata Chips / Pills Soltas:** Status and attribute chips (Primary Subtle, Neutral, Outlined).
- **Sidebar Navigation:** Context header, category groups, standard and active nav items.
- **Data Table:** Header row, striped/hover rows, table cells, pagination bar.
- **Modal / Dialog:** Backdrop with blur, rounded card container, header with close, body, actions footer.

## 7. Implementation Standard
- All components and layouts must consume defined color tokens, typography rules, spacing scales, and animation timings by name.
- Always apply idle, hover, and active states using the exact tokens mapped above.
- Maintain fixed metric values strictly (no fluid ranges, no ad-hoc pixels).
