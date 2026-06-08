# Parth Panchal - WEEK 1 ASSIGNMENts

# Folder Structure

```
week1-assignments

├──business-landing-page/
    └── index.html        
├──css-challenge/
    ├── flex-layout.html       
    ├── grid-layout.html       
    └── animation-demo.html    
├──portfolio-website/
    ├── index.html
    ├── about.html
    ├── projects.html
    ├── contact.html
    ├── css/
    │   └── style.css
    ├── js/
    │   ├── components.js   ← Shared nav + footer
    │   └── script.js       ← Scroll reveal + form logic
    └── assets/
        ├── images/
├── screenshots/
        ├── flex-desktop.png
        ├── flex-mobile.png
        ├── grid-layout.png
        ├── animation-demo.png
        ├──landing-desktop.png
        ├──landing-hero-mobile.png
        ├──landing-services.png 
        ├──landing-contact-form.png
        ├──flex-desktop.png
        ├──flex-mobile.png
        ├──grid-layout.png
        └──animation-demo.png
└── README.md
```
# Screenshots

All Located in `/screenshots/` folder

# Author

**Parth Panchal**  
[parthpanchal.10000@gmail.com](mailto:parthpanchal.10000@gmail.com)  
[LinkedIn](https://www.linkedin.com/in/parth-panchal-a3a309366/)
[GitHub](https://github.com/PARTHPANCHAL3656)
[REPO](https://github.com/PARTHPANCHAL3656/WeIntern)
---

# TASK 1 portfolio-website

## Objective

A personal portfolio website demonstrating frontend development skills — semantic HTML5, responsive CSS3, Flexbox/Grid layouts, and vanilla JavaScript interactions.

## Tech Stack

- HTML5 (semantic structure)
- CSS3 (custom properties, Flexbox, Grid, animations)
- Vanilla JavaScript (IntersectionObserver, DOM injection, form handling)
- Google Fonts — Space Mono + DM Sans
- Deployed on Vercel

## Features

- Fully responsive — mobile, tablet, desktop
- Shared nav and footer via JavaScript component injection (no copy-paste)
- Scroll-reveal animations using IntersectionObserver API
- Active nav link detection per page
- Mobile hamburger navigation
- Contact form with validation and success feedback
- Semantic HTML5 throughout (`header`, `nav`, `main`, `section`, `article`, `footer`)

## Pages

| File | Page |
|------|------|
| `index.html` | Home — Hero + Skills strip + Quick about |
| `about.html` | About — Bio, beliefs, career interests, skills table |
| `projects.html` | Projects — IdeaVerdict, MaxPrompt, Expense Tracker |
| `contact.html` | Contact — Social links + contact form |

## Setup

No build step needed. Open any `.html` file directly in a browser, or serve with:

```bash
npx serve .
```

# TASK 2 business-landing-page

## Objective

A production-quality landing page for **CapsuleHub by Tilantra** — a Chrome extension that captures AI conversations as reusable Capsules and transfers context across ChatGPT, Claude, Gemini, DeepSeek, and more.

---

## Project Overview

| Field | Detail |
|---|---|
| Task | Task 2 — Responsive Business Landing Page |
| Business Type | SaaS / Chrome Extension (Software Startup) |
| Tech Stack | HTML5, CSS3, Vanilla JavaScript |
| Frameworks | None — core frontend only |
| Deployment | Vercel / Netlify / GitHub Pages |

---

## Features Implemented

- **Sticky navbar** with smooth scroll navigation and mobile hamburger menu
- **Hero section** with animated floating capsule, orbiting AI chips, SVG flow lines, and trust badge
- **Stats bar** — 25K+ users, 2M+ capsules, platform count, Chrome rating
- **Problem section** — 3 pain point cards with hover effects
- **Solution timeline** — 4-step horizontal process with connecting line
- **Features section** — 6 cards with icon, description, and hover glow animation
- **Integrations hub** — radial layout with animated orbit rings and chip cards
- **Pricing section** — 3 tiers (Starter / Pro / Team) with working monthly/yearly billing toggle
- **Testimonials** — 3 realistic cards with avatar, role, and star rating
- **Contact form** — Name, Email, Phone, Message with HTML5 validation and success state
- **Final CTA section** with radial glow background
- **Footer** — logo, 4-column links, social icons, copyright
- **Scroll reveal animations** via IntersectionObserver (staggered delays)
- **CSS variables** for full theming control
- **Mobile-first responsive** layout across all breakpoints

---

## Setup & Run

No build step required. Open directly in any browser:

```bash
# Option 1 — just open the file
open index.html

# Option 2 — local dev server (VS Code Live Server or npx)
npx serve .
```

---

## Design Decisions

- **Color system:** Dark navy (`#07060f`) base with purple accent (`#7b5cfa`) — matches CapsuleHub's existing Chrome Store branding
- **Typography:** Syne (headings, 800 weight) + DM Sans (body) — editorial, high-contrast pairing
- **CSS variables:** All colors, radii, and spacing defined in `:root` for easy updates
- **No frameworks:** All layout done with CSS Grid and Flexbox as per task requirements
- **Single file:** CSS and JS inline for zero dependency, instant deployment

---

## Responsive Breakpoints

| Breakpoint | Behaviour |
|---|---|
| `> 860px` | Full desktop layout, hero visual visible |
| `≤ 860px` | Hero visual hidden, nav collapses to hamburger, grids go 2-column |
| `≤ 760px` | All grids go single column, contact form stacks |
| `≤ 520px` | Features grid single column, footer single column |

---

# Task 3 css_hallenges 

---

## Overview

Three focused CSS layout and animation challenges demonstrating Flexbox, CSS Grid, and CSS animations — built as standalone HTML files with no external dependencies beyond Google Fonts.

---

## Challenge 1 — Flexbox Layout (`flex-layout.html`)

### What it demonstrates
- `display: flex` with `flex-wrap: wrap` for automatic mobile stacking
- `justify-content: center` and `align-items: stretch` for equal-height cards
- `flex: 1 1 260px` on cards so they grow/shrink proportionally
- `gap` for consistent spacing without margin hacks
- Hover lift with `translateY` + `box-shadow` transition

### Key CSS concepts
```css
.flex-container {
  display: flex;
  flex-wrap: wrap;           /* wraps to next line on small screens */
  justify-content: center;   /* center the row */
  align-items: stretch;      /* all cards same height */
  gap: 1.5rem;
}

.card {
  flex: 1 1 260px;           /* grow, shrink, min-width 260px */
  max-width: 340px;
}
```

### Responsive behaviour
| Breakpoint | Layout |
|---|---|
| ≥ 640px | Three cards in a row |
| < 640px | Cards stack vertically, full width |

---

## Challenge 2 — Grid Layout (`grid-layout.html`)

### What it demonstrates
- `display: grid` with `repeat(3, 1fr)` for equal-width columns
- `grid-column: span 2` for featured wide cards
- `grid-row: span 2` for tall cards (skills tracker)
- `1px gap + border background trick` for clean cell borders
- Animated progress bars using CSS `@keyframes`

### Key CSS concepts
```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--border);  /* gap colour = cell borders */
}

.featured { grid-column: span 2; }
.tall     { grid-row: span 2; }
```

### Responsive behaviour
| Breakpoint | Layout |
|---|---|
| ≥ 768px | 3-column grid |
| 500px – 768px | 2-column grid |
| < 500px | Single column |

### Grid items
8 items total across services, tech stack, stats, and a booking CTA — all using consistent card styling.

---

## Challenge 3 — Animation Demo (`animation-demo.html`)

### Five animation components

#### A — Button Hover Animations
Three buttons, three different CSS techniques:

| Button | Technique | CSS Properties |
|---|---|---|
| Fill Sweep | `::before` slides in from left | `translateX(-101%) → translateX(0)` |
| Border Draw | Four-side pseudo-element draw | `width: 0 → 100%`, `height: 0 → 100%` |
| Arrow Spring | Icon rotates on hover | `rotate(-45deg)` + `cubic-bezier(0.34,1.56,0.64,1)` |

#### B — Loading Spinners
Three spinner variants, all pure CSS `@keyframes`:

```css
/* Arc spinner */
@keyframes spin { to { transform: rotate(360deg); } }

/* Dot pulse */
@keyframes bounce {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; }
  40%           { transform: scale(1.0); opacity: 1; }
}

/* Bar wave */
@keyframes barwave {
  0%, 100% { transform: scaleY(0.4); }
  50%       { transform: scaleY(1.0); }
}
```

#### C — Fade-In Content Reveal
Cards use `IntersectionObserver` — zero scroll event listeners, maximum performance:

```css
.reveal-card {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.reveal-card.visible {
  opacity: 1;
  transform: translateY(0);
}
/* Stagger via transition-delay */
.reveal-card:nth-child(2) { transition-delay: 0.1s; }
.reveal-card:nth-child(3) { transition-delay: 0.2s; }
```

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // fire once, stay visible
    }
  });
}, { threshold: 0.15 });
```

#### D — Card Lift Effect
Spring-physics lift using a custom cubic-bezier overshoot:

```css
.lift-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 12px 24px rgba(0,0,0,0.4);
  /* cubic-bezier(0.34, 1.56, 0.64, 1) = spring overshoot */
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

