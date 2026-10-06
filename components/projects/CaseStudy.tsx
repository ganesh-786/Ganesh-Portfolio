import type { ReactNode } from 'react'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { CtaBand } from '@/components/ui/CtaBand'
import { ProjectLinks } from '@/components/ui/ProjectLinks'
import { PROJECT_CTA_BODY } from '@/lib/constants'
import { PROJECTS, projectPath } from '@/lib/projects'
import type { Project } from '@/lib/types'
import { cn } from '@/lib/utils'

const label = 'font-mono text-xs uppercase tracking-wider text-muted'

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-ink pt-5">
      <h2 className="mb-6 font-display text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {children}
    </section>
  )
}

// With `lead`, the first paragraph is set large, the way the summary under the title is.
function Paragraphs({ items, lead }: { items: string[]; lead?: boolean }) {
  return (
    <div className="max-w-2xl space-y-5">
      {items.map((text, i) => (
        <p
          key={text}
          className={
            lead && i === 0
              ? 'font-display text-xl leading-snug text-ink sm:text-2xl'
              : 'text-lg leading-8 text-muted'
          }
        >
          {text}
        </p>
      ))}
    </div>
  )
}

function Dashes({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn('max-w-2xl space-y-2.5', className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-4 text-base leading-7 text-ink">
          <span aria-hidden="true" className="mt-3.5 h-px w-3 shrink-0 bg-accent" />
          {item}
        </li>
      ))}
    </ul>
  )
}

