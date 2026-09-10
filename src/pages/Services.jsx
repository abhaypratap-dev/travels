import Seo from '../components/Seo'
import Icon from '../components/Icon'
import Faq, { SectionHead, faqSchema } from '../components/Faq'
import { PageHero, CtaBand } from '../components/Common'
import { Reveal, stagger } from '../components/Motion'
import { site, whatsappLink } from '../data/site'
import { services } from '../data/services'

const serviceFaqs = [
  {
    q: 'Do you offer one-way drop taxi at lower rates?',
    a: 'Yes, on routes where we have return loads — Delhi–Jaipur, Delhi–Agra, Delhi–Chandigarh, Jodhpur–Udaipur and several others. On these you pay only for the one-way distance instead of both legs, which typically saves 35–40%.',
  },
  {
    q: 'How early should I book an airport transfer?',
    a: 'Twelve hours is comfortable and lets us assign a driver who knows your terminal. That said, we run 24×7 and can usually arrange a car within 45 minutes anywhere in Delhi NCR for a last-minute flight.',
  },
  {
    q: 'What does a corporate rate contract include?',
    a: 'A fixed monthly rate per vehicle, a named account manager, consolidated GST invoicing with duty slips, and priority allocation during peak season. Most contracts cover employee shuttles plus executive cars on call.',
  },
  {
    q: 'Can you handle transport for a full wedding?',
    a: 'Regularly. A typical wedding booking is two to three mini buses for guest movement, a decorated luxury car for the couple and a few sedans for family. One coordinator from our side stays reachable through the entire function.',
  },
  {
    q: 'Do you provide vehicles outside Rajasthan?',
    a: 'Yes. All our vehicles carry all-India tourist permits, so we run trips to Delhi NCR, Uttar Pradesh, Haryana, Punjab, Gujarat, Madhya Pradesh and Uttarakhand. Interstate permit charges are billed at actuals.',
  },
]

export default function Services() {
  const serviceSchema = services.map((s) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.title,
    description: s.body,
    serviceType: s.title,
    provider: { '@type': 'TravelAgency', name: site.name, url: site.url, telephone: site.phoneRaw },
    areaServed: site.serviceAreas.map((a) => ({ '@type': 'City', name: a })),
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${site.url}/services`,
      servicePhone: site.phoneRaw,
    },
  }))

  return (
    <>
      <Seo
        title="Services — Outstation, Airport & Wedding"
        description="Outstation taxi, IGI airport transfers, wedding car and baraat bus hire, corporate contracts and pilgrimage yatras from New Delhi. Fixed fares, 24×7."
        path="/services"
        keywords="outstation taxi service Delhi, IGI airport transfer, wedding car rental Delhi NCR, corporate car rental New Delhi, bus hire for marriage Delhi, pilgrimage tour operator, monthly car rental with driver"
        schema={[...serviceSchema, faqSchema(serviceFaqs)]}
        breadcrumbs={[{ name: 'Services', path: '/services' }]}
      />

      <PageHero
        eyebrow="Eight ways we can help"
        title="Our Travel Services in Delhi NCR"
        text="One operator for the 4 AM airport run, the ten-day family tour, the monthly office shuttle and the wedding baraat — with the same fixed-price promise on all of them."
        crumbs={[{ name: 'Services', path: '/services' }]}
      />

      <section className="section">
        <div className="container">
          <div className="srvlist">
            {services.map((s, i) => (
              <Reveal
                as="article"
                className={`srv${i % 2 ? ' srv--rev' : ''}`}
                variant={i % 2 ? 'right' : 'left'}
                key={s.slug}
                id={s.slug}
              >
                <div className="srv__visual" aria-hidden="true">
                  <Icon name={s.icon} size={72} />
                </div>
                <div className="srv__body">
                  <h2 className="srv__title">{s.title}</h2>
                  <p className="srv__text">{s.body}</p>
                  <ul className="srv__points">
                    {s.points.map((p) => (
                      <li key={p}><Icon name="check" size={16} /> {p}</li>
                    ))}
                  </ul>
                  <div className="srv__actions">
                    <a
                      className="btn btn--primary btn--sm"
                      href={whatsappLink(`Hi, I would like to know more about your ${s.title}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon name="whatsapp" size={16} /> Enquire
                    </a>
                    <a className="btn btn--ghost btn--sm" href={`tel:${site.phoneRaw}`}>
                      <Icon name="phone" size={16} /> {site.phone}
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <SectionHead
            eyebrow="How it works"
            title="Booking Takes About Five Minutes"
            text="No app to install, no account to create, no advance payment to get a quote."
          />
          <ol className="steps">
            <Step n="1" title="Tell us your trip" text="Call, WhatsApp or fill the form with your route, dates and passenger count." />
            <Step n="2" title="Get a fixed quote" text="We recommend the right vehicle and send a written, all-inclusive fare — usually within 15 minutes." />
            <Step n="3" title="Confirm the booking" text="Say yes and we block the vehicle. Most routes need no advance; tour packages take 25%." />
            <Step n="4" title="Driver details before travel" text="You get the driver's name, phone number and vehicle registration the evening before your trip." />
          </ol>
        </div>
      </section>

      <Faq items={serviceFaqs} heading="Service Questions" />
      <CtaBand />
    </>
  )
}

function Step({ n, title, text }) {
  return (
    <li className="steps__item">
      <span className="steps__num">{n}</span>
      <h3 className="steps__title">{title}</h3>
      <p className="steps__text">{text}</p>
    </li>
  )
}
