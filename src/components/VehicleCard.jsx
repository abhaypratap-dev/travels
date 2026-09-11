import { Link } from 'react-router-dom'
import Icon from './Icon'
import { responsive } from '../data/photos'

/**
 * Vehicle card. `compact` is the homepage strip — photo, name, capacity and
 * rate, nothing else. The full card adds the summary, spec chips and features
 * for the fleet and category pages, where someone is actually comparing.
 */
export default function VehicleCard({ vehicle: v, compact = false }) {
  const href = `/fleet/${v.slug}`
  const bags = `${v.luggage} ${v.luggage === 1 ? 'Bag' : 'Bags'}`

  const media = (
    <Link className="vcard__media" to={href} tabIndex={-1} aria-hidden="true">
      <img
        {...responsive(v.image)}
        sizes={compact
          ? '(max-width: 720px) 50vw, (max-width: 1180px) 33vw, 200px'
          : '(max-width: 720px) 100vw, (max-width: 1180px) 50vw, 400px'}
        alt={`${v.name} — ${v.seats} seater ${v.ac ? 'AC' : 'non-AC'} on rent with driver`}
        loading="lazy"
        decoding="async"
        width="600"
        height="400"
        itemProp={compact ? undefined : 'image'}
      />
      {v.badge && <span className="vcard__badge">{v.badge}</span>}
      {!v.ac && <span className="vcard__badge vcard__badge--alt">Non-AC</span>}
    </Link>
  )

  if (compact) {
    return (
      <article className="vcard vcard--compact">
        {media}
        <div className="vcard__body">
          <h3 className="vcard__title"><Link to={href}>{v.shortName || v.name}</Link></h3>
          <ul className="vcard__meta">
            <li><Icon name="users-o" size={15} /> {v.seats} Passengers</li>
            <li><Icon name="bag" size={15} /> {bags}</li>
          </ul>
          <p className="vcard__price">₹{v.ratePerKm}<small>/km</small></p>
          <Link className="linkarrow" to={href} aria-label={`View details of the ${v.name}`}>
            View Details <Icon name="arrow-r" size={15} />
          </Link>
        </div>
      </article>
    )
  }

  return (
    <article className="vcard vcard--full" itemScope itemType="https://schema.org/Product">
      {media}

      <div className="vcard__body">
        <h3 className="vcard__title">
          <Link to={href} itemProp="name">{v.name}</Link>
        </h3>
        <p className="vcard__summary" itemProp="description">{v.summary}</p>

        <ul className="vcard__specs">
          <li><Icon name="users-o" size={15} /> {v.seats} seats</li>
          <li><Icon name="bag" size={15} /> {bags.toLowerCase()}</li>
          <li><Icon name="snow" size={14} /> {v.ac ? 'AC' : 'Non-AC'}</li>
          <li><Icon name="fuel" size={14} /> {v.fuel}</li>
          <li><Icon name="gear" size={14} /> {v.transmission}</li>
        </ul>

        <ul className="vcard__features">
          {v.features.slice(0, 4).map((f) => (
            <li key={f}><Icon name="check" size={14} /> {f}</li>
          ))}
        </ul>

        <p className="vcard__bestfor"><strong>Best for:</strong> {v.bestFor}</p>
      </div>

      <div className="vcard__foot" itemProp="offers" itemScope itemType="https://schema.org/Offer">
        <meta itemProp="priceCurrency" content="INR" />
        <meta itemProp="price" content={String(v.ratePerKm)} />
        <meta itemProp="availability" content="https://schema.org/InStock" />
        <div>
          <p className="vcard__price">₹{v.ratePerKm}<small>/km</small></p>
          <span className="vcard__rate-alt">₹{v.ratePerDay.toLocaleString('en-IN')} / day · min {v.minKm} km</span>
        </div>
        <Link className="btn btn--primary btn--sm" to={href}>
          Details <Icon name="arrow-r" size={15} />
        </Link>
      </div>
    </article>
  )
}
