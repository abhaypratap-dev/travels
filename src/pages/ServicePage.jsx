import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Icon from '../components/Icon'
import RichBlocks from '../components/RichBlocks'
import BookingForm from '../components/BookingForm'
import Faq, { SectionHead, faqSchema } from '../components/Faq'
import { CtaBand, GoogleBadge } from '../components/Common'
import { Reveal, stagger } from '../components/Motion'
import { site, whatsappLink, shortAddress } from '../data/site'
import { responsive } from '../data/photos'

/**
 * One template for the four dedicated service pages — IGI airport, outstation,
 * corporate travel and the Delhi NCR destinations hub. Each page's content
 * lives entirely in servicePages.js; this file only lays it out and attaches
 * Service + FAQPage schema.
 */
export default function ServicePage({ page }) {
  const path = `/${page.slug}`
  const pageUrl = `${site.url}${path}`

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    serviceType: page.serviceType,
    name: page.h1,
    description: page.metaDescription,
    url: pageUrl,
    provider: { '@id': `${site.url}/#organization` },
    areaServed: site.serviceAreas.map((a) => ({ '@type': 'City', name: a })),
    hoursAvailable: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
  }

  return (
    <>
      <Seo
        title={page.metaTitle}
        description={page.metaDescription}
        path={path}
        image={page.image}
        imageAlt={page.imageAlt}
        keywords={page.keywords}
        schema={[serviceSchema, page.faqs && faqSchema(page.faqs)].filter(Boolean)}
        breadcrumbs={[{ name: page.navLabel, path }]}
      />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="vthero">
        <img className="vthero__bg" src={page.heroBg} alt="" width="2000" height="640" decoding="async" />
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li aria-current="page"><span>{page.navLabel}</span></li>
            </ol>
          </nav>

          <div className="vthero__grid">
            <div className="hero__stage">
              <p className="vthero__badge"><Icon name="star" size={13} /> {page.eyebrow}</p>
              <h1 className="vthero__title">
                {page.h1}
                {page.h1Accent && <span className="vthero__accent">{page.h1Accent}</span>}
              </h1>
              <p className="vthero__text">{page.summary}</p>
              <div className="vthero__actions">
                <a
                  className="btn btn--primary btn--lg"
                  href={whatsappLink(`Hi, I would like to enquire about ${page.navLabel.toLowerCase()}.`)}
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

            <div className="vtcard" data-reveal="scale">
              <div className="vtcard__media">
                <img
                  {...responsive(page.image)}
                  sizes="(max-width: 960px) 100vw, 540px"
                  alt={page.imageAlt}
                  width="600"
                  height="400"
                  fetchpriority="high"
                  decoding="async"
                />
              </div>
              <dl className="vtspecs">
                {page.facts.map((f) => (
                  <div className={`vtspec${f.wide ? ' vtspec--wide' : ''}`} key={f.label}>
                    <dt className="vtspec__label">{f.label}</dt>
                    <dd className="vtspec__value">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ── Content sections, data-driven ──────────────────────── */}
      {page.sections.map((sec, i) => (
        <section className={`section${sec.tint ? ' section--tint' : ''}`} key={i}>
          <div className={sec.wide ? 'container' : 'container container--narrow'}>
            <SectionHead eyebrow={sec.eyebrow} title={sec.title} align={sec.wide ? 'center' : 'left'} />
            <Reveal className="prose" variant="up">
              <RichBlocks blocks={sec.blocks} />
            </Reveal>
          </div>
        </section>
      ))}

      {/* ── Included / excluded ─────────────────────────────────── */}
      {page.included && (
        <section className="section section--tint">
          <div className="container">
            <SectionHead
              eyebrow="No surprises"
              title="What's Included — and What Isn't"
              text="Written out plainly, because the difference between a fair quote and a bad one is usually what nobody mentioned."
            />
            <div className="vt-split">
              <Reveal className="vt-panel vt-panel--ok" variant="left">
                <h3><Icon name="check" size={20} /> Included</h3>
                <ul>{page.included.map((it) => <li key={it}><Icon name="check" size={15} /> <span>{it}</span></li>)}</ul>
              </Reveal>
              <Reveal className="vt-panel vt-panel--muted vt-panel--extra" variant="right">
                <h3><Icon name="rupee" size={20} /> Billed separately, at actuals</h3>
                <ul>{page.excluded.map((it) => <li key={it}><Icon name="arrow-r" size={15} /> <span>{it}</span></li>)}</ul>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ── Enquiry ──────────────────────────────────────────────── */}
      <section className="section" id="enquire">
        <div className="container">
          <div className="split split--form">
            <Reveal className="prose" variant="left">
              <h2>Book {page.navLabel} in Delhi NCR</h2>
              <p>
                Our office is at <strong>{shortAddress}</strong>. Tell us your route, dates and how
                many people are travelling, and we send a fixed, all-inclusive quote — usually
                within fifteen minutes.
              </p>
              <p>
                Speak to <strong>{site.owner.name}</strong> directly on{' '}
                <a href={`tel:${site.phoneRaw}`}>{site.phone}</a>. The booking desk is staffed 24
                hours a day, every day of the year.
              </p>
            </Reveal>
            <Reveal variant="right" delay={120}>
              <BookingForm title={`Enquire — ${page.navLabel}`} />
            </Reveal>
          </div>
        </div>
      </section>

      {page.faqs && (
        <Faq items={page.faqs} heading={`${page.navLabel} — Common Questions`} />
      )}

      {/* ── Related pages ────────────────────────────────────────── */}
      {page.related && (
        <section className="section section--tint">
          <div className="container">
            <SectionHead eyebrow="Keep exploring" title="Related Pages" />
            <div className="vt-cross">
              {page.related.map((r, i) => (
                <Reveal variant="up" delay={stagger(i)} key={r.to}>
                  <Link className="vt-crosslink" to={r.to}>
                    <span className="vt-crosslink__img">
                      <img {...responsive(r.image)} sizes="(max-width: 720px) 100vw, 380px" alt="" loading="lazy" decoding="async" width="600" height="400" />
                    </span>
                    <span className="vt-crosslink__body">
                      <strong>{r.title}</strong>
                      <span>{r.text}</span>
                      <em>Explore →</em>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
            <Reveal className="section__more" variant="up" delay={160}>
              <GoogleBadge />
            </Reveal>
          </div>
        </section>
      )}

      <CtaBand title={page.cta.title} text={page.cta.text} />
    </>
  )
}
