import { Link } from 'react-router-dom'
import Icon from './Icon'
import { site, nav, yearsActive, fullAddress } from '../data/site'
import { services } from '../data/services'
import { fleet } from '../data/fleet'
import { packages } from '../data/packages'
import { vehicleTypes } from '../data/vehicleTypes'

export default function Footer() {
  const year = new Date().getFullYear()
  const liveSocial = Object.entries(site.social).filter(([, url]) => url)

  // Flatten the nav — dropdown children belong in the footer as their own
  // links, since this is the site's main internal-linking surface.
  const quickLinks = nav.filter((n) => !n.children)

  // The vehicles people search for by name, rather than the whole catalogue —
  // a footer listing all fifteen dilutes rather than helps.
  const popularVehicles = [
    'toyota-innova-crysta',
    'force-tempo-traveller-12',
    'mini-bus-21-seater',
    'maruti-suzuki-swift-dzire',
    'toyota-fortuner',
  ].map((slug) => fleet.find((v) => v.slug === slug)).filter(Boolean)

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__col footer__col--brand">
          <Link to="/" className="brand brand--footer">
            <span className="brand__mark" aria-hidden="true">
              <Icon name="fleet" size={24} />
            </span>
            <span className="brand__text">
              <strong>Shekhawat</strong>
              <small>Tours &amp; Travels</small>
            </span>
          </Link>
          <p className="footer__about">
            A taxi service in Rangpuri, New Delhi, run by {site.owner.name} since {site.founded}.
            Cars, SUVs, tempo travellers, mini buses and luxury coaches on rent with experienced
            drivers — across Delhi NCR and all India.
          </p>

          <a
            className="footer__rating"
            href={site.reviewsLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="footer__rating-score">{site.rating.value}</span>
            <span>
              <span className="footer__rating-stars" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => <Icon key={i} name="star" size={13} />)}
              </span>
              <small>{site.rating.count} Google reviews</small>
            </span>
          </a>

          {liveSocial.length > 0 && (
            <div className="footer__social">
              {liveSocial.map(([key, url]) => (
                <a key={key} href={url} target="_blank" rel="noopener noreferrer" aria-label={key}>
                  {key === 'google' ? 'G' : key.slice(0, 2).toUpperCase()}
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="footer__col">
          <h3 className="footer__title">Vehicles on Rent</h3>
          <ul className="footer__list">
            {vehicleTypes.map((v) => (
              <li key={v.slug}><Link to={`/${v.slug}`}>{v.h1}</Link></li>
            ))}
            <li><Link to="/fleet">View the full fleet</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h3 className="footer__title">Popular Vehicles</h3>
          <ul className="footer__list">
            {popularVehicles.map((v) => (
              <li key={v.slug}><Link to={`/fleet/${v.slug}`}>{v.name}</Link></li>
            ))}
          </ul>

          <h3 className="footer__title footer__title--gap">Tour Packages</h3>
          <ul className="footer__list">
            {packages.slice(0, 4).map((p) => (
              <li key={p.slug}><Link to={`/tour-packages/${p.slug}`}>{p.shortTitle}</Link></li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h3 className="footer__title">Quick Links</h3>
          <ul className="footer__list">
            {quickLinks.map((n) => (
              <li key={n.to}><Link to={n.to}>{n.label}</Link></li>
            ))}
          </ul>

          <h3 className="footer__title footer__title--gap">Our Services</h3>
          <ul className="footer__list">
            {services.slice(0, 4).map((s) => (
              <li key={s.slug}><Link to="/services">{s.title}</Link></li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h3 className="footer__title">Get in Touch</h3>
          <ul className="footer__list footer__list--contact">
            <li>
              <Icon name="user" size={16} />
              <span>
                <strong className="footer__owner">{site.owner.name}</strong><br />
                {site.owner.role}
              </span>
            </li>
            <li>
              <Icon name="pin" size={16} />
              <address>{fullAddress}</address>
            </li>
            <li>
              <Icon name="phone" size={16} />
              <a href={`tel:${site.phoneRaw}`}>{site.phone}</a>
            </li>
            <li>
              <Icon name="mail" size={16} />
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <Icon name="clock" size={16} />
              <span>{site.hours}<br />Walk-in: {site.walkInHours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__areas container">
        <h3 className="footer__title">Cities We Serve</h3>
        <p className="footer__tags">
          {site.serviceAreas.map((a) => (
            <span className="tag" key={a}>Taxi service in {a}</span>
          ))}
        </p>
      </div>

      <div className="footer__bar">
        <div className="container footer__bar-inner">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p className="footer__legal">
            {site.gstin ? `GSTIN: ${site.gstin} · ` : 'GST registered — tax invoice on request · '}
            {yearsActive} years on the road, still answering the phone ourselves.
          </p>
        </div>
      </div>
    </footer>
  )
}
