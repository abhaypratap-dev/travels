import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

/* ═══════════════════════════════════════════════════════════════
   Motion primitives.

   Everything here is progressive enhancement. The markup that gets
   prerendered is complete and visible on its own; the hidden "before"
   state is applied by CSS only under `html.js`, which an inline script
   in index.html sets before first paint. So:

     · No JavaScript  → full content, no animation, no flash.
     · Crawler        → full content either way (see the failsafe below).
     · Reduced motion → transitions collapse to nothing via a media query.
   ═══════════════════════════════════════════════════════════════ */

/** True once mounted in the browser. Keeps SSR and first client render identical. */
export function useMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/**
 * One IntersectionObserver for every `[data-reveal]` on the page, mounted once
 * from App. A single observer beats one-per-component for both memory and
 * main-thread cost on a page with sixty animated cards.
 *
 * The 2.5s failsafe matters more than it looks: a crawler that renders the page
 * at an unusual viewport, or a browser where the observer never fires, must
 * still end up with visible content. Content is never left depending on scroll.
 *
 * The revealed state is a `data-revealed` attribute, not a class. React owns
 * `className` and rewrites the whole string when a component re-renders with a
 * different one — an FAQ item gaining `is-open`, say — which silently stripped
 * a class added here and faded the element straight back out. React never
 * touches an attribute it did not render, so this one survives re-renders.
 *
 * A MutationObserver picks up reveal targets mounted after the page loads —
 * a filtered fleet or gallery grid — which a one-off query would never see.
 */
export function RevealObserver() {
  const { pathname } = useLocation()

  useEffect(() => {
    const pending = '[data-reveal]:not([data-revealed])'
    const reveal = (el) => el.setAttribute('data-revealed', '')
    const revealAll = () => document.querySelectorAll(pending).forEach(reveal)

    const instant = prefersReducedMotion() || !('IntersectionObserver' in window)
    const observer = instant
      ? null
      : new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return
              reveal(entry.target)
              observer.unobserve(entry.target)
            })
          },
          // Fire slightly before the element enters the viewport so the motion
          // has finished by the time the reader's eye arrives — a reveal that
          // completes *as* you look at it reads as polish; one that starts then
          // reads as lag.
          { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
        )

    const watch = (root) => {
      const found = root.matches?.(pending) ? [root] : []
      root.querySelectorAll?.(pending).forEach((el) => found.push(el))
      found.forEach((el) => (observer ? observer.observe(el) : reveal(el)))
    }

    watch(document.body)
    const mutations = new MutationObserver((records) => {
      records.forEach((r) => r.addedNodes.forEach((n) => { if (n.nodeType === 1) watch(n) }))
    })
    mutations.observe(document.body, { childList: true, subtree: true })

    const failsafe = window.setTimeout(revealAll, 2500)

    return () => {
      observer?.disconnect()
      mutations.disconnect()
      window.clearTimeout(failsafe)
    }
  }, [pathname])

  return null
}

/**
 * Wraps children in an element that fades and rises into view.
 *
 * @param {'up'|'down'|'left'|'right'|'scale'|'blur'|'none'} variant
 * @param {number} delay   ms, staggered by the caller
 * @param {string} as      element tag — keep the semantic one, not a div
 */
export function Reveal({
  children,
  variant = 'up',
  delay = 0,
  as: Tag = 'div',
  className = '',
  ...rest
}) {
  return (
    <Tag
      data-reveal={variant}
      className={className}
      style={delay ? { '--reveal-delay': `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/**
 * Stagger helper — spaces children out without the caller doing index maths.
 * Capped so a long list never ends with a card that takes two seconds to appear.
 */
export const stagger = (index, step = 70, max = 560) => Math.min(index * step, max)

/**
 * Counts a number up when it scrolls into view. Renders the final value on the
 * server and on first client render, so the prerendered HTML already carries
 * the real figure — the animation is decoration layered on top of correct text.
 */
export function CountUp({ value, decimals = 0, suffix = '', prefix = '', duration = 1600 }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(value)
  const done = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || done.current) return
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || done.current) return
        done.current = true
        observer.disconnect()

        const start = performance.now()
        const tick = (now) => {
          const t = Math.min((now - start) / duration, 1)
          // easeOutExpo — fast out of the gate, long settle. Reads as confident
          // rather than mechanical.
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
          setDisplay(Number((value * eased).toFixed(decimals)))
          if (t < 1) requestAnimationFrame(tick)
          else setDisplay(value)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [value, decimals, duration])

  const formatted = Number(display).toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={ref} className="countup">
      {prefix}{formatted}{suffix}
    </span>
  )
}

/** Thin reading-progress bar pinned under the header. */
export function ScrollProgress() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let frame = 0
    const update = () => {
      frame = 0
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0
      el.style.transform = `scaleX(${Math.min(pct, 100) / 100})`
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return <div className="scrollprogress" aria-hidden="true"><span ref={ref} /></div>
}

/**
 * Re-runs the page-entry animation on every route change by remounting its
 * subtree — `key` on the wrapper is what makes React tear down and rebuild.
 *
 * The page a visitor lands on is never faded in. Starting <main> at opacity 0
 * hid the hero photograph from Chrome's largest-contentful-paint tracking, and
 * Lighthouse reported the homepage as unmeasurable (NO_LCP). Only in-app
 * navigations after that first page get the fade.
 */
export function PageTransition({ children }) {
  const { pathname } = useLocation()
  const landing = useRef(pathname)
  const navigated = useRef(false)
  if (pathname !== landing.current) navigated.current = true
  return <div className={navigated.current ? 'pagefade' : undefined} key={pathname}>{children}</div>
}

