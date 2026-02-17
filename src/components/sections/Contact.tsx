import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Github, Linkedin, ArrowUpRight } from 'lucide-react'
import { CONTACT_DATA } from '@/data/constants'

const iconMap: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
}

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-32 relative">
      {/* Decorative background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <div ref={ref}>
          {/* Section Header */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-blue-500 dark:text-blue-400 text-xs sm:text-sm font-mono tracking-wider uppercase"
          >
            Contact
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-3 mb-4 sm:mb-6"
          >
            {CONTACT_DATA.heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8 sm:mb-10 max-w-xl mx-auto"
          >
            {CONTACT_DATA.description}
          </motion.p>

          {/* Email CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8 sm:mb-12"
          >
            <motion.a
              href={`mailto:${CONTACT_DATA.email}`}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base rounded-xl font-medium transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40"
            >
              <Mail size={18} />
              Say Hello
              <ArrowUpRight
                size={14}
                className="sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
              />
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
          >
            {CONTACT_DATA.socials.map((social) => {
              const Icon = iconMap[social.icon] ?? Mail
              return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target={social.url.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="group inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-blue-500/40 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/5 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-200"
                >
                  <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                  <span className="text-xs sm:text-sm font-medium">{social.name}</span>
                </motion.a>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
