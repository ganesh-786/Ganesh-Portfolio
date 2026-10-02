# Ganesh Chaudhary — Full Stack Developer Portfolio

A personal portfolio built with Next.js and exported as a fully static site. It shows
the work as case studies, says plainly what a client gets and how a project starts, and
gives clients and recruiters a direct way to get in touch.

**Live site:** [ganeshtharu.com.np](https://ganeshtharu.com.np)

---

## Tech stack

| Category      | Technologies                                                   |
|---------------|----------------------------------------------------------------|
| **Framework** | Next.js 16 (App Router), React 19, TypeScript (strict)         |
| **Rendering** | Static export (`output: 'export'`), no server at runtime       |
| **Styling**   | Tailwind CSS 4 with a small set of semantic colour tokens      |
| **Type**      | Newsreader, IBM Plex Sans and IBM Plex Mono via `next/font`    |
| **Icons**     | Lucide React                                                   |
| **Theming**   | next-themes, follows the visitor's system setting by default   |
| **Forms**     | Web3Forms (client side, no backend of my own)                  |

## What is on the site

The home page runs in the order a client reads it: a hero with an at-a-glance fact
sheet, Selected work, What you get when we work together, the questions a client asks
before writing (reply time, price model, availability), then About, Experience, Skills,
Education with clickable certificates, and a contact form.

Every project has its own case study at `/projects/<name>`, and `/projects` lists them
all. Each case study has the same parts in the same order: the problem, what was built,
my part and the team's, the decisions that shaped it, the outcome, and what a reader can
check for themselves. A case study only says what a source backs up (the repository and
its history, a published report, or my own record), and it says so where a figure is an
estimate or something is private.

The CV (`public/Ganesh_Chaudhary_Resume2026Oct.pdf`) opens in the browser's own PDF
viewer in a new tab instead of downloading. The address to share is
[ganeshtharu.com.np/resume](https://ganeshtharu.com.np/resume): it forwards to the file.
To rename the file, update `HERO_DATA.resume` in `lib/constants.ts` and add the old
address to `RETIRED_RESUME_PATHS`, so links already sent out still reach the CV.

## Engineering notes

- **Fast first paint.** The hero animates with CSS, so it never waits for JavaScript.
  Sections reveal through a tiny script that fails open, which means a broken script
  can never leave a blank page. There is no client-side animation library.
- **A typed line that degrades.** The line under the name types out what I build. The
  whole sentence is always in the page as ordinary text: that is what a screen reader
  reads, and what shows without JavaScript or with reduced motion. The animation has a
  pause button, reserves its space so nothing below it moves, and stops while it is off
  screen.
- **Navigation without JavaScript.** Every item in the bar is a real link, so it works
  with scripts off and from a case study page.
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
  sections/          # One file per section of the home page
  projects/          # The case study page
  ui/                # Section wrapper and header, typed line, call to action, theme provider
lib/                 # Typed content, shared types, utilities
public/              # Static assets
```

Content lives in `lib/constants.ts` and the case studies in `lib/projects.ts`, so copy
changes never touch components. Adding a project to `lib/projects.ts` creates its page,
lists it and adds it to the sitemap. The colour tokens and the small CSS animations live
in `app/globals.css`.

## Getting started

Node.js 22 or newer, the version the site is built and deployed with.

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
- **LinkedIn:** [Ganesh Chaudhary](https://www.linkedin.com/in/ganesh-chaudhary)

---

MIT License
