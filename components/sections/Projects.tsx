import { ArrowUpRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { PROJECTS } from '@/lib/constants'

const linkBase =
  'group inline-flex min-h-11 items-center gap-1 text-sm font-medium underline-offset-4 transition-colors hover:underline'

export function Projects() {
  return (
    <SectionWrapper id="projects">
      <SectionHeader index="03" title="Projects" />

      <ol className="border-t border-ink">
        {PROJECTS.map((project, i) => (
          <li key={project.id}>
            <article className="grid gap-x-12 gap-y-6 border-b border-rule py-10 md:grid-cols-12">
              <div className="md:col-span-4">
                <p className="mb-3 font-mono text-xs tracking-[0.2em] text-muted">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="font-display text-3xl leading-tight tracking-tight text-ink">
                  {project.title}
                </h3>
                {project.badge && (
                  <p className="mt-2 font-mono text-xs uppercase tracking-wider text-muted">
                    {project.badge}
                  </p>
                )}

                {(project.liveUrl || project.githubUrl) && (
                  <div className="mt-3 flex flex-wrap gap-x-5">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${linkBase} text-accent`}
                      >
                        Live demo
                        <ArrowUpRight
                          size={15}
                          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                        <span className="sr-only">
                          {' '}
                          of {project.title} (opens in a new tab)
                        </span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${linkBase} text-ink`}
                      >
                        Code
                        <ArrowUpRight
                          size={15}
                          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                        <span className="sr-only">
                          {' '}
                          for {project.title} (opens in a new tab)
                        </span>
                      </a>
                    )}
                  </div>
                )}

                {project.note && (
                  <p className="mt-4 text-sm leading-6 text-muted">{project.note}</p>
                )}
              </div>

              <div className="md:col-span-8">
                <dl className="space-y-5">
                  {(
                    [
                      ['Challenge', project.challenge],
                      ['Approach', project.approach],
                      ['My role', project.role],
                    ] as const
                  ).map(([label, text]) => (
                    <div key={label} className="grid gap-1 sm:grid-cols-[6.5rem_1fr] sm:gap-6">
                      <dt className="pt-1 font-mono text-xs uppercase tracking-wider text-accent">
                        {label}
                      </dt>
                      <dd className="text-base leading-7 text-ink">{text}</dd>
                    </div>
                  ))}
                </dl>

                {project.technologies.length > 0 && (
                  <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted sm:pl-32">
                    {project.technologies.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          </li>
        ))}
      </ol>
    </SectionWrapper>
  )
}
