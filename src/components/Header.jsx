import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Icon from './Icon'
import { site, nav, whatsappLink } from '../data/site'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <div className="topbar">
        <div className="container topbar__inner">
          <span className="topbar__item">
            <Icon name="clock" size={14} /> {site.hours}
          </span>
          <div className="topbar__right">
            <a className="topbar__item" href={`tel:${site.phoneRaw}`}>
              <Icon name="phone" size={14} /> {site.phone}
            </a>
            <a className="topbar__item topbar__item--hide-sm" href={`mailto:${site.email}`}>
              <Icon name="mail" size={14} /> {site.email}
            </a>
          </div>
        </div>
      </div>

      <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
        <div className="container header__inner">
          <Link to="/" className="brand" aria-label={`${site.name} — home`}>
            <span className="brand__mark" aria-hidden="true">
              <Icon name="fleet" size={24} />
            </span>
            <span className="brand__text">
              <strong>Shekhawat</strong>
              <small>Tours &amp; Travels</small>
            </span>
          </Link>

          <nav className="nav" aria-label="Primary">
            <ul className="nav__list">
              {nav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) => `nav__link${isActive ? ' is-active' : ''}`}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__cta">
            <a className="btn btn--ghost btn--sm" href={`tel:${site.phoneRaw}`}>
              <Icon name="phone" size={16} /> Call Now
            </a>
            <a
              className="btn btn--primary btn--sm"
              href={whatsappLink('Hi, I would like to book a vehicle.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="whatsapp" size={16} /> Book Now
            </a>
          </div>

          <button
            className="header__burger"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <Icon name={open ? 'close' : 'menu'} size={24} />
          </button>
        </div>
      </header>

      <div id="mobile-menu" className={`drawer${open ? ' drawer--open' : ''}`} hidden={!open}>
        <nav aria-label="Mobile">
          <ul className="drawer__list">
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => `drawer__link${isActive ? ' is-active' : ''}`}
                >
                  {item.label}
                  <Icon name="chevron" size={16} />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="drawer__cta">
          <a className="btn btn--ghost btn--block" href={`tel:${site.phoneRaw}`}>
            <Icon name="phone" size={18} /> {site.phone}
          </a>
          <a
            className="btn btn--primary btn--block"
            href={whatsappLink('Hi, I would like to book a vehicle.')}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="whatsapp" size={18} /> WhatsApp Booking
          </a>
        </div>
      </div>
      {open && <div className="drawer__scrim" onClick={() => setOpen(false)} />}
    </>
  )
}