// Every case study has the same parts in the same order, so a reader who has seen one knows
// where to look in the next: the problem, what was built, my part, the decisions, the outcome
// and what can be checked. Parts a project has no evidence for are left out, not padded.
export function CaseStudy({ project }: { project: Project }) {
  const index = PROJECTS.indexOf(project)
  const previous = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length]
  const next = PROJECTS[(index + 1) % PROJECTS.length]

  const facts = [
    ['Type', project.badge],
    ['My role', project.role],
    ['Team', project.team],
    ['When', project.period],
    ['Status', project.status],
  ].filter((fact): fact is [string, string] => Boolean(fact[1]))

  return (
    <>
      <article>
        <header className="mx-auto max-w-6xl px-5 pb-14 pt-28 sm:px-8 sm:pb-20 sm:pt-36">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-2 font-mono text-xs uppercase tracking-[0.16em] text-muted">
              <li>
                <a href="/" className="inline-flex min-h-11 min-w-11 items-center hover:text-ink">
                  Home
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <a href="/projects" className="inline-flex min-h-11 min-w-11 items-center hover:text-ink">
                  Projects
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink">
                {project.title}
              </li>
            </ol>
          </nav>

          <p className="mb-4 mt-8 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Case study / {project.category}
          </p>
          <h1 className="font-display text-5xl leading-[1] tracking-tight text-ink sm:text-7xl">
            {project.title}
          </h1>
          <p className="mt-6 max-w-3xl font-display text-xl leading-snug text-ink sm:text-2xl lg:text-[1.75rem] lg:leading-[1.35]">
            {project.summary}
          </p>
          <ProjectLinks project={project} className="mt-5" />
        </header>

        <div className="border-t border-rule">
          <div className="mx-auto grid max-w-6xl gap-x-16 gap-y-14 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-12">
            <aside aria-label="Project facts" className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  At a glance
                </p>
                <dl className="border-t border-ink">
                  {facts.map(([name, value]) => (
                    <div
                      key={name}
                      className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-rule py-3.5"
                    >
                      <dt className={cn(label, 'pt-1')}>{name}</dt>
                      <dd className="text-base leading-snug text-ink">{value}</dd>
                    </div>
                  ))}
                </dl>

                <p className={cn(label, 'mb-3 mt-8 tracking-[0.16em]')}>Built with</p>
                <ul className="space-y-1 text-base leading-7 text-ink">
                  {project.technologies.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className="space-y-16 lg:col-span-8">
              <Block title="The problem">
                <Paragraphs items={project.problem} lead />
                {project.needs && (
                  <>
                    <h3 className={cn(label, 'mb-3 mt-8 tracking-[0.16em]')}>What it had to do</h3>
                    <Dashes items={project.needs} />
                  </>
                )}
              </Block>

              <Block title="What was built">
                <Paragraphs items={project.solution} />

                {project.flow && (
                  <>
                    <h3 className={cn(label, 'mb-3 mt-10 tracking-[0.16em]')}>
                      How it works, step by step
                    </h3>
                    <ol className="border-t border-rule">
                      {project.flow.map((step, i) => (
                        <li key={step} className="flex gap-5 border-b border-rule py-4">
                          <span aria-hidden="true" className="pt-1 font-mono text-xs text-accent">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="max-w-2xl text-base leading-7 text-ink">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </>
                )}

                {project.image && (
                  <figure className="mt-10">
                    <div className="border border-rule bg-raised p-2">
                      <Image
                        src={project.image.src}
                        alt={project.image.alt}
                        width={project.image.width}
                        height={project.image.height}
                        sizes="(max-width: 1024px) 100vw, 720px"
                        className="h-auto w-full"
                      />
                    </div>
                    <figcaption className={cn(label, 'mt-3 normal-case tracking-normal')}>
                      {project.image.caption}
                    </figcaption>
                  </figure>
                )}
              </Block>

              <Block title="My part">
                <Dashes items={project.myPart} />
                {project.teamPart && (
                  <>
                    <h3 className={cn(label, 'mb-2 mt-8 tracking-[0.16em]')}>The rest of the team</h3>
                    <p className="max-w-2xl text-base leading-7 text-muted">{project.teamPart}</p>
                  </>
                )}
              </Block>

              {project.highlights && (
                <Block title="What I built, in detail">
                  <ul className="grid gap-x-10 gap-y-10 md:grid-cols-2">
                    {project.highlights.map((item) => (
                      <li key={item.label} className="border-t border-rule pt-4">
                        <p className="mb-2 font-mono text-xs uppercase tracking-wider text-accent">
                          {item.label}
                        </p>
                        <h3 className="font-display text-2xl leading-tight tracking-tight text-ink">
                          {item.title}
                        </h3>
                        <Dashes items={item.points} className="mt-4" />
                      </li>
                    ))}
                  </ul>
                </Block>
              )}

              {project.decisions && (
                <Block title="Decisions that shaped it">
                  <ol className="space-y-9">
                    {project.decisions.map((decision, i) => (
                      <li key={decision.title} className="grid gap-x-5 sm:grid-cols-[2rem_1fr]">
                        <span aria-hidden="true" className="pt-2 font-mono text-xs text-accent">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <h3 className="font-display text-2xl leading-tight tracking-tight text-ink">
                            {decision.title}
                          </h3>
                          <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
                            {decision.body}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </Block>
              )}

              <Block title="The outcome">
                <Paragraphs items={project.outcome} />

                {project.figures && (
                  <>
                    <dl className="mt-10 border-t border-rule sm:grid sm:grid-cols-3">
                      {project.figures.map((figure, i) => (
                        <div
                          key={figure.label}
                          className={cn(
                            'flex items-baseline justify-between gap-4 border-b border-rule py-4',
                            'sm:flex-col-reverse sm:items-start sm:justify-end sm:gap-2 sm:py-6',
                            i % 3 !== 0 && 'sm:border-l sm:pl-6',
                            i % 3 === 0 && 'sm:pr-6',
                          )}
                        >
                          <dt className={cn(label, 'min-w-0 flex-1 text-left sm:flex-none')}>
                            {figure.label}
                          </dt>
                          <dd className="shrink-0 font-display text-3xl leading-none tracking-tight text-ink sm:text-4xl">
                            {figure.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                    {project.figuresNote && (
                      <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
                        {project.figuresNote}
                      </p>
                    )}
                  </>
                )}
              </Block>

              {project.practices && (
                <Block title="How I work with the team">
                  <ol className="grid gap-x-10 gap-y-9 md:grid-cols-2">
                    {project.practices.map((practice, i) => (
                      <li
                        key={practice.title}
                        className={cn(
                          project.practices!.length % 2 === 1 &&
                            i === project.practices!.length - 1 &&
                            'md:col-span-2',
                        )}
                      >
                        <p className="mb-3 font-mono text-xs tracking-[0.2em] text-accent">
                          {String(i + 1).padStart(2, '0')}
                        </p>
                        <h3 className="font-display text-2xl leading-tight tracking-tight text-ink">
                          {practice.title}
                        </h3>
                        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
                          {practice.body}
                        </p>
                      </li>
                    ))}
                  </ol>
                </Block>
              )}

              <Block title="What you can check">
                <dl className="border-t border-rule">
                  {project.evidence.map((item) => (
                    <div
                      key={item.label}
                      className="grid gap-x-10 gap-y-1 border-b border-rule py-5 md:grid-cols-12"
                    >
                      <dt className={cn(label, 'pt-1 md:col-span-3')}>{item.label}</dt>
                      <dd className="md:col-span-9">
                        <p className="max-w-2xl text-base leading-7 text-ink">{item.detail}</p>
                        {item.href && (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex min-h-11 items-center gap-1 text-sm font-medium text-accent underline-offset-4 hover:underline"
                          >
                            Open
                            <span className="sr-only">
                              : {item.label}, {project.title}
                            </span>
                            <ArrowUpRight
                              size={15}
                              aria-hidden="true"
                              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            />
                            <span className="sr-only"> (opens in a new tab)</span>
                          </a>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Block>
            </div>
          </div>
        </div>
      </article>

      <div className="border-t border-rule bg-raised">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <CtaBand
            heading="Have something like this in mind?"
            body={PROJECT_CTA_BODY}
            href="/#contact"
          />
        </div>
      </div>

      <nav aria-label="More case studies" className="border-t border-rule">
        <div className="mx-auto grid max-w-6xl gap-y-2 px-5 py-10 sm:grid-cols-2 sm:px-8">
          <a href={projectPath(previous.slug)} className="group flex min-h-11 flex-col gap-1 py-2">
            <span className={cn(label, 'inline-flex items-center gap-2 tracking-[0.16em]')}>
              <ArrowLeft
                size={14}
                aria-hidden="true"
                className="transition-transform group-hover:-translate-x-0.5"
              />
              Previous
            </span>
            <span className="font-display text-2xl leading-tight tracking-tight text-ink group-hover:text-accent">
              {previous.title}
            </span>
          </a>
          <a
            href={projectPath(next.slug)}
            className="group flex min-h-11 flex-col gap-1 py-2 sm:items-end sm:text-right"
          >
            <span className={cn(label, 'inline-flex items-center gap-2 tracking-[0.16em]')}>
              Next
              <ArrowRight
                size={14}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5"
              />
            </span>
            <span className="font-display text-2xl leading-tight tracking-tight text-ink group-hover:text-accent">
              {next.title}
            </span>
          </a>
        </div>
      </nav>
    </>
  )
}
