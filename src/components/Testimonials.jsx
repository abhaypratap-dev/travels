import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import { SectionHead } from './Faq'
import { GoogleBadge } from './Common'
import { Reveal, stagger, prefersReducedMotion } from './Motion'
import { testimonials, testimonialsAreVerified } from '../data/content'
import { site } from '../data/site'

export function ReviewCard({ review: t }) {
  return (
    <figure className="rcard">
      <figcaption className="rcard__head">
        <span className="rcard__avatar" aria-hidden="true">{t.name.charAt(0)}</span>
        <span>
          <strong>{t.name}</strong>
          <small>{t.place} · {t.trip}</small>
        </span>
      </figcaption>
      <span className="rcard__stars" role="img" aria-label={`${t.rating} out of 5 stars`}>
        {Array.from({ length: t.rating }, (_, i) => <Icon key={i} name="star" size={15} />)}
      </span>
      <blockquote className="rcard__text">{t.text}</blockquote>
    </figure>
  )
}

/**
 * Review carousel. A native scroll-snap strip — so it swipes on a phone,
 * scrolls with a trackpad and works with no JavaScript — with arrows and dots
 * layered on top. Every card is in the server-rendered HTML.
 */
export function ReviewCarousel() {
  const trackRef = useRef(null)
  const [page, setPage] = useState(0)
  const [pages, setPages] = useState(Math.ceil(testimonials.length / 3))

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let frame = 0
    const measure = () => {
      frame = 0
      const count = Math.max(1, Math.round(track.scrollWidth / track.clientWidth))
      setPages(count)
      setPage(Math.min(count - 1, Math.round(track.scrollLeft / track.clientWidth)))
    }
    const onChange = () => { if (!frame) frame = requestAnimationFrame(measure) }

    measure()
    track.addEventListener('scroll', onChange, { passive: true })
    window.addEventListener('resize', onChange, { passive: true })
    return () => {
      track.removeEventListener('scroll', onChange)
      window.removeEventListener('resize', onChange)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const go = (target) => {
    const track = trackRef.current
    if (!track) return
    track.scrollTo({ left: target * track.clientWidth, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }

  return (
    <div className="revcar">
      <button
        className="revcar__nav revcar__nav--prev"
        onClick={() => go(page - 1)}
        disabled={page === 0}
        aria-label="Previous reviews"
      >
        <Icon name="arrow-l" size={18} />
      </button>

      <div className="revcar__track" ref={trackRef} tabIndex={0} role="region" aria-label="Traveller reviews">
        {testimonials.map((t) => <ReviewCard review={t} key={t.name} />)}
      </div>

      <button
        className="revcar__nav revcar__nav--next"
        onClick={() => go(page + 1)}
        disabled={page >= pages - 1}
        aria-label="Next reviews"
      >
        <Icon name="arrow-r" size={18} />
      </button>

      <div className="revcar__dots">
        {Array.from({ length: pages }, (_, i) => (
          <button
            key={i}
            className={`revcar__dot${i === page ? ' is-active' : ''}`}
            onClick={() => go(i)}
            aria-label={`Show reviews, page ${i + 1} of ${pages}`}
            aria-current={i === page ? 'true' : undefined}
          />
        ))}
      </div>
    </div>
  )
}

/** Full review grid, used on the About page. */
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
            <Reveal variant="up" delay={stagger(i, 80)} key={t.name}>
              <ReviewCard review={t} />
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
