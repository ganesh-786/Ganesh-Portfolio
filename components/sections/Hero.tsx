'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail, Zap, Users } from 'lucide-react'
import { HERO_DATA, CONTACT_DATA } from '@/lib/constants'

const socialIcons = [
  { Icon: Github, href: CONTACT_DATA.socials.find((s) => s.name === 'GitHub')?.url ?? '#', label: 'GitHub' },
  { Icon: Linkedin, href: CONTACT_DATA.socials.find((s) => s.name === 'LinkedIn')?.url ?? '#', label: 'LinkedIn' },
  { Icon: Mail, href: CONTACT_DATA.socials.find((s) => s.name === 'Email')?.url ?? '#', label: 'Email' },
]

const achievements = [
  { icon: Zap, label: 'Under 3s RAG Response', color: 'text-amber-500' },
  { icon: Users, label: '10K Concurrent Users', color: 'text-emerald-500' },
]

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
})

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297
  return x - Math.floor(x)
}

const PARTICLE_DATA = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: +(seededRandom(i * 3) * 100).toFixed(3),
  y: +(seededRandom(i * 3 + 1) * 100).toFixed(3),
  size: +(seededRandom(i * 3 + 2) * 3 + 1).toFixed(3),
  duration: +(seededRandom(i * 7) * 8 + 10).toFixed(3),
  delay: +(seededRandom(i * 11) * 5).toFixed(3),
}))

function FloatingParticles() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return <div className="absolute inset-0 overflow-hidden pointer-events-none" />

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLE_DATA.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-blue-400/20 dark:bg-blue-400/15"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          animate={{ y: [0, -40, 0], opacity: [0, 0.6, 0] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export function Hero() {
  const [typedText, setTypedText] = useState('')

  const startTyping = useCallback(() => {
    const words = HERO_DATA.typingWords
    let wordIdx = 0
    let charIdx = 0
    let deleting = false
    let timer: ReturnType<typeof setTimeout>

    function tick() {
      const word = words[wordIdx]!
      if (!deleting) {
        charIdx++
        setTypedText(word.substring(0, charIdx))
        if (charIdx >= word.length) {
          deleting = true
          timer = setTimeout(tick, 2000)
          return
        }
      } else {
        charIdx--
        setTypedText(word.substring(0, charIdx))
        if (charIdx <= 0) {
          deleting = false
          wordIdx = (wordIdx + 1) % words.length
        }
      }
      timer = setTimeout(tick, deleting ? 40 : 80)
    }

    timer = setTimeout(tick, 1800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => startTyping(), [startTyping])

  return (
    <section className="relative min-h-screen flex items-center justify-center section-content overflow-hidden">
      {/* Large background name -- faint typographic texture */}
      <div
        aria-hidden="true"
        className="hero-bg-name absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        <span className="text-[15vw] sm:text-[13vw] lg:text-[12vw] font-bold tracking-tighter leading-none text-gray-900/[0.03] dark:text-white/[0.04] whitespace-nowrap">
          GANESH
        </span>
      </div>

      {/* Background grid + radial fade */}
      <div className="absolute inset-0 hero-grid-bg hero-radial-fade pointer-events-none" />

      {/* Gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[80px] sm:blur-[120px] animate-float" />
        <div className="absolute bottom-1/3 right-1/4 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-sky-500/5 dark:bg-sky-500/8 rounded-full blur-[80px] sm:blur-[120px] animate-float-delayed" />
      </div>

      {/* Radial edge fade for theme */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgb(249_250_251/0.8)_70%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_0%,rgb(3_7_18/0.8)_70%)] pointer-events-none" />

      <FloatingParticles />

      {/* Main content -- centered single column */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-16 sm:pb-24 w-full text-center">
        {/* Status badge */}
        <motion.div {...fadeUp(0.2)} className="mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-medium border border-blue-200/60 dark:border-blue-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-full w-full bg-blue-500" />
            </span>
            Open to opportunities
          </span>
        </motion.div>

        {/* Name */}
        <div className="mb-4 sm:mb-6" style={{ perspective: 800 }}>
          <h1 className="text-3xl leading-tight sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
            <motion.span
              {...fadeUp(0.4)}
              className="block text-gray-900 dark:text-white mb-1 sm:mb-2"
            >
              {HERO_DATA.greeting}
            </motion.span>

            <motion.span
              initial={{ opacity: 0, rotateX: -40, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, rotateX: 0, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block text-gradient-animated"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {HERO_DATA.name}
            </motion.span>
          </h1>
        </div>

        {/* Typing subtitle */}
        <motion.div
          {...fadeUp(1.0)}
          className="text-base sm:text-xl lg:text-2xl text-gray-700 dark:text-gray-400 mb-4 sm:mb-5 min-h-[1.5rem] sm:min-h-[2rem]"
        >
          I build{' '}
          <span className="text-blue-600 dark:text-blue-400 font-semibold">
            {typedText}
            <span className="animate-pulse ml-0.5 text-blue-500">|</span>
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          {...fadeUp(1.2)}
          className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-6 sm:mb-8 leading-relaxed"
        >
          {HERO_DATA.description}
        </motion.p>

        {/* Key achievement pills */}
        <motion.div
          {...fadeUp(1.4)}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10"
        >
          {achievements.map((a) => (
            <div
              key={a.label}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-gray-800/80 text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-300 shadow-sm"
            >
              <a.icon size={14} className={a.color} />
              {a.label}
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          {...fadeUp(1.6)}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10"
        >
          <a
            href={HERO_DATA.cta.primary.href}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base rounded-xl font-medium transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
          >
            {HERO_DATA.cta.primary.label}
            <ArrowDown size={16} className="group-hover:translate-y-0.5 transition-transform duration-300" />
          </a>
          <a
            href={HERO_DATA.cta.secondary.href}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 text-sm sm:text-base rounded-xl font-medium transition-all duration-300 hover:-translate-y-0.5 bg-white/60 dark:bg-white/5 shadow-sm"
          >
            {HERO_DATA.cta.secondary.label}
          </a>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="flex items-center justify-center gap-2 sm:gap-3"
        >
          {socialIcons.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2.5 sm:p-3 rounded-xl text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-200 border border-transparent hover:border-gray-200 dark:hover:border-gray-800"
            >
              <Icon size={18} />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 justify-center"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-gray-300 dark:border-gray-700 flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-600 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
