import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Icon from '../components/Icon'
import { FaqList, SectionHead, faqSchema } from '../components/Faq'
import { PageHero, CtaBand } from '../components/Common'
import { Reveal } from '../components/Motion'
import { site } from '../data/site'
import { faqGroups, allFaqPageItems } from '../data/faqPage'

/**
 * The single canonical FAQ page. Every question here carries FAQPage schema —
 * the homepage teaser and the vehicle/service pages keep their own,
 * page-specific questions, but this is the one page built to be Google's
 * answer for "shekhawat tours faq" and for voice-search phrasing.
 */
export default function FaqPage() {
  return (
    <>
      <Seo
        title="Frequently Asked Questions"
        description="Answers about booking, fares, airport pickup, outstation trips, drivers and vehicles at Shekhawat Tours and Travels. Still unsure? Call or WhatsApp us."
        path="/faq"
        keywords="taxi booking FAQ Delhi, IGI airport taxi questions, outstation cab rules, tempo traveller rental FAQ, Shekhawat Tours and Travels FAQ"
        schema={faqSchema(allFaqPageItems)}
        breadcrumbs={[{ name: 'FAQ', path: '/faq' }]}
      />

      <PageHero
        eyebrow="Good to know"
        title="Frequently Asked Questions"
        text="Everything travellers ask before booking — grouped by topic. Anything else, just call — we pick up."
        crumbs={[{ name: 'FAQ', path: '/faq' }]}
        bg="/images/hero/bg-jaisalmer.jpg"
      />

      <section className="section">
        <div className="container container--narrow">
          <nav className="faqjump" aria-label="Jump to topic">
            {faqGroups.map((g) => (
              <a key={g.id} href={`#${g.id}`} className="chip">{g.title}</a>
            ))}
          </nav>

          {faqGroups.map((g, i) => (
            <Reveal as="div" className="faqgroup" variant="up" key={g.id} id={g.id}>
              <SectionHead align="left" title={g.title} />
              <FaqList items={g.items} idPrefix={g.id} defaultOpen={i === 0 ? 0 : -1} />
            </Reveal>
          ))}

          <p className="gallery__note" style={{ marginTop: 32 }}>
            <Icon name="phone-o" size={16} />
            Question not answered here? Call <a href={`tel:${site.phoneRaw}`}>{site.phone}</a> or{' '}
            <Link to="/contact">send us a message</Link> — we reply within fifteen minutes during working hours.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
