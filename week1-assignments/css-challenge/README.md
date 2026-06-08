# CSS Challenge — Task 3

> Task 3: CSS Challenge

## Overview

Three focused CSS layout and animation challenges demonstrating Flexbox, CSS Grid, and CSS animations — built as standalone HTML files with no external dependencies beyond Google Fonts.


## Deployments

> Task 3 - [CSS challenge](https://css-challenge-eight.vercel.app)

---

## Folder Structure

```
css-challenge/
├── flex-layout.html       → Flexbox testimonial card row
├── grid-layout.html       → CSS Grid project dashboard
├── animation-demo.html    → Animation showcase (5 components)
├── screenshots/
│   ├── flex-desktop.png
│   ├── flex-mobile.png
│   ├── grid-layout.png
│   └── animation-demo.png
└── README.md
```

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

All CSS techniques used are supported in Chrome, Firefox, Safari, and Edge (2022+):
- CSS Flexbox — universal
- CSS Grid — universal  
- `IntersectionObserver` — universal
- CSS custom properties — universal
- `cubic-bezier()` — universal
- `backdrop-filter` — Chrome/Safari/Edge (not Firefox without flag)

---

## Screenshots

See `/screenshots` folder.

| File | Description |
|---|---|
| `flex-desktop.png` | Three-card flex row at desktop width |
| `flex-mobile.png` | Stacked cards at 375px |
| `grid-layout.png` | Full 3-column dashboard grid |
| `animation-demo.png` | Animation showcase — all five components |

## Author

**Parth Panchal**  
BTech CSE — KPGU, Vadodara  
Web Development Internship - WeIntern Pvt. Ltd.  
GitHub: [PARTHPANCHAL3656](https://github.com/PARTHPANCHAL3656)  
Email: parthpanchal.10000@gmail.com