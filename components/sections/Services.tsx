'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Bot, Check, Monitor, Server } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SERVICES_DATA } from '@/lib/constants'

const serviceIcons = [Monitor, Server, Bot]

export function Services() {
  return (
    <SectionWrapper id="services">
      {(isInView) => (
        <>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {SERVICES_DATA.heading}
            </h2>
            <div className="w-16 h-1 bg-blue-500 rounded-full mx-auto mb-6" />
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {SERVICES_DATA.intro}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {SERVICES_DATA.items.map((item, i) => {
              const Icon = serviceIcons[i] ?? Monitor
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.15 * i, duration: 0.6 }}
                >
                  <div className="mb-4 inline-flex p-2.5 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-12 sm:mt-14 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          >
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                How I work
              </h3>
              <ul className="space-y-2">
                {SERVICES_DATA.process.map((step) => (
                  <li
                    key={step}
                    className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <Check size={16} className="mt-0.5 text-blue-500 shrink-0" />
                    {step}
                  </li>
                ))}
              </ul>
            </div>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 self-start md:self-auto text-sm sm:text-base font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              Discuss a project
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </motion.div>
        </>
      )}
    </SectionWrapper>
  )
}
