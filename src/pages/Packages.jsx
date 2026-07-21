import { useState } from 'react'
import Seo from '../components/Seo'
import Icon from '../components/Icon'
import Faq, { SectionHead, faqSchema } from '../components/Faq'
import { PageHero, CtaBand } from '../components/Common'
import { site, whatsappLink } from '../data/site'
import { packages } from '../data/packages'

const packageFaqs = [
  {
    q: 'What is included in the tour package price?',
    a: 'The quoted price covers the vehicle, fuel, driver, driver allowance, toll and state permits for the full itinerary. Hotels, meals, monument entry fees and guide charges are not included — we are happy to arrange all of them at cost if you want a fully packaged trip.',
  },
  {
    q: 'Can I customise the itinerary?',
    a: 'Every itinerary here is a starting point. Add a city, drop one, extend a night in Udaipur or start from a different pickup point — tell us what you want and we will rework the route and the quote.',
  },
  {
    q: 'How much advance is needed to confirm a tour package?',
    a: 'A 25% advance confirms the booking and blocks the vehicle for your dates; the balance is payable at the end of the trip. During peak season (October to March) we recommend booking at least three weeks ahead.',
  },
  {
    q: 'Do you arrange hotels along with the vehicle?',
    a: 'Yes. We have long-standing rates with hotels and heritage properties across Rajasthan, from budget to five-star. We pass on the negotiated rate without any markup — you pay the hotel what we pay.',
  },
  {
    q: 'What is the best time to visit Rajasthan?',
    a: 'October to March is ideal — days are pleasant and evenings cool, which makes desert camping enjoyable. April to June gets very hot (40°C+), though rates drop significantly and forts stay comfortable in the early morning.',
  },
]

