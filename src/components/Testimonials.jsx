import Icon from './Icon'
import { SectionHead } from './Faq'
import { testimonials } from '../data/content'
import { site } from '../data/site'

export default function Testimonials() {
  return (
    <section className="section section--tint">
      <div className="container">
        <SectionHead
          eyebrow="Reviews"
          title="What Our Travellers Say"
          text={`Rated ${site.rating.value} out of 5 across ${site.rating.count} reviews from families, pilgrims and corporate clients.`}
        />
        <div className="grid grid--3">
          {testimonials.map((t) => (
            <figure className="tcard" key={t.name}>
              <Icon name="quote" size={28} className="tcard__quote" />
              <div className="tcard__stars" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Icon key={i} name="star" size={16} />
                ))}
              </div>
              <blockquote className="tcard__text">{t.text}</blockquote>
              <figcaption className="tcard__meta">
                <span className="tcard__avatar" aria-hidden="true">{t.name.charAt(0)}</span>
                <span>
                  <strong>{t.name}</strong>
                  <small>{t.place} · {t.trip}</small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export const reviewSchema = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: site.name,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: site.rating.value,
    reviewCount: site.rating.count,
    bestRating: '5',
  },
  review: testimonials.map((t) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: t.name },
    reviewRating: { '@type': 'Rating', ratingValue: t.rating, bestRating: '5' },
    reviewBody: t.text,
  })),
}
