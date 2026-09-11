import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Icon from '../components/Icon'
import VehicleCard from '../components/VehicleCard'
import Faq, { SectionHead, faqSchema } from '../components/Faq'
import { PageHero, CtaBand } from '../components/Common'
import { Reveal, stagger } from '../components/Motion'
import { site } from '../data/site'
import { fleet, fleetCategories } from '../data/fleet'
import { vehicleTypes } from '../data/vehicleTypes'

const fleetFaqs = [
  {
    q: 'Which vehicle should I book for a family of six?',
    a: 'A Toyota Innova Crysta or Maruti Ertiga seats six comfortably with luggage. If you are carrying more than four large suitcases, a 12-seat tempo traveller gives you far more room for only a little more per kilometre.',
  },
  {
    q: 'Are your buses AC or non-AC?',
    a: 'Both. Our 21, 32 and 45 seaters are available in AC and non-AC variants, and we keep a dedicated 26-seat non-AC deluxe bus for winter travel and local functions where budget matters more than climate control.',
  },
  {
    q: 'How old are the vehicles in your fleet?',
    a: 'No vehicle in our fleet is older than five years, and luxury vehicles are replaced within three. Every one carries a current fitness certificate, comprehensive insurance and a valid pollution certificate.',
  },
  {
    q: 'Can I see the vehicle before confirming the booking?',
    a: 'Yes. If you are in or near Delhi NCR, come to the yard and inspect the vehicle. For remote bookings we send current photos and the registration number on WhatsApp before you confirm.',
  },
  {
    q: 'Do the rates include fuel and driver charges?',
    a: 'The per-kilometre rate includes fuel and the driver. Toll, parking, state permit and driver night allowance (₹300–₹900 depending on vehicle) are additional and billed at actuals.',
  },
]

