import { useState } from 'react'
import Icon from './Icon'
import { site, whatsappLink } from '../data/site'

const TRIPS = [
  { id: 'one-way', label: 'One Way', icon: 'arrow-r' },
  { id: 'round-trip', label: 'Round Trip', icon: 'swap' },
  { id: 'multi-city', label: 'Multi City', icon: 'route' },
]

const GUESTS = ['1', '2', '3', '4', '5', '6', '7', '8–12', '13–17', '18–26', '27–45']

const PROMISES = [
  { icon: 'tag', title: 'Fixed Pricing', text: 'No hidden charges' },
  { icon: 'user-check', title: 'Verified Drivers', text: 'Trained & professional' },
  { icon: 'headset', title: '24×7 Support', text: 'Always here for you' },
]

/** "2026-09-12" → "12 Sept 2026", read the way a person would type it. */
const readableDate = (iso) => {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

/**
 * The hero quote form. Four fields is the whole ask — any more and a visitor
 * starts wondering what the catch is. It hands the trip to WhatsApp as a
 * pre-filled message, the channel most bookings already arrive on; the full
 * enquiry form lives on the contact page for people who prefer one.
 */
export default function QuoteWidget() {
  const [trip, setTrip] = useState('one-way')
  const [form, setForm] = useState({ from: 'Delhi NCR', to: '', date: '', guests: '4' })
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const multi = trip === 'multi-city'

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    setError('')
    setSent(false)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!form.from.trim() || !form.to.trim()) {
      setError(multi
        ? 'Tell us where you start and the cities on your route.'
        : 'Tell us where you start and where you are going.')
      return
    }
    const message = [
      `*Quote request — ${site.shortName}*`,
      `Trip: ${TRIPS.find((t) => t.id === trip).label}`,
      `From: ${form.from.trim()}`,
      `${multi ? 'Route' : 'To'}: ${form.to.trim()}`,
      `Travel date: ${form.date ? readableDate(form.date) : 'flexible'}`,
      `Guests: ${form.guests}`,
    ].join('\n')
    window.open(whatsappLink(message), '_blank', 'noopener')
    setSent(true)
  }

  return (
    <form className="quote" onSubmit={onSubmit} noValidate aria-label="Get a free quote" id="quote">
      <div className="quote__tabs" role="group" aria-label="Trip type">
        {TRIPS.map((t) => (
          <button
            type="button"
            key={t.id}
            className={`quote__tab${trip === t.id ? ' is-active' : ''}`}
            aria-pressed={trip === t.id}
            onClick={() => setTrip(t.id)}
          >
            <Icon name={t.icon} size={16} /> {t.label}
          </button>
        ))}
      </div>

      <div className="quote__body">
        <div className="quote__fields">
          <Field label="From" icon="pin-o" invalid={Boolean(error) && !form.from.trim()}>
            <input type="text" value={form.from} onChange={set('from')} placeholder="Pickup city" autoComplete="address-level2" />
          </Field>
          <Field label={multi ? 'Via / To' : 'To'} icon="pin-o" invalid={Boolean(error) && !form.to.trim()}>
            <input type="text" value={form.to} onChange={set('to')} placeholder={multi ? 'Agra, Jaipur' : 'Jaipur'} />
          </Field>
          <Field label="Travel Date" icon="calendar">
            {/* Safari paints today's date into an empty date field; `data-empty`
                greys it out so it cannot be mistaken for a chosen date. */}
            <input type="date" value={form.date} onChange={set('date')} data-empty={form.date ? undefined : ''} />
          </Field>
          <Field label="Guests" icon="user-o">
            <select value={form.guests} onChange={set('guests')}>
              {GUESTS.map((g) => <option key={g}>{g}</option>)}
            </select>
          </Field>
        </div>

        <button className="btn btn--primary btn--block quote__submit" type="submit">
          Get Free Quote <Icon name="arrow-r" size={18} />
        </button>
        {error && <p className="quote__error" role="alert">{error}</p>}
        {sent && (
          <p className="quote__sent" role="status">
            Opening WhatsApp with your trip details — or call us on {site.phone}.
          </p>
        )}
      </div>

      <ul className="quote__trust">
        {PROMISES.map((p) => (
          <li key={p.title}>
            <Icon name={p.icon} size={24} />
            <span>
              <strong>{p.title}</strong>
              <small>{p.text}</small>
            </span>
          </li>
        ))}
      </ul>
    </form>
  )
}

function Field({ label, icon, invalid, children }) {
  return (
    <label className={`quote__field${invalid ? ' quote__field--error' : ''}`}>
      <span className="quote__label">{label}</span>
      <span className="quote__control">
        <Icon name={icon} size={17} />
        {children}
      </span>
    </label>
  )
}
