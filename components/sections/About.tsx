'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { User, Code, Trophy } from 'lucide-react'
import { ABOUT_DATA } from '@/lib/constants'

const highlightIcons = [Trophy, Code, User]

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="about"
      ref={ref}
      className="section-content py-16 sm:py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-16 h-1 bg-blue-500 rounded-full mx-auto" />
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-3 space-y-4 sm:space-y-5">
            {ABOUT_DATA.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
                className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed"
              >
                {p}
              </motion.p>
            ))}
          </div>

          <div className="lg:col-span-2 grid grid-cols-3 lg:grid-cols-1 gap-4">
            {ABOUT_DATA.highlights.map((h, i) => {
              const Icon = highlightIcons[i] || Trophy
              return (
                <motion.div
                  key={h.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  className="relative group p-4 sm:p-5 rounded-2xl bg-white dark:bg-gray-900/50 border border-gray-200/80 dark:border-gray-800/80 hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5"
                >
                  <div className="flex items-center gap-3 lg:gap-4">
                    <div className="hidden lg:flex p-2.5 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-500">
                      <Icon size={20} />
                    </div>
                    <div className="text-center lg:text-left w-full lg:w-auto">
                      <div className="text-2xl sm:text-3xl font-bold text-gradient mb-0.5">
                        {h.value}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        {h.label}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
