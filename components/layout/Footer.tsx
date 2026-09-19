import { CONTACT_DATA, FOOTER_DATA } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="text-sm text-muted">{FOOTER_DATA.text}</p>

        <ul className="flex flex-wrap gap-x-6 font-mono text-xs uppercase tracking-[0.16em] text-muted">
          {CONTACT_DATA.socials.map((social) => {
            const isMail = social.url.startsWith('mailto')
            return (
              <li key={social.name}>
                <a
                  href={social.url}
                  target={isMail ? undefined : '_blank'}
                  rel={isMail ? undefined : 'noopener noreferrer'}
                  className="inline-flex min-h-11 items-center transition-colors hover:text-ink"
                >
                  {social.name}
                </a>
              </li>
            )
          })}
          <li>
            <a href="#" className="inline-flex min-h-11 items-center transition-colors hover:text-ink">
              Back to top
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
