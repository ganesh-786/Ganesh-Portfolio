'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Briefcase } from 'lucide-react'
import { EXPERIENCE_DATA } from '@/lib/constants'

export function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="experience"
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
            Work <span className="text-gradient">Experience</span>
          </h2>
          <div className="w-16 h-1 bg-blue-500 rounded-full mx-auto" />
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800" />

          <div className="space-y-8 sm:space-y-10">
            {EXPERIENCE_DATA.map((exp, i) => (
              <motion.div
                key={`${exp.role}-${exp.company}`}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-12 sm:pl-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-2.5 sm:left-4 top-1 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-blue-500 border-4 border-white dark:border-gray-950 ring-2 ring-blue-500/20" />

                <div className="group p-5 sm:p-6 rounded-2xl bg-white dark:bg-gray-900/50 border border-gray-200/80 dark:border-gray-800/80 hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <Briefcase size={16} className="text-blue-500 shrink-0" />
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                        {exp.role}
                      </h3>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-3">
                    {exp.company}
                  </p>
                  <ul className="space-y-2">
                    {exp.bullets.map((bullet, bi) => (
                      <li
                        key={bi}
                        className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500/50 shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
