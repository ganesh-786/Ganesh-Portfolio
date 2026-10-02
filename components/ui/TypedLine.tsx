'use client'

import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'

interface TypedLineProps {
  prefix: string
  phrases: readonly string[]
}

const TYPE_MS = 55
const ERASE_MS = 28
const HOLD_MS = 2200
const GAP_MS = 320

interface Frame {
  phrase: number
  chars: number
  erasing: boolean
}

// "a, b and c"
function sentence(parts: readonly string[]) {
  if (parts.length < 2) return parts.join('')
  return `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}`
}

/*
  The line under the name in the hero. It types each phrase, holds it, erases it and moves on.

  The whole sentence is always in the page as ordinary text (.typed-full). That is what a screen
  reader gets, and what a visitor sees without JavaScript or with reduced motion switched on.
  app/globals.css swaps it for the animated copy only when scripts run and motion is allowed, so
  the choice is made before the first paint and nothing jumps.

  The animated copy is aria-hidden, because letters arriving one at a time are noise when read
  aloud. Moving text that runs for more than five seconds needs a way to stop it (WCAG 2.2.2),
  so there is a pause button. It also stops by itself while the hero is off screen or the tab is
  in the background.
*/
export function TypedLine({ prefix, phrases }: TypedLineProps) {
  const [frame, setFrame] = useState<Frame>({
    phrase: 0,
    chars: phrases[0].length,
    erasing: false,
  })
  const [paused, setPaused] = useState(false)
  const [enabled, setEnabled] = useState(false)
  const [inView, setInView] = useState(true)
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setEnabled(!motion.matches && document.visibilityState === 'visible')
    update()
    motion.addEventListener('change', update)
    document.addEventListener('visibilitychange', update)
    return () => {
      motion.removeEventListener('change', update)
      document.removeEventListener('visibilitychange', update)
    }
  }, [])

  useEffect(() => {
    const el = root.current
    if (!el || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const running = enabled && inView && !paused

  useEffect(() => {
    if (!running) return
    const full = phrases[frame.phrase].length
    let delay = TYPE_MS
    let next: Frame = { ...frame, chars: frame.chars + 1 }

    if (!frame.erasing && frame.chars >= full) {
      delay = HOLD_MS
      next = { ...frame, erasing: true }
    } else if (frame.erasing && frame.chars === 0) {
      delay = GAP_MS
      next = { phrase: (frame.phrase + 1) % phrases.length, chars: 0, erasing: false }
    } else if (frame.erasing) {
      delay = ERASE_MS
      next = { ...frame, chars: frame.chars - 1 }
    }

    const timer = window.setTimeout(() => setFrame(next), delay)
    return () => window.clearTimeout(timer)
  }, [frame, running, phrases])

  const togglePause = () => {
    // Pausing settles on the whole phrase, so the line never freezes on half a word.
    if (!paused) {
      setFrame((f) => ({ phrase: f.phrase, chars: phrases[f.phrase].length, erasing: false }))
    }
    setPaused(!paused)
  }

  return (
    <div ref={root} className="font-display text-2xl leading-snug text-ink sm:text-3xl">
      <p className="typed-full">
        {prefix} {sentence(phrases)}.
      </p>

      <div className="typed-live items-end gap-x-2">
        <p aria-hidden="true" className="min-w-0">
          <span className="block">{prefix}</span>
          {/* Every phrase sits in the same grid cell, invisible, so the cell is always as big as
              the longest one and the page below never moves while the text changes. */}
          <span className="grid">
            {phrases.map((phrase) => (
              <span key={phrase} className="invisible col-start-1 row-start-1 italic">
                {phrase}
              </span>
            ))}
            <span className="col-start-1 row-start-1 italic">
              {phrases[frame.phrase].slice(0, frame.chars)}
              <span className={paused ? 'typed-caret typed-caret-still' : 'typed-caret'} />
            </span>
          </span>
        </p>

        <button
          type="button"
          onClick={togglePause}
          aria-label={paused ? 'Play the typing animation' : 'Pause the typing animation'}
          className="-mb-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-muted transition-colors hover:text-ink"
        >
          {paused ? <Play size={15} /> : <Pause size={15} />}
        </button>
      </div>
    </div>
  )
}
