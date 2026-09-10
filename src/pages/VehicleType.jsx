import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Icon from '../components/Icon'
import VehicleCard from '../components/VehicleCard'
import BookingForm from '../components/BookingForm'
import Faq, { SectionHead, faqSchema } from '../components/Faq'
import { CtaBand, GoogleBadge } from '../components/Common'
import { Reveal, stagger, useSpotlight } from '../components/Motion'
import { site, whatsappLink, shortAddress } from '../data/site'
import { fleet } from '../data/fleet'
import { vehicleTypes } from '../data/vehicleTypes'

/**
 * One template, four prerendered routes — /4-seater-car-rental,
 * /7-seater-suv-on-rent, /tempo-traveller-on-rent and /mini-bus-on-rent.
 *
 * These are the pages that earn commercial search traffic: someone typing
 * "12 seater tempo traveller price Delhi" wants a page about that vehicle,
 * not a fleet grid they have to filter. Each carries its own title, its own
 * FAQ block and its own Service + Product schema.
 */
export default function VehicleType({ type }) {
  const spotlightRef = useSpotlight()
  const vehicles = type.fleetSlugs
    .map((slug) => fleet.find((v) => v.slug === slug))
    .filter(Boolean)

  const others = vehicleTypes.filter((v) => v.slug !== type.slug)
  const path = `/${type.slug}`
  const pageUrl = `${site.url}${path}`

  /* ── Structured data ──────────────────────────────────────────
     A Service node for the offering itself, plus one Product per real
     vehicle with its actual per-km rate. Prices are the genuine ones
     from the fleet catalogue — a rich result that quotes a rate the
     business will not honour is worse than no rich result.          */

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    serviceType: type.h1,
    name: type.h1,
    description: type.metaDescription,
    url: pageUrl,
    provider: { '@id': `${site.url}/#organization` },
    areaServed: site.serviceAreas.map((a) => ({ '@type': 'City', name: a })),
    audience: { '@type': 'Audience', audienceType: 'Travellers, families, corporate groups' },
    hoursAvailable: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      lowPrice: type.fromRatePerKm,
      highPrice: Math.max(...vehicles.map((v) => v.ratePerKm)),
      offerCount: vehicles.length,
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${site.url}/#organization` },
    },
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${type.h1} — available vehicles`,
    numberOfItems: vehicles.length,
    itemListElement: vehicles.map((v, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: v.name,
        description: v.summary,
        category: type.h1,
        brand: { '@type': 'Brand', name: site.name },
        offers: {
          '@type': 'Offer',
          price: v.ratePerKm,
          priceCurrency: 'INR',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: v.ratePerKm,
            priceCurrency: 'INR',
            unitCode: 'KMT',
            unitText: 'per kilometre',
          },
          availability: 'https://schema.org/InStock',
          url: pageUrl,
          seller: { '@id': `${site.url}/#organization` },
        },
      },
    })),
  }

  return (
    <>
      <Seo
        title={type.metaTitle}
        description={type.metaDescription}
        path={path}
        keywords={type.keywords}
        schema={[serviceSchema, itemListSchema, faqSchema(type.faqs)]}
        breadcrumbs={[
          { name: 'Our Fleet', path: '/fleet' },
          { name: type.navLabel, path },
        ]}
      />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="vthero">
        <div className="vthero__bg" aria-hidden="true" />
        <div className="hero__orbs" aria-hidden="true">
          <span className="hero__orb hero__orb--1" />
          <span className="hero__orb hero__orb--2" />
        </div>

        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/fleet">Our Fleet</Link></li>
              <li aria-current="page"><span>{type.navLabel}</span></li>
            </ol>
          </nav>

          <div className="vthero__grid">
            <div className="hero__stage">
              <p className="vthero__badge">
                <Icon name="star" size={13} /> {type.eyebrow}
              </p>
              <h1 className="vthero__title">
                {type.heroTitle}{' '}
                <span className="vthero__accent hero__accent">{type.heroAccent}</span>
              </h1>
              <p className="vthero__text">{type.summary}</p>
              <div className="vthero__actions">
                <a
                  className="btn btn--primary btn--lg"
                  href={whatsappLink(`Hi, I would like to book a ${type.navLabel.toLowerCase()}. Please share the rate.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="whatsapp" size={18} /> Get a Fixed Quote
                </a>
                <a className="btn btn--outline-light btn--lg" href={`tel:${site.phoneRaw}`}>
                  <Icon name="phone" size={18} /> {site.phone}
                </a>
              </div>
            </div>

            <div className="vthero__aside">
              <dl className="vtspecs" data-reveal="scale">
                <div className="vtspec">
                  <dt className="vtspec__label">Capacity</dt>
                  <dd className="vtspec__value">{type.seats}</dd>
                </div>
                <div className="vtspec">
                  <dt className="vtspec__label">Luggage</dt>
                  <dd className="vtspec__value">{type.luggage}</dd>
                </div>
                <div className="vtspec">
                  <dt className="vtspec__label">Starting rate</dt>
                  <dd className="vtspec__value">₹{type.fromRatePerKm} per km</dd>
                </div>
                <div className="vtspec">
                  <dt className="vtspec__label">Full day</dt>
                  <dd className="vtspec__value">
                    ₹{type.fromRatePerDay.toLocaleString('en-IN')} onwards
                  </dd>
                </div>
                <div className="vtspec vtspec--wide">
                  <dt className="vtspec__label">Local package</dt>
                  <dd className="vtspec__value">{type.localPackage}</dd>
                </div>
                <div className="vtspec vtspec--wide">
                  <dt className="vtspec__label">Airport transfer</dt>
                  <dd className="vtspec__value">{type.airportRate}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        <div className="hero__road" aria-hidden="true" />
      </section>

      {/* ── Rate card ─────────────────────────────────────────── */}
      <section className="section section--tight">
        <div className="container">
          <Reveal as="div" variant="up">
            <SectionHead
              eyebrow="Transparent pricing"
              title={`${type.navLabel} Rates — Fixed Before You Travel`}
              text="No surge pricing, no peak-hour multiplier, no booking fee. The quote we send is the bill you pay."
            />
          </Reveal>

          <div className="vt-rates">
            {[
              { label: 'Per kilometre', value: `₹${type.fromRatePerKm}`, unit: '/km', note: 'Includes fuel and driver' },
              { label: 'Per day', value: `₹${type.fromRatePerDay.toLocaleString('en-IN')}`, unit: '/day', note: '250 km per day minimum' },
              { label: 'Local 8hr / 80km', value: type.localPackage.split(' for ')[0], unit: '', note: 'Inside Delhi NCR' },
              { label: 'IGI Airport transfer', value: type.airportRate.split(' onwards')[0], unit: '', note: '60 min free waiting' },
            ].map((rate, i) => (
              <Reveal className="vt-card" variant="up" delay={stagger(i)} key={rate.label}>
                <span className="vt-card__label">{rate.label}</span>
                <span className="vt-card__value">
                  {rate.value}{rate.unit && <small>{rate.unit}</small>}
                </span>
                <span className="vt-card__note">{rate.note}</span>
              </Reveal>
            ))}
          </div>

          <Reveal className="section__more" variant="up" delay={200}>
            <GoogleBadge />
          </Reveal>
        </div>
      </section>

      {/* ── The actual vehicles ───────────────────────────────── */}
      <section className="section section--tint">
        <div className="container">
          <Reveal as="div" variant="up">
            <SectionHead
              eyebrow="Available models"
              title={`${type.navLabel} Options in Our Fleet`}
              text="Every vehicle is serviced on schedule, cleaned before handover and covered by comprehensive insurance."
            />
          </Reveal>
          <div className="grid grid--3">
            {vehicles.map((v, i) => (
              <Reveal variant="up" delay={stagger(i)} key={v.slug}>
                <VehicleCard vehicle={v} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Best for ──────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <Reveal as="div" variant="up">
            <SectionHead
              eyebrow="When to choose it"
              title={`What a ${type.navLabel} Is Right For`}
              text="Booked correctly, this vehicle solves a specific problem. Here is when it is the right call."
            />
          </Reveal>
          <div className="vt-uses">
            {type.bestFor.map((use, i) => (
              <Reveal className="vt-use" variant="up" delay={stagger(i, 55)} key={use}>
                <Icon name="check" size={17} />
                <span>{use}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Included / additional ─────────────────────────────── */}
      <section className="section section--tint">
        <div className="container">
          <Reveal as="div" variant="up">
            <SectionHead
              eyebrow="No surprises"
              title="What the Rate Covers — and What It Does Not"
              text="Written out plainly, because the difference between a fair quote and a bad one is usually what nobody mentioned."
            />
          </Reveal>
          <div className="vt-split">
            <Reveal className="vt-panel vt-panel--ok" variant="left">
              <h3><Icon name="check" size={20} /> Included in the rate</h3>
              <ul>
                {type.included.map((item) => (
                  <li key={item}><Icon name="check" size={15} /> <span>{item}</span></li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="vt-panel vt-panel--muted vt-panel--extra" variant="right">
              <h3><Icon name="rupee" size={20} /> Billed separately, at actuals</h3>
              <ul>
                {type.excluded.map((item) => (
                  <li key={item}><Icon name="arrow" size={15} /> <span>{item}</span></li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Popular routes ────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <Reveal as="div" variant="up">
            <SectionHead
              eyebrow="Where people take it"
              title={`Popular ${type.navLabel} Routes from Delhi`}
              text="The trips we run most often with this vehicle. Any other route, just ask — we quote it the same way."
            />
          </Reveal>
          <div className="vt-routes">
            {type.routes.map((route, i) => (
              <Reveal className="vt-route" variant="up" delay={stagger(i, 55)} key={route.to}>
                <span className="vt-route__icon"><Icon name="road" size={18} /></span>
                <span>
                  <strong className="vt-route__to">{route.to}</strong>
                  <span className="vt-route__note">{route.note}</span>
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Enquiry form ──────────────────────────────────────── */}
      <section className="section section--tint" id="enquire">
        <div className="container">
          <div className="split split--form">
            <Reveal className="prose" variant="left">
              <h2>Book a {type.navLabel} in Delhi NCR</h2>
              <p>
                Our office is at <strong>{shortAddress}</strong> — about three kilometres from
                IGI Airport Terminal 3, which is why so many of our {type.navLabel.toLowerCase()}{' '}
                bookings are early-morning airport runs. Tell us your route, your dates and how
                many people are travelling, and we send back a fixed, all-inclusive quote,
                usually within fifteen minutes.
              </p>
              <p>
                Speak to <strong>{site.owner.name}</strong> directly on{' '}
                <a href={`tel:${site.phoneRaw}`}>{site.phone}</a>. The booking desk is staffed
                24 hours a day, every day of the year — including the 3 AM flight landings and
                the festival weekends when everyone else stops answering.
              </p>
              <p className="muted">
                Prefer WhatsApp? Most of our bookings now arrive that way.{' '}
                <a href={whatsappLink(`Hi, I need a ${type.navLabel.toLowerCase()}. Here are my details:`)} target="_blank" rel="noopener noreferrer">
                  Start a chat
                </a>{' '}
                and send your route — you will have a rate before you finish typing the return date.
              </p>
            </Reveal>
            <Reveal variant="right" delay={120}>
              <BookingForm title={`Enquire — ${type.navLabel}`} />
            </Reveal>
          </div>
        </div>
      </section>

      <Faq items={type.faqs} heading={`${type.navLabel} — Common Questions`} intro={`Everything people ask before booking a ${type.navLabel.toLowerCase()} with us.`} />

      {/* ── Cross-links ───────────────────────────────────────── */}
      <section className="section section--tight" ref={spotlightRef}>
        <div className="container">
          <Reveal as="div" variant="up">
            <SectionHead
              eyebrow="Other vehicles"
              title="Need Something Bigger or Smaller?"
              text="Group sizes change. Here is the rest of the range, priced the same transparent way."
            />
          </Reveal>
          <div className="vt-cross">
            {others.map((other, i) => (
              <Reveal variant="up" delay={stagger(i)} key={other.slug}>
                <Link className="vt-crosslink" to={`/${other.slug}`}>
                  <span className="vt-crosslink__icon"><Icon name={other.icon} size={22} /></span>
                  <strong>{other.h1}</strong>
                  <span>{other.seats}</span>
                  <em>From ₹{other.fromRatePerKm}/km →</em>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={`Ready to book your ${type.navLabel.toLowerCase()}?`}
        text={`Tell ${site.owner.name} your route and dates. You get a fixed, all-inclusive quote — usually within 15 minutes.`}
      />
    </>
  )
}