#### E — Animated Underline Navigation
Nav links with a red underline that wipes left-to-right — pure CSS `::after` pseudo-element:

```css
a { position: relative; padding-bottom: 4px; }

a::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0;
  width: 0;              /* starts invisible */
  height: 1px;
  background: #c0392b;
  transition: width 0.3s ease;
}

a:hover::after { width: 100%; }  /* wipes in on hover */
```

Plus headline word-slide using `overflow: hidden` parent + `translateY(110%) → translateY(0)` with staggered `animation-delay`.

---

## Design System

All three files share a consistent visual language:

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#0d0d0f` | Dark page background |
| `--accent` | `#c0392b` | Red accent — highlights, labels, underlines |
| `--sans` | DM Sans | Body and UI text |
| `--serif` | DM Serif Display | Headlines |
| `--mono` | Courier New | System labels, code, numbering |
| `--border` | `rgba(255,255,255,0.08)` | Subtle dividers |

Body text is `rgba(255,255,255,0.55)` — not pure white. Intentional: reduces harshness on dark backgrounds and reads as more refined.

---

## Setup

No build step. No dependencies. Open any file directly in a browser:

```bash
# Open in browser
open flex-layout.html
open grid-layout.html
open animation-demo.html

# Or serve locally
npx serve .
```

Google Fonts (DM Sans + DM Serif Display) loads from CDN — requires internet connection on first open.

---

## Browser Support
- CSS Flexbox — universal
- CSS Grid — universal  
- `IntersectionObserver` — universal
- CSS custom properties — universal
- `cubic-bezier()` — universal
- `backdrop-filter` — Chrome/Safari/Edge (not Firefox without flag)

---
