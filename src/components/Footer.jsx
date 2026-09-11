import { Link } from 'react-router-dom'
import Icon from './Icon'
import Logo from './Logo'
import { Email, Stars } from './Common'
import { site, fullAddress } from '../data/site'
import { vehicleTypes } from '../data/vehicleTypes'
import { packages } from '../data/packages'

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Our Fleet', to: '/fleet' },
  { label: 'Tour Packages', to: '/tour-packages' },
  { label: 'Services', to: '/services' },
  { label: 'About Us', to: '/about' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  // Only profiles that are actually live — an icon pointing at a 404 costs
  // more trust than no icon at all.
  const liveSocial = Object.entries(site.social).filter(([, url]) => url)

  // The footer is the site's main internal-linking surface, so the services
  // column goes straight to the four commercial category pages.
  const serviceLinks = [
    ...vehicleTypes.map((t) => ({ label: t.h1.replace(/ in Delhi$/, ''), to: `/${t.slug}` })),
    { label: 'Airport Transfers', to: '/services#airport-railway-transfer' },
  ]

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Link to="/" className="brand brand--light">
            <Logo light />
          </Link>
          <p className="footer__about">
            A family-run taxi and tour operator in Rangpuri, New Delhi, since {site.founded}. Cars,
            SUVs, tempo travellers and coaches with experienced drivers — across Delhi NCR,
            Rajasthan and all India.
          </p>
          <a className="footer__rating" href={site.reviewsLink} target="_blank" rel="noopener noreferrer">
            <span className="footer__rating-score">{site.rating.value}</span>
            <span>
              <Stars size={13} />
              <small>{site.rating.count} Google reviews</small>
            </span>
          </a>
        </div>

        <nav className="footer__col" aria-label="Quick links">
          <h3 className="footer__title">Quick Links</h3>
          <ul className="footer__list">
            {quickLinks.map((l) => (
              <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
            ))}
          </ul>
        </nav>

        <div className="footer__col">
          <h3 className="footer__title">Our Services</h3>
          <ul className="footer__list">
            {serviceLinks.map((l) => (
              <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h3 className="footer__title">Popular Destinations</h3>
          <ul className="footer__list">
            {packages.map((p) => (
              <li key={p.slug}><Link to={`/tour-packages/${p.slug}`}>{p.destination}</Link></li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h3 className="footer__title">Contact Us</h3>
          <ul className="footer__list footer__contact">
            <li>
              <Icon name="phone" size={15} />
              <a href={`tel:${site.phoneRaw}`}>{site.phone}</a>
            </li>
            <li>
              <Icon name="mail" size={15} />
              <a href={`mailto:${site.email}`}><Email address={site.email} /></a>
            </li>
            <li>
              <Icon name="pin" size={15} />
              <a href={site.mapLink} target="_blank" rel="noopener noreferrer">
                <address style={{ fontStyle: 'normal' }}>{fullAddress}</address>
              </a>
            </li>
            <li>
              <Icon name="clock" size={15} />
              <span>Open 24×7 · Walk-in {site.walkInHours}</span>
            </li>
          </ul>
          {liveSocial.length > 0 && (
            <div className="footer__social">
              {liveSocial.map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${site.name} on ${key.charAt(0).toUpperCase()}${key.slice(1)}`}
                >
                  <Icon name={key} size={16} />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="container footer__areas">
        <p><strong>Taxi service in</strong> {site.serviceAreas.join(' · ')}</p>
      </div>

      <div className="footer__bar">
        <div className="container footer__bar-inner">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p>
            {site.gstin ? `GSTIN ${site.gstin}` : 'GST registered — tax invoice on request'} ·{' '}
            <Link to="/image-credits">Image credits</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
