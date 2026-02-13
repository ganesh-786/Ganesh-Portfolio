import { useEffect, useState, useCallback, memo, useMemo } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'
import { HERO_DATA, CONTACT_DATA } from '@/data/constants'

const socialIcons = [
  { Icon: Github, href: CONTACT_DATA.socials.find((s) => s.name === 'GitHub')?.url ?? '#', label: 'GitHub' },
  { Icon: Linkedin, href: CONTACT_DATA.socials.find((s) => s.name === 'LinkedIn')?.url ?? '#', label: 'LinkedIn' },
  { Icon: Mail, href: CONTACT_DATA.socials.find((s) => s.name === 'Email')?.url ?? '#', label: 'Email' },
]

/* ─── Spring configs for 3D effects ─── */
const tiltSpring = { stiffness: 120, damping: 30, mass: 0.5 }
const orbSpring = { stiffness: 40, damping: 40, mass: 1 }

/* ─── Floating ambient particles (memoised — unaffected by re-renders) ─── */
const FloatingParticles = memo(function FloatingParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        duration: Math.random() * 8 + 10,
        delay: Math.random() * 5,
      })),
    []
  )

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-indigo-400/25 dark:bg-indigo-400/20"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          animate={{ y: [0, -40, 0], opacity: [0, 0.7, 0] }}
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
})

/* ═══════════════════════════════════════════════════
   Hero Section — 3D tilt, parallax orbs, name reveal
   ═══════════════════════════════════════════════════ */
export function Hero() {
  const [typedText, setTypedText] = useState('')

  /* ── Mouse-driven 3D: motion values ── */
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Content tilt (±3°)
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), tiltSpring)
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), tiltSpring)

  // Background orb parallax (±30px opposite direction)
  const orbX = useSpring(useTransform(mouseX, [-0.5, 0.5], [30, -30]), orbSpring)
  const orbY = useSpring(useTransform(mouseY, [-0.5, 0.5], [30, -30]), orbSpring)

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (window.innerWidth < 768) return // desktop only
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  /* ── Typing effect ── */
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

  useEffect(() => {
    return startTyping()
  }, [startTyping])

  /* ── Render ── */
  return (
    <section
      className="relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-40 dark:opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgb(99 102 241 / 0.15) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Gradient orbs — move opposite to cursor for depth parallax */}
        <motion.div className="absolute inset-0" style={{ x: orbX, y: orbY }}>
          <div className="absolute top-1/4 left-1/4 w-[200px] sm:w-[400px] lg:w-[500px] h-[200px] sm:h-[400px] lg:h-[500px] bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[60px] sm:blur-[120px] animate-float" />
          <div className="absolute bottom-1/3 right-1/4 w-[180px] sm:w-[350px] lg:w-[400px] h-[180px] sm:h-[350px] lg:h-[400px] bg-purple-500/10 dark:bg-purple-500/15 rounded-full blur-[60px] sm:blur-[120px] animate-float-delayed" />
          <div className="absolute top-1/2 right-1/3 w-[120px] sm:w-[200px] h-[120px] sm:h-[200px] bg-pink-500/5 dark:bg-pink-500/10 rounded-full blur-[40px] sm:blur-[80px] animate-float" />
        </motion.div>

        {/* Radial fade to background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgb(249_250_251)_70%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_0%,rgb(3_7_18)_70%)]" />

        <FloatingParticles />
      </div>

      {/* ── 3D Perspective wrapper ── */}
      <div className="relative z-10" style={{ perspective: 1200 }}>
        <motion.div
          style={{ rotateX: tiltX, rotateY: tiltY }}
          className="w-full max-w-4xl mx-auto px-4 sm:px-6 text-center pt-28 sm:pt-36 lg:pt-44 pb-20 sm:pb-28 lg:pb-32"
        >
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 sm:mb-6 lg:mb-8"
          >
            <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1 sm:py-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[0.65rem] sm:text-sm font-medium border border-indigo-200/60 dark:border-indigo-500/20">
              <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-full w-full bg-indigo-500" />
              </span>
              Open to opportunities
            </span>
          </motion.div>

          {/* ── Name — 3D flip entrance + animated gradient ── */}
          <div className="mb-3 sm:mb-5 lg:mb-6" style={{ perspective: 800 }}>
            <h1 className="text-[1.7rem] leading-tight sm:text-5xl lg:text-7xl font-bold tracking-tight">
              {/* Greeting */}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="block text-gray-900 dark:text-white mb-1 sm:mb-2"
              >
                {HERO_DATA.greeting}
              </motion.span>

              {/* Name — single span so gradient renders correctly */}
              <motion.span
                initial={{ opacity: 0, rotateX: -40, y: 30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, rotateX: 0, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block text-gradient-animated"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {HERO_DATA.name}
              </motion.span>
            </h1>
          </div>

          {/* Typing subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 min-h-[1.25rem] sm:min-h-[2rem]"
          >
            I build{' '}
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
              {typedText}
              <span className="animate-pulse ml-0.5 text-indigo-500">|</span>
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs sm:text-base lg:text-lg text-gray-500 max-w-2xl mx-auto mb-6 sm:mb-8 lg:mb-10 leading-relaxed"
          >
            {HERO_DATA.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-10"
          >
            <a
              href={HERO_DATA.cta.primary.href}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-indigo-500 hover:bg-indigo-600 text-white text-sm sm:text-base rounded-xl font-medium transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
            >
              {HERO_DATA.cta.primary.label}
              <ArrowDown
                size={16}
                className="group-hover:translate-y-0.5 transition-transform duration-300"
              />
            </a>
            <a
              href={HERO_DATA.cta.secondary.href}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-indigo-500/50 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm sm:text-base rounded-xl font-medium transition-all duration-300 hover:-translate-y-0.5"
            >
              {HERO_DATA.cta.secondary.label}
            </a>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9, duration: 0.8 }}
            className="flex items-center justify-center gap-2 sm:gap-3"
          >
            {socialIcons.map(({ Icon, href, label }) => (
              <a
                key={href}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2.5 sm:p-3 rounded-xl text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-200"
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator — visible on sm+ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="hidden sm:flex justify-center pb-8"
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
