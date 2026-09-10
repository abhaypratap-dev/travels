import { useState } from 'react'
import Icon from './Icon'

export default function Faq({ items, heading = 'Frequently Asked Questions', intro }) {
  const [open, setOpen] = useState(0)

  return (
    <section className="section" id="faq">
      <div className="container container--narrow">
        <SectionHead
          eyebrow="Good to know"
          title={heading}
          text={intro || 'The questions we get asked most. Anything else, just call — we pick up.'}
        />
        <div className="faq">
          {items.map((item, i) => (
            <div
              className={`faq__item${open === i ? ' is-open' : ''}`}
              key={item.q}
              data-reveal="up"
              style={{ '--reveal-delay': `${Math.min(i * 55, 330)}ms` }}
            >
              <h3>
                <button
                  className="faq__q"
                  onClick={() => setOpen(open === i ? -1 : i)}
                  aria-expanded={open === i}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-btn-${i}`}
                >
                  <span>{item.q}</span>
                  <Icon name="chevron" size={18} className="faq__chev" />
                </button>
              </h3>
              {/* Collapsed with a 0fr grid row rather than `hidden`, so the
                  open/close can animate to the answer's natural height. The
                  answer stays in the DOM either way, which is what we want for
                  the FAQPage schema to match visible content. */}
              <div
                className="faq__a"
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-btn-${i}`}
              >
                <div><p>{item.a}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SectionHead({ eyebrow, title, text, align = 'center' }) {
  return (
    <header className={`sechead sechead--${align}`} data-reveal="up">
      {eyebrow && <p className="sechead__eyebrow">{eyebrow}</p>}
      <h2 className="sechead__title">{title}</h2>
      {text && <p className="sechead__text">{text}</p>}
    </header>
  )
}

export const faqSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
})
