import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { CtaBand } from '@/components/ui/CtaBand'
import { ProjectLinks } from '@/components/ui/ProjectLinks'
import { HERO_DATA, PROJECT_CTA_BODY } from '@/lib/constants'
import { PROJECTS, projectPath } from '@/lib/projects'

const title = `Projects and case studies | ${HERO_DATA.name}`
const description =
  'Every project with its own case study: the problem, what was built, the part that was mine, the decisions behind it and what you can check.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/projects' },
  openGraph: {
    type: 'website',
    url: '/projects',
    title,
    description,
    siteName: 'Ganesh Chaudhary Portfolio',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: `${HERO_DATA.name}, ${HERO_DATA.title}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.png'],
  },
}

export default function Projects() {
  return (
    <>
      <Navbar />
      <main id="main">
        <header className="mx-auto max-w-6xl px-5 pb-14 pt-28 sm:px-8 sm:pb-20 sm:pt-36">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-2 font-mono text-xs uppercase tracking-[0.16em] text-muted">
              <li>
                <a href="/" className="inline-flex min-h-11 min-w-11 items-center hover:text-ink">
                  Home
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink">
                Projects
              </li>
            </ol>
          </nav>

          <h1 className="mt-8 font-display text-5xl leading-[1] tracking-tight text-ink sm:text-7xl">
            Projects and <em className="font-normal italic">case studies</em>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            Every project, with the problem, the part that was mine and what you can check for
            yourself. Team projects say which part was a teammate’s.
          </p>
        </header>

        <div className="mx-auto max-w-6xl px-5 pb-20 sm:px-8 sm:pb-28">
          <ol className="border-t border-ink">
            {PROJECTS.map((project, i) => (
              <li key={project.slug}>
                <article className="grid gap-x-12 gap-y-5 border-b border-rule py-10 md:grid-cols-12">
                  <div className="md:col-span-4">
                    <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                      {String(i + 1).padStart(2, '0')} / {project.category}
                    </p>
                    <h2 className="font-display text-3xl leading-tight tracking-tight text-ink">
                      {project.title}
                    </h2>
                    <p className="mt-2 font-mono text-xs uppercase tracking-wider text-muted">
                      {project.badge}
                    </p>
                    <ProjectLinks project={project} className="mt-2" />
                  </div>

                  <div className="md:col-span-8">
                    <p className="font-display text-xl leading-snug text-ink sm:text-2xl">
                      {project.summary}
                    </p>

                    <dl className="mt-5 space-y-3">
                      {(
                        [
                          ['My part', project.role],
                          ['Status', project.status],
                        ] as const
                      ).map(([label, text]) => (
                        <div key={label} className="grid gap-1 sm:grid-cols-[6.5rem_1fr] sm:gap-6">
                          <dt className="pt-1 font-mono text-xs uppercase tracking-wider text-muted">
                            {label}
                          </dt>
                          <dd className="text-base leading-7 text-ink">{text}</dd>
                        </div>
                      ))}
                    </dl>

                    <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted">
                      {project.technologies.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>

                    <a
                      href={projectPath(project.slug)}
                      className="group mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent underline-offset-4 hover:underline"
                    >
                      Read the case study
                      <span className="sr-only">: {project.title}</span>
                      <ArrowRight
                        size={16}
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </a>
                  </div>
                </article>
              </li>
            ))}
          </ol>

          <div className="mt-20">
            <CtaBand heading="Have a project of your own?" body={PROJECT_CTA_BODY} href="/#contact" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
