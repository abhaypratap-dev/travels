import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Icon from './Icon'
import { site, whatsappLink } from '../data/site'

/** Restores scroll position on route change. */
export function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

/** Sticky WhatsApp + call buttons. Bottom bar on mobile, floating on desktop. */
export function FloatingActions() {
  return (
    <>
      <a
        className="fab fab--whatsapp"
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
      >
        <Icon name="whatsapp" size={26} />
      </a>
      <div className="mobilebar" role="group" aria-label="Quick contact">
        <a href={`tel:${site.phoneRaw}`} className="mobilebar__btn">
          <Icon name="phone" size={18} /> Call
        </a>
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="mobilebar__btn mobilebar__btn--primary">
          <Icon name="whatsapp" size={18} /> WhatsApp
        </a>
      </div>
    </>
  )
}

/** Page header used on every inner page. */
export function PageHero({ eyebrow, title, text, crumbs = [] }) {
  return (
    <section className="pagehero">
      <div className="container">
        <nav className="crumbs" aria-label="Breadcrumb">
          <ol>
            <li><Link to="/">Home</Link></li>
            {crumbs.map((c) => (
              <li key={c.path} aria-current="page"><span>{c.name}</span></li>
            ))}
          </ol>
        </nav>
        {eyebrow && <p className="pagehero__eyebrow">{eyebrow}</p>}
        <h1 className="pagehero__title">{title}</h1>
        {text && <p className="pagehero__text">{text}</p>}
      </div>
    </section>
  )
}

/** Full-width conversion band. */
export function CtaBand({
  title = 'Ready to book your vehicle?',
  text = 'Tell us your route and dates. We reply with a fixed, all-inclusive quote — usually within 15 minutes.',
}) {
  return (
    <section className="ctaband">
      <div className="container ctaband__inner">
        <div>
          <h2 className="ctaband__title">{title}</h2>
          <p className="ctaband__text">{text}</p>
        </div>
        <div className="ctaband__actions">
          <a className="btn btn--light btn--lg" href={`tel:${site.phoneRaw}`}>
            <Icon name="phone" size={18} /> {site.phone}
          </a>
          <a className="btn btn--outline-light btn--lg" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            <Icon name="whatsapp" size={18} /> WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  )
}

export function Stats() {
  return (
    <div className="stats">
      {site.stats.map((s) => (
        <div className="stats__item" key={s.label}>
          <span className="stats__value">{s.value}</span>
          <span className="stats__label">{s.label}</span>
        </div>
      ))}
    </div>
  )
}
