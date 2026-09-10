import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Icon from '../components/Icon'
import BookingForm from '../components/BookingForm'
import VehicleCard from '../components/VehicleCard'
import Testimonials, { reviewSchema } from '../components/Testimonials'
import Faq, { SectionHead, faqSchema } from '../components/Faq'
import { CtaBand, Stats, TrustBar, AreaMarquee, GoogleBadge } from '../components/Common'
import { Reveal, stagger, useSpotlight } from '../components/Motion'
import { site, whatsappLink, yearsActive, shortAddress } from '../data/site'
import { fleet } from '../data/fleet'
import { services } from '../data/services'
import { packages } from '../data/packages'
import { vehicleTypes } from '../data/vehicleTypes'
import { faqs, whyUs } from '../data/content'

const featured = [
  'maruti-suzuki-swift-dzire',
  'toyota-innova-crysta',
  'force-tempo-traveller-12',
  'mini-bus-21-seater',
  'toyota-fortuner',
  'volvo-luxury-coach-45',
]

const howItWorks = [
  { title: 'Tell us the trip', text: 'Route, dates, how many people. One WhatsApp message is enough — no forms, no account, no app to install.' },
  { title: 'Get a fixed quote', text: 'We recommend the right vehicle and send an all-inclusive rate in writing, usually inside fifteen minutes.' },
  { title: 'Confirm when ready', text: 'No advance needed on most routes. Cancel free up to 24 hours before departure, no questions asked.' },
  { title: 'Driver reaches early', text: 'You get the driver’s name, number and vehicle registration the night before. He arrives ahead of time.' },
]

