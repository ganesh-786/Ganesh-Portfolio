import { ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FEATURED_PROJECTS, OTHER_PROJECTS, projectPath } from '@/lib/projects'

const caseStudyLink =
  'group inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent underline-offset-4 hover:underline'

const arrow = 'transition-transform group-hover:translate-x-0.5'

export function Work() {
  return (
    <SectionWrapper id="work">
      <SectionHeader index="01" title="Selected work">
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
          Each case study gives the problem, the part that was mine and what you can check for
          yourself.
        </p>
      </SectionHeader>

      <ol className="border-t border-ink">
        {FEATURED_PROJECTS.map((project, i) => (
          <li key={project.slug}>
            <article className="grid gap-x-12 gap-y-6 border-b border-rule py-12 md:grid-cols-12">
              <div className="md:col-span-4">
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  {String(i + 1).padStart(2, '0')} / {project.category}
                </p>
                <h3 className="font-display text-4xl leading-[1.05] tracking-tight text-ink">
                  {project.title}
                </h3>
                <p className="mt-3 font-mono text-xs uppercase tracking-wider text-muted">
                  {project.badge}
                </p>
              </div>

              <div className="md:col-span-8">
                <p className="font-display text-xl leading-snug text-ink sm:text-2xl">
                  {project.summary}
                </p>

                <dl className="mt-6 space-y-3">
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

                <a href={projectPath(project.slug)} className={`${caseStudyLink} mt-5`}>
                  Read the case study
                  <span className="sr-only">: {project.title}</span>
                  <ArrowRight size={16} aria-hidden="true" className={arrow} />
                </a>
              </div>
            </article>
          </li>
        ))}
      </ol>

      <h3 className="mb-6 mt-20 font-mono text-xs uppercase tracking-[0.2em] text-accent">
        More projects
      </h3>
      <ul className="border-t border-ink">
        {OTHER_PROJECTS.map((project) => (
          <li
            key={project.slug}
            className="grid gap-x-12 gap-y-2 border-b border-rule py-6 md:grid-cols-12 md:items-baseline"
          >
            <div className="md:col-span-4">
              <h4 className="font-display text-2xl leading-tight tracking-tight text-ink">
                {project.title}
              </h4>
              <p className="mt-1 font-mono text-xs uppercase tracking-wider text-muted">
                {project.badge}
              </p>
            </div>
            <p className="text-base leading-7 text-muted md:col-span-6">{project.summary}</p>
            <div className="md:col-span-2 md:text-right">
              <a href={projectPath(project.slug)} className={caseStudyLink}>
                Case study
                <span className="sr-only">: {project.title}</span>
                <ArrowRight size={16} aria-hidden="true" className={arrow} />
              </a>
            </div>
          </li>
        ))}
      </ul>

      <a href="/projects" className={`${caseStudyLink} mt-8`}>
        All projects on one page
        <ArrowRight size={16} aria-hidden="true" className={arrow} />
      </a>
    </SectionWrapper>
  )
}
