# Ganesh Chaudhary — Full Stack Developer Portfolio

A personal portfolio built with Next.js and exported as a fully static site. It shows
current work, projects with live demos, experience and certificates, and gives
recruiters and clients a direct way to get in touch.

**Live site:** [ganeshtharu.com.np](https://ganeshtharu.com.np)

---

## Tech stack

| Category      | Technologies                                                   |
|---------------|----------------------------------------------------------------|
| **Framework** | Next.js 15 (App Router), React 19, TypeScript (strict)         |
| **Rendering** | Static export (`output: 'export'`), no server at runtime       |
| **Styling**   | Tailwind CSS 4 with a small set of semantic colour tokens      |
| **Type**      | Newsreader, IBM Plex Sans and IBM Plex Mono via `next/font`    |
| **Icons**     | Lucide React                                                   |
| **Theming**   | next-themes, follows the visitor's system setting by default   |
| **Forms**     | Web3Forms (client side, no backend of my own)                  |

## What is on the page

Hero with an at-a-glance fact sheet, About, Current work (a case study of the
production app I am building now), Skills, Projects with live demos and code links,
Services, Experience, Education with clickable certificates, and Contact.

## Engineering notes

- **Fast first paint.** The hero animates with CSS, so it never waits for JavaScript.
  Sections reveal through a tiny script that fails open, which means a broken script
  can never leave a blank page. There is no client-side animation library.
- **Accessible.** axe-core reports no WCAG 2.2 AA violations in light and dark. There is
  a skip link, visible focus on every control, the mobile menu closes with Escape, and
  reduced-motion preferences are respected. Touch targets are at least 44px.
- **Responsive.** Checked from 320px phones to 1440p desktops, including phone
  landscape and tablets in both orientations, in Chromium, Firefox and WebKit.
- **No tracking.** No cookies and no analytics. The theme choice is the only thing
  stored, in local storage.
- **Defence in depth.** A Content Security Policy ships as a meta tag in production.
  Static hosting cannot send response headers, so the policy is deliberately
  limited: it blocks third-party scripts, foreign network requests, plugins and a
  hijacked base tag, but inline scripts stay allowed because the static export needs
  them.

## Browser support

Current Chrome, Edge, Firefox and Safari. Tailwind CSS 4 sets the floor at Chrome and
Edge 111, Safari 16.4 and Firefox 128.

## Project structure

```
app/                # Routes, layout, metadata (sitemap, robots, manifest, icons), 404
components/
  layout/            # Navbar, Footer
  sections/          # One file per section of the page
  ui/                # Section wrapper, section header, theme provider
lib/                 # Typed content, shared types, utilities
public/              # Static assets
```

Content lives in `lib/constants.ts`, so copy changes never touch components. The
colour tokens and the two small CSS animations live in `app/globals.css`.

## Getting started

Node.js 20 or newer.

```bash
git clone https://github.com/ganesh-786/Ganesh-Portfolio.git
cd Ganesh-Portfolio
npm install

npm run dev      # development server
npm run build    # static export into out/
```

## Deployment

Deployed to GitHub Pages by the workflow in `.github/workflows/deploy.yml`, which
builds the static export and publishes it on every push to `main`. The custom domain
comes from `public/CNAME`. Every change reaches `main` through a pull request.

## Contact

- **GitHub:** [@ganesh-786](https://github.com/ganesh-786)
- **LinkedIn:** [Ganesh Chaudhary](https://www.linkedin.com/in/ganesh-chaudhary-684843269)

---

MIT License
