'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { SKILLS_DATA } from '@/lib/constants'

export function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="skills"
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
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <div className="w-16 h-1 bg-blue-500 rounded-full mx-auto" />
        </div>

        <div className="space-y-8 sm:space-y-10">
          {SKILLS_DATA.map((category, ci) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 * ci, duration: 0.6 }}
            >
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {category.skills.map((skill, si) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.15 * ci + 0.05 * si, duration: 0.4 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white dark:bg-gray-900/50 border border-gray-200/80 dark:border-gray-800/80 text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium hover:border-blue-500/40 dark:hover:border-blue-500/40 hover:shadow-md hover:shadow-blue-500/5 transition-all duration-200 cursor-default"
                  >
                    {skill.name}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
