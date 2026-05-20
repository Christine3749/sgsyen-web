# SGSYEN & Gemini API Cost Explainer • UI/UX Architecture Blueprint

This document serves as the absolute visual and physical specification ledger for the **SGSYEN Academic Intelligence Interface** and the **Gemini Sandbox Pricing Calculator**. Any backend, frontend developer, or AI coding assistant can use this blueprint to reconstruct the entire application pixel-for-pixel, state-for-state.

---

## 🌎 1. Visual Identity & Aesthetic Philosophy

The application features a unique dual-mode aesthetic: a high-end, editorial academic platform on one side, and a precision technical sandbox on the other. It switches seamlessly between the two based on the user's intent.

### A. Academic Editorial Theme (SGSYEN Intelligence Hub)
*   **Vibe:** Modern European research editorial, premium, bespoke & highly authoritative.
*   **Background Canvas:** `#FDFCF9` (Warm off-white linen texture) and `#FAF9F5` (High-contrast warm beige).
*   **Text / Deep Charcoal:** `#1D1D1B` (Absolute ink-charcoal for optimal readability).
*   **Muted Accents:** `#A58261` (Antique Gold) and `#C4A35A` (Brushed Brass).
*   **Typography Pairing:**
    *   *Display/Headings:* **"Playfair Display"** (Serif) – elegant, heavy, spaced with tracking-tight.
    *   *Body/Layout:* **"Inter"** (Sans-serif) – highly legible, clean, medium weights for titles.
    *   *Technical Labels:* **"JetBrains Mono"** (Monospace) – uppercase tracking-widest, styled in 9px or 10px.

### B. East Asian & Chinese Typography Strategy (中文字体与学术级排版视觉系统)
To prevent the "default system Hei (黑体) look" from undermining the authoritative academic aesthetic, we implement a highly deliberate, web-resilient Chinese typographical system:

1.  **Display & Headings (标题宋体渲染系统 - Editorial Academic Serif):**
    *   *Core Concept:* Academic publications require classical dignity. We use a precise native Songti (宋体) fallback chain that matches the high-end editorial feel of the English "Playfair Display".
    *   *CSS Font-Family Chain:* `"Georgia"`, `"Playfair Display"`, `_font-serif`, `"Songti SC"`, `"Noto Serif CJK SC"`, `"Source Han Serif SC"`, `"STSong"`, `"AR PL New Sung"`, `"SimSun"`, `serif`.
    *   *Aesthetic Styling:* To prevent old-fashioned look, we pair Songti headings with bold weights (`font-bold` or `font-semibold`), slight positive letter spacing (`tracking-wide` for long passages, or tight line-heights `leading-snug` for massive titles), and rendering contrast controls (`antialiased`).

2.  **Body Text & Descriptions (正文无衬线排版系统 - High-Legibility Sans-serif):**
    *   *Core Concept:* For body passages (e.g. analytical briefs, dossier summaries), maximum speed of comprehension is vital. A modern, high-contrast Sans-serif (黑体) is required.
    *   *CSS Font-Family Chain:* `"Inter"`, `_font-sans`, `"PingFang SC"`, `"Hiragino Sans GB"`, `"Noto Sans CJK SC"`, `"Microsoft YaHei"`, `"Heiti SC"`, `sans-serif`.
    *   *Aesthetic Styling:* Chinese characters are dense logographs. Thus, body copy must be given breathing space:
        *   **Standard Line-Height:** Use `leading-relaxed` (generally `1.625` to `1.75`) or `leading-loose` (`2.0`) to avoid visual fatigue.
        *   **Optimal Margins:** Never cram Chinese text block; wrap in comfortable horizontal paddings.
        *   **Dynamic Chinese/Latin Mixed Spacing (中西文混排):** Always leave a deliberate half-space or small padding margin (e.g., helper class `mx-[0.25em]`) when inserting English model terms (like "GPT-4" or "Token") inline with Chinese glyphs.

3.  **Monospace Accents (数字及技术度量标签 - Precision Tech Mono):**
    *   *Core Concept:* Metrices, tokens, domain statuses, and timestamps.
    *   *CSS Font-Family Chain:* `"JetBrains Mono"`, `"Fira Code"`, `_font-mono`, `"PingFang SC"`, `monospace`.
    *   *Aesthetic Styling:* Tiny uppercase, styled in `text-[9px]` or `text-[10px]` with wide tracking (`tracking-[0.2em]`) to contrast with the dense structures of adjacent Chinese characters.

