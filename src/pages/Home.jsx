import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Icon from '../components/Icon'
import QuoteWidget from '../components/QuoteWidget'
import VehicleCard from '../components/VehicleCard'
import PackageCard from '../components/PackageCard'
import { ReviewCarousel, reviewSchema } from '../components/Testimonials'
import { SectionHead } from '../components/Faq'
import { CtaBand, StatBar, GoogleBadge, Stars } from '../components/Common'
import { Reveal, stagger } from '../components/Motion'
import { site, yearsActive, shortAddress } from '../data/site'
import { fleet } from '../data/fleet'
import { packages } from '../data/packages'
import { faqs } from '../data/content'
import { responsive } from '../data/photos'

/** The homepage fleet strip, smallest vehicle to largest. */
const featuredVehicles = [
  'maruti-suzuki-swift-dzire',
  'toyota-innova-crysta',
  'force-tempo-traveller-12',
  'mini-bus-21-seater',
  'toyota-fortuner',
  'volvo-luxury-coach-45',
].map((slug) => fleet.find((v) => v.slug === slug)).filter(Boolean)

const featuredPackages = [
  'golden-triangle-delhi-agra-jaipur',
  'royal-rajasthan-grand-tour',
  'shekhawati-haveli-heritage-trail',
  'rajasthan-desert-circuit',
].map((slug) => packages.find((p) => p.slug === slug)).filter(Boolean)

const reasons = [
  'Fixed pricing — no hidden charges',
  'Well-trained, police-verified drivers',
  'Clean, comfortable, fully insured vehicles',
  '24×7 customer support',
]

