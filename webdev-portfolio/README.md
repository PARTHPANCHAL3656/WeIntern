# Parth Panchal — Web Developer Portfolio

> Week 1 · Task 1 · WeIntern Web Development Internship

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

## Folder Structure

```
webdev-portfolio/
├── index.html
├── about.html
├── projects.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   ├── components.js   ← Shared nav + footer
│   └── script.js       ← Scroll reveal + form logic
├── assets/
│   ├── images/
│   └── icons/
├── screenshots/
└── README.md
```

## Setup

No build step needed. Open any `.html` file directly in a browser, or serve with:

```bash
npx serve .
```

## Live Demo

[Add Vercel link here after deployment]

## Screenshots

See `/screenshots` folder.

## Author

**Parth Panchal**  
[parthpanchal.10000@gmail.com](mailto:parthpanchal.10000@gmail.com)  
[LinkedIn](https://www.linkedin.com/in/parth-panchal-a3a309366/)
[GitHub](https://github.com/PARTHPANCHAL3656)