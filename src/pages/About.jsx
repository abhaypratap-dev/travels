import Seo from '../components/Seo'
import Icon from '../components/Icon'
import Testimonials from '../components/Testimonials'
import { SectionHead } from '../components/Faq'
import { PageHero, CtaBand, StatBar } from '../components/Common'
import { Reveal, stagger } from '../components/Motion'
import { site, yearsActive, fullAddress } from '../data/site'
import { whyUs, milestones } from '../data/content'

export default function About() {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `About ${site.name}`,
    description: `The story of ${site.name}, a family-run travel operator based in Rangpuri, ${site.address.locality}, operating since ${site.founded}.`,
    mainEntity: {
      '@type': 'TravelAgency',
      name: site.name,
      foundingDate: site.founded,
      foundingLocation: { '@type': 'Place', name: `${site.address.locality}, ${site.address.region}` },
      founder: { '@type': 'Person', name: site.owner.name, jobTitle: site.owner.role },
    },
  }

  return (
    <>
      <Seo
        title="About Us — Taxi Service in Rangpuri, Delhi"
        description="Shekhawat Tours and Travels is a taxi service in Rangpuri, New Delhi, run by Rupesh Singh since 2012. 60+ vehicles, verified drivers, fixed prices."
        path="/about"
        keywords="about Shekhawat Tours and Travels, travel agency New Delhi, taxi operator Rangpuri, Rupesh Singh, tour operator Delhi NCR"
        schema={aboutSchema}
        breadcrumbs={[{ name: 'About', path: '/about' }]}
      />

      <PageHero
        eyebrow={`Serving travellers since ${site.founded}`}
        title="About Shekhawat Tours and Travels"
        text="A family business with Shekhawati roots, run out of New Delhi, that grew from two cars into a sixty-vehicle fleet — without ever outsourcing a booking or hiding a charge."
        crumbs={[{ name: 'About', path: '/about' }]}
        bg="/images/hero/bg-haveli.jpg"
      />

      <section className="section">
        <div className="container">
          <div className="split">
            <div className="prose">
              <h2>Our Story</h2>
              <p>
                In 2012, {site.owner.name} was running a single Indica on the Delhi–Jaipur highway,
                mostly ferrying families to Khatu Shyam Ji and back. The work came almost entirely
                by word of mouth — one satisfied family telling the next.
              </p>
              <p>
                That is still, honestly, how most of our work arrives. What changed is the scale.
                Families asked for bigger vehicles, so we added tempo travellers. Wedding parties
                needed to move a hundred guests at once, so the first mini buses came in. Companies
                across Delhi NCR wanted reliable staff transport, so we built a corporate desk.
                Today the fleet runs past sixty vehicles, from a Swift to a 45-seat Volvo coach.
              </p>
              <p>
                What has not changed is how we quote. Every fare is agreed in writing before you
                travel, tolls and parking are billed at whatever the receipt says, and the number on
                this website is answered by {site.owner.name.split(' ')[0]} himself or someone in our
                office — not a call centre, and not an algorithm that raises the price because it is
                raining.
              </p>

              <h3>Where our name comes from</h3>
              <p>
                Shekhawati is the region our family comes from — the belt of Sikar, Jhunjhunu and
                Churu, known across the world for its painted havelis. Many of our drivers grew up
                there. When they take you through Nawalgarh or Mandawa, they are showing you their
                own hometown, which is a very different thing from following a route on a phone.
              </p>
              <h3>Why we operate out of Delhi</h3>
              <p>
                Our office sits in Rangpuri, minutes from Indira Gandhi International Airport. That
                matters more than it sounds: it means a flight landing at 3 AM gets a car that was
                already nearby, and it puts us at the head of the highway for every Rajasthan,
                Agra and hill-station route our customers actually ask for.
              </p>
            </div>

            <aside className="aboutside">
              <div className="aboutside__card">
                <h3>At a glance</h3>
                <ul className="deflist">
                  <li><span>Founded</span><strong>{site.founded} ({yearsActive} years)</strong></li>
                  <li><span>{site.owner.role}</span><strong>{site.owner.name}</strong></li>
                  <li><span>Head office</span><strong>{site.address.area}, {site.address.locality} {site.address.postalCode}</strong></li>
                  <li><span>Fleet size</span><strong>60+ vehicles</strong></li>
                  <li><span>Permits</span><strong>All-India tourist</strong></li>
                  <li><span>GST</span><strong>{site.gstin || 'Registered — invoice on request'}</strong></li>
                  <li><span>Support</span><strong>24×7, all days</strong></li>
                  <li><span>Google rating</span><strong>{site.rating.value}★ · {site.rating.count} reviews</strong></li>
                </ul>
              </div>
              <div className="aboutside__card aboutside__card--accent">
                <Icon name="shield" size={28} />
                <h3>Our promise</h3>
                <p>
                  If the final bill does not match the quote we gave you — barring tolls and parking
                  billed at actuals — you pay the quote. In {yearsActive} years we have never needed
                  to invoke that clause, and that is rather the point.
                </p>
              </div>
            </aside>
          </div>

          <StatBar inline />
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <SectionHead eyebrow="Our journey" title={`${yearsActive} Years, One Road at a Time`} />
          <ol className="timeline timeline--milestones">
            {milestones.map((m, i) => (
              <Reveal as="li" className="timeline__item" variant="left" delay={stagger(i, 90)} key={m.year}>
                <span className="timeline__day">{m.year}</span>
                <div>
                  <h3 className="timeline__title">{m.title}</h3>
                  <p className="timeline__text">{m.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="What we stand for"
            title="The Way We Work"
            text="Six commitments that have not changed since the first Indica."
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

      <Testimonials />
      <CtaBand title="Travel with a team that answers the phone" text={`${yearsActive} years on Delhi roads, and a fixed price every single time.`} />
    </>
  )
}
