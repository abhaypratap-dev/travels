import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Icon from '../components/Icon'
import BookingForm from '../components/BookingForm'
import VehicleCard from '../components/VehicleCard'
import Testimonials, { reviewSchema } from '../components/Testimonials'
import Faq, { SectionHead, faqSchema } from '../components/Faq'
import { CtaBand, Stats } from '../components/Common'
import { site, whatsappLink } from '../data/site'
import { fleet } from '../data/fleet'
import { services } from '../data/services'
import { packages } from '../data/packages'
import { faqs, whyUs } from '../data/content'

const featured = ['toyota-innova-crysta', 'force-tempo-traveller-12', 'mini-bus-21-seater', 'maruti-suzuki-swift-dzire', 'toyota-fortuner', 'volvo-luxury-coach-45']

export default function Home() {
  const featuredVehicles = featured.map((s) => fleet.find((v) => v.slug === s)).filter(Boolean)

  return (
    <>
      <Seo
        title={`${site.name} — Car Rental & Bus Hire in Rajasthan | Taxi Service`}
        description="Book cars, tempo travellers, mini buses and luxury coaches on rent with experienced drivers in Delhi NCR. Outstation taxi, IGI airport transfer, wedding car hire and Rajasthan tour packages at fixed, transparent rates. Available 24×7."
        path="/"
        keywords="car rental New Delhi, taxi service Rangpuri, tempo traveller on rent Delhi, mini bus hire Delhi NCR, luxury bus rental, outstation cab booking Delhi, Rajasthan tour packages, wedding car rental, IGI airport taxi, Shekhawat Tours and Travels"
        schema={[faqSchema(faqs), reviewSchema]}
      />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero__bg" aria-hidden="true" />
        <div className="container hero__inner">
          <div className="hero__copy">
            <p className="hero__eyebrow">
              <Icon name="star" size={14} /> {site.rating.value}/5 · {site.rating.count} reviews · Since {site.founded}
            </p>
            <h1 className="hero__title">
              Car Rental &amp; Bus Hire<br />
              <span className="hero__accent">Across Rajasthan &amp; All India</span>
            </h1>
            <p className="hero__text">
              From a Dzire for the airport run to a 45-seat Volvo coach for the whole wedding party —
              60+ well-kept vehicles, experienced local drivers and a fixed price agreed before you
              leave. No hidden charges, no surge pricing, available 24×7.
            </p>

            <ul className="hero__points">
              <li><Icon name="check" size={16} /> Fixed fare quoted in writing</li>
              <li><Icon name="check" size={16} /> Police-verified drivers</li>
              <li><Icon name="check" size={16} /> All-India tourist permits</li>
              <li><Icon name="check" size={16} /> Free cancellation up to 24 hrs</li>
            </ul>

            <div className="hero__actions">
              <a className="btn btn--primary btn--lg" href={whatsappLink('Hi, I would like a quote for a trip.')} target="_blank" rel="noopener noreferrer">
                <Icon name="whatsapp" size={18} /> Get a Free Quote
              </a>
              <Link className="btn btn--outline btn--lg" to="/fleet">
                View Our Fleet <Icon name="arrow" size={18} />
              </Link>
            </div>

            <Stats />
          </div>

          <div className="hero__form">
            <BookingForm compact />
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="What we do"
            title="Travel Services for Every Occasion"
            text="One operator for the airport pickup, the family holiday, the office shuttle and the wedding baraat."
          />
          <div className="grid grid--4">
            {services.slice(0, 8).map((s) => (
              <article className="scard" key={s.slug}>
                <span className="scard__icon"><Icon name={s.icon} size={24} /></span>
                <h3 className="scard__title">{s.title}</h3>
                <p className="scard__text">{s.short}</p>
                <Link className="scard__link" to="/services">
                  Learn more <Icon name="arrow" size={14} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fleet ────────────────────────────────────────────── */}
      <section className="section section--tint">
        <div className="container">
          <SectionHead
            eyebrow="Our fleet"
            title="Cars, Tempo Travellers, Mini Buses & Luxury Coaches"
            text="Every vehicle is serviced on schedule, cleaned before handover and covered by comprehensive insurance."
          />
          <div className="grid grid--3">
            {featuredVehicles.map((v) => <VehicleCard vehicle={v} key={v.slug} />)}
          </div>
          <div className="section__more">
            <Link className="btn btn--primary btn--lg" to="/fleet">
              See all {fleet.length}+ vehicles <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why us ───────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Why Shekhawat"
            title="Why Travellers Keep Coming Back"
            text="Thirteen years on these roads. Most of our bookings now come from repeat customers and their referrals."
          />
          <div className="grid grid--3">
            {whyUs.map((w) => (
              <article className="wcard" key={w.title}>
                <span className="wcard__icon"><Icon name={w.icon} size={22} /></span>
                <h3 className="wcard__title">{w.title}</h3>
                <p className="wcard__text">{w.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Packages ─────────────────────────────────────────── */}
      <section className="section section--tint">
        <div className="container">
          <SectionHead
            eyebrow="Tour packages"
            title="Popular Rajasthan Tour Packages"
            text="Ready-made itineraries built from years of driving these routes — and happily customised to your dates."
          />
          <div className="grid grid--3">
            {packages.slice(0, 3).map((p) => <PackageCard pkg={p} key={p.slug} />)}
          </div>
          <div className="section__more">
            <Link className="btn btn--outline btn--lg" to="/tour-packages">
              Browse all packages <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* ── Local SEO copy ───────────────────────────────────── */}
      <section className="section">
        <div className="container container--narrow prose">
          <h2>Trusted Taxi &amp; Bus Service in Delhi NCR and Across Rajasthan</h2>
          <p>
            {site.name} has been moving travellers since {site.founded}. What began with two cars on
            the Delhi–Jaipur highway is today a fleet of more than sixty vehicles — hatchbacks and
            sedans for city work, Innovas and Scorpios for family highway trips, tempo travellers for
            groups, and mini buses and Volvo coaches for weddings and corporate movement. Our office
            is in <strong>Rangpuri, New Delhi</strong>, minutes from IGI Airport.
          </p>
          <p>
            We cover all of <strong>Delhi NCR — Gurugram, Noida, Ghaziabad and Faridabad</strong> —
            along with <strong>Jaipur, Jodhpur, Udaipur, Jaisalmer, Bikaner, Pushkar and Ajmer</strong>,
            the Shekhawati belt of Sikar and Jhunjhunu, and hill routes to Shimla, Manali and
            Rishikesh. Whether it is a one-way drop, an eight-hour local package or a ten-day desert
            circuit, the rate is agreed before departure and the final bill matches it.
          </p>
          <h3>Why book a cab with us instead of an app</h3>
          <p>
            Ride-hailing apps price by demand; we price by distance. You get the same driver for the
            whole trip, a vehicle you can inspect before you commit, and a phone number that a person
            actually answers at 4 AM. Toll, parking and state permit charges appear as separate line
            items at actuals — never rolled into a vague "surcharge".
          </p>
          <h3>Booking is straightforward</h3>
          <p>
            Call {site.owner.name} on {site.phone}, message us on WhatsApp or fill in the enquiry form. Share your route,
            dates and how many people are travelling; we recommend the right vehicle and send a written
            quote. No advance is needed to hold a booking on most routes, and cancellation is free up
            to 24 hours before departure.
          </p>
        </div>
      </section>

      <Faq items={faqs} />
      <CtaBand />
    </>
  )
}

export function PackageCard({ pkg: p }) {
  return (
    <article className="pcard">
      <div className="pcard__top">
        {p.tag && <span className="pcard__tag">{p.tag}</span>}
        <span className="pcard__duration"><Icon name="clock" size={14} /> {p.duration}</span>
      </div>
      <h3 className="pcard__title">{p.title}</h3>
      <p className="pcard__summary">{p.summary}</p>
      <ul className="pcard__highlights">
        {p.highlights.slice(0, 4).map((h) => (
          <li key={h}><Icon name="check" size={14} /> {h}</li>
        ))}
      </ul>
      <div className="pcard__foot">
        <span className="pcard__price">
          <small>Starting</small>
          <strong>₹{p.price.toLocaleString('en-IN')}</strong>
          <small>{p.priceNote}</small>
        </span>
        <a
          className="btn btn--primary btn--sm"
          href={whatsappLink(`Hi, I am interested in the "${p.title}" (${p.duration}) package. Please share details.`)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Enquire <Icon name="arrow" size={14} />
        </a>
      </div>
    </article>
  )
}
