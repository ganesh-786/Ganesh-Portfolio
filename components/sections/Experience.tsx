import { ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { EXPERIENCE_DATA } from '@/lib/constants'

// A ledger: who and when on the left, what was done on the right, so a recruiter can run an eye
// down the left column alone. Stacked on a phone and a tablet.
export function Experience() {
  return (
    <SectionWrapper id="experience">
      <SectionHeader index="04" title="Experience" />

      <ol className="border-t border-ink">
        {EXPERIENCE_DATA.map((job) => (
          <li
            key={`${job.role}-${job.company}`}
            className="grid gap-x-12 gap-y-5 border-b border-rule py-9 lg:grid-cols-12"
          >
            <div className="lg:col-span-5">
              <p className="mb-2 font-mono text-sm text-muted">{job.period}</p>
              <h3 className="font-display text-3xl leading-tight tracking-tight text-ink">
                {job.role}
              </h3>
              <p className="mt-1 text-base font-medium text-accent">{job.company}</p>
            </div>

            <div className="lg:col-span-7 lg:pt-8">
              <ul className="space-y-2.5">
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
