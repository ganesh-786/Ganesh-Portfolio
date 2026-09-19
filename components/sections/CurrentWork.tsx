import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { CURRENT_WORK } from '@/lib/constants'
import { cn } from '@/lib/utils'

const subheading = 'mb-6 font-mono text-xs uppercase tracking-[0.2em] text-accent'

export function CurrentWork() {
  const work = CURRENT_WORK
  const oddPractices = work.practices.length % 2 === 1

  return (
    <SectionWrapper id={work.id} tone="raised">
      <SectionHeader index="02" title={work.heading} />

      <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h3 className="font-display text-5xl leading-none tracking-tight text-ink sm:text-6xl">
            {work.name}
          </h3>
          <p className="mt-5 max-w-sm text-lg leading-7 text-muted">{work.lead}</p>

          <dl className="mt-8 border-t border-ink">
            {work.facts.map((fact) => (
              <div
                key={fact.label}
                className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-rule py-3.5"
              >
                <dt className="pt-1 font-mono text-xs uppercase tracking-wider text-muted">
                  {fact.label}
                </dt>
                <dd className="text-base leading-snug text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-7">
          <p className="font-display text-xl leading-snug text-ink sm:text-2xl lg:text-[1.65rem] lg:leading-[1.35]">
            {work.summary}
          </p>

          <p className="mb-3 mt-10 font-mono text-xs uppercase tracking-[0.16em] text-muted">
            Stack
          </p>
          <ul className="flex flex-wrap gap-x-1 gap-y-1.5 text-base leading-7 text-ink">
            {work.stack.map((item) => (
              <li
                key={item}
                className="after:mx-2 after:text-rule after:content-['/'] last:after:content-none"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-20">
        <h3 className={subheading}>What I built</h3>
        <ol className="border-t border-ink">
          {work.highlights.map((item) => (
            <li
              key={item.label}
              className="grid gap-x-12 gap-y-3 border-b border-rule py-8 md:grid-cols-12"
            >
              <p className="pt-2 font-mono text-xs uppercase tracking-wider text-accent md:col-span-3">
                {item.label}
              </p>
              <div className="md:col-span-9">
                <h4 className="font-display text-2xl leading-tight tracking-tight text-ink">
                  {item.title}
                </h4>
                <p className="mt-3 max-w-3xl text-base leading-7 text-muted">{item.body}</p>
                {'points' in item && item.points && (
                  <ul className="mt-4 max-w-3xl space-y-2.5">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-4 text-base leading-7 text-ink">
                        <span
                          aria-hidden="true"
                          className="mt-3.5 h-px w-3 shrink-0 bg-accent"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-20">
        <h3 className={subheading}>By the numbers</h3>
        <dl className="border-t border-ink sm:grid sm:grid-cols-3">
          {work.figures.map((figure, i) => (
            <div
              key={figure.label}
              className={cn(
                'flex items-baseline justify-between gap-4 border-b border-rule py-4',
                'sm:flex-col-reverse sm:items-start sm:justify-end sm:gap-2 sm:py-6',
                i % 3 !== 0 && 'sm:border-l sm:pl-8',
                i % 3 === 0 && 'sm:pr-8',
              )}
            >
              <dt className="min-w-0 flex-1 text-left font-mono text-xs uppercase tracking-wider text-muted sm:flex-none">
                {figure.label}
              </dt>
              <dd className="shrink-0 font-display text-3xl leading-none tracking-tight text-ink sm:text-5xl">
                {figure.value}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-muted">{work.figuresNote}</p>
      </div>

      <div className="mt-20">
        <h3 className={subheading}>How I work with the team</h3>
        <ol className="grid gap-x-12 gap-y-10 md:grid-cols-2">
          {work.practices.map((practice, i) => (
            <li
              key={practice.title}
              className={cn(
                'border-t border-ink pt-5',
                oddPractices && i === work.practices.length - 1 && 'md:col-span-2',
              )}
            >
              <p className="mb-4 font-mono text-xs tracking-[0.2em] text-accent">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h4 className="font-display text-2xl leading-tight tracking-tight text-ink">
                {practice.title}
              </h4>
              <p className="mt-3 max-w-3xl text-base leading-7 text-muted">{practice.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </SectionWrapper>
  )
}
