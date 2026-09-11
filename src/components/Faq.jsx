import { useState } from 'react'
import Icon from './Icon'

/**
 * The accordion on its own. `idPrefix` keeps button/panel ids unique when a
 * page renders more than one list (the FAQ page has a list per topic).
 */
export function FaqList({ items, idPrefix = 'faq', defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
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
              aria-controls={`${idPrefix}-panel-${i}`}
              id={`${idPrefix}-btn-${i}`}
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
            id={`${idPrefix}-panel-${i}`}
            role="region"
            aria-labelledby={`${idPrefix}-btn-${i}`}
          >
            <div><p>{item.a}</p></div>
          </div>
        </div>
      ))}
    </div>
  )
}

/** A full FAQ section: heading, accordion and an optional closing link. */
export default function Faq({ items, heading = 'Frequently Asked Questions', intro, more }) {
  return (
    <section className="section" id="faq">
      <div className="container container--narrow">
        <SectionHead
          eyebrow="Good to know"
          title={heading}
          text={intro || 'The questions we get asked most. Anything else, just call — we pick up.'}
        />
        <FaqList items={items} />
        {more && <div className="section__more">{more}</div>}
      </div>
    </section>
  )
}

/**
 * Section heading. `action` takes a button or link: on a centred heading it
 * sits at the right edge on wide screens and drops under the text on narrow
 * ones; on a left-aligned heading it shares the row.
 */
export function SectionHead({ eyebrow, title, text, align = 'center', action }) {
  return (
    <header className={`sechead sechead--${align}`} data-reveal="up">
      <div className="sechead__main">
        {eyebrow && <p className="sechead__eyebrow">{eyebrow}</p>}
        <h2 className="sechead__title">{title}</h2>
        {text && <p className="sechead__text">{text}</p>}
      </div>
      {action && <div className="sechead__action">{action}</div>}
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
