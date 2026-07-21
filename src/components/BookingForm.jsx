import { useState } from 'react'
import Icon from './Icon'
import { site } from '../data/site'
import { fleet } from '../data/fleet'

const TRIP_TYPES = ['One Way Drop', 'Round Trip', 'Local (8hr/80km)', 'Airport Transfer', 'Tour Package']

const empty = {
  name: '', phone: '', tripType: 'Round Trip', from: '', to: '',
  date: '', returnDate: '', vehicle: '', passengers: '2', notes: '',
}

/**
 * Enquiry form. With no backend configured it hands the enquiry off to
 * WhatsApp as a pre-filled message — the fastest path to a reply for most
 * Indian travel businesses. To post to your own API instead, set
 * `endpoint` and the form will submit there.
 */
export default function BookingForm({ compact = false, endpoint = '', title = 'Get an Instant Quote' }) {
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    setErrors((x) => ({ ...x, [k]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Please enter your name'
    if (!/^[+]?[\d\s-]{10,15}$/.test(form.phone.trim())) e.phone = 'Enter a valid 10-digit mobile number'
    if (!form.from.trim()) e.from = 'Pickup city is required'
    if (!form.to.trim()) e.to = 'Destination is required'
    if (!form.date) e.date = 'Pick a travel date'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = async (ev) => {
    ev.preventDefault()
    if (!validate()) return
    setStatus('sending')

    const message = [
      `*New Booking Enquiry — ${site.shortName}*`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Trip type: ${form.tripType}`,
      `From: ${form.from}`,
      `To: ${form.to}`,
      `Travel date: ${form.date}`,
      form.returnDate ? `Return date: ${form.returnDate}` : '',
      `Passengers: ${form.passengers}`,
      form.vehicle ? `Preferred vehicle: ${form.vehicle}` : '',
      form.notes ? `Notes: ${form.notes}` : '',
    ].filter(Boolean).join('\n')

    if (endpoint) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        setStatus(res.ok ? 'sent' : 'error')
        if (res.ok) setForm(empty)
      } catch {
        setStatus('error')
      }
      return
    }

    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener')
    setStatus('sent')
  }

  return (
    <form className={`bookform${compact ? ' bookform--compact' : ''}`} onSubmit={onSubmit} noValidate>
      <div className="bookform__head">
        <h2 className="bookform__title">{title}</h2>
        <p className="bookform__sub">Fill this in and we will confirm your vehicle and a fixed fare within 15 minutes.</p>
      </div>

      <div className="bookform__grid">
        <Field label="Your Name" error={errors.name} required>
          <input type="text" value={form.name} onChange={set('name')} placeholder="e.g. Ramesh Kumar" autoComplete="name" />
        </Field>

        <Field label="Mobile Number" error={errors.phone} required>
          <input type="tel" value={form.phone} onChange={set('phone')} placeholder="e.g. 79824 71997" autoComplete="tel" />
        </Field>

        <Field label="Trip Type">
          <select value={form.tripType} onChange={set('tripType')}>
            {TRIP_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </Field>

        <Field label="Passengers">
          <select value={form.passengers} onChange={set('passengers')}>
            {['1', '2', '3', '4', '5', '6', '7-12', '13-20', '21-32', '33-45'].map((p) => (
              <option key={p} value={p}>{p} {p === '1' ? 'passenger' : 'passengers'}</option>
            ))}
          </select>
        </Field>

        <Field label="Pickup City" error={errors.from} required>
          <input type="text" value={form.from} onChange={set('from')} placeholder="e.g. New Delhi" />
        </Field>

        <Field label="Destination" error={errors.to} required>
          <input type="text" value={form.to} onChange={set('to')} placeholder="e.g. Jaisalmer" />
        </Field>

        <Field label="Travel Date" error={errors.date} required>
          <input type="date" value={form.date} onChange={set('date')} />
        </Field>

        <Field label="Return Date (optional)">
          <input type="date" value={form.returnDate} onChange={set('returnDate')} min={form.date || undefined} />
        </Field>

        <Field label="Preferred Vehicle" full>
          <select value={form.vehicle} onChange={set('vehicle')}>
            <option value="">Let us recommend one</option>
            {fleet.map((v) => (
              <option key={v.slug} value={v.name}>{v.name} — {v.seats} seater</option>
            ))}
          </select>
        </Field>

        {!compact && (
          <Field label="Anything else we should know?" full>
            <textarea rows={3} value={form.notes} onChange={set('notes')} placeholder="Child seat, extra luggage, specific pickup time…" />
          </Field>
        )}
      </div>

      <button className="btn btn--primary btn--block btn--lg" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : <><Icon name="whatsapp" size={18} /> Send Enquiry</>}
      </button>

      {status === 'sent' && (
        <p className="bookform__note bookform__note--ok" role="status">
          <Icon name="check" size={16} /> Enquiry sent. We will call you back shortly — or reach us directly on {site.phone}.
        </p>
      )}
      {status === 'error' && (
        <p className="bookform__note bookform__note--err" role="alert">
          Something went wrong. Please call us on <a href={`tel:${site.phoneRaw}`}>{site.phone}</a>.
        </p>
      )}
      <p className="bookform__fine">No advance payment needed to enquire. Your details are never shared.</p>
    </form>
  )
}

function Field({ label, children, error, required, full }) {
  return (
    <label className={`field${full ? ' field--full' : ''}${error ? ' field--error' : ''}`}>
      <span className="field__label">
        {label}{required && <span className="field__req" aria-hidden="true"> *</span>}
      </span>
      {children}
      {error && <span className="field__error">{error}</span>}
    </label>
  )
}
