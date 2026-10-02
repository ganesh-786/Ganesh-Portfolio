import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { FAQ_DATA } from '@/lib/constants'

// Every answer is on the page, with nothing folded away. A client deciding whether to write
// should not have to open seven panels to find the price model and the reply time.
export function Faq() {
  return (
    <SectionWrapper id="questions">
      <SectionHeader index="03" title={FAQ_DATA.heading}>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{FAQ_DATA.intro}</p>
      </SectionHeader>

      <dl className="border-t border-ink">
        {FAQ_DATA.items.map((item) => (
          <div
            key={item.question}
            className="grid gap-x-12 gap-y-3 border-b border-rule py-8 md:grid-cols-12"
          >
            <dt className="font-display text-2xl leading-tight tracking-tight text-ink md:col-span-5">
              {item.question}
            </dt>
            <dd className="md:col-span-7">
              <p className="max-w-2xl text-base leading-7 text-muted">{item.answer}</p>
              {'link' in item && item.link && (
                <a
                  href={item.link.href}
                  target={item.link.external ? '_blank' : undefined}
                  rel={item.link.external ? 'noopener noreferrer' : undefined}
                  className="group mt-2 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent underline-offset-4 hover:underline"
                >
                  {item.link.label}
                  {item.link.external ? (
                    <>
                      <ArrowUpRight
                        size={16}
                        aria-hidden="true"
                        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </>
                  ) : (
                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  )}
                </a>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </SectionWrapper>
  )
}
