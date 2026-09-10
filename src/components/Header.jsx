import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Icon from './Icon'
import { site, nav, whatsappLink } from '../data/site'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState(null)
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
    setOpenMenu(null)
  }, [pathname])

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

  // Escape closes whichever layer is on top — the dropdown first, then the
  // drawer — which is what a keyboard user expects from a nested menu.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      if (openMenu) setOpenMenu(null)
      else if (open) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, openMenu])

  /** True when the current route is one of a dropdown's children. */
  const groupActive = (item) =>
    item.children?.some((c) => c.to === pathname) || pathname === item.to

  return (
    <>
      <div className="topbar">
        <div className="container topbar__inner">
          <span className="topbar__item">
            <Icon name="clock" size={14} /> {site.hours}
          </span>
          <div className="topbar__right">
            <a className="topbar__item topbar__item--hide-sm" href={site.mapLink} target="_blank" rel="noopener noreferrer">
              <Icon name="pin" size={14} /> Rangpuri, New Delhi
            </a>
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
              {nav.map((item) =>
                item.children ? (
                  <li
                    className={`nav__item${openMenu === item.label ? ' is-open' : ''}`}
                    key={item.label}
                    onMouseLeave={() => setOpenMenu(null)}
                  >
                    <button
                      className={`nav__trigger${groupActive(item) ? ' is-active' : ''}`}
                      aria-expanded={openMenu === item.label}
                      aria-haspopup="true"
                      onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                    >
                      {item.label} <Icon name="chevron" size={13} />
                    </button>
                    {/* Rendered at all times, hidden with opacity/visibility
                        rather than `display: none`, so these links stay in the
                        prerendered HTML for crawlers to follow. */}
                    <div className="nav__panel">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.to}
                          to={child.to}
                          className={({ isActive }) => (isActive ? 'is-active' : '')}
                        >
                          <Icon name="arrow" size={13} /> {child.label}
                        </NavLink>
                      ))}
                    </div>
                  </li>
                ) : (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) => `nav__link${isActive ? ' is-active' : ''}`}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                )
              )}
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
              <li key={item.label}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => `drawer__link${isActive ? ' is-active' : ''}`}
                >
                  {item.label}
                  <Icon name="chevron" size={16} />
                </NavLink>
                {item.children && (
                  <div className="drawer__sub">
                    {item.children
                      .filter((c) => c.to !== item.to)
                      .map((child) => (
                        <NavLink
                          key={child.to}
                          to={child.to}
                          className={({ isActive }) => (isActive ? 'is-active' : '')}
                        >
                          {child.label}
                        </NavLink>
                      ))}
                  </div>
                )}
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
