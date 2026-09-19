import { ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { EXPERIENCE_DATA } from '@/lib/constants'

export function Experience() {
  return (
    <SectionWrapper id="experience">
      <SectionHeader index="06" title="Experience" />

      <ol className="border-t border-ink">
        {EXPERIENCE_DATA.map((job) => (
          <li
            key={`${job.role}-${job.company}`}
            className="grid gap-x-12 gap-y-3 border-b border-rule py-9 md:grid-cols-12"
          >
            <p className="font-mono text-sm text-muted md:col-span-3 md:pt-2">{job.period}</p>

            <div className="md:col-span-9">
              <h3 className="font-display text-3xl leading-tight tracking-tight text-ink">
                {job.role}
              </h3>
              <p className="mt-1 text-base font-medium text-accent">{job.company}</p>

              <ul className="mt-5 max-w-3xl space-y-3">
                {job.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-4 text-base leading-7 text-muted">
                    <span aria-hidden="true" className="mt-3.5 h-px w-3 shrink-0 bg-ink/40" />
                    {bullet}
                  </li>
                ))}
              </ul>

              {job.link && (
                <a
                  href={job.link.href}
                  className="group mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent underline-offset-4 hover:underline"
                >
                  {job.link.label}
                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>
    </SectionWrapper>
  )
}
