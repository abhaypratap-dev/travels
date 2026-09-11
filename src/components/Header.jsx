import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Icon from './Icon'
import Logo from './Logo'
import { site, nav, whatsappLink } from '../data/site'

/** A target with a hash jumps within a page, so it is never "the current page". */
const isJump = (to) => to.includes('#')

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
      <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
        <div className="container header__inner">
          {/* No aria-label: the visible wordmark is the accessible name, and a
              label that differs from it ("and" vs "&") fails label-in-name. */}
          <Link to="/" className="brand">
            <Logo />
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
                      {item.label} <Icon name="chevron-down" size={14} />
                    </button>
                    {/* Rendered at all times, hidden with opacity/visibility
                        rather than `display: none`, so these links stay in the
                        prerendered HTML for crawlers to follow. */}
                    <div className="nav__panel">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.to}
                          to={child.to}
                          end
                          className={({ isActive }) =>
                            [child.to === item.to && 'nav__panel-all', isActive && 'is-active'].filter(Boolean).join(' ')
                          }
                        >
                          <Icon name="arrow-r" size={14} /> {child.label}
                        </NavLink>
                      ))}
                    </div>
                  </li>
                ) : (
                  <li key={item.to}>
                    {isJump(item.to) ? (
                      <Link className="nav__link" to={item.to}>{item.label}</Link>
                    ) : (
                      <NavLink
                        to={item.to}
                        end={item.to === '/'}
                        className={({ isActive }) => `nav__link${isActive ? ' is-active' : ''}`}
                      >
                        {item.label}
                      </NavLink>
                    )}
                  </li>
                )
              )}
            </ul>
          </nav>

          <div className="header__cta">
            <a className="header__phone" href={`tel:${site.phoneRaw}`} aria-label={`Call ${site.phone}`}>
              <Icon name="phone" size={16} />
              <span>{site.phone}</span>
            </a>
            <a
              className="btn btn--wa btn--sm"
              href={whatsappLink('Hi, I would like to book a vehicle.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="whatsapp" size={17} /> WhatsApp
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
                {isJump(item.to) ? (
                  // Same-page jumps do not change the pathname, so the effect
                  // that closes the drawer on navigation never fires for them.
                  <Link className="drawer__link" to={item.to} onClick={() => setOpen(false)}>
                    {item.label}
                    <Icon name="chevron" size={16} />
                  </Link>
                ) : (
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) => `drawer__link${isActive ? ' is-active' : ''}`}
                  >
                    {item.label}
                    <Icon name="chevron" size={16} />
                  </NavLink>
                )}
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
            className="btn btn--wa btn--block"
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
