import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Icon from '../components/Icon'
import BookingForm from '../components/BookingForm'
import VehicleCard from '../components/VehicleCard'
import Faq, { SectionHead, faqSchema } from '../components/Faq'
import { CtaBand, GoogleBadge } from '../components/Common'
import { Reveal, stagger } from '../components/Motion'
import { site, whatsappLink, shortAddress } from '../data/site'
import { fleet } from '../data/fleet'
import { vehicleTypes, getVehicleType } from '../data/vehicleTypes'
import { responsive } from '../data/photos'

/**
 * One page per vehicle — /fleet/toyota-innova-crysta and its fourteen siblings.
 *
 * These sit a level below the category pages: someone searching "Innova Crysta
 * rental Delhi price" wants that vehicle's rate and specs, not a category
 * overview. Each carries its own written copy, its own FAQs and a Product node
 * with the real per-kilometre rate, so no two pages read as duplicates.
 */
export default function VehicleDetail({ vehicle: v }) {
  const parent = getVehicleType(v.parentType)
  /**
   * Same body category first, then the wider category-page family. Matching on
   * either in one pass let fleet order decide, which buried genuinely similar
   * vehicles — the E-Class never surfaced on the Fortuner page despite both
   * being the luxury tier.
   */
  const related = fleet
    .filter((o) => o.slug !== v.slug && (o.category === v.category || o.parentType === v.parentType))
    .sort((a, b) => (a.category === v.category ? 0 : 1) - (b.category === v.category ? 0 : 1))
    .slice(0, 3)

  const path = `/fleet/${v.slug}`
  const pageUrl = `${site.url}${path}`
  const title = `${v.name} on Rent in Delhi`

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${pageUrl}#product`,
    name: `${v.name} on rent with driver`,
    description: v.detail,
    image: `${site.url}${v.image}`,
    category: parent?.h1 ?? 'Vehicle rental',
    brand: { '@type': 'Brand', name: site.name },
    url: pageUrl,
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Seating capacity', value: `${v.seats} passengers` },
      { '@type': 'PropertyValue', name: 'Luggage capacity', value: `${v.luggage} bags` },
      { '@type': 'PropertyValue', name: 'Air conditioning', value: v.ac ? 'Yes' : 'No' },
      { '@type': 'PropertyValue', name: 'Transmission', value: v.transmission },
      { '@type': 'PropertyValue', name: 'Fuel', value: v.fuel },
    ],
    offers: {
      '@type': 'Offer',
      '@id': `${pageUrl}#offer`,
      price: v.ratePerKm,
      priceCurrency: 'INR',
      priceSpecification: [
        {
          '@type': 'UnitPriceSpecification',
          price: v.ratePerKm,
          priceCurrency: 'INR',
          unitCode: 'KMT',
          unitText: 'per kilometre',
        },
        {
          '@type': 'UnitPriceSpecification',
          price: v.ratePerDay,
          priceCurrency: 'INR',
          unitCode: 'DAY',
          unitText: `per day, minimum ${v.minKm} km`,
        },
      ],
      availability: 'https://schema.org/InStock',
      url: pageUrl,
      seller: { '@id': `${site.url}/#organization` },
      areaServed: site.serviceAreas.slice(0, 10).map((a) => ({ '@type': 'City', name: a })),
    },
  }

  const specs = [
    { icon: 'seat', label: 'Seating', value: `${v.seats} passengers + driver` },
    { icon: 'luggage', label: 'Luggage', value: `${v.luggage} ${v.luggage === 1 ? 'bag' : 'bags'}` },
    { icon: 'snow', label: 'Climate', value: v.ac ? 'Air conditioned' : 'Non-AC' },
    { icon: 'gear', label: 'Transmission', value: v.transmission },
    { icon: 'fuel', label: 'Fuel', value: v.fuel },
    { icon: 'road', label: 'Daily minimum', value: `${v.minKm} km per day` },
  ]

  return (
    <>
      <Seo
        title={title}
        description={`${v.name} on rent with driver in Delhi NCR at ₹${v.ratePerKm}/km or ₹${v.ratePerDay.toLocaleString('en-IN')}/day. ${v.seats} seats, ${v.ac ? 'AC' : 'non-AC'}. ${v.tagline}.`}
        path={path}
        image={v.image}
        keywords={`${v.name} on rent Delhi, ${v.name} rental price, ${v.name} taxi booking, ${v.seats} seater ${v.category} Delhi NCR, ${v.name} with driver`}
        schema={[productSchema, faqSchema(v.faqs)]}
        breadcrumbs={[
          { name: 'Our Fleet', path: '/fleet' },
          { name: v.name, path },
        ]}
      />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="vdhero">
        <img className="vdhero__bg" src="/images/hero/bg-jaisalmer.jpg" alt="" width="2000" height="640" decoding="async" />
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/fleet">Our Fleet</Link></li>
              {parent && <li><Link to={`/${parent.slug}`}>{parent.navLabel}</Link></li>}
              <li aria-current="page"><span>{v.name}</span></li>
            </ol>
          </nav>

          <div className="vdhero__grid">
            <div className="hero__stage">
              {v.badge && <p className="vthero__badge"><Icon name="star" size={13} /> {v.badge}</p>}
              <h1 className="vdhero__title">{v.name}</h1>
              <p className="vdhero__tagline">{v.tagline}</p>
              <p className="vdhero__text">{v.summary}</p>

              <div className="vdhero__price">
                <span className="vdhero__rate">
                  ₹{v.ratePerKm}<small>/km</small>
                </span>
                <span className="vdhero__sep" aria-hidden="true" />
                <span className="vdhero__rate vdhero__rate--alt">
                  ₹{v.ratePerDay.toLocaleString('en-IN')}<small>/day</small>
                </span>
              </div>

              <div className="vthero__actions">
                <a
                  className="btn btn--primary btn--lg"
                  href={whatsappLink(`Hi, I want to book the ${v.name} (${v.seats} seater). Please share availability and the final rate.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="whatsapp" size={18} /> Check Availability
                </a>
                <a className="btn btn--outline-light btn--lg" href={`tel:${site.phoneRaw}`}>
                  <Icon name="phone" size={18} /> {site.phone}
                </a>
              </div>
            </div>

            <figure className="vdhero__media" data-reveal="scale">
              <img
                {...responsive(v.image)}
                sizes="(max-width: 960px) 100vw, 560px"
                alt={`${v.name} — ${v.seats} seater ${v.ac ? 'AC' : 'non-AC'} ${v.category} on rent with driver in Delhi`}
                width="600"
                height="400"
                /* Above the fold on this route, so it loads eagerly and gets
                   fetch priority — this image is the LCP element. */
                loading="eager"
                fetchpriority="high"
              />
              <figcaption>{v.name} · {v.seats} seats · {v.fuel} — photo shows the model</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ── Specs ─────────────────────────────────────────────── */}
      <section className="section section--tight">
        <div className="container">
          <div className="vdspecs">
            {specs.map((s, i) => (
              <Reveal className="vdspec" variant="up" delay={stagger(i, 50)} key={s.label}>
                <span className="vdspec__icon"><Icon name={s.icon} size={20} /></span>
                <span className="vdspec__label">{s.label}</span>
                <span className="vdspec__value">{s.value}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── The written case for this vehicle ─────────────────── */}
      <section className="section">
        <div className="container">
          <div className="split split--form">
            <Reveal className="prose" variant="left">
              <h2>About the {v.name}</h2>
              <p>{v.detail}</p>

              <h3>What is included</h3>
              <ul className="prose__list">
                {v.features.map((f) => (
                  <li key={f}><Icon name="check" size={15} /> {f}</li>
                ))}
              </ul>

              <h3>Booking it</h3>
              <p>
                Call <strong>{site.owner.name}</strong> on{' '}
                <a href={`tel:${site.phoneRaw}`}>{site.phone}</a> or send a WhatsApp message with
                your route and dates. We confirm availability and a fixed, all-inclusive rate —
                usually inside fifteen minutes. Our yard is at <strong>{shortAddress}</strong>, so
                if you are in Delhi NCR you are welcome to come and inspect the vehicle before you
                commit.
              </p>
            </Reveal>

            <Reveal variant="right" delay={120}>
              <BookingForm title={`Enquire — ${v.name}`} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Best for ──────────────────────────────────────────── */}
      <section className="section section--tint">
        <div className="container">
          <SectionHead
            eyebrow="When to choose it"
            title={`What the ${v.name} Is Right For`}
            text={`Best for: ${v.bestFor}.`}
          />
          <div className="vt-uses">
            {v.useCases.map((u, i) => (
              <Reveal className="vt-use" variant="up" delay={stagger(i, 55)} key={u}>
                <Icon name="check" size={17} />
                <span>{u}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Rate breakdown ────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Transparent pricing"
            title={`${v.name} Rates`}
            text="The quote we send is the bill you pay. Toll, parking and permits are itemised at actuals, never marked up."
          />
          <div className="vt-rates">
            {[
              { label: 'Per kilometre', value: `₹${v.ratePerKm}`, unit: '/km', note: 'Includes fuel and driver' },
              { label: 'Per day', value: `₹${v.ratePerDay.toLocaleString('en-IN')}`, unit: '/day', note: `${v.minKm} km per day minimum` },
              { label: 'Driver night allowance', value: `₹${v.driverAllowance}`, unit: '/night', note: 'Applies past 10 PM or on multi-day trips' },
              { label: 'Toll, parking & permits', value: 'At actuals', unit: '', note: 'Billed with receipts, never marked up' },
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

      {/* ── Routes, inherited from the category page ──────────── */}
      {parent && (
        <section className="section section--tint">
          <div className="container">
            <SectionHead
              eyebrow="Where people take it"
              title={`Popular ${v.name} Routes from Delhi`}
              text="The trips we run most often with this class of vehicle. Any other route, just ask — we quote it the same way."
            />
            <div className="vt-routes">
              {parent.routes.map((route, i) => (
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
      )}

      <Faq
        items={v.faqs}
        heading={`${v.name} — Common Questions`}
        intro={`What people ask before booking a ${v.name} with us.`}
      />

      {/* ── Related vehicles ──────────────────────────────────── */}
      {related.length > 0 && (
        <section className="section section--tint">
          <div className="container">
            <SectionHead
              eyebrow="Similar vehicles"
              title="Other Options in This Class"
              text="Group sizes and budgets change. Here is what sits either side of this one."
            />
            <div className="grid grid--3">
              {related.map((o, i) => (
                <Reveal variant="up" delay={stagger(i)} key={o.slug}>
                  <VehicleCard vehicle={o} />
                </Reveal>
              ))}
            </div>
            {parent && (
              <Reveal className="section__more" variant="up">
                <Link className="btn btn--outline btn--lg" to={`/${parent.slug}`}>
                  All {parent.navLabel.toLowerCase()} options <Icon name="arrow" size={18} />
                </Link>
              </Reveal>
            )}
          </div>
        </section>
      )}

      <CtaBand
        title={`Book the ${v.name}`}
        text={`Tell ${site.owner.name} your route and dates. Fixed, all-inclusive quote — usually within 15 minutes.`}
      />
    </>
  )
}

/** Route table entry for every vehicle, consumed by App and the prerenderer. */
export const vehicleRoutes = fleet.map((v) => ({
  path: `/fleet/${v.slug}`,
  vehicle: v,
}))

export { vehicleTypes }
