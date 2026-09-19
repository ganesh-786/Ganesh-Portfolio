'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import { HERO_DATA, NAV_ITEMS } from '@/lib/constants'
import { cn } from '@/lib/utils'

function scrollBehavior(): ScrollBehavior {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id === 'top' ? '' : `#${entry.target.id}`)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    ;['top', ...NAV_ITEMS.map((item) => item.href.slice(1))].forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const goTo = useCallback(
    (href: string) => {
      const wasOpen = mobileOpen
      setMobileOpen(false)
      const scroll = () =>
        document.querySelector(href)?.scrollIntoView({ behavior: scrollBehavior() })
      if (wasOpen) setTimeout(scroll, 250)
      else scroll()
    },
    [mobileOpen],
  )

  const toggleTheme = () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200',
        scrolled || mobileOpen ? 'border-rule bg-paper' : 'border-transparent bg-transparent',
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: scrollBehavior() })
          }}
          className="font-display text-xl tracking-tight text-ink"
        >
          <span className="sm:hidden">GC</span>
          <span className="hidden sm:inline">{HERO_DATA.name}</span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = activeSection === item.href
            return (
              <li key={item.href}>
                <button
                  type="button"
                  onClick={() => goTo(item.href)}
                  aria-current={active ? 'true' : undefined}
                  className={cn(
                    'border-b pb-0.5 text-sm transition-colors',
                    active
                      ? 'border-accent text-ink'
                      : 'border-transparent text-muted hover:text-ink',
                  )}
                >
                  {item.label}
                </button>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-1">
          {mounted && (
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={resolvedTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              className="rounded-md p-2.5 text-muted transition-colors hover:text-ink"
            >
              {resolvedTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="rounded-md p-2.5 text-muted transition-colors hover:text-ink lg:hidden"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-rule bg-paper lg:hidden"
          >
            <ul className="mx-auto max-w-6xl px-5 py-2 sm:px-8">
              {NAV_ITEMS.map((item) => (
                <li key={item.href} className="border-b border-rule last:border-b-0">
                  <button
                    type="button"
                    onClick={() => goTo(item.href)}
                    className={cn(
                      'block w-full py-4 text-left font-display text-2xl tracking-tight',
                      activeSection === item.href ? 'text-accent' : 'text-ink',
                    )}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
