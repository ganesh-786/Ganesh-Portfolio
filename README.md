# Ganesh Chaudhary — Full Stack Developer Portfolio

A personal portfolio site built with Next.js, showcasing projects, experience, and
skills.

**Live site:** [ganeshtharu.com.np](https://www.ganeshtharu.com.np)

---

## Tech Stack

| Category       | Technologies                                      |
|-----------------|----------------------------------------------------|
| **Framework**   | Next.js 15 (App Router), React 19, TypeScript      |
| **Rendering**   | Static export (`output: 'export'`)                 |
| **Styling**     | Tailwind CSS 4 (CSS-first theme)                    |
| **Animations**  | Framer Motion                                       |
| **Icons**       | Lucide React                                        |
| **Theming**     | next-themes (class-based dark mode)                 |
| **Utilities**   | clsx, tailwind-merge                                |

## Features

- Single-page layout: Hero, About, Skills, Projects, Experience, Education, Contact
- Dark/light theme toggle with persisted preference and no flash of unstyled theme
- Scroll-triggered reveal animations
- Responsive, mobile-first layout with an accessible mobile navigation menu
- Structured data (JSON-LD) for search engines
- Open Graph and Twitter card metadata with a dedicated preview image
- Fully static export, deployed via GitHub Pages behind a custom domain

## Project Structure

```
app/                # Routes, layout, metadata (sitemap, robots, manifest, icons)
components/
  layout/            # Navbar, Footer
  sections/          # Hero, About, Skills, Projects, Experience, Education, Contact
  ui/                # Reusable UI primitives (theme provider, section wrapper)
lib/                 # Typed content constants, shared types, utilities
public/              # Static assets
```

## Getting Started

```bash
# Clone the repository
git clone https://github.com/ganesh-786/Ganesh-Portfolio.git
cd Ganesh-Portfolio

# Install dependencies
npm install

# Start the dev server
npm run dev

# Build the static export
npm run build
```

The production build outputs a static site to the `out/` directory, which is what
gets deployed.

## Deployment

Deployed to GitHub Pages via the workflow in `.github/workflows/deploy.yml`, which
builds the static export and publishes it on push to `main`. The custom domain is
configured through `public/CNAME`.

## Contact

- **Email:** [ganesh98245.np@gmail.com](mailto:ganesh98245.np@gmail.com)
- **GitHub:** [@ganesh-786](https://github.com/ganesh-786)
- **LinkedIn:** [Ganesh Chaudhary](https://www.linkedin.com/in/ganesh-chaudhary-684843269)

---

MIT License