export default function Fleet() {
  const [category, setCategory] = useState('all')
  const [seats, setSeats] = useState('any')
  const [sort, setSort] = useState('popular')

  const visible = useMemo(() => {
    let list = fleet.filter((v) => category === 'all' || v.category === category)
    if (seats !== 'any') {
      const [min, max] = seats.split('-').map(Number)
      list = list.filter((v) => v.seats >= min && v.seats <= (max || 99))
    }
    if (sort === 'price-low') list = [...list].sort((a, b) => a.ratePerKm - b.ratePerKm)
    if (sort === 'price-high') list = [...list].sort((a, b) => b.ratePerKm - a.ratePerKm)
    if (sort === 'seats') list = [...list].sort((a, b) => b.seats - a.seats)
    return list
  }, [category, seats, sort])

  /** Category groups in fleet-catalogue order, each tied to its landing page. */
  const grouped = useMemo(
    () =>
      fleetCategories
        .filter((c) => c.id !== 'all')
        .map((c) => {
          const items = fleet.filter((v) => v.category === c.id)
          const type = vehicleTypes.find((t) => items.some((v) => v.parentType === t.slug))
          return { id: c.id, label: c.label, type, items }
        })
        .filter((g) => g.items.length > 0),
    []
  )

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Vehicle fleet available for rent',
    numberOfItems: fleet.length,
    itemListElement: fleet.map((v, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: v.name,
        description: v.summary,
        category: v.category,
        image: `${site.url}${v.image}`,
        url: `${site.url}/fleet/${v.slug}`,
        brand: { '@type': 'Brand', name: site.name },
        offers: {
          '@type': 'Offer',
          price: v.ratePerKm,
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          seller: { '@type': 'Organization', name: site.name },
        },
      },
    })),
  }

  return (
    <>
      <Seo
        title="Our Fleet — Cars, Tempo Travellers, Buses"
        description="15+ vehicles on rent with driver in Delhi NCR — Dzire, Innova Crysta, Fortuner, 12 and 17 seat tempo travellers and 21 to 45 seat buses."
        path="/fleet"
        keywords="car on rent with driver Delhi, innova crysta rental Delhi, tempo traveller 12 seater price Delhi, mini bus hire Delhi NCR, 45 seater volvo bus rental, luxury car rental New Delhi, fortuner on rent"
        schema={[itemListSchema, faqSchema(fleetFaqs)]}
        breadcrumbs={[{ name: 'Our Fleet', path: '/fleet' }]}
      />

      <PageHero
        eyebrow="60+ vehicles ready to roll"
        title="Our Fleet — Cars, Tempo Travellers & Buses on Rent"
        text="Hatchbacks to 45-seat luxury coaches — all with experienced drivers, valid all-India permits and rates that are fixed before you travel."
        crumbs={[{ name: 'Our Fleet', path: '/fleet' }]}
        bg="/images/hero/bg-jaisalmer.jpg"
      />

      <section className="section section--tight">
        <div className="container">
          <div className="filters" role="group" aria-label="Filter vehicles">
            <div className="filters__chips">
              {fleetCategories.map((c) => (
                <button
                  key={c.id}
                  className={`chip${category === c.id ? ' is-active' : ''}`}
                  onClick={() => setCategory(c.id)}
                  aria-pressed={category === c.id}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <div className="filters__selects">
              <label className="field field--inline">
                <span className="field__label">Seats</span>
                <select value={seats} onChange={(e) => setSeats(e.target.value)}>
                  <option value="any">Any</option>
                  <option value="1-4">Up to 4</option>
                  <option value="5-7">5 – 7</option>
                  <option value="8-17">8 – 17</option>
                  <option value="18-32">18 – 32</option>
                  <option value="33-60">33 +</option>
                </select>
              </label>
              <label className="field field--inline">
                <span className="field__label">Sort by</span>
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="popular">Recommended</option>
                  <option value="price-low">Rate: low to high</option>
                  <option value="price-high">Rate: high to low</option>
                  <option value="seats">Capacity: large first</option>
                </select>
              </label>
            </div>
          </div>

          <p className="results">
            Showing <strong>{visible.length}</strong> of {fleet.length} vehicles
          </p>

          {visible.length > 0 ? (
            /* Grouped by category when nothing is filtered, so each group
               heading can link through to its landing page — that is the main
               path a crawler takes from here into the category and vehicle
               pages. Filtered results stay a flat grid, where groups would
               only add noise. */
            category === 'all' && seats === 'any' ? (
              grouped.map(({ id, label, type, items }) => (
                <section className="fleetgroup" key={id}>
                  <header className="fleetgroup__head">
                    <h2 className="fleetgroup__title">{label}</h2>
                    {type && (
                      <Link className="fleetgroup__link" to={`/${type.slug}`}>
                        {type.h1} — rates &amp; routes <Icon name="arrow" size={14} />
                      </Link>
                    )}
                  </header>
                  <div className="grid grid--3">
                    {items.map((v, i) => (
                      <Reveal variant="up" delay={stagger(i, 55)} key={v.slug}>
                        <VehicleCard vehicle={v} />
                      </Reveal>
                    ))}
                  </div>
                </section>
              ))
            ) : (
              <div className="grid grid--3">
                {visible.map((v, i) => (
                  <Reveal variant="up" delay={stagger(i, 55)} key={v.slug}>
                    <VehicleCard vehicle={v} />
                  </Reveal>
                ))}
              </div>
            )
          ) : (
            <p className="empty">
              No vehicle matches that combination. Try widening the filters, or call us on{' '}
              <a href={`tel:${site.phoneRaw}`}>{site.phone}</a> — we may have exactly what you need off-list.
            </p>
          )}

          <p className="photonote">
            <Icon name="camera" size={14} /> Photos show each model, not the individual vehicle. We send
            current photos and the registration number on WhatsApp before you confirm.{' '}
            <Link to="/image-credits">Image credits</Link>
          </p>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <SectionHead
            eyebrow="Rate card"
            title="How Our Pricing Works"
            text="No surge, no peak-hour multiplier. Here is exactly what you pay for."
          />
          <div className="grid grid--3">
            <InfoCard icon="rupee" title="Per-kilometre rate" text="Covers the vehicle, fuel and driver. Distance is measured from your pickup point back to it (garage to garage) on round trips." />
            <InfoCard icon="road" title="Minimum kilometres" text="Outstation bookings carry a 250 km/day minimum (300 km for large coaches). Travel more and you pay only for actual distance." />
            <InfoCard icon="clock" title="Driver night allowance" text="₹300 to ₹900 per night depending on the vehicle, applied when the trip runs past 10 PM or spans multiple days." />
            <InfoCard icon="shield" title="Tolls, parking & permits" text="Billed at actuals with receipts. We never mark these up — you pay what the toll plaza charged." />
            <InfoCard icon="check" title="What's already included" text="Fuel, driver, vehicle maintenance, comprehensive insurance and GST on the base fare. No booking fee." />
            <InfoCard icon="star" title="Long-trip discounts" text="Bookings over five days or above 2,000 km get a reduced per-km rate. Ask us for the slab when you enquire." />
          </div>
        </div>
      </section>

      <Faq items={fleetFaqs} heading="Fleet & Booking Questions" />
      <CtaBand title="Not sure which vehicle fits?" text="Tell us your group size and route — we will recommend the right vehicle and quote a fixed fare." />
    </>
  )
}

function InfoCard({ icon, title, text }) {
  return (
    <article className="wcard">
      <span className="wcard__icon"><Icon name={icon} size={22} /></span>
      <h3 className="wcard__title">{title}</h3>
      <p className="wcard__text">{text}</p>
    </article>
  )
}
