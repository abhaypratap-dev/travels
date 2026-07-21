import Seo from '../components/Seo'
import Icon from '../components/Icon'
import BookingForm from '../components/BookingForm'
import Faq, { faqSchema } from '../components/Faq'
import { PageHero } from '../components/Common'
import { site, whatsappLink, fullAddress } from '../data/site'

const contactFaqs = [
  {
    q: 'What are your office hours?',
    a: 'The booking desk is staffed 24 hours a day, every day of the year including festivals. Our Rangpuri office in New Delhi is open for walk-ins from 7 AM to 10 PM.',
  },
  {
    q: 'How quickly will I get a reply to my enquiry?',
    a: 'WhatsApp and phone enquiries are typically answered within 15 minutes. Email enquiries are answered within two hours during the day.',
  },
  {
    q: 'Can I book by WhatsApp without calling?',
    a: 'Absolutely — most of our bookings now come through WhatsApp. Send your route, dates and passenger count and we will reply with a quote and vehicle options.',
  },
]

export default function Contact() {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `Contact ${site.name}`,
    description: `Contact details, office address and booking enquiry form for ${site.name}, ${site.address.locality}, Rajasthan.`,
    mainEntity: {
      '@type': 'TravelAgency',
      name: site.name,
      telephone: site.phoneRaw,
      email: site.email,
      contactPoint: {
        '@type': 'ContactPoint',
        name: site.owner.name,
        contactType: site.owner.role,
        telephone: site.owner.phoneRaw,
        email: site.owner.email,
        availableLanguage: ['en', 'hi'],
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.address.street,
        addressLocality: site.address.locality,
        addressRegion: site.address.region,
        postalCode: site.address.postalCode,
        addressCountry: site.address.country,
      },
    },
  }

  return (
    <>
      <Seo
        title="Contact Us — Book a Car or Bus 24×7"
        description={`Call ${site.owner.name} on ${site.phone} or WhatsApp us to book a car, tempo traveller or bus. Office at ${fullAddress}. Booking desk open 24×7, all days including holidays.`}
        path="/contact"
        keywords="contact Shekhawat Tours and Travels, taxi booking number Delhi, car rental Rangpuri New Delhi, bus hire enquiry Delhi NCR, Rupesh Singh Shekhawat"
        schema={[contactSchema, faqSchema(contactFaqs)]}
        breadcrumbs={[{ name: 'Contact', path: '/contact' }]}
      />

      <PageHero
        eyebrow="We pick up, day or night"
        title="Contact Us"
        text="Call, WhatsApp, email or drop by the office. However you reach us, you get a fixed quote — not a callback promise."
        crumbs={[{ name: 'Contact', path: '/contact' }]}
      />

      <section className="section">
        <div className="container">
          <div className="grid grid--4 contact__cards">
            <ContactCard
              icon="user" title={site.owner.role}
              lines={[site.owner.name, site.owner.phone]}
              href={`tel:${site.owner.phoneRaw}`}
              cta="Call directly"
            />
            <ContactCard
              icon="whatsapp" title="WhatsApp"
              lines={[site.phone, 'Fastest way to reach us']}
              href={whatsappLink()}
              cta="Open chat" external
            />
            <ContactCard
              icon="mail" title="Email"
              lines={[site.email, site.altEmail]}
              href={`mailto:${site.email}`}
              cta="Send email"
            />
            <ContactCard
              icon="pin" title="Visit the Office"
              lines={[site.address.street, `${site.address.locality}, ${site.address.region} ${site.address.postalCode}`]}
              href={site.mapLink}
              cta="Get directions" external
            />
          </div>

          <div className="contact__main">
            <div className="contact__form">
              <BookingForm title="Send Us a Booking Enquiry" />
            </div>

            <aside className="contact__aside">
              <div className="aboutside__card">
                <h3>Office &amp; Support</h3>
                <ul className="deflist">
                  <li><span>Contact person</span><strong>{site.owner.name}</strong></li>
                  <li><span>Booking desk</span><strong>24×7, all days</strong></li>
                  <li><span>Walk-in hours</span><strong>7:00 AM – 10:00 PM</strong></li>
                  <li><span>Languages</span><strong>Hindi, English</strong></li>
                  <li><span>Payment</span><strong>Cash, UPI, Card, NEFT</strong></li>
                  <li><span>GSTIN</span><strong>{site.gstin}</strong></li>
                </ul>
              </div>

              <div className="aboutside__card">
                <h3>Emergency &amp; On-Trip Support</h3>
                <p className="muted">
                  Already travelling with us and something needs attention? Call the main number and
                  say it is an on-trip issue — those calls jump the queue and reach a manager directly.
                </p>
                <a className="btn btn--primary btn--block" href={`tel:${site.phoneRaw}`}>
                  <Icon name="phone" size={16} /> {site.phone}
                </a>
              </div>

              <div className="aboutside__card">
                <h3>Follow Us</h3>
                <div className="footer__social footer__social--dark">
                  <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">FB</a>
                  <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</a>
                  <a href={site.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">YT</a>
                  <a href={site.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="X">X</a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section section--flush">
        <h2 className="sr-only">Our location on the map</h2>
        <div className="mapwrap">
          <iframe
            title={`${site.name} office location on Google Maps`}
            src={site.mapEmbed}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <Faq items={contactFaqs} heading="Contact Questions" intro="Quick answers before you call." />
    </>
  )
}

function ContactCard({ icon, title, lines, href, cta, external }) {
  return (
    <a
      className="ccard"
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span className="ccard__icon"><Icon name={icon} size={22} /></span>
      <h3 className="ccard__title">{title}</h3>
      {lines.map((l) => <p className="ccard__line" key={l}>{l}</p>)}
      <span className="ccard__cta">{cta} <Icon name="arrow" size={14} /></span>
    </a>
  )
}
