# PromptRank AI — Company Website

> **Task 1 · WeIntern Full Stack Development · Week 2**

SEO for the AI era. A fully responsive, multi-page company website for PromptRank AI — a platform that helps businesses get recommended by ChatGPT, Claude, Gemini, and Perplexity.

---

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero, problem statement, how-it-works, pricing, CTA |
| About | `about.html` | Company story, mission, values, team |
| Services | `services.html` | 5 services in detail + comparison table |
| Contact | `contact.html` | Validated contact form + sidebar info |

## Tech Stack

- **HTML5** — semantic markup (`<nav>`, `<section>`, `<footer>`, ARIA labels)
- **CSS3** — custom properties (design tokens), Flexbox, CSS Grid, responsive breakpoints
- **Vanilla JS ES6+** — hamburger nav, IntersectionObserver scroll reveals, form validation
- **Google Fonts** — Plus Jakarta Sans, Playfair Display, DM Mono (no paid fonts)
- **Vercel** — static deployment

## Design System

Based on the Duna DESIGN.md specification:
- **Primary**: `#160e0b` (deep warm black)
- **Secondary**: `#45848d` (teal accent)
- **Surface stack**: `#ffffff` → `#f7f7f5` → `#e8e7e2` → `#dbd9cd`
- **Typography**: Playfair Display (display/h1) + Plus Jakarta Sans (body/UI) + DM Mono (labels/mono)
- **Radius**: Pill buttons (9999px), lg cards (1rem), full radius reserved for CTAs only

## Project Structure

```
promptrank/
├── index.html          # Home page
├── about.html          # About page
├── services.html       # Services page
├── contact.html        # Contact page
├── vercel.json         # Vercel deployment config
├── css/
│   ├── style.css       # Shared: tokens, reset, nav, footer, components
│   ├── home.css        # Home-specific styles
│   ├── about.css       # About-specific styles
│   ├── services.css    # Services-specific styles
│   └── contact.css     # Contact-specific styles
└── js/
    └── main.js         # Shared: nav toggle, scroll reveal, form validation
```

## Running Locally

No build step needed — open any `.html` file directly in a browser, or use VS Code Live Server:

```bash
# Option 1: Direct
open index.html

# Option 2: VS Code Live Server
# Install "Live Server" extension → right-click index.html → "Open with Live Server"

# Option 3: Python simple server
python3 -m http.server 3000
# Visit http://localhost:3000
```

## Deploying to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (from project root)
cd promptrank
vercel

# Follow prompts — select "Other" framework, root directory is ./
# Live URL will be printed after deploy
```

Or deploy via Vercel Dashboard:
1. Push to GitHub
2. Import repo at vercel.com/new
3. Framework: Other → Root directory: `./` → Deploy

## Features

- ✅ Responsive navigation with hamburger menu on mobile
- ✅ Scroll-triggered reveal animations (respects `prefers-reduced-motion`)
- ✅ Contact form with real-time validation (required fields, email format)
- ✅ Consistent footer across all pages
- ✅ Mobile-first CSS Grid and Flexbox layouts
- ✅ Accessible: semantic HTML, ARIA labels, keyboard focus states
- ✅ Fast load: no JavaScript frameworks, Google Fonts async

## Design Decisions

1. **Playfair Display for display/h1** — italic capability used for the teal accent phrase in every hero (`By AI.`, `nobody prepared for.`) creates a consistent brand moment without a custom logo.
2. **Demo widget on homepage** — the blinking cursor + score bar makes the product tangible without a live backend.
3. **Service rows instead of cards** — detailed enough to be evaluable; cards would compress the value prop too much.
4. **Dark footer on white body** — high contrast closure; `#160e0b` footer anchors every page.

---

© 2025 PromptRank AI · WeIntern Week 2 Assignment