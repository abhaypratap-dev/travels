import Icon from './Icon'
import { whatsappLink } from '../data/site'

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
      <div className={`vcard__media tone-${toneFor(v.category)}`}>
        {v.image ? (
          <img src={v.image} alt={`${v.name} — ${v.seats} seater on rent`} loading="lazy" width="640" height="400" itemProp="image" />
        ) : (
          <span className="vcard__placeholder" aria-hidden="true">
            <Icon name={v.category === 'bus' ? 'bus' : 'fleet'} size={64} />
          </span>
        )}
        {v.badge && <span className="vcard__badge">{v.badge}</span>}
        {!v.ac && <span className="vcard__badge vcard__badge--alt">Non-AC</span>}
      </div>

      <div className="vcard__body">
        <h3 className="vcard__title" itemProp="name">{v.name}</h3>
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
        <a
          className="btn btn--primary btn--sm"
          href={whatsappLink(`Hi, I want to book the ${v.name} (${v.seats} seater). Please share availability and the final rate.`)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Book <Icon name="arrow" size={16} />
        </a>
      </div>
    </article>
  )
}
