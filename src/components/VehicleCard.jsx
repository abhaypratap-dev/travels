import { Link } from 'react-router-dom'
import Icon from './Icon'

const toneFor = (category) => ({
  hatchback: 'teal',
  sedan: 'indigo',
  suv: 'forest',
  luxury: 'gold',
  tempo: 'plum',
  bus: 'rose',
}[category] || 'indigo')

export default function VehicleCard({ vehicle: v }) {
  return (
    <article className="vcard" itemScope itemType="https://schema.org/Product">
      <Link className={`vcard__media tone-${toneFor(v.category)}`} to={`/fleet/${v.slug}`} tabIndex={-1} aria-hidden="true">
        {v.image ? (
          <img
            src={v.image}
            alt={`${v.name} — ${v.seats} seater ${v.ac ? 'AC' : 'non-AC'} on rent with driver`}
            loading="lazy"
            width="800"
            height="500"
            itemProp="image"
          />
        ) : (
          <span className="vcard__placeholder" aria-hidden="true">
            <Icon name={v.category === 'bus' ? 'bus' : 'fleet'} size={64} />
          </span>
        )}
        {v.badge && <span className="vcard__badge">{v.badge}</span>}
        {!v.ac && <span className="vcard__badge vcard__badge--alt">Non-AC</span>}
      </Link>

      <div className="vcard__body">
        <h3 className="vcard__title">
          <Link to={`/fleet/${v.slug}`} itemProp="name">{v.name}</Link>
        </h3>
        <p className="vcard__summary" itemProp="description">{v.summary}</p>

        <ul className="vcard__specs">
          <li><Icon name="seat" size={16} /> {v.seats} seats</li>
          <li><Icon name="luggage" size={16} /> {v.luggage} {v.luggage === 1 ? 'bag' : 'bags'}</li>
          <li><Icon name="snow" size={16} /> {v.ac ? 'AC' : 'Non-AC'}</li>
          <li><Icon name="fuel" size={16} /> {v.fuel}</li>
          <li><Icon name="gear" size={16} /> {v.transmission}</li>
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
        <div className="vcard__price">
          <span className="vcard__rate">₹{v.ratePerKm}<small>/km</small></span>
          <span className="vcard__rate-alt">₹{v.ratePerDay.toLocaleString('en-IN')} / day · min {v.minKm} km</span>
        </div>
        <Link className="btn btn--primary btn--sm" to={`/fleet/${v.slug}`}>
          Details <Icon name="arrow" size={16} />
        </Link>
      </div>
    </article>
  )
}