export default function Home() {
  return (
    <>
      <Seo
        title="Taxi Service in New Delhi — Car, Tempo Traveller & Bus Hire"
        description="Taxi service near IGI Airport, Rangpuri, New Delhi. Cars, SUVs, tempo travellers and buses on rent with driver, open 24×7. Call or WhatsApp for a fixed quote."
        path="/"
        keywords="taxi service near IGI airport, taxi service New Delhi, car rental Rangpuri, cab service Mahipalpur, tempo traveller on rent Delhi, mini bus hire Delhi NCR, 7 seater SUV on rent, IGI airport taxi Delhi, outstation cab booking Delhi, Rajasthan tour packages, Shekhawat Tours and Travels"
        schema={[reviewSchema].filter(Boolean)}
      />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="hero">
        <picture className="hero__media">
          {/* A taller crop for phones, where the wide frame would shrink the
              fort to a sliver behind the quote form. */}
          <source media="(max-width: 720px)" srcSet="/images/hero/amber-fort-dusk-mobile.jpg" />
          <img
            src="/images/hero/amber-fort-dusk.jpg"
            alt="A white Toyota Innova Crysta in front of Amber Fort, Jaipur, at dusk"
            width="2400"
            height="1000"
            fetchpriority="high"
            decoding="async"
          />
        </picture>
        <div className="hero__shade" aria-hidden="true" />

        <div className="container hero__inner">
          <div className="hero__copy hero__stage">
            <p className="hero__eyebrow">Your journey. Our road.</p>
            <h1 className="hero__title">
              Explore Rajasthan <br />with Comfort &amp; Trust
            </h1>
            <p className="hero__lines">
              <span>Premium Cars</span>
              <span>Tempo Travellers</span>
              <span>Buses</span>
              <span>Tour Packages</span>
            </p>
            <p className="hero__values">
              Safe <i aria-hidden="true">|</i> Reliable <i aria-hidden="true">|</i> Affordable
            </p>
          </div>

          <QuoteWidget />
        </div>
      </section>

      <StatBar />

      {/* ── Fleet ────────────────────────────────────────────── */}
      <section className="section" id="fleet">
        <div className="container">
          <SectionHead
            title="Our Fleet"
            text="Choose from our well-maintained fleet for a comfortable journey."
            action={
              <Link className="btn btn--outline btn--sm btn--pill" to="/fleet">
                View All Vehicles <Icon name="arrow-r" size={15} />
              </Link>
            }
          />
          <div className="fleetrow">
            {featuredVehicles.map((v, i) => (
              <Reveal variant="up" delay={stagger(i, 60)} key={v.slug}>
                <VehicleCard vehicle={v} compact />
              </Reveal>
            ))}
          </div>
          <p className="photonote">
            <Icon name="camera" size={14} /> Photos show each model. We send photos of your actual
            vehicle on WhatsApp before you confirm.
          </p>
        </div>
      </section>

      {/* ── Tour packages ────────────────────────────────────── */}
      <section className="section section--tint" id="tours">
        <div className="container">
          <SectionHead
            align="left"
            title="Popular Tour Packages"
            text="Discover Rajasthan’s rich heritage, culture and natural beauty."
            action={
              <Link className="btn btn--outline btn--sm btn--pill" to="/tour-packages">
                View All Tours <Icon name="arrow-r" size={15} />
              </Link>
            }
          />
          <div className="pkgrow">
            {featuredPackages.map((p, i) => (
              <Reveal variant="up" delay={stagger(i, 80)} key={p.slug}>
                <PackageCard pkg={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why us + reviews ─────────────────────────────────── */}
      <section className="section whyrev" id="reviews">
        <div className="container whyrev__grid">
          <Reveal className="whyrev__why" variant="left">
            <h2 className="whyrev__title">Why Choose Shekhawat?</h2>
            <p className="whyrev__text">
              We are more than just a travel company — we are your partner in exploring Rajasthan
              and beyond. {yearsActive} years on these roads, and we still answer the phone ourselves.
            </p>
            <ul className="checklist">
              {reasons.map((r) => (
                <li key={r}>
                  <span className="checklist__icon"><Icon name="check" size={14} /></span>
                  {r}
                </li>
              ))}
            </ul>
            <Link className="btn btn--primary btn--pill" to="/about">
              Learn More <Icon name="arrow-r" size={16} />
            </Link>
          </Reveal>

          <Reveal className="whyrev__reviews" variant="right" delay={100}>
            <h2 className="whyrev__title">What Our Travellers Say</h2>
            <div className="ratingline">
              <Stars size={18} />
              <strong>{site.rating.value}/5</strong>
              <small>
                Based on {site.rating.count} Google reviews ·{' '}
                <a href={site.reviewsLink} target="_blank" rel="noopener noreferrer">Read them on Google</a>
              </small>
            </div>
            <ReviewCarousel />
          </Reveal>
        </div>
      </section>

      {/* ── Local SEO copy ───────────────────────────────────── */}
      <section className="section section--tint">
        <div className="container localseo__grid">
          <Reveal className="prose" variant="up">
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

          <Reveal as="aside" className="localseo__aside" variant="up" delay={120}>
            <figure className="localseo__photo">
              <img
                {...responsive('/images/places/india-gate.jpg')}
                sizes="(max-width: 960px) 100vw, 440px"
                alt="India Gate, New Delhi"
                loading="lazy"
                decoding="async"
                width="600"
                height="400"
              />
              <figcaption>
                <Icon name="pin" size={15} />
                <span>Our office: {shortAddress} — three kilometres from IGI Airport Terminal 3.</span>
              </figcaption>
            </figure>
            <GoogleBadge />
            <a className="btn btn--outline btn--block" href={site.mapLink} target="_blank" rel="noopener noreferrer">
              <Icon name="pin" size={16} /> Get directions
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ teaser ───────────────────────────────────────── */}
      <section className="section" id="faq">
        <div className="container container--narrow">
          <SectionHead
            eyebrow="Good to know"
            title="Frequently Asked Questions"
            text="A few of the questions we hear most. The full list, grouped by topic, lives on our FAQ page."
          />
          <div className="faqteaser">
            {faqs.slice(0, 4).map((f) => (
              <div className="faqteaser__item" key={f.q}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
          <div className="section__more">
            <Link className="btn btn--outline btn--pill" to="/faq">
              See all FAQs <Icon name="arrow-r" size={16} />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
