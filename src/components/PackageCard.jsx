import { Link } from 'react-router-dom'
import Icon from './Icon'
import { responsive } from '../data/photos'

/**
 * Tour package card: photograph captioned with the landmark, the route in one
 * line, days and nights, and the starting price. Days and nights come from the
 * itinerary itself, so the card can never disagree with the detail page.
 */
export default function PackageCard({ pkg: p }) {
  const href = `/tour-packages/${p.slug}`
  const days = p.itinerary.length
  const nights = days - 1

  return (
    <article className="pcard">
      <Link className="pcard__media" to={href} tabIndex={-1} aria-hidden="true">
        <img
          {...responsive(p.image)}
          sizes="(max-width: 720px) 100vw, (max-width: 1180px) 50vw, 300px"
          alt={`${p.place} — ${p.shortTitle}, ${p.duration} from ${p.from}`}
          loading="lazy"
          decoding="async"
          width="600"
          height="400"
        />
        {p.tag && <span className="pcard__tag">{p.tag}</span>}
        <span className="pcard__place">{p.place}</span>
      </Link>

      <div className="pcard__body">
        <h3 className="pcard__title"><Link to={href}>{p.shortTitle}</Link></h3>
        <p className="pcard__route">{p.route}</p>
        <ul className="pcard__meta">
          <li><Icon name="clock-o" size={15} /> {days} {days === 1 ? 'Day' : 'Days'}</li>
          {nights > 0 && <li><Icon name="moon" size={15} /> {nights} {nights === 1 ? 'Night' : 'Nights'}</li>}
        </ul>
        <div className="pcard__foot">
          <p className="pcard__price">
            ₹{p.price.toLocaleString('en-IN')} <small>per cab</small>
          </p>
          <Link className="btn btn--primary btn--sm btn--pill" to={href} aria-label={`View details of the ${p.shortTitle}`}>
            View Details <Icon name="arrow-r" size={15} />
          </Link>
        </div>
      </div>
    </article>
  )
}