export default function Home() {
  const spotlightRef = useSpotlight()
  const featuredVehicles = featured.map((s) => fleet.find((v) => v.slug === s)).filter(Boolean)

  return (
    <>
      <Seo
        title="Taxi Service in New Delhi — Car, Tempo Traveller & Bus Hire"
        description="Taxi service in Rangpuri, New Delhi, 3 km from IGI Airport. Cars, 7 seater SUVs, tempo travellers and mini buses on rent with driver. Open 24×7."
        path="/"
        keywords="taxi service New Delhi, car rental Rangpuri, cab service Mahipalpur, tempo traveller on rent Delhi, mini bus hire Delhi NCR, 7 seater SUV on rent, IGI airport taxi Delhi, outstation cab booking Delhi, wedding car rental Delhi, Shekhawat Tours and Travels"
        schema={[faqSchema(faqs), reviewSchema].filter(Boolean)}
      />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero__bg" aria-hidden="true" />
        {/* Three slow-drifting light pools. They read as warmth and movement
            without ever demanding attention — the whole point is that a
            visitor feels the page is alive without noticing why. */}
        <div className="hero__orbs" aria-hidden="true">
          <span className="hero__orb hero__orb--1" />
          <span className="hero__orb hero__orb--2" />
          <span className="hero__orb hero__orb--3" />
        </div>
        <div className="hero__sweep" aria-hidden="true" />

        <div className="container hero__inner">
          <div className="hero__copy hero__stage">
            <p className="hero__eyebrow">
              <Icon name="star" size={14} /> {site.rating.value}/5 from {site.rating.count} Google
              reviews · Serving Delhi since {site.founded}
            </p>

            <h1 className="hero__title">
              Taxi, Tempo Traveller &amp; Bus Hire{' '}<br />
              <span className="hero__accent">in New Delhi &amp; Across India</span>
            </h1>

            <p className="hero__text">
              From a Dzire for the 4 AM airport run to a 45-seat coach for the whole wedding
              party — well-kept vehicles, experienced local drivers and a fixed price agreed
              before you leave. Our office is in Rangpuri, three kilometres from IGI Terminal 3.
            </p>

            <ul className="hero__points">
              <li><Icon name="check" size={16} /> Fixed fare quoted in writing</li>
              <li><Icon name="check" size={16} /> Police-verified drivers</li>
              <li><Icon name="check" size={16} /> All-India tourist permits</li>
              <li><Icon name="check" size={16} /> Free cancellation up to 24 hrs</li>
            </ul>

            <div className="hero__actions">
              <a
                className="btn btn--primary btn--lg"
                href={whatsappLink('Hi, I would like a quote for a trip.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="whatsapp" size={18} /> Get a Free Quote
              </a>
              <a className="btn btn--outline-light btn--lg" href={`tel:${site.phoneRaw}`}>
                <Icon name="phone" size={18} /> {site.phone}
              </a>
            </div>

            <Stats />
          </div>

          <div className="hero__form">
            <BookingForm compact />
          </div>
        </div>

        <div className="hero__road" aria-hidden="true" />
      </section>

      <TrustBar />

      {/* ── The four vehicle categories ──────────────────────
          These are the pages people actually search for, so they get the
          first section on the page rather than being buried in the fleet. */}
      <section className="section" ref={spotlightRef}>
        <div className="container">
          <SectionHead
            eyebrow="Choose your vehicle"
            title="Cars, SUVs, Tempo Travellers & Mini Buses on Rent"
            text="Pick by group size. Every category has its own page with real rates, the exact models we run and the routes people take them on."
          />
          <div className="vt-cross">
            {vehicleTypes.map((type, i) => (
              <Reveal variant="up" delay={stagger(i)} key={type.slug}>
                <Link className="vt-crosslink" to={`/${type.slug}`}>
                  <span className="vt-crosslink__icon"><Icon name={type.icon} size={22} /></span>
                  <strong>{type.h1.replace(' in Delhi', '')}</strong>
                  <span>{type.seats}</span>
                  <em>From ₹{type.fromRatePerKm}/km →</em>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────── */}
      <section className="section section--tint">
        <div className="container">
          <SectionHead
            eyebrow="What we do"
            title="Travel Services for Every Occasion"
            text="One operator for the airport pickup, the family holiday, the office shuttle and the wedding baraat."
          />
          <div className="grid grid--4">
            {services.slice(0, 8).map((s, i) => (
              <Reveal as="article" className="scard" variant="up" delay={stagger(i, 60)} key={s.slug}>
                <span className="scard__icon"><Icon name={s.icon} size={24} /></span>
                <h3 className="scard__title">{s.title}</h3>
                <p className="scard__text">{s.short}</p>
                <Link className="scard__link" to="/services">
                  Learn more <Icon name="arrow" size={14} />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Booking in four steps"
            title="How Booking Actually Works"
            text="No app, no account, no deposit held on your card. Just a conversation and a vehicle that turns up."
          />
          <div className="howto">
            {howItWorks.map((step, i) => (
              <Reveal className="howto__step" variant="up" delay={stagger(i, 110)} key={step.title}>
                <span className="howto__num">{i + 1}</span>
                <h3 className="howto__title">{step.title}</h3>
                <p className="howto__text">{step.text}</p>
              </Reveal>
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
            {featuredVehicles.map((v, i) => (
              <Reveal variant="up" delay={stagger(i)} key={v.slug}>
                <VehicleCard vehicle={v} />
              </Reveal>
            ))}
          </div>
          <Reveal className="section__more" variant="up">
            <Link className="btn btn--primary btn--lg" to="/fleet">
              See all {fleet.length} vehicles <Icon name="arrow" size={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Why us ───────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Why Shekhawat"
            title="Why Travellers Keep Coming Back"
            text={`${yearsActive} years on these roads. Most of our bookings now come from repeat customers and their referrals.`}
          />
          <div className="grid grid--3">
            {whyUs.map((w, i) => (
              <Reveal as="article" className="wcard" variant="up" delay={stagger(i, 70)} key={w.title}>
                <span className="wcard__icon"><Icon name={w.icon} size={22} /></span>
                <h3 className="wcard__title">{w.title}</h3>
                <p className="wcard__text">{w.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Packages ─────────────────────────────────────────── */}
      <section className="section section--tint">
        <div className="container">
          <SectionHead
            eyebrow="Tour packages"
            title="Popular Tour Packages from Delhi"
            text="Ready-made itineraries built from years of driving these routes — and happily customised to your dates."
          />
          <div className="grid grid--3">
            {packages.slice(0, 3).map((p, i) => (
              <Reveal variant="up" delay={stagger(i)} key={p.slug}>
                <PackageCard pkg={p} />
              </Reveal>
            ))}
          </div>
          <Reveal className="section__more" variant="up">
            <Link className="btn btn--outline btn--lg" to="/tour-packages">
              Browse all packages <Icon name="arrow" size={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      <Testimonials />

      <AreaMarquee />

      {/* ── Local SEO copy ───────────────────────────────────── */}
      <section className="section">
        <div className="container container--narrow prose">
          <Reveal variant="up">
            <h2>Taxi Service in New Delhi — Rangpuri, Mahipalpur &amp; IGI Airport</h2>
            <p>
              {site.name} has been moving travellers out of Delhi since {site.founded}. Our office
              is at <strong>{shortAddress}</strong> — a few minutes from Mahipalpur and roughly
              three kilometres from <strong>Indira Gandhi International Airport Terminal 3</strong>.
              That location is the whole reason we can put a car at an arrival gate at 3 AM without
              charging a premium for it: the vehicle was already nearby.
            </p>
            <p>
              The fleet runs from hatchbacks and sedans for city work, through Innovas, Ertigas and
              Scorpios for family highway trips, to <Link to="/tempo-traveller-on-rent">tempo travellers</Link>{' '}
              for groups and <Link to="/mini-bus-on-rent">mini buses and Volvo coaches</Link> for
              weddings and corporate movement. Whichever you book, the rate is agreed before
              departure and the final bill matches it.
            </p>

            <h3>Where we run</h3>
            <p>
              We cover all of <strong>Delhi NCR — Gurugram, Noida, Ghaziabad, Faridabad, Dwarka and
              Vasant Kunj</strong> — and take outstation bookings across India. The routes we drive
              most are <strong>Delhi to Agra, Jaipur, Haridwar, Rishikesh, Mathura, Vrindavan,
              Chandigarh, Amritsar, Shimla, Manali and Nainital</strong>, along with the Shekhawati
              belt of Sikar and Jhunjhunu and the full Rajasthan circuit through Jodhpur, Udaipur,
              Jaisalmer, Bikaner, Pushkar and Ajmer.
            </p>

            <h3>Why book a cab with us instead of an app</h3>
            <p>
              Ride-hailing apps price by demand; we price by distance. You get the same driver for
              the whole trip, a vehicle you can inspect before you commit, and a phone number that a
              person actually answers at four in the morning. Toll, parking and state permit charges
              appear as separate line items at actuals — never rolled into a vague “surcharge”, and
              never multiplied because it happens to be raining.
            </p>

            <h3>Booking is straightforward</h3>
            <p>
              Call <strong>{site.owner.name}</strong> on{' '}
              <a href={`tel:${site.phoneRaw}`}>{site.phone}</a>, message us on WhatsApp, or fill in
              the enquiry form. Share your route, dates and how many people are travelling; we
              recommend the right vehicle and send a written quote. No advance is needed to hold a
              booking on most routes, and cancellation is free up to 24 hours before departure.
            </p>
          </Reveal>

          <Reveal className="section__more" variant="up" delay={120}>
            <GoogleBadge />
          </Reveal>
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
      <Link className="pcard__media" to={`/tour-packages/${p.slug}`} tabIndex={-1} aria-hidden="true">
        <img
          src={p.image}
          alt={`${p.shortTitle} — ${p.duration} tour package from ${p.from}`}
          loading="lazy"
          width="800"
          height="500"
        />
      </Link>
      <div className="pcard__top">
        {p.tag && <span className="pcard__tag">{p.tag}</span>}
        <span className="pcard__duration"><Icon name="clock" size={14} /> {p.duration}</span>
      </div>
      <h3 className="pcard__title">
        <Link to={`/tour-packages/${p.slug}`}>{p.title}</Link>
      </h3>
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
        <Link className="btn btn--primary btn--sm" to={`/tour-packages/${p.slug}`}>
          Details <Icon name="arrow" size={14} />
        </Link>
      </div>
    </article>
  )
}
