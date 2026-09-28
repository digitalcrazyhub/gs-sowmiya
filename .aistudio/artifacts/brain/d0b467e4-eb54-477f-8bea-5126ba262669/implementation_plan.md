# GS Sowmiya Builders - Senior Frontend Developer CSS Audit & Responsive Repair Plan

Comprehensive A–Z audit, cleanup, and responsive repair of the construction company website, prioritizing **mobile responsiveness**, **mobile navigation**, **card grids**, and **section padding** while strictly preserving the established design language and visual identity.

## User Review & Critical Decisions

> [!IMPORTANT]
> This plan reflects the user's explicit priority: **Focus on mobile navigation, card grids, and section padding**, alongside clean removal of duplicate/unused CSS and responsive bug fixing across all pages.

- **Confirmed Focus**: Mobile navigation, card grids, section padding, responsive alignment, and CSS architecture cleanup.
- **Visual Integrity**: Zero redesign; maintaining brand identity, colors, and layout hierarchy while fixing implementation flaws.

---

## 1. Overview & Core Concept

- **What It Does**: Refines and repairs the CSS architecture, responsive layout, card grids, mobile navigation, and section padding across all pages (Home, About, Services, Projects, Team, Contact) of the GS Sowmiya Builders website.
- **Target Audience**: Prospective construction and real estate clients browsing on mobile devices (smartphones, tablets) as well as desktops.
- **Key Value**: Flawless mobile experience, zero horizontal scrolling, robust touch targets (>= 44px), clean card grid breakpoints, and pristine CSS structure.

---

## 2. User Experience & Visual Design

- **Mobile Navigation (`Navbar & Drawer`)**:
  - Hamburger menu toggle, mobile drawer layout with smooth transition, backdrop blur, scroll locking when open, touch-friendly list items (>= 44px height), zero horizontal overflow.
- **Card Grids (Services, Projects, Team, etc.)**:
  - Responsive column adjustment: 1 column on small mobile (< 640px), 2 columns on tablet (768px - 1024px), 3-4 columns on desktop (>= 1280px).
  - Consistent padding, border-radius, shadow hierarchy, and image aspect ratios (`object-fit: cover`).
- **Section Padding & Spacing**:
  - Standardized fluid vertical padding (`clamp(3rem, 5vw, 6rem)`) and container widths (`width: min(100% - 32px, 1280px); margin-inline: auto;`) across all sections to eliminate awkward jumps and excessive mobile whitespace.
- **Page Banners**:
  - Clean breadcrumb, page title (`<h1>`), and background image with overlay/grid pattern; removing redundant text and maintaining uniform height across all pages.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Scoped CSS Cleanup vs. Rewrite**
  - *Chosen Approach*: Targeted repair of CSS conflicts, duplicate rules, and media query breakpoints across existing CSS files (`main.css`, page-specific stylesheets) rather than a total framework rewrite.
  - *Why*: Preserves established design assets and custom styles while resolving specific layout bugs.
- **Decision 2: Mobile-First Viewport Testing & Box Sizing**
  - *Chosen Approach*: Enforce `box-sizing: border-box` globally and robust min/max container constraints.
  - *Why*: Eliminates unexpected horizontal scrolling on 320px–430px mobile viewports.

---

## 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                       Global CSS Architecture               │
│  (Variables, Reset, Container System, Typography, Utilities)│
└──────────────────────────────┬──────────────────────────────┘
                               │
       ┌───────────────────────┼───────────────────────┐
       ▼                       ▼                       ▼
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│  Components  │       │ Page Layouts │       │ Responsive   │
│  (Navbar,    │       │ (Home, About,│       │ Media Queries│
│   Footer,    │       │  Projects,   │       │ & Breakpoints│
│   Banners)   │       │  Contact)    │       │ (320px-1920p)│
└──────────────┘       └──────────────┘       └──────────────┘
```

- **CSS Cleanup Plan**:
  1. Audit `css/` files for duplicate selectors, orphaned rules, and conflicting media queries.
  2. Standardize mobile navigation toggle and drawer styling.
  3. Fix card grid flex/grid properties for seamless 1-column mobile wrapping.
  4. Optimize section vertical padding for mobile viewports (320px to 430px).
  5. Verify cross-page consistency on Banners, Footer, and Forms.
