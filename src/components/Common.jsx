import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Icon from './Icon'
import { Reveal, CountUp, stagger, Marquee, useParallax } from './Motion'
import { site, whatsappLink } from '../data/site'

/** Resets scroll position on route change. */
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

/**
 * Google Business Profile rating, linked to the real listing.
 *
 * The numbers come from `site.rating` and must stay identical to the ones the
 * profile actually shows — this same pair feeds the `aggregateRating` in our
 * JSON-LD, and a rating in structured data that a visitor can disprove in one
 * click is a manual-action risk, not a trust win.
 */
export function GoogleBadge({ dark = false }) {
  return (
    <a
      className={`gbadge${dark ? ' gbadge--dark' : ''}`}
      href={site.reviewsLink}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="gbadge__mark" aria-hidden="true">G</span>
      <span className="gbadge__body">
        <span className="gbadge__score">
          {site.rating.value}
          <span className="gbadge__stars" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => <Icon key={i} name="star" size={13} />)}
          </span>
        </span>
        <span className="gbadge__meta">
          {site.rating.count} Google reviews · Read them all
        </span>
      </span>
    </a>
  )
}

/**
 * The reassurance strip under the hero. Placed immediately after the promise
 * because that is the moment the visitor is deciding whether to believe it.
 */
export function TrustBar() {
  const items = [
    { icon: 'star', text: <><strong>{site.rating.value}★</strong> from {site.rating.count} Google reviews</> },
    { icon: 'shield', text: <>Police-verified drivers</> },
    { icon: 'rupee', text: <>Fixed fare, <strong>no surge pricing</strong></> },
    { icon: 'clock', text: <>Booking desk open <strong>24×7</strong></> },
    { icon: 'pin', text: <>3 km from <strong>IGI Airport T3</strong></> },
  ]

  return (
    <section className="trustbar" aria-label="Why travellers book with us">
      <div className="container trustbar__inner">
        {items.map((item, i) => (
          <span className="trustbar__item" key={i}>
            <Icon name={item.icon} size={16} /> {item.text}
          </span>
        ))}
      </div>
    </section>
  )
}

/** Scrolling strip of service areas. Doubles as internal-linking surface. */
export function AreaMarquee() {
  const items = site.serviceAreas.map((area) => (
    <Link className="arealink" to="/contact" key={area}>
      <Icon name="pin" size={12} /> Taxi service in {area}
    </Link>
  ))
  return (
    <section className="trustbar" aria-label="Cities we serve">
      <div className="container">
        <Marquee items={items} speed={58} />
      </div>
    </section>
  )
}

/** Page header used on every inner page. */
export function PageHero({ eyebrow, title, text, crumbs = [] }) {
  const blobRef = useParallax(0.09)

  return (
    <section className="pagehero">
      <span className="pagehero__blob" ref={blobRef} aria-hidden="true" />
      <div className="container">
        <nav className="crumbs" aria-label="Breadcrumb">
          <ol>
            <li><Link to="/">Home</Link></li>
            {crumbs.map((c) => (
              <li key={c.path} aria-current="page"><span>{c.name}</span></li>
            ))}
          </ol>
        </nav>
        <div className="hero__stage">
          {eyebrow && <p className="pagehero__eyebrow">{eyebrow}</p>}
          <h1 className="pagehero__title">{title}</h1>
          {text && <p className="pagehero__text">{text}</p>}
        </div>
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
      <div className="ctaband__glow" aria-hidden="true" />
      <div className="container ctaband__inner">
        <Reveal variant="left">
          <h2 className="ctaband__title">{title}</h2>
          <p className="ctaband__text">{text}</p>
        </Reveal>
        <Reveal className="ctaband__actions" variant="right" delay={110}>
          <a className="btn btn--light btn--lg" href={`tel:${site.phoneRaw}`}>
            <Icon name="phone" size={18} /> {site.phone}
          </a>
          <a className="btn btn--outline-light btn--lg" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            <Icon name="whatsapp" size={18} /> WhatsApp Us
          </a>
        </Reveal>
      </div>
    </section>
  )
}

/**
 * Headline figures. Each value counts up when it scrolls into view, but the
 * final number is what renders on the server — so the prerendered HTML a
 * crawler reads already carries the real figure, animation or not.
 */
export function Stats() {
  return (
    <div className="stats">
      {site.stats.map((stat, i) => (
        <Reveal className="stats__item" variant="up" delay={stagger(i, 90)} key={stat.label}>
          <span className="stats__value">
            <CountUp value={stat.value} decimals={stat.decimals || 0} suffix={stat.suffix} />
          </span>
          <span className="stats__label">{stat.label}</span>
        </Reveal>
      ))}
    </div>
  )
}
