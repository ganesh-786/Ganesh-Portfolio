import { ArrowUpRight, Send } from 'lucide-react'
import { ContactForm } from '@/components/sections/ContactForm'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { CONTACT_DATA } from '@/lib/constants'

export function Contact() {
  return (
    <SectionWrapper id="contact">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeader index="08" title={CONTACT_DATA.heading} className="mb-6 sm:mb-6">
            <p className="mt-6 text-lg leading-8 text-muted">{CONTACT_DATA.description}</p>
          </SectionHeader>

          <ul className="border-t border-ink">
            {CONTACT_DATA.socials.map((social) => {
              const isMail = social.url.startsWith('mailto')
              return (
                <li key={social.name} className="border-b border-rule">
                  <a
                    href={social.url}
                    target={isMail ? undefined : '_blank'}
                    rel={isMail ? undefined : 'noopener noreferrer'}
                    className="group flex flex-col gap-1 py-4 transition-colors hover:text-accent sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                  >
                    <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                      {social.name}
                    </span>
                    <span className="flex min-w-0 items-center gap-1 break-words text-base text-ink group-hover:text-accent">
                      {isMail ? CONTACT_DATA.email : (social.handle ?? social.url)}
                      <ArrowUpRight
                        size={15}
                        aria-hidden="true"
                        className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="lg:col-span-7 lg:pt-3">
          {CONTACT_DATA.formAccessKey ? (
            <ContactForm accessKey={CONTACT_DATA.formAccessKey} />
          ) : (
            <a
              href={`mailto:${CONTACT_DATA.email}`}
              className="inline-flex items-center gap-2 rounded-md bg-ink px-6 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-accent hover:text-accent-ink"
            >
              <Send size={16} />
              Say hello
            </a>
          )}
        </div>
      </div>
    </SectionWrapper>
  )
}