export default function Packages() {
  const [openSlug, setOpenSlug] = useState(packages[0].slug)

  const tourSchema = packages.map((p) => ({
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: p.title,
    description: p.summary,
    touristType: 'Leisure',
    provider: { '@type': 'TravelAgency', name: site.name, url: site.url },
    itinerary: {
      '@type': 'ItemList',
      numberOfItems: p.itinerary.length,
      itemListElement: p.itinerary.map((d, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: { '@type': 'TouristAttraction', name: d.title, description: d.detail },
      })),
    },
    offers: {
      '@type': 'Offer',
      price: p.price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
  }))

  return (
    <>
      <Seo
        title="Rajasthan Tour Packages — Golden Triangle, Desert Circuit & Heritage Trails"
        description="Customisable Rajasthan tour packages with car and driver: Golden Triangle (Delhi–Agra–Jaipur), 10-day Royal Rajasthan, Shekhawati haveli trail, Khatu Shyam & Salasar darshan and the Thar desert circuit. Fixed pricing, flexible itineraries."
        path="/tour-packages"
        keywords="Rajasthan tour package, golden triangle tour, Jaisalmer desert tour, Shekhawati haveli tour, Khatu Shyam Salasar package, Jaipur sightseeing package, Rajasthan tour with car and driver"
        schema={[...tourSchema, faqSchema(packageFaqs)]}
        breadcrumbs={[{ name: 'Tour Packages', path: '/tour-packages' }]}
      />

      <PageHero
        eyebrow="Itineraries we drive every week"
        title="Rajasthan Tour Packages"
        text="Routes refined over thirteen years on these roads — paced so you spend your time at the forts, not stuck in the car. Every package is fully customisable."
        crumbs={[{ name: 'Tour Packages', path: '/tour-packages' }]}
      />

      <section className="section">
        <div className="container">
          <div className="pkglist">
            {packages.map((p) => (
              <article className={`pkg${openSlug === p.slug ? ' is-open' : ''}`} key={p.slug}>
                <div className="pkg__head">
                  <div className="pkg__headmain">
                    <div className="pkg__meta">
                      {p.tag && <span className="pcard__tag">{p.tag}</span>}
                      <span className="pkg__chip"><Icon name="clock" size={14} /> {p.duration}</span>
                      <span className="pkg__chip"><Icon name="pin" size={14} /> From {p.from}</span>
                    </div>
                    <h2 className="pkg__title">{p.title}</h2>
                    <p className="pkg__summary">{p.summary}</p>
                    <ul className="pkg__highlights">
                      {p.highlights.map((h) => (
                        <li key={h}><Icon name="check" size={14} /> {h}</li>
                      ))}
                    </ul>
                  </div>

                  <aside className="pkg__side">
                    <span className="pkg__price">
                      <small>Starting from</small>
                      <strong>₹{p.price.toLocaleString('en-IN')}</strong>
                      <small>{p.priceNote}</small>
                    </span>
                    <a
                      className="btn btn--primary btn--block"
                      href={whatsappLink(`Hi, I am interested in the "${p.title}" (${p.duration}) package. Please share the full quote.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon name="whatsapp" size={16} /> Enquire on WhatsApp
                    </a>
                    <a className="btn btn--outline btn--block" href={`tel:${site.phoneRaw}`}>
                      <Icon name="phone" size={16} /> Call to customise
                    </a>
                    <button
                      className="pkg__toggle"
                      onClick={() => setOpenSlug(openSlug === p.slug ? '' : p.slug)}
                      aria-expanded={openSlug === p.slug}
                      aria-controls={`itin-${p.slug}`}
                    >
                      {openSlug === p.slug ? 'Hide' : 'View'} day-by-day itinerary
                      <Icon name="chevron" size={16} className="pkg__chev" />
                    </button>
                  </aside>
                </div>

                <div className="pkg__itin" id={`itin-${p.slug}`} hidden={openSlug !== p.slug}>
                  <h3 className="pkg__itintitle">Day-by-day itinerary</h3>
                  <ol className="timeline">
                    {p.itinerary.map((d) => (
                      <li className="timeline__item" key={d.day}>
                        <span className="timeline__day">Day {d.day}</span>
                        <div>
                          <h4 className="timeline__title">{d.title}</h4>
                          <p className="timeline__text">{d.detail}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <p className="pkg__note">
                    <Icon name="check" size={14} /> Vehicle, fuel, driver, tolls and permits included ·
                    hotels and entry fees arranged on request at cost price.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container container--narrow prose">
          <h2>Planning a Rajasthan Trip? Here Is What We Have Learned</h2>
          <p>
            The single most common mistake we see is trying to fit too much into too few days.
            Rajasthan's cities are genuinely far apart — Jaisalmer to Udaipur is close to nine hours
            on the road. Our itineraries cap most driving days at five hours so you arrive with
            enough of the afternoon left to actually see the place.
          </p>
          <h3>Best season</h3>
          <p>
            <strong>October to March</strong> is the sweet spot: comfortable days, cool desert nights
            and every fort pleasant to walk. December and January get genuinely cold after dark in
            Jaisalmer and Bikaner, so carry layers for desert camp nights.
            <strong> July to September</strong> brings occasional rain and a green Aravalli landscape
            that few visitors ever see. <strong>April to June</strong> is hot but significantly cheaper.
          </p>
          <h3>How many days do you need?</h3>
          <p>
            Five days covers the Golden Triangle comfortably. Seven to eight gets you Jaipur, Jodhpur
            and Udaipur without rushing. Ten days is the honest minimum if Jaisalmer and the desert
            camp are on your list — and that is the itinerary we recommend most often.
          </p>
          <h3>Booking with your own vehicle beats train-and-taxi</h3>
          <p>
            With a car and driver for the full circuit you stop where you want — a stepwell here, a
            roadside dhaba there — carry luggage without repacking, and avoid negotiating a fresh
            fare in every new city. On multi-city Rajasthan trips it usually works out cheaper too.
          </p>
        </div>
      </section>

      <Faq items={packageFaqs} heading="Tour Package Questions" />
      <CtaBand title="Want a custom itinerary?" text="Tell us your dates, budget and must-see places. We will build a route around them and quote a fixed price." />
    </>
  )
}
