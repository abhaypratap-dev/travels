import { Link } from 'react-router-dom'
import Icon from './Icon'
import { site, nav } from '../data/site'
import { services } from '../data/services'

export default function Footer() {
  const year = new Date().getFullYear()

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
            Family-run since {site.founded}. Sedans, SUVs, tempo travellers, mini buses and
            luxury coaches on rent with experienced drivers — across Delhi NCR, Rajasthan
            and all India.
          </p>
          <div className="footer__social">
            <a href={site.social.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer">FB</a>
            <a href={site.social.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer">IG</a>
            <a href={site.social.youtube} aria-label="YouTube" target="_blank" rel="noopener noreferrer">YT</a>
            <a href={site.social.twitter} aria-label="X" target="_blank" rel="noopener noreferrer">X</a>
          </div>
        </div>

        <div className="footer__col">
          <h3 className="footer__title">Quick Links</h3>
          <ul className="footer__list">
            {nav.map((n) => (
              <li key={n.to}><Link to={n.to}>{n.label}</Link></li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h3 className="footer__title">Our Services</h3>
          <ul className="footer__list">
            {services.slice(0, 6).map((s) => (
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
              <span>{site.address.street}, {site.address.locality} {site.address.postalCode}</span>
            </li>
            <li>
              <Icon name="phone" size={16} />
              <a href={`tel:${site.phoneRaw}`}>{site.phone}</a>
            </li>
            <li>
              <Icon name="mail" size={16} />
              <span>
                <a href={`mailto:${site.email}`}>{site.email}</a><br />
                <a href={`mailto:${site.altEmail}`}>{site.altEmail}</a>
              </span>
            </li>
            <li>
              <Icon name="clock" size={16} />
              <span>{site.hours}</span>
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
          <p className="footer__legal">GSTIN: {site.gstin} · Designed for travellers, built on trust.</p>
        </div>
      </div>
    </footer>
  )
}
