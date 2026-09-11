/**
 * The /faq page, grouped by topic. This is the one place the site-wide
 * questions carry FAQPage markup — the homepage shows a few of them as a
 * teaser without markup, because Google asks for a repeated Q&A to be marked
 * up only once. Service and vehicle pages keep their own, page-specific FAQs.
 *
 * Questions are phrased the way people ask them out loud, for voice search
 * and featured snippets; answers lead with the direct answer.
 */
import { faqs } from './content.js'

const pick = (start) => faqs.find((f) => f.q.startsWith(start))

export const faqGroups = [
  {
    id: 'booking',
    title: 'Booking & payment',
    items: [
      pick('How do I book'),
      pick('What is included in the rental rate'),
      pick('Is there a minimum kilometre'),
      pick('Can I cancel or reschedule'),
      pick('What payment methods'),
      pick('Do you offer GST invoices'),
    ],
  },
  {
    id: 'airport',
    title: 'Airport & Mahipalpur',
    items: [
      {
        q: 'Is there a 24 hour taxi service near IGI Airport?',
        a: 'Yes. Our booking desk is open 24×7, every day including public holidays, and our yard in Rangpuri — next to Mahipalpur — is about 3 km from Terminal 3, so a car for a night landing is already close by.',
      },
      {
        q: 'How do I get from IGI Airport to Mahipalpur?',
        a: 'Mahipalpur sits beside the airport along NH-48, a short taxi ride from Terminal 3 outside peak hours. Book a pickup with us and the driver meets you at the arrival gate with your name on a placard.',
      },
      {
        q: 'Can I get a taxi from IGI Airport at the last minute?',
        a: 'Usually, yes — we can normally have a car with you within 45 minutes anywhere in Delhi NCR. Call rather than message for a last-minute booking so we can dispatch while we talk.',
      },
      {
        q: 'Is it better to stay in Aerocity or Mahipalpur before a flight?',
        a: 'Both are minutes from the terminals. Aerocity has the larger hotels and an Airport Express metro station; Mahipalpur, along NH-48, has more budget hotels and guest houses. We pick up from both for early departures.',
      },
    ],
  },
  {
    id: 'outstation',
    title: 'Outstation trips & tours',
    items: [
      pick('Do you provide one-way drop'),
      pick('Which cities and states'),
      {
        q: 'How much does a taxi from Delhi to Agra cost?',
        a: 'It depends on the vehicle: a same-day return is roughly 460–480 km, charged at the per-kilometre rate — from ₹11/km in a Swift or ₹12/km in a Dzire — plus toll and parking at actuals. We break the numbers down in our Delhi to Agra taxi cost guide on the blog.',
      },
      {
        q: 'When is the best season for a Golden Triangle trip?',
        a: 'October to March, when Delhi, Agra and Jaipur are pleasant to walk all day. Summer trips are cheaper but hot, so plan the monuments for early morning.',
      },
      {
        q: 'Can you change a tour package to fit my dates?',
        a: 'Every package is a starting point. We can add a day, drop a city or start from wherever your flight lands, then quote the revised trip in writing before you commit.',
      },
    ],
  },
  {
    id: 'vehicles',
    title: 'Vehicles & drivers',
    items: [
      pick('Are your drivers verified'),
      pick('Are the vehicles insured'),
      {
        q: 'What is the difference between a 7 seater SUV and a tempo traveller?',
        a: 'A 7 seater SUV such as the Innova Crysta suits up to six people with luggage. A tempo traveller seats 9 to 17 with push-back seats and a separate luggage bay, so a group of eight or more travels together in one vehicle.',
      },
      {
        q: 'Do you have luxury cars for weddings?',
        a: 'Yes — the Mercedes-Benz E-Class and Toyota Fortuner, kept in showroom condition, with a uniformed chauffeur. Floral decoration can be arranged at cost.',
      },
      {
        q: 'Will I get the driver’s details before the trip?',
        a: 'Yes. The evening before you travel we send the driver’s name, phone number and the vehicle registration.',
      },
    ],
  },
  {
    id: 'groups',
    title: 'Corporate & groups',
    items: [
      {
        q: 'Do you rent cars with a driver by the month?',
        a: 'Yes. Monthly and long-term rentals include the driver, with servicing and insurance handled by us and a replacement vehicle if yours goes in for service. Rates drop beyond 30 days.',
      },
      {
        q: 'How many vehicles can you provide for a wedding?',
        a: 'We regularly run three to five vehicles across a two-day function — mini buses for guests, a decorated luxury car for the couple and sedans for family — with one coordinator on a single number throughout.',
      },
      {
        q: 'Do you organise school and college trips?',
        a: 'Yes. Our buses have a public address system with a microphone for the teacher-in-charge, two-by-two seating and an emergency exit, and every vehicle carries an all-India tourist permit and insurance.',
      },
    ],
  },
]

/** Every question on the page, flattened for the FAQPage schema. */
export const allFaqPageItems = faqGroups.flatMap((g) => g.items)
