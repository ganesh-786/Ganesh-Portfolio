'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Send, Github, Linkedin, Mail } from 'lucide-react'
import { CONTACT_DATA } from '@/lib/constants'

const socialIcons: Record<string, typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
}

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="contact"
      ref={ref}
      className="section-content py-16 sm:py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-2xl mx-auto"
      >
        <div className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {CONTACT_DATA.heading.split(' ').map((word, i, arr) => (
              <span key={i}>
                {i === arr.length - 1 ? <span className="text-gradient">{word}</span> : word}
                {i < arr.length - 1 ? ' ' : ''}
              </span>
            ))}
          </h2>
          <div className="w-16 h-1 bg-blue-500 rounded-full mx-auto mb-6" />
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            {CONTACT_DATA.description}
          </p>
        </div>

        <motion.a
          href={`mailto:${CONTACT_DATA.email}`}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="group inline-flex items-center gap-2 px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white text-base rounded-xl font-medium transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 mb-10"
        >
          <Send size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          Say Hello
        </motion.a>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex items-center justify-center gap-3"
        >
          {CONTACT_DATA.socials.map((social) => {
            const Icon = socialIcons[social.icon] || Mail
            return (
              <a
                key={social.name}
                href={social.url}
                target={social.url.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={social.name}
                className="p-3 rounded-xl text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-200 border border-transparent hover:border-gray-200 dark:hover:border-gray-800"
              >
                <Icon size={20} />
              </a>
            )
          })}
        </motion.div>
      </motion.div>
    </section>
  )
}
