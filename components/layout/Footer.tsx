import { Github, Linkedin, Mail, Heart } from 'lucide-react'
import { CONTACT_DATA, FOOTER_DATA } from '@/lib/constants'

const socialIcons: Record<string, typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
}

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-gray-200/50 dark:border-gray-800/50 bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <span>{FOOTER_DATA.text}</span>
            <Heart size={14} className="text-red-500 mx-1" fill="currentColor" />
          </div>

          <div className="flex items-center gap-3">
            {CONTACT_DATA.socials.map((social) => {
              const Icon = socialIcons[social.icon] || Mail
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target={social.url.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="p-2.5 rounded-xl text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-200"
                >
                  <Icon size={18} />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
