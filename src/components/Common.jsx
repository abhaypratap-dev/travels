import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Icon from './Icon'
import { Reveal, CountUp, stagger } from './Motion'
import { site, whatsappLink } from '../data/site'

/**
 * Scroll handling on navigation: to the top for a new page, or to the target
 * section when the link carries a hash (the "Reviews" item in the nav).
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    // One beat for a freshly navigated page to render the target section.
    const timer = window.setTimeout(() => {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ block: 'start' })
    }, 60)
    return () => window.clearTimeout(timer)
  }, [pathname, hash])

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

/** An email address that wraps at the @ in a narrow column, rather than mid-word. */
export function Email({ address }) {
  const at = address.indexOf('@')
  return <>{address.slice(0, at)}<wbr />{address.slice(at)}</>
}

/** Five gold stars. Decorative — the rating itself is always written out beside them. */
export function Stars({ size = 14 }) {
  return (
    <span className="stars" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => <Icon key={i} name="star" size={size} />)}
    </span>
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
export function GoogleBadge() {
  return (
    <a className="gbadge" href={site.reviewsLink} target="_blank" rel="noopener noreferrer">
      <span className="gbadge__mark" aria-hidden="true"><Icon name="google" size={20} /></span>
      <span className="gbadge__body">
        <span className="gbadge__score">
          {site.rating.value}
          <Stars size={13} />
        </span>
        <span className="gbadge__meta">{site.rating.count} Google reviews · Read them all</span>
      </span>
    </a>
  )
}

/**
 * Headline figures. Each value counts up when it scrolls into view, but the
 * final number is what renders on the server — so the prerendered HTML a
 * crawler reads already carries the real figure, animation or not.
 *
 * `inline` drops the band background for use inside a page section.
 */
export function StatBar({ inline = false }) {
  const Tag = inline ? 'div' : 'section'
  return (
    <Tag className={`statbar${inline ? ' statbar--inline' : ''}`} aria-label={`${site.shortName} in numbers`}>
      <div className={inline ? 'statbar__grid' : 'container statbar__grid'}>
        {site.stats.map((stat, i) => (
          <Reveal className="statbar__item" variant="up" delay={stagger(i, 90)} key={stat.label}>
            <span className="statbar__icon"><Icon name={stat.icon} size={26} /></span>
            <span>
              <strong className="statbar__value">
                <CountUp value={stat.value} decimals={stat.decimals || 0} suffix={stat.suffix} />
              </strong>
              <span className="statbar__label">{stat.label}</span>
            </span>
          </Reveal>
        ))}
      </div>
    </Tag>
  )
}

/** Photo-backed header used on every inner page. */
export function PageHero({ eyebrow, title, text, crumbs = [], bg = '/images/hero/bg-jaisalmer.jpg' }) {
  return (
    <section className="pagehero">
      <img className="pagehero__bg" src={bg} alt="" width="2000" height="640" fetchpriority="high" decoding="async" />
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

/** Full-width conversion band over the Jaipur-at-dusk photograph. */
export function CtaBand({
  title = 'Plan Your Next Journey',
  text = 'Tell us where you’re going. We’ll arrange the right vehicle and send a fixed quote — usually within 15 minutes.',
}) {
  return (
    <section className="ctaband">
      <img
        className="ctaband__bg"
        src="/images/hero/nahargarh-band.jpg"
        alt=""
        width="2000"
        height="640"
        loading="lazy"
        decoding="async"
      />
      <div className="container ctaband__inner">
        <Reveal variant="left">
          <h2 className="ctaband__title">{title}</h2>
          <p className="ctaband__text">{text}</p>
        </Reveal>
        <Reveal className="ctaband__actions" variant="right" delay={110}>
          <Link className="btn btn--primary" to="/contact#enquire">
            Get a Free Quote <Icon name="arrow-r" size={18} />
          </Link>
          <a className="btn btn--outline-light" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            <span className="btn__wa"><Icon name="whatsapp" size={15} /></span> WhatsApp Us
          </a>
          <a className="btn btn--outline-light" href={`tel:${site.phoneRaw}`}>
            <Icon name="phone" size={17} /> Call Now
          </a>
        </Reveal>
      </div>
    </section>
  )
}
