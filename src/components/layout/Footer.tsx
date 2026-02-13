import { Github, Linkedin, Mail } from 'lucide-react'
import { FOOTER_DATA, CONTACT_DATA } from '@/data/constants'

const socialIcons: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
}

export function Footer() {
  return (
    <footer className="py-8 border-t border-gray-200 dark:border-gray-800/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <a
            href="#"
            className="text-lg font-bold text-gray-900 dark:text-white"
          >
            Ganesh
            <span className="text-indigo-500 dark:text-indigo-400">.dev</span>
          </a>

          <div className="flex items-center gap-3">
            {CONTACT_DATA.socials.map((social) => {
              const Icon = socialIcons[social.icon] ?? Mail
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target={social.url.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-200"
                  aria-label={social.name}
                >
                  <Icon size={18} />
                </a>
              )
            })}
          </div>

          <p className="text-sm text-gray-500">{FOOTER_DATA.text}</p>
        </div>
      </div>
    </footer>
  )
}
