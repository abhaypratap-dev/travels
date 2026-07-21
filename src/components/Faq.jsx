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
            <div className={`faq__item${open === i ? ' is-open' : ''}`} key={item.q}>
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
              <div
                className="faq__a"
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-btn-${i}`}
                hidden={open !== i}
              >
                <p>{item.a}</p>
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
    <header className={`sechead sechead--${align}`}>
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