### C. Cyber-Grid Sandbox Theme (Gemini Pricing Engine)
*   **Vibe:** Sophisticated, dark-mode terminal mixed with clean mathematical graphs.
*   **Background Canvas:** `#0F0F0E` (Obsidian black) with dynamic transparent overlays.
*   **Accents:** Emerald/Mint (#10B981) for values/savings, Amber/Gold for interactive slider nodes.
*   **Gridwork:** Multi-channel 1px solid lines with variable opacity (`border-stone-800` / `border-[#1D1D1B]/10`).

---

## 🏛 2. Core Layout Shell & Shell-Widgets

The root application encapsulates everything inside a container framed by a subtle physical border.

### A. Dynamic Security & Locale Status Bar (Top Mini-Bar)
Located at the top of the `#FDFCF9` content container, keeping user authorization and locale switches accessible at all times.

1.  **Left Side: Domain Identity Network Status**
    *   A pulsating green dot representing active trust (`bg-emerald-600 animate-pulse`).
    *   Label: `SGSYEN 智库研究专网` (CN) or `SGSYEN SECURE PORTAL` (EN) in 9px uppercase tracking-widest font.
2.  **Right Side: Language & Member Portal Access**
    *   **Member Status Segment:**
        *   *If Authorized:* Displays `● {user_email}` in muted gold, with a high-contrast `[登出 / Log out]` exit link in Crimson `#C83E3E`.
        *   *If Guest:* Displays a key icon `🔑` with the click trigger text `专属登录` or `Sign In` in gold `#A58261`.
    *   **Language Selectors (Locale State Engine):**
        *   `ZH` and `EN` typography buttons.
        *   Active language gets underlined with custom offset (`underline underline-offset-4 font-bold`) and accented in `#A58261`, while inactive languages default to opacity `0.5`.
    *   **Storage Keys:**
        *   `ais_pricing_locale`: Active locale value (`zh` / `en`).
        *   `sgsyen_authorized_email`: Decoded verified auditor email.

### B. System Navigation Header
*   A premium title area hosting the primary application division switcher:
    *   **Option 1:** `学术与产业规划 (SGSYEN Hub)` – classical design accent.
    *   **Option 2:** `算力成本沙盒 (Gemini Sandbox)` – technical terminal design accent.
*   Clicking either option updates the active app view state with custom page transition transitions.

---

## 📑 3. Component specifications (SGSYEN Subsystem)

### A. SgsyenHero Component
A premium editorial welcome sequence centered on policy-level positioning.
*   **Display Title:** Styled in massive serif typography ("Playfair Display") with high-density spacing.
*   **Dynamic Subtitles Carousel:** Rotates through preset strategic mottos of the research committee utilizing staggered exit/fade transitions (`motion`).
*   **Dual-CTA Clusters:** 
    *   Primary: Black background button launching the reports panel.
    *   Secondary: Elegant bordered anchor moving directly to the interactive cost matrices.

### B. SgsyenDomains Component
An architectural grid highlighting critical focus scopes (e.g., Spatial Computing, Traditional Urban Reductions, Token Lifespan Auditing).
*   **Structure:** 3-column responsive grid changing to 1-column on mobile screens.
*   **Interaction:** Subtle scale scaling (`whileHover={{ scale: 1.015 }}`) and card shadows expanding outwards on cursor hover.

### C. SgsyenCaseStudy Component (Keynote Presentation Slide)
A presentation panel designed to mimic a high-end desktop slide layout.

```
+-----------------------------------------------------------+
|  SECTION • 03 | 数字活化探索 (SGSYEN EXPLORATION CASE)   |
|                                                           |
|  [ LEFT COLUMN: WARM CARD ]      [ RIGHT COLUMN: GRAPHIC] |
|  +-------------------------+     +----------------------+ |
|  | [Tag Badge]             |     |                      | |
|  | Title Text Headline     |     |  High resolution     | |
|  | Subtitle Sub-header     |     |  3D Digital twin     | |
|  | Description Paragraph   |     |  urban project       | |
|  |                         |     |  environmental map   | |
|  | (Dotted Divider Line)   |     |                      | |
|  | Metadata Matrix:        |     |  *Fallback Layer*    | |
|  | Timeline | Sector       |     |  Reconstruction      | |
|  | Lead     | Deliverable  |     |  Model Hall          | |
|  +-------------------------+     +----------------------+ |
|                                                           |
|  [ PREV SLIDE BUTTON ]   [ SLIDE COUNTER ]   [ NEXT SLIDE ]|
+-----------------------------------------------------------+
```

1.  **Layout Grid:** 12-column grid (`grid-cols-1 lg:grid-cols-12 gap-10 items-stretch`).
    *   **Left Column (lg:col-span-5):** Contains the text card with `#C4A35A` top border line.
    *   **Right Column (lg:col-span-7):** Hosts the high-fidelity render graphic.
2.  **Slide Database & Locales:**
    *   Slide indices are translated entirely between Chinese (`slidesZH`) and English (`slidesEN`) matching global language context.
3.  **High-Fidelity Image Fallback Engine:**
    *   Because high-resolution geospatial rendering images sometimes fail to load in restricted iframe web environments, the image element is guarded by a robust `onError` handler.
    *   **Failure Behavior:** Hides the native image element, injects the slide's specific `fallbackColor` theme, and centers beautifully polished typography: *"庙街风物重建模型馆"* (CN) / *"Temple Street Reconstruction Model Hall"* (EN) paired with a monospace subsystem status badge.
4.  **Keynote Controls:** Includes elegant round navigation buttons, enabling smooth, spring-based slide transitions between case study projects.

### D. SgsyenReports Component (Digital Intelligence Archive)
The authoritative reporting database providing physical PDF retrieval simulations.
*   **Publications List View:** Interactive grid showing the latest briefing releases, showing custom loading state spinners and precise category metadata.
*   **Full-Bleed Context Drawer:** Clicking any report slide-out a premium full-height sidebar layout (`fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl z-[500]`) for comprehensive markdown briefs.
*   **Authorization Security Guard:**
    *   Reports contain locked elements. If the user session has no authenticated email, they are presented with a button: `🔑 契约验证登录`.
    *   Clicking this button calls the shared context hook, triggering the universal Member Access Port modal.
*   **Physical PDF Downloader Safe-Guard:**
    *   Employs an offline-resilient sandbox download pipe. Once authenticated, clicking "Download" shows a localized loading prompt (`1000ms` GCS compilation hook delay) followed by a successful custom confirmation toast.

### E. SgsyenNetwork Component (The Industry Ecosystem Matrix)
The sister-portal directory exhibiting corporate and academic operational hubs.

1.  **Carousel Sliding Mechanics:**
    *   Equipped with a **Keynote-level carousel slider controller** instead of rigid static display modules.
    *   Uses dynamic width multipliers (`width: 100 / visibleCount %`) responding to reactive layout triggers (3 columns for widescreen, 2 columns for tablets, 1 column for phones).
    *   Features structural left (`<-`) and right (`->`) navigation arrows styled with rounded slate rings, accompanied by a monospace status digit indicator (`01 / 02`, etc.) to coordinate precise slides transitions.
2.  **Core Domain Nodes:**
    *   **Node 1: gsyen.com** (Motto: 疆域 Big Model Clusters). Highlight brand: antique gold theme.
    *   **Node 2: halfsphere.com** (Motto: Token Computation Metrics). Highlight brand: obsidian charcoal.
    *   **Node 3: soulshock.net** (Motto: Spatial Digitization and Heritage). Highlight brand: crimson red.
    *   **Node 4: zhijian.me** (Motto: 纸笺幼师助手). Highlight brand: sage green `#5C8F79`. Targeted at preschool education automation, custom-built language model analyses, and lesson formulation.
3.  **On-The-Spot Configuration Modal Editor:**
    *   Each card features a sleek, minimal setup gear icon (`Settings`).
    *   Clicking launching an in-grid overlay editor allowing immediate changes of Site Title, Sector Domain, Redirect URI, and Research Mission Description on the spot.
    *   Submitting compiles the state into reactive storage: `sgsyen_matrix_sites`. Real-time notifications and toast feedback ensure maximum responsiveness.

---

## 🔑 4. Unified Member Access Port (Authentication Modal)

A uniform access control portal preventing unauthorized leakage of confidential documents.

*   **Modal Form Architecture:** Dark-theme backdrop overlay layered with a clean, centered credential terminal card.
*   **Auditor Validator Sequence:**
    *   Allows input of standard email structures.
    *   **Interactive Safeguard Check:** Any user email containing the `@gsyen.com` suffix is recognized as an absolute enterprise high-trust entity (e.g. `Ethan7586@gsyen.com`), granting premium priority privileges instantly.
*   **State Updates:** Updates both context state & local storage keys. Active readers in the publication drawers or matrix cards dynamically adapt to active authorizations without requiring hard page refreshes.

---

## 📊 5. Comprehensive Cost Sandbox (Gemini Calculator Subsystem)

The developer pricing panel allowing engineers to visually calculate model expenditures.

### A. Parameter Management Module
*   **Model Selection Core:** Select lists targeting major model tiers: `gemini-1.5-flash`, `gemini-1.5-pro`, `gemini-2.5-flash`, `gemini-2.8-pro`.
*   **Context Volume Control:** Interactive horizontal slider nodes allowing inputs up to **2,000,000 tokens**, adapting prices in response to different tiered rate cliffs (e.g., input scales scaling above the 128k token mark).

### B. Output Analytics Section
*   **Interactive Cost Graphs (`recharts`):** Minimalist dual bar graphs comparing alternative tiers under similar volume profiles.
*   **Savings Matrix Metrics:** Highlights the absolute economic efficiency of cached tokens and context cache hits with high-contrast emerald tag accents.

---

## 🛠 6. Blueprint Checklist for Rapid Re-Development

When implementing from scratch, ensure:
1.  **Tailwind Configuration:** Add fonts into the Tailwind theme layer.
    ```css
    @theme {
      --font-serif: "Playfair Display", Georgia, serif;
      --font-sans: "Inter", system-ui, sans-serif;
      --font-mono: "JetBrains Mono", monospace;
    }
    ```
2.  **Lucide Icons Only:** Do not render raw SVGs. Rely exclusively on `lucide-react` triggers (`Globe`, `Settings`, `ArrowUpRight`, `Lock`, `BookOpen`, `Layers`, `ChevronLeft`, `ChevronRight`, `Clock`).
3.  **Local Storage Resilience:** All fields (locales, modified portal nodes, security emails) must hydrate smoothly from `localStorage` fallbacks during first paint to bypass flickering.
4.  **No Infinite Re-renders:** Ensure callback binds are wrapped in clean primitive state comparisons to protect high-frequency input nodes.
