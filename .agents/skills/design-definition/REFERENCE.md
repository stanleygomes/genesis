# Component Reference: Design System

All components reference exact tokens from [SKILL.md](file:///home/stanley/projects/genesis/.agents/skills/design-definition/SKILL.md). All dimensions, margins, and borders use fixed values.

---

## 1. Buttons
- **Base Metrics:** Height `48px`, Border-radius `12px`, Font Size `14px`, Font Weight `700`, Display `inline-flex`, Align Items `center`, Justify Content `center`, Gap `8px`, Padding `0 20px`, Cursor `pointer`, Transition `all 150ms ease`.
- **Solid:**
  - Idle: Background `color-primary`, Text `text-inverse`, Border `none`.
  - Hover: Background `color-primary-hover`.
  - Active: Background `color-primary-active`.
- **Outline:**
  - Idle: Background `transparent`, Border `1.5px solid color-primary`, Text `color-primary`.
  - Hover: Background `surface-primary-subtle`, Border `1.5px solid color-primary-hover`, Text `color-primary-hover`.
  - Active: Background `surface-primary-subtle-hover`, Border `1.5px solid color-primary-active`, Text `color-primary-active`.
- **Ghost:**
  - Idle: Background `transparent`, Border `none`, Text `color-primary`.
  - Hover: Background `surface-primary-subtle`.
  - Active: Background `surface-primary-subtle-hover`.
- **Circle / Icon Action:**
  - Width `44px`, Height `44px`, Border-radius `9999px`, Border `none`, Background `color-primary`, Text `text-inverse`, Display `inline-flex`, Align Items `center`, Justify Content `center`.
  - Hover: Background `color-primary-hover`.
  - Active: Background `color-primary-active`.

---

## 2. Input Fields & Form Controls
- **Control Wrapper:** Margin-bottom `16px`, Display `flex`, Flex-direction `column`.
- **Label:** Font Size `14px`, Font Weight `700`, Color `text-primary`, Margin-bottom `8px`, Display `block`.
- **Input Container:** Display `flex`, Align Items `stretch`, Border-radius `12px`, Background `surface-card`, Height `48px`.
- **Prefix Icon Container:** Width `48px`, Height `48px`, Border-right `1.5px solid border-default`, Background `surface-card`, Color `text-muted`, Display `flex`, Align Items `center`, Justify Content `center`.
- **Field (Idle):** Height `48px`, Background `surface-card`, Border `1.5px solid border-default`, Border-radius `12px`, Padding `0 16px`, Text `text-primary`, Font Size `16px`, Font Weight `500`. Placeholder: `text-muted`.
- **Field (Hover):** Border `1.5px solid border-hover`.
- **Field (Focus / Active):** Border `1.5px solid border-focus`, Outline `none`.
- **Field (Error):** Border `1.5px solid border-error`.
- **Field (Disabled):** Background `surface-app`, Border `1.5px solid border-default`, Text `text-muted`, Cursor `not-allowed`.

---

## 3. Breadcrumb
- **Container:** Display `flex`, Gap `8px`, Align Items `center`, Margin-bottom `16px`.
- **Item Link (Idle):** Background `surface-primary-subtle`, Text & Icon `color-primary`, Border-radius `8px`, Padding `6px 12px`, Font Size `14px`, Font Weight `700`, Display `inline-flex`, Align Items `center`, Gap `6px`, Text-decoration `none`.
- **Item Link (Hover):** Background `surface-primary-subtle-hover`, Text `color-primary-hover`.
- **Item Link (Active):** Text `color-primary-active`.
- **Separator:** Symbol `›`, Text `text-muted`, Font Size `14px`, Font Weight `700`.
- **Current Page:** Text `text-primary`, Background `transparent`, Font Size `14px`, Font Weight `800`, Padding `6px 0`.

---

## 4. Alert / Callout
- **Structure:** Background `surface-card`, Border `1.5px solid border-default`, Border-radius `12px`, Padding `16px 20px`, Display `flex`, Gap `12px`, Align Items `center`, Margin-bottom `20px`.
- **Content:** Text `text-primary`, Font Size `14px`, Font Weight `700`, Line-height `20px`.
- **Icon:** Size `20px`.
- **Variants (Icon Color):**
  - Warning: `color-warning`
  - Error: `color-error`
  - Info: `color-info`
  - Success: `color-success`

---

## 5. Badge / Status Pill
- **Structure:** Height `28px`, Padding `4px 12px`, Border-radius `9999px`, Display `inline-flex`, Gap `6px`, Align Items `center`.
- **Content:** Font Size `12px`, Font Weight `800`, Text-transform `uppercase`, Line-height `16px`, Letter-spacing `0.5px`.
- **Icon:** Size `14px`.
- **Variant Solid:** Background `color-primary`, Text `text-inverse`, Icon `text-inverse`.
- **Variant Subtle:** Background `surface-primary-subtle`, Text `color-primary`, Icon `color-primary`.

---

## 6. Avatar
- **Structure:** Width `56px`, Height `56px`, Background `surface-primary-subtle`, Border `1.5px solid color-primary`, Border-radius `16px`, Display `flex`, Align Items `center`, Justify Content `center`.
- **Icon:** Size `32px`, Color `color-primary`.
- **Image (When Photo):** Width `100%`, Height `100%`, Object-fit `cover`, Border-radius `14px`.

---

## 7. Dropdown Menu (User Menu Popover)
- **Trigger:**
  - Structure: Height `44px`, Padding `6px 14px`, Border `1.5px solid border-default`, Border-radius `9999px`, Background `surface-card`, Display `inline-flex`, Align Items `center`, Gap `10px`, Cursor `pointer`.
  - Avatar Mini: Width `28px`, Height `28px`, Border-radius `9999px`, Background `color-primary`, Text `text-inverse`, Font Size `12px`, Font Weight `800`.
  - Label Stack: Display `flex`, Flex-direction `column`, Line-height `14px`.
    - Line 1 (Name): Font Size `13px`, Font Weight `700`, Text `text-primary`.
    - Line 2 (Subtitle): Font Size `11px`, Font Weight `500`, Text `text-muted`.
  - Icon (Chevron): Size `16px`, Color `text-muted`.
  - Hover: Border `1.5px solid border-hover`.
  - Active / Open: Border `1.5px solid border-focus`.
- **Popover Panel:**
  - Structure: Width `280px`, Background `surface-card`, Border `1.5px solid border-default`, Border-radius `16px`, Padding `16px`, Box-shadow `0 10px 25px rgba(0,0,0,0.08)`.
- **Header Section:**
  - Structure: Display `flex`, Flex-direction `column`, Gap `4px`, Padding-bottom `12px`, Border-bottom `1.5px solid border-default`.
  - Name: Font Size `14px`, Font Weight `700`, Text `text-primary`.
  - Email: Font Size `14px`, Font Weight `500`, Text `text-muted`.
  - Document / Meta: Font Size `12px`, Font Weight `500`, Text `text-muted`.
- **Item Standard (e.g. "Meu Perfil"):**
  - Structure: Height `40px`, Padding `0 12px`, Border-radius `8px`, Display `flex`, Align Items `center`, Gap `10px`, Background `transparent`, Text-decoration `none`, Cursor `pointer`.
  - Text: Font Size `14px`, Font Weight `700`, Text `text-primary`.
  - Icon: Size `16px`, Color `color-primary`.
  - Hover: Background `surface-primary-subtle`, Text `color-primary-hover`.
  - Active: Text `color-primary-active`.
- **Item Danger (e.g. "Sair do Sistema"):**
  - Structure: Height `40px`, Padding `0 12px`, Border-radius `8px`, Display `flex`, Align Items `center`, Gap `10px`, Background `transparent`, Border-top `1.5px solid border-default`, Margin-top `8px`, Padding-top `12px`, Text-decoration `none`, Cursor `pointer`.
  - Text: Font Size `14px`, Font Weight `700`, Text `color-error`.
  - Icon: Size `16px`, Color `color-error`.
  - Hover: Background `surface-app`.
  - Active: Text `color-error`.

---

## 8. Tabs
- **Pill Tabs (Contained Variant):**
  - Container: Display `flex`, Gap `8px`, Align Items `center`, Margin-bottom `20px`.
  - Item (Idle): Height `40px`, Padding `0 16px`, Border-radius `10px`, Border `1.5px solid border-default`, Background `transparent`, Text `text-muted`, Font Size `14px`, Font Weight `700`, Cursor `pointer`.
  - Item (Hover): Border `1.5px solid border-hover`, Text `text-primary`, Background `surface-app`.
  - Item (Active / Selected): Background `surface-primary-subtle`, Border `1.5px solid color-primary`, Text `color-primary`, Font Weight `800`.
- **Underline Tabs (Bordered Line Variant):**
  - Container: Display `flex`, Gap `16px`, Align Items `center`, Border-bottom `1.5px solid border-default`, Margin-bottom `20px`.
  - Item (Idle): Height `44px`, Padding `0 12px`, Background `transparent`, Border `none`, Border-bottom `2px solid transparent`, Margin-bottom `-1.5px`, Text `text-muted`, Font Size `14px`, Font Weight `600`, Cursor `pointer`.
  - Item (Hover): Text `text-primary`, Border-bottom `2px solid border-hover`.
  - Item (Active / Selected): Text `color-primary`, Border-bottom `2px solid color-primary`, Font Weight `800`.

---

## 9. Metadata Chips / Pills Soltas
- **Structure:** Height `26px`, Padding `2px 10px`, Border-radius `9999px`, Display `inline-flex`, Align Items `center`, Gap `6px`, Font Size `12px`, Font Weight `700`, Line-height `16px`.
- **Icon:** Size `14px`.
- **Variant Primary Subtle (e.g. "Inscrições Abertas"):**
  - Background `surface-primary-subtle`, Border `1.5px solid color-primary`, Text `color-primary`, Icon `color-primary`.
- **Variant Neutral (e.g. "100 vagas"):**
  - Background `surface-app`, Border `1.5px solid border-default`, Text `text-primary`, Icon `text-muted`.
- **Variant Outlined Light (e.g. "UBERABA - MG"):**
  - Background `surface-card`, Border `1.5px solid color-primary`, Text `color-primary`, Icon `color-primary`.

---

## 10. Sidebar Navigation
- **Container:** Width `260px`, Background `surface-card`, Border-right `1.5px solid border-default`, Padding `24px 16px`, Display `flex`, Flex-direction `column`, Gap `24px`.
- **Header Unit:**
  - Structure: Display `flex`, Align Items `center`, Gap `12px`, Padding `0 8px 16px 8px`, Border-bottom `1.5px solid border-default`.
  - Subtitle: Font Size `10px`, Font Weight `800`, Text-transform `uppercase`, Color `text-muted`.
  - Title / Location: Font Size `14px`, Font Weight `800`, Color `text-primary`.
- **Section Group:**
  - Category Title: Font Size `11px`, Font Weight `800`, Text-transform `uppercase`, Letter-spacing `0.5px`, Color `text-muted`, Padding `16px 12px 6px 12px`.
  - Nav List: Display `flex`, Flex-direction `column`, Gap `4px`.
- **Nav Item:**
  - Base: Height `40px`, Padding `0 12px`, Border-radius `10px`, Display `flex`, Align Items `center`, Gap `12px`, Font Size `14px`, Font Weight `700`, Cursor `pointer`, Text-decoration `none`.
  - Idle: Background `transparent`, Border `1.5px solid transparent`, Text `text-primary`, Icon Size `18px`, Icon Color `text-muted`.
  - Hover: Background `surface-app`, Text `text-primary`, Icon Color `text-primary`.
  - Active (Selected): Background `surface-primary-subtle`, Border `1.5px solid color-primary`, Text `color-primary`, Icon Color `color-primary`, Font Weight `800`.

---

## 11. Data Table
- **Container:** Background `surface-card`, Border `1.5px solid border-default`, Border-radius `16px`, Overflow `hidden`, Width `100%`, Margin-bottom `24px`.
- **Table Element:** Width `100%`, Border-collapse `collapse`, Text-align `left`.
- **Header Row (`thead tr`):** Background `surface-app`, Border-bottom `1.5px solid border-default`.
- **Header Cell (`th`):** Padding `14px 16px`, Font Size `12px`, Font Weight `800`, Text-transform `uppercase`, Letter-spacing `0.5px`, Color `text-muted`.
- **Body Row (`tbody tr`):** Background `surface-card`, Border-bottom `1px solid border-default`.
  - Hover: Background `surface-app`.
- **Body Cell (`td`):** Padding `14px 16px`, Font Size `14px`, Font Weight `500`, Color `text-primary`, Vertical-align `middle`.
- **Pagination Bar:** Height `56px`, Padding `0 20px`, Border-top `1.5px solid border-default`, Background `surface-card`, Display `flex`, Align Items `center`, Justify Content `space-between`, Font Size `14px`, Font Weight `600`, Color `text-muted`.

---

## 12. Modal / Dialog
- **Backdrop:** Background `rgba(17, 24, 39, 0.4)`, Backdrop-filter `blur(4px)`, Position `fixed`, Inset `0`, Display `flex`, Align Items `center`, Justify Content `center`, Z-index `50`.
- **Container:** Width `100%`, Max-width `520px`, Background `surface-card`, Border `1.5px solid border-default`, Border-radius `24px`, Padding `32px`, Box-shadow `0 20px 40px rgba(0, 0, 0, 0.12)`, Display `flex`, Flex-direction `column`, Gap `20px`.
- **Header:** Display `flex`, Align Items `center`, Justify Content `space-between`.
  - Title: Font Size `20px`, Font Weight `800`, Color `text-primary`.
  - Close Button: Width `32px`, Height `32px`, Border-radius `8px`, Border `none`, Background `transparent`, Color `text-muted`, Cursor `pointer`. Hover Background: `surface-app`, Color `text-primary`.
- **Body:** Font Size `14px`, Font Weight `400`, Color `text-muted`, Line-height `22px`.
- **Footer (Actions):** Display `flex`, Justify Content `flex-end`, Align Items `center`, Gap `12px`, Padding-top `8px`.

---

## 13. Page Header Card
- **Structure:** Background `surface-card`, Border `1.5px solid border-default`, Border-radius `24px`, Padding `24px 32px`, Display `flex`, Align Items `center`, Gap `20px`, Margin-bottom `24px`.
- **Icon Container (Squircle):** Width `56px`, Height `56px`, Background `surface-primary-subtle`, Border-radius `16px`, Display `flex`, Align Items `center`, Justify Content `center`, Color `color-primary`.
- **Text Group:** Display `flex`, Flex-direction `column`, Gap `4px`.
  - Title: Font Size `24px`, Font Weight `800`, Color `text-primary`.
  - Subtitle: Font Size `14px`, Font Weight `500`, Color `text-muted`, Line-height `20px`.
