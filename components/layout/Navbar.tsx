'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import { CONTACT_CTA, HERO_DATA, NAV_ITEMS } from '@/lib/constants'
import { cn } from '@/lib/utils'

function scrollBehavior(): ScrollBehavior {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
}

const iconButton =
  'inline-flex h-11 w-11 items-center justify-center rounded-md text-muted transition-colors hover:text-ink'

// The sections live on the home page. Every item is a real link, so it works without JavaScript
// and from a case study page, where "#work" becomes "/#work". Smooth scrolling and the offset
// for the fixed header come from app/globals.css.
export function Navbar() {
  const onHome = usePathname() === '/'
  const [scrolled, setScrolled] = useState(false)
  const [pastHero, setPastHero] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  const to = (hash: string) => (onHome ? hash : `/${hash}`)
  // A case study belongs to the work section, so that is the item to mark while reading one.
  const current = onHome ? activeSection : '#work'
  // The home page already shows the name in the hero. Elsewhere the bar is the only place for it.
  const showName = pastHero || !onHome

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
      setPastHero(window.scrollY > 400)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    // The scroll highlight is a nicety, so it must never be able to break the page.
    if (!onHome || !('IntersectionObserver' in window)) return
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
    ;['top', ...[...NAV_ITEMS, CONTACT_CTA].map((item) => item.href.slice(1))].forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [onHome])

  useEffect(() => {
    if (!mobileOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setMobileOpen(false)
      menuButtonRef.current?.focus()
    }
    const wide = window.matchMedia('(min-width: 1280px)')
    const onWide = () => wide.matches && setMobileOpen(false)
    document.addEventListener('keydown', onKeyDown)
    wide.addEventListener('change', onWide)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      wide.removeEventListener('change', onWide)
    }
  }, [mobileOpen])

  const toggleTheme = () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200',
        scrolled || mobileOpen ? 'border-rule bg-paper' : 'border-transparent bg-transparent',
      )}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center px-5 sm:px-8">
        <div className="flex flex-1 items-center">
          <a
            href={onHome ? '#top' : '/'}
            aria-label={`GC, ${HERO_DATA.name}, ${onHome ? 'back to top' : 'home'}`}
            onClick={(e) => {
              if (!onHome) return
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: scrollBehavior() })
            }}
            className="inline-flex min-h-11 min-w-11 items-center font-display text-xl tracking-tight text-ink"
          >
            <span className={cn(showName && 'sm:hidden')}>GC</span>
            {showName && <span className="hidden sm:inline">{HERO_DATA.name}</span>}
          </a>
        </div>

        <ul className="hidden items-center gap-6 xl:flex">
          {NAV_ITEMS.map((item) => {
            const active = current === item.href
            return (
              <li key={item.href}>
                <a
                  href={to(item.href)}
                  aria-current={active ? 'true' : undefined}
                  className={cn(
                    'inline-flex min-h-11 min-w-11 items-center justify-center text-sm transition-colors',
                    active
                      ? 'text-ink underline decoration-accent decoration-2 underline-offset-[10px]'
                      : 'text-muted hover:text-ink',
                  )}
                >
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex flex-1 items-center justify-end gap-1">
          <a
            href={to(CONTACT_CTA.href)}
            className="mr-1 hidden min-h-11 items-center whitespace-nowrap rounded-md bg-ink px-4 text-sm font-medium text-paper transition-colors hover:bg-accent hover:text-accent-ink sm:inline-flex"
          >
            {CONTACT_CTA.label}
          </a>
          {mounted && (
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={resolvedTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              className={iconButton}
            >
              {resolvedTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className={cn(iconButton, 'xl:hidden')}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="fade-in max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-rule bg-paper xl:hidden"
        >
          <ul className="mx-auto max-w-6xl px-5 py-2 sm:px-8">
            {NAV_ITEMS.map((item) => (
              <li key={item.href} className="border-b border-rule">
                <a
                  href={to(item.href)}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'block w-full py-4 text-left font-display text-2xl tracking-tight',
                    current === item.href ? 'text-accent' : 'text-ink',
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="py-5">
              <a
                href={to(CONTACT_CTA.href)}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center rounded-md bg-ink px-6 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-accent hover:text-accent-ink"
              >
                {CONTACT_CTA.label}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
