import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Icon from '../components/Icon'
import BookingForm from '../components/BookingForm'
import Faq, { SectionHead, faqSchema } from '../components/Faq'
import { CtaBand, GoogleBadge } from '../components/Common'
import { Reveal, stagger } from '../components/Motion'
import { site, whatsappLink } from '../data/site'
import { packages } from '../data/packages'
import { fleet } from '../data/fleet'
import { responsive } from '../data/photos'

/**
 * One page per tour package — /tour-packages/golden-triangle-delhi-agra-jaipur
 * and its five siblings.
 *
 * The listing page is a comparison surface; these are the pages that rank for
 * "golden triangle tour package from delhi" and answer the questions someone
 * asks before paying for a five-day trip. Each carries a `TouristTrip` node
 * with the real day-by-day itinerary as an `itinerary` ItemList.
 */
export default function PackageDetail({ pkg: p }) {
  const others = packages.filter((o) => o.slug !== p.slug).slice(0, 3)
  const suggested = fleet.find((v) => v.slug === p.vehicleSlug)

  const path = `/tour-packages/${p.slug}`
  const pageUrl = `${site.url}${path}`
  const nights = p.itinerary.length - 1

  const tripSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    '@id': `${pageUrl}#trip`,
    name: p.title,
    description: p.detail,
    url: pageUrl,
    image: `${site.url}${p.image}`,
    touristType: ['Families', 'Groups', 'Couples', 'Pilgrims'],
    provider: { '@id': `${site.url}/#organization` },
    departureLocation: { '@type': 'Place', name: p.from },
    itinerary: {
      '@type': 'ItemList',
      numberOfItems: p.itinerary.length,
      itemListElement: p.itinerary.map((d) => ({
        '@type': 'ListItem',
        position: d.day,
        item: {
          '@type': 'TouristDestination',
          name: d.title,
          description: d.detail,
        },
      })),
    },
    offers: {
      '@type': 'Offer',
      '@id': `${pageUrl}#offer`,
      price: p.price,
      priceCurrency: 'INR',
      description: p.priceNote,
      availability: 'https://schema.org/InStock',
      url: pageUrl,
      seller: { '@id': `${site.url}/#organization` },
      validFrom: `${new Date().getFullYear()}-01-01`,
    },
    subjectOf: {
      '@type': 'CreativeWork',
      about: p.highlights.join(', '),
    },
  }

  const facts = [
    { icon: 'clock', label: 'Duration', value: p.duration },
    { icon: 'pin', label: 'Starts from', value: p.from },
    { icon: 'road', label: 'Distance', value: p.distance },
    { icon: 'fleet', label: 'Recommended vehicle', value: p.vehicle },
    { icon: 'star', label: 'Best season', value: p.bestTime },
    { icon: 'rupee', label: 'From', value: `₹${p.price.toLocaleString('en-IN')} — ${p.priceNote}` },
  ]

  return (
    <>
      <Seo
        title={`${p.shortTitle} — ${p.duration}`}
        description={`${p.shortTitle} package from ${p.from} — ${p.duration} with car and driver, from ₹${p.price.toLocaleString('en-IN')}. ${p.highlights[0]}.`}
        path={path}
        image={p.image}
        type="article"
        keywords={`${p.title} package, ${p.title} tour from ${p.from}, ${p.duration} Rajasthan tour, ${p.slug.replace(/-/g, ' ')} price, tour package with driver Delhi`}
        schema={[tripSchema, faqSchema(p.faqs)]}
        breadcrumbs={[
          { name: 'Tour Packages', path: '/tour-packages' },
          { name: p.title, path },
        ]}
      />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="vdhero">
        <img className="vdhero__bg" src={p.heroBg} alt="" width="2000" height="640" decoding="async" />
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/tour-packages">Tour Packages</Link></li>
              <li aria-current="page"><span>{p.title}</span></li>
            </ol>
          </nav>

          <div className="vdhero__grid">
            <div className="hero__stage">
              {p.tag && <p className="vthero__badge"><Icon name="star" size={13} /> {p.tag}</p>}
              <h1 className="vdhero__title">{p.title}</h1>
              <p className="vdhero__tagline">
                {p.duration} · from {p.from} · {p.distance}
              </p>
              <p className="vdhero__text">{p.summary}</p>

              <div className="vdhero__price">
                <span className="vdhero__rate">
                  ₹{p.price.toLocaleString('en-IN')}
                </span>
                <span className="vdhero__pricenote">{p.priceNote}</span>
              </div>

              <div className="vthero__actions">
                <a
                  className="btn btn--primary btn--lg"
                  href={whatsappLink(`Hi, I am interested in the "${p.title}" (${p.duration}) package. Please share details and availability.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="whatsapp" size={18} /> Enquire About This Tour
                </a>
                <a className="btn btn--outline-light btn--lg" href={`tel:${site.phoneRaw}`}>
                  <Icon name="phone" size={18} /> {site.phone}
                </a>
              </div>
            </div>

            <figure className="vdhero__media" data-reveal="scale">
              <img
                {...responsive(p.image)}
                sizes="(max-width: 960px) 100vw, 560px"
                alt={`${p.place} — ${p.title}, ${p.duration} tour package with car and driver`}
                width="600"
                height="400"
                loading="eager"
                fetchpriority="high"
              />
              <figcaption>{p.duration} · {p.itinerary.length} days planned</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ── At a glance ───────────────────────────────────────── */}
      <section className="section section--tight">
        <div className="container">
          <div className="vdspecs vdspecs--wide">
            {facts.map((f, i) => (
              <Reveal className="vdspec" variant="up" delay={stagger(i, 50)} key={f.label}>
                <span className="vdspec__icon"><Icon name={f.icon} size={20} /></span>
                <span className="vdspec__label">{f.label}</span>
                <span className="vdspec__value">{f.value}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why this trip ─────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="split split--form">
            <Reveal className="prose" variant="left">
              <h2>About this tour</h2>
              <p>{p.detail}</p>

              <h3>Trip highlights</h3>
              <ul className="prose__list">
                {p.highlights.map((h) => (
                  <li key={h}><Icon name="check" size={15} /> {h}</li>
                ))}
              </ul>

              <h3>Customising it</h3>
              <p>
                Every itinerary here is a starting point, not a fixed product. Add a day, drop a
                city, change the start point to wherever your flight lands, or slow the pace if
                you are travelling with elderly parents or small children. Tell{' '}
                <strong>{site.owner.name}</strong> what you want on{' '}
                <a href={`tel:${site.phoneRaw}`}>{site.phone}</a> and we rebuild the route around
                it, then quote the revised trip in writing before you commit.
              </p>
            </Reveal>

            <Reveal variant="right" delay={120}>
              <BookingForm title={`Enquire — ${p.shortTitle}`} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Day by day ────────────────────────────────────────── */}
      <section className="section section--tint">
        <div className="container container--narrow">
          <SectionHead
            eyebrow="Day by day"
            title="The Full Itinerary"
            text={`${p.itinerary.length} days${nights > 0 ? `, ${nights} nights` : ''} — paced so you spend your time at the sights, not stuck in the car.`}
          />
          <ol className="timeline">
            {p.itinerary.map((d, i) => (
              <Reveal
                as="li"
                className="timeline__item"
                variant="left"
                delay={stagger(i, 80)}
                key={d.day}
              >
                <span className="timeline__day">Day {d.day}</span>
                <div>
                  <h3 className="timeline__title">{d.title}</h3>
                  <p className="timeline__text">{d.detail}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Inclusions ────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="No surprises"
            title="What the Price Covers — and What It Does Not"
            text="Written out plainly, because the difference between a fair quote and a bad one is usually what nobody mentioned."
          />
          <div className="vt-split">
            <Reveal className="vt-panel vt-panel--ok" variant="left">
              <h3><Icon name="check" size={20} /> Included in the package</h3>
              <ul>
                {p.inclusions.map((item) => (
                  <li key={item}><Icon name="check" size={15} /> <span>{item}</span></li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="vt-panel vt-panel--muted vt-panel--extra" variant="right">
              <h3><Icon name="rupee" size={20} /> Not included</h3>
              <ul>
                {p.exclusions.map((item) => (
                  <li key={item}><Icon name="arrow" size={15} /> <span>{item}</span></li>
                ))}
              </ul>
            </Reveal>
          </div>

          {suggested && (
            <Reveal className="pkgvehicle" variant="up" delay={140}>
              <img
                {...responsive(suggested.image)}
                sizes="(max-width: 960px) 100vw, 320px"
                alt={`${suggested.name} — recommended vehicle for the ${p.title} tour`}
                width="600"
                height="400"
                loading="lazy"
                decoding="async"
              />
              <div>
                <p className="pkgvehicle__label">Recommended vehicle</p>
                <h3 className="pkgvehicle__title">{suggested.name}</h3>
                <p className="pkgvehicle__text">{suggested.summary}</p>
                <Link className="btn btn--outline btn--sm" to={`/fleet/${suggested.slug}`}>
                  See specs &amp; rates <Icon name="arrow" size={15} />
                </Link>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <Faq
        items={p.faqs}
        heading={`${p.shortTitle} — Common Questions`}
        intro="What people ask before booking this tour."
      />

      {/* ── Other packages ────────────────────────────────────── */}
      <section className="section section--tint">
        <div className="container">
          <SectionHead
            eyebrow="Other itineraries"
            title="More Tours from Delhi & Rajasthan"
            text="Different lengths, same approach — real routes, fixed pricing, fully customisable."
          />
          <div className="vt-cross">
            {others.map((o, i) => (
              <Reveal variant="up" delay={stagger(i)} key={o.slug}>
                <Link className="vt-crosslink" to={`/tour-packages/${o.slug}`}>
                  <span className="vt-crosslink__img">
                    <img
                      {...responsive(o.image)}
                      sizes="(max-width: 720px) 100vw, 380px"
                      alt=""
                      loading="lazy"
                      decoding="async"
                      width="600"
                      height="400"
                    />
                  </span>
                  <span className="vt-crosslink__body">
                    <strong>{o.shortTitle}</strong>
                    <span>{o.duration} · {o.route}</span>
                    <em>From ₹{o.price.toLocaleString('en-IN')} →</em>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal className="section__more" variant="up">
            <GoogleBadge />
          </Reveal>
        </div>
      </section>

      <CtaBand
        title={`Book the ${p.shortTitle}`}
        text={`Send us your dates and group size. ${site.owner.name} will confirm the route and a fixed, all-inclusive quote.`}
      />
    </>
  )
}
