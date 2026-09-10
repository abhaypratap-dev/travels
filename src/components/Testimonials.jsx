import Icon from './Icon'
import { SectionHead } from './Faq'
import { GoogleBadge } from './Common'
import { Reveal, stagger } from './Motion'
import { testimonials, testimonialsAreVerified } from '../data/content'
import { site } from '../data/site'

export default function Testimonials() {
  return (
    <section className="section section--tint">
      <div className="container">
        <SectionHead
          eyebrow="Reviews"
          title="What Our Travellers Say"
          text={`Rated ${site.rating.value} out of 5 across ${site.rating.count} Google reviews from families, pilgrims and corporate clients.`}
        />

        <div className="grid grid--3">
          {testimonials.map((t, i) => (
            <Reveal
              as="figure"
              className="tcard"
              variant="up"
              delay={stagger(i, 80)}
              key={t.name}
            >
              <Icon name="quote" size={28} className="tcard__quote" />
              <div className="tcard__stars" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Icon key={s} name="star" size={16} />
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
            </Reveal>
          ))}
        </div>

        <Reveal className="section__more" variant="up" delay={160}>
          <GoogleBadge />
        </Reveal>
      </div>
    </section>
  )
}

/**
 * Review structured data — deliberately empty until the testimonials above are
 * real, verifiable reviews.
 *
 * Google's review-snippet policy requires that marked-up reviews were genuinely
 * collected from customers and are visible on the page. Emitting `Review` nodes
 * for placeholder copy risks a manual action against the whole domain, which
 * costs far more than the star snippet is worth.
 *
 * To switch it on: replace the entries in src/data/content.js with real review
 * text and reviewer names (copy them from the Google Business Profile), then
 * set `testimonialsAreVerified` to true in that file. The markup below starts
 * emitting on its own — nothing else needs changing.
 *
 * Note there is no `aggregateRating` here on purpose. That lives once, on the
 * organisation node in Seo.jsx; repeating it would create a second, unlinked
 * business entity in the graph.
 */
export const reviewSchema = testimonialsAreVerified
  ? {
      '@context': 'https://schema.org',
      '@id': `${site.url}/#organization`,
      review: testimonials.map((t) => ({
        '@type': 'Review',
        author: { '@type': 'Person', name: t.name },
        reviewRating: { '@type': 'Rating', ratingValue: t.rating, bestRating: '5', worstRating: '1' },
        reviewBody: t.text,
        itemReviewed: { '@id': `${site.url}/#organization` },
      })),
    }
  : null
