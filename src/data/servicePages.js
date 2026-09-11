/**
 * Dedicated service landing pages — one per high-intent search: IGI airport
 * transfers, outstation cabs, corporate travel, and the Delhi NCR travel-agency
 * hub. One entry = one prerendered route at `/${slug}` with its own title,
 * description, H1, copy, FAQs and Service schema.
 *
 * The copy uses only facts stated elsewhere on the site — rates from fleet.js
 * and vehicleTypes.js, policies from content.js and services.js. Distances and
 * drive times are approximate and say so; nothing here is a new promise.
 *
 * Sections are made of blocks rendered by <RichBlocks>:
 *   ['p', text] ['h3', text] ['ul', items] ['tip', text]
 *   ['table', { head, rows, note }] ['chips', items] ['steps', [{ title, text }]]
 * Inline, `[label](/path)` is a link and `**text**` is bold.
 */

// Explicit extension: scripts/prerender.js loads this through Node's resolver.
import { vehicleTypes } from './vehicleTypes.js'

const typeBySlug = (slug) => vehicleTypes.find((t) => t.slug === slug)

/** IGI fares, read from the category pages so the two can never disagree. */
const airportFareRows = vehicleTypes.map((t) => [
  `[${t.navLabel}](/${t.slug})`,
  t.seats,
  t.airportRate.replace(' from IGI to Delhi NCR', ''),
  `₹${t.fromRatePerKm}/km`,
])

export const servicePages = [
  /* ── IGI Airport taxi ─────────────────────────────────────────── */
  {
    slug: 'airport-taxi-igi-mahipalpur',
    navLabel: 'Airport Taxi (IGI)',
    serviceType: 'Airport transfer',
    metaTitle: 'IGI Airport Taxi — Pickup & Drop near Mahipalpur',
    metaDescription:
      'IGI Airport pickup and drop service near Mahipalpur, 3 km from Terminal 3. Flight-tracked, fixed fares from ₹1,100, open 24×7. Call or WhatsApp to book.',
    keywords:
      'IGI airport pickup and drop service, taxi service near IGI airport, cab booking IGI airport Delhi, airport taxi service Mahipalpur, Aerocity taxi, Delhi airport taxi fare, airport cab to Gurgaon',
    eyebrow: 'IGI Airport · T1 · T2 · T3 · 24×7',
    h1: 'IGI Airport Pickup and Drop Service',
    h1Accent: 'A 24×7 taxi near IGI Airport, from Rangpuri–Mahipalpur',
    heroBg: '/images/hero/bg-airport.jpg',
    image: '/images/places/igi-airport.jpg',
    imageAlt: 'Indira Gandhi International Airport, New Delhi — airport taxi pickup and drop',
    summary:
      'Our yard is in Rangpuri Extension, next to Mahipalpur and about three kilometres from Terminal 3 — so the car for a 3 AM landing is already nearby, not crossing the city. Give us the flight number and the pickup moves with the flight.',
    facts: [
      { label: 'Distance to T3', value: 'About 3 km from our yard' },
      { label: 'Free waiting', value: '60 minutes on arrivals' },
      { label: 'Fares from', value: '₹1,100 · sedan, IGI to Delhi NCR' },
      { label: 'Booking desk', value: 'Open 24×7, every day' },
      { label: 'Meet & greet', value: 'Name placard at the arrival gate', wide: true },
    ],
    sections: [
      {
        eyebrow: 'Both directions',
        title: 'Airport Pickup and Drop, Done Properly',
        blocks: [
          ['h3', 'Arriving at IGI'],
          ['p', 'We track your flight number, so an early or delayed landing changes the pickup time without a phone call. The driver waits at the arrival gate with your name on a placard, and the first **60 minutes after landing are free** — enough for immigration, baggage and a queue at the currency counter.'],
          ['h3', 'Flying out'],
          ['p', 'We fix the pickup time with you around your departure, leaving room for traffic on NH-48 and the airport approach roads. Hotels in Aerocity and guest houses in Mahipalpur are a few minutes from our yard, which is why an early-morning departure pickup is routine for us rather than a favour.'],
          ['h3', 'All three terminals'],
          ['p', 'We cover Terminal 1, Terminal 2 and Terminal 3. Airlines do move flights between terminals, so tell us the terminal printed on your ticket and we check it again on the day.'],
          ['tip', 'Last-minute flight? We can usually have a car with you within 45 minutes anywhere in Delhi NCR — call rather than WhatsApp so we can dispatch while we talk.'],
        ],
      },
      {
        eyebrow: 'Fixed before you travel',
        title: 'IGI Airport Taxi Fares',
        tint: true,
        wide: true,
        blocks: [
          ['table', {
            head: ['Vehicle', 'Seats', 'IGI ↔ Delhi NCR', 'Per km'],
            rows: airportFareRows,
            note: 'Starting fares for a drop within Delhi NCR; the exact figure depends on the distance to your address and is confirmed in writing before you travel. Toll and airport parking are billed at actuals, and a driver night allowance applies after 10 PM.',
          }],
        ],
      },
      {
        eyebrow: 'Where we drive',
        title: 'Areas We Cover from the Airport',
        blocks: [
          ['p', 'Most of our airport work runs between the terminals and the neighbourhoods closest to our yard:'],
          ['chips', ['Mahipalpur', 'Aerocity', 'Rangpuri', 'Kapashera', 'Vasant Kunj', 'Vasant Vihar', 'RK Puram', 'Munirka', 'Dwarka', 'NH-48 / Gurgaon Road']],
          ['p', 'We run just as often to **Gurgaon, Noida, South Delhi** and the rest of Delhi NCR — and straight from the arrivals gate to [Agra, Jaipur, Chandigarh, Haridwar and Rishikesh](/outstation-taxi-service-delhi) if your trip starts the moment you land.'],
        ],
      },
      {
        eyebrow: 'Choosing the car',
        title: 'Which Vehicle for Your Airport Run',
        tint: true,
        blocks: [
          ['ul', [
            '**One to three travellers, two large bags** — a [4 seater sedan](/4-seater-car-rental) such as the Dzire or the automatic Honda Amaze.',
            '**Four to six travellers, or four or more suitcases** — a [7 seater SUV](/7-seater-suv-on-rent); the Innova Crysta takes six people with full luggage.',
            '**Seven to seventeen travellers** — a [tempo traveller](/tempo-traveller-on-rent), with a roof carrier fitted free on request.',
            '**Delegations and wedding guests** — a [mini bus or coach](/mini-bus-on-rent) with an under-floor luggage bay.',
            '**VIP arrivals** — the [Mercedes-Benz E-Class](/fleet/mercedes-benz-e-class) or [Toyota Fortuner](/fleet/toyota-fortuner), with a uniformed chauffeur.',
          ]],
        ],
      },
    ],
    included: [
      'Flight tracking, with the pickup adjusted for delays',
      'Meet-and-greet with a name placard at the arrival gate',
      '60 minutes of free waiting after landing',
      'Bottled water on airport pickups',
      'A fixed fare agreed before you travel — no surge at night or in the rain',
    ],
    excluded: [
      'Toll and airport parking, billed at actuals with receipts',
      'Driver night allowance on trips after 10 PM',
      'Waiting beyond the free hour, at the rate agreed when you book',
    ],
    faqs: [
      {
        q: 'How far is your office from IGI Airport?',
        a: 'Our yard is in Rangpuri Extension, next to Mahipalpur, roughly 3 km from Terminal 3. That is why we can cover pickups at any hour without charging a premium for them: the car is already close by.',
      },
      {
        q: 'What happens if my flight is delayed?',
        a: 'Nothing you need to do. We track the flight number and move the pickup to the actual landing time, and the 60 minutes of free waiting start from when you land, not from the scheduled time.',
      },
      {
        q: 'How much is a taxi from IGI Airport to Gurgaon or Noida?',
        a: 'A sedan from IGI Airport starts at ₹1,100 for drops within Delhi NCR, and a 7 seater SUV at ₹1,600. The exact fare depends on the distance to your address, so send us the drop location on WhatsApp and we reply with a fixed fare in writing.',
      },
      {
        q: 'Can I book an airport taxi for a flight at 3 or 4 AM?',
        a: 'Yes. The booking desk is open 24×7 and night airport runs are our most frequent booking. Book the evening before and you will have the driver’s name, number and vehicle registration before you sleep.',
      },
      {
        q: 'Do you pick up from Aerocity hotels and Mahipalpur guest houses?',
        a: 'Routinely. Aerocity and Mahipalpur are a few minutes from our yard, so an early departure pickup from a hotel near the airport is one of the easiest runs we do.',
      },
    ],
    related: [
      { to: '/outstation-taxi-service-delhi', title: 'Outstation Cabs', text: 'Straight from the airport to Agra, Jaipur or the hills', image: '/images/places/taj-mahal.jpg' },
      { to: '/4-seater-car-rental', title: '4 Seater Car Rental', text: 'Dzire, Amaze and Swift from ₹11/km', image: '/images/fleet/maruti-suzuki-swift-dzire.jpg' },
      { to: '/7-seater-suv-on-rent', title: '7 Seater SUV on Rent', text: 'For families with full luggage', image: '/images/fleet/toyota-innova-crysta.jpg' },
    ],
    cta: {
      title: 'Landing soon? Book your airport taxi.',
      text: 'Send the flight number and drop address — we reply with a fixed fare, usually within 15 minutes.',
    },
  },

  /* ── Outstation cabs ──────────────────────────────────────────── */
  {
    slug: 'outstation-taxi-service-delhi',
    navLabel: 'Outstation Cabs',
    serviceType: 'Outstation taxi',
    metaTitle: 'Outstation Taxi Service Delhi — One Way & Round Trip',
    metaDescription:
      'Outstation taxi service from Delhi to Agra, Jaipur, Shimla, Manali and Haridwar — one way or round trip, from ₹11/km with driver. WhatsApp for a fixed quote.',
    keywords:
      'outstation taxi service Delhi, one way cab Delhi to Jaipur, one way cab Delhi to Agra, Delhi to Agra taxi same day, Delhi to Manali taxi, Delhi to Shimla taxi, car rental with driver Delhi, outstation cab Mahipalpur',
    eyebrow: 'One way · Round trip · All India permits',
    h1: 'Outstation Taxi Service from Delhi',
    h1Accent: 'One-way drops and round trips, with driver',
    heroBg: '/images/hero/bg-highway.jpg',
    image: '/images/fleet/toyota-innova-crysta.jpg',
    imageAlt: 'Toyota Innova Crysta — outstation taxi from Delhi with driver',
    summary:
      'Picked up from your home, hotel or the airport anywhere in Delhi NCR, driven by someone who has done the route many times, and billed at a per-kilometre rate agreed before you leave. Tolls and permits appear on the bill at exactly what was paid.',
    facts: [
      { label: 'Sedan', value: 'From ₹11/km with driver' },
      { label: '7 seater SUV', value: 'From ₹15/km' },
      { label: 'Tempo traveller', value: 'From ₹26/km' },
      { label: 'Daily minimum', value: '250 km on round trips' },
      { label: 'Permits', value: 'All-India tourist permit on every vehicle', wide: true },
    ],
    sections: [
      {
        eyebrow: 'How you travel',
        title: 'One-Way Drop or Round Trip?',
        blocks: [
          ['h3', 'One-way drops'],
          ['p', 'On routes where we regularly have a return booking — **Delhi–Jaipur, Delhi–Agra, Delhi–Chandigarh, Delhi–Haridwar** and Jodhpur–Udaipur — you pay for the one-way distance only, not for the car coming back empty. A Dzire from Delhi to Jaipur, for example, is roughly ₹3,400 plus toll and state permit.'],
          ['h3', 'Round trips'],
          ['p', 'The car and driver stay with you for the whole trip, you stop where you like, and the fare is the distance covered at the per-kilometre rate, with a minimum of 250 km a day (300 km for large coaches). Travel further than the minimum and you pay only for the actual distance.'],
          ['tip', 'Same-day Agra? It is about 230 km each way on the Yamuna Expressway. Leave by 6 AM and remember the Taj Mahal is closed on Fridays — [read our same-day Agra guide](/blog/delhi-to-agra-same-day-trip-train-vs-car).'],
        ],
      },
      {
        eyebrow: 'Where people go',
        title: 'Popular Outstation Routes from Delhi',
        tint: true,
        wide: true,
        blocks: [
          ['table', {
            head: ['Route', 'Approx. distance', 'Typical drive', 'Good to know'],
            rows: [
              ['Delhi → Agra', '230 km', '3½–4 hours', 'Same-day return is common; one-way drops available'],
              ['Delhi → Jaipur', '280 km', '5–6 hours', 'One-way drop available · [Jaipur itinerary](/blog/things-to-do-in-jaipur-in-2-days)'],
              ['Delhi → Mathura & Vrindavan', '180 km', '3–3½ hours', 'Darshan timings planned into the day'],
              ['Delhi → Haridwar / Rishikesh', '220–240 km', '5–6 hours', 'Popular weekend and yatra run'],
              ['Delhi → Chandigarh', '250 km', '4½–5 hours', 'One-way drop available'],
              ['Delhi → Shimla', '350 km', '7–8 hours', 'SUV recommended for the hill section'],
              ['Delhi → Manali', '540 km', '12–13 hours', 'Usually split with an overnight stop'],
              ['Delhi → Nainital', '310 km', '7–8 hours', 'Hill-experienced drivers'],
              ['Delhi → Amritsar', '450 km', '8–9 hours', 'Long day — start early'],
              ['Delhi → Khatu Shyam Ji', '270 km', '5–6 hours', 'See our [darshan package](/tour-packages/khatu-shyam-salasar-balaji-darshan)'],
            ],
            note: 'Distances and times are approximate, from central Delhi, and vary with traffic and the exact pickup point.',
          }],
        ],
      },
      {
        eyebrow: 'No surprises',
        title: 'How Outstation Fares Work',
        blocks: [
          ['ul', [
            '**Per-kilometre rate** — covers the vehicle, fuel and driver. Sedans from ₹11/km, SUVs from ₹15/km, tempo travellers from ₹26/km and buses from ₹30/km.',
            '**Daily minimum** — 250 km a day on round trips (300 km for large coaches).',
            '**Driver night allowance** — ₹300 to ₹900 a night depending on the vehicle, on trips that run past 10 PM or span several days.',
            '**Toll, parking and state permits** — billed at actuals with receipts, never marked up or bundled into a "surcharge".',
            '**Long trips** — bookings over five days or above 2,000 km get a reduced per-km rate; ask for the slab when you enquire.',
          ]],
          ['p', 'Compare every vehicle and its rate on the [fleet page](/fleet).'],
        ],
      },
      {
        eyebrow: 'Hills and groups',
        title: 'The Right Vehicle for the Road',
        tint: true,
        blocks: [
          ['p', 'For **Shimla, Manali, Mussoorie and Nainital** we recommend the [Mahindra Scorpio-N](/fleet/mahindra-scorpio-n) or [Innova Crysta](/fleet/toyota-innova-crysta): ground clearance and torque matter on the climbs. For groups on hill roads, the [12 seater tempo traveller](/fleet/force-tempo-traveller-12) handles the bends far better than the longer 17 seater.'],
          ['p', 'Would rather have the route planned for you? Our [tour packages](/tour-packages) — the Golden Triangle, the Rajasthan circuits and the Shekhawati trail — include the vehicle, the driver and a day-by-day itinerary.'],
        ],
      },
    ],
    included: [
      'Vehicle, fuel and an experienced driver',
      'Pickup from home, hotel or the airport anywhere in Delhi NCR',
      'All-India tourist permit, comprehensive insurance and fitness certificate',
      'Stops along the way for meals and sightseeing',
      'A written quote before you travel',
    ],
    excluded: [
      'Toll tax, parking and state entry permits — at actuals, with receipts',
      'Driver night allowance on overnight trips',
      'Hill-station permits where a state levies them',
    ],
    faqs: [
      {
        q: 'Do you offer one-way cabs from Delhi to Jaipur or Agra?',
        a: 'Yes. On routes where we regularly have a return booking — Delhi to Jaipur, Agra, Chandigarh and Haridwar, and Jodhpur to Udaipur — you pay for the one-way distance only. A Dzire from Delhi to Jaipur is roughly ₹3,400 plus toll and state permit.',
      },
      {
        q: 'How is an outstation taxi fare calculated?',
        a: 'Distance × the per-kilometre rate for the vehicle, which covers fuel and the driver, with a 250 km per day minimum on round trips. Toll, parking and state permits are added at actuals, plus a driver night allowance on overnight trips.',
      },
      {
        q: 'Can I go from Delhi to Agra and back in one day by taxi?',
        a: 'Yes, it is one of our most common trips — about 230 km each way on the Yamuna Expressway. Leave around 6 AM, give the Taj Mahal and Agra Fort the middle of the day, and you are back in Delhi by the evening. The Taj is closed on Fridays.',
      },
      {
        q: 'Which vehicle is best for a Delhi to Manali or Shimla trip?',
        a: 'For up to six people, the Mahindra Scorpio-N or Toyota Innova Crysta — both handle the hill sections comfortably. For bigger groups, the 12 seater tempo traveller rather than the 17 seater, which is harder to manoeuvre on narrow hill roads.',
      },
      {
        q: 'Can I stop at places along the way?',
        a: 'Yes. On a round trip the car is yours for the day, so meal stops, a temple or a detour are part of it. Tell us the stops when you book so the quote includes any extra distance.',
      },
    ],
    related: [
      { to: '/tour-packages', title: 'Tour Packages', text: 'Routes planned day by day, vehicle included', image: '/images/places/hawa-mahal.jpg' },
      { to: '/7-seater-suv-on-rent', title: '7 Seater SUV on Rent', text: 'Innova, Ertiga, Scorpio-N and Fortuner', image: '/images/fleet/mahindra-scorpio-n.jpg' },
      { to: '/tempo-traveller-on-rent', title: 'Tempo Traveller on Rent', text: '9, 12 and 17 seaters for groups', image: '/images/fleet/force-tempo-traveller-12.jpg' },
    ],
    cta: {
      title: 'Planning a road trip out of Delhi?',
      text: 'Send the route, dates and number of travellers — we reply with the right vehicle and a fixed quote.',
    },
  },

  /* ── Corporate travel ─────────────────────────────────────────── */
  {
    slug: 'corporate-travel-delhi',
    navLabel: 'Corporate Travel',
    serviceType: 'Corporate travel management',
    metaTitle: 'Corporate Travel Service in Delhi — Cabs & Shuttles',
    metaDescription:
      'Corporate travel service in Delhi NCR: employee shuttles, executive cars, airport transfers and offsite coaches, billed monthly with GST. Ask for a rate card.',
    keywords:
      'corporate travel service Delhi, corporate travel management Delhi, employee transport Gurgaon, corporate car rental Delhi NCR, executive car hire Delhi, staff shuttle bus Delhi, corporate cab service Mahipalpur',
    eyebrow: 'Rate contracts · GST invoicing · Named account manager',
    h1: 'Corporate Travel Service in Delhi',
    h1Accent: 'Employee shuttles, executive cars and event transport',
    heroBg: '/images/hero/bg-cyber-city.jpg',
    image: '/images/fleet/mercedes-benz-e-class.jpg',
    imageAlt: 'Mercedes-Benz E-Class — executive car for corporate travel in Delhi',
    summary:
      'Monthly and annual contracts for company transport — employee pickup and drop shuttles, executive cars on retainer, airport transfers for visiting staff and coaches for offsites — with consolidated GST invoicing, a duty slip for every trip and one named account manager.',
    facts: [
      { label: 'Contracts', value: 'Monthly and annual rates' },
      { label: 'Billing', value: 'GST invoice with duty slips' },
      { label: 'Shuttles', value: 'Tempo travellers and mini buses' },
      { label: 'Executive cars', value: 'Amaze, Innova, Fortuner, E-Class' },
      { label: 'Airport', value: 'IGI Terminal 3 is about 3 km from our yard', wide: true },
    ],
    sections: [
      {
        eyebrow: 'What we run',
        title: 'Transport for Every Part of the Business',
        blocks: [
          ['h3', 'Employee shuttles'],
          ['p', 'Fixed morning and evening routes on a [tempo traveller](/tempo-traveller-on-rent) or [mini bus](/mini-bus-on-rent), sized to the headcount and charged at a fixed monthly rate per vehicle.'],
          ['h3', 'Executive and client cars'],
          ['p', 'The automatic [Honda Amaze](/fleet/honda-amaze) for day-to-day client movement, the [Innova Crysta](/fleet/toyota-innova-crysta) for teams, and the [Fortuner](/fleet/toyota-fortuner) or [Mercedes-Benz E-Class](/fleet/mercedes-benz-e-class) — with a uniformed chauffeur — when the guest is senior.'],
          ['h3', 'Airport transfers for visiting staff'],
          ['p', 'Meet-and-greet at IGI with a name placard, flight tracking and 60 minutes of free waiting — see our [airport taxi service](/airport-taxi-igi-mahipalpur).'],
          ['h3', 'Offsites, conferences and events'],
          ['p', 'Tempo travellers from 9 to 17 seats and buses from 21 to 45, with two drivers as standard on overnight coach journeys. For an offsite outside Delhi, our [outstation service](/outstation-taxi-service-delhi) covers the route end to end.'],
          ['h3', 'Monthly and long-term rental'],
          ['p', 'A car and driver for a month or a season, with servicing and insurance handled by us and a replacement vehicle if yours goes in for service.'],
        ],
      },
      {
        eyebrow: 'For the finance team',
        title: 'Billing That Reconciles',
        tint: true,
        blocks: [
          ['ul', [
            '**Monthly credit cycle** once the account is set up after the first booking.',
            '**One consolidated GST invoice** a month, with a duty slip for every trip.',
            '**Fixed monthly rate per vehicle** on shuttle and retainer contracts.',
            '**Toll, parking and permits** at actuals, each with its receipt.',
            '**Priority allocation** during peak season, when vehicles are hardest to find.',
          ]],
        ],
      },
      {
        eyebrow: 'Duty of care',
        title: 'Drivers and Compliance',
        blocks: [
          ['p', 'Every driver holds a valid commercial licence, is **police-verified**, has at least five years of highway experience and works in uniform. Every vehicle carries an all-India tourist permit, comprehensive insurance, a current fitness certificate and pollution certificate — all kept in the vehicle for inspection.'],
        ],
      },
      {
        eyebrow: 'Getting started',
        title: 'How a Rate Contract Starts',
        tint: true,
        blocks: [
          ['steps', [
            { title: 'Share the requirement', text: 'Routes, shift timings, headcount and the cars your executives use.' },
            { title: 'Get a proposal', text: 'We recommend vehicles for each need and quote a fixed monthly rate.' },
            { title: 'Start the account', text: 'A named account manager, and the monthly credit cycle after the first booking.' },
            { title: 'Monthly review', text: 'One invoice with duty slips; routes and vehicles adjusted as the team changes.' },
          ]],
        ],
      },
    ],
    included: [
      'Named account manager on one number',
      'Consolidated monthly GST invoice with duty slips',
      'Police-verified, uniformed drivers',
      'Replacement vehicle on long-term rentals during servicing',
      'Two drivers on overnight coach journeys',
    ],
    excluded: [
      'Toll, parking and state permits — at actuals, with receipts',
      'Driver night allowance on overnight trips',
    ],
    faqs: [
      {
        q: 'Can company trips be billed monthly on one invoice?',
        a: 'Yes. Once the account is set up after the first booking, trips are billed on a monthly credit cycle with one consolidated GST invoice and a duty slip for each trip, which makes reimbursement and accounting straightforward.',
      },
      {
        q: 'Can you run a daily shuttle for our employees?',
        a: 'Yes — fixed morning and evening routes on a tempo traveller or mini bus sized to your headcount, at a fixed monthly rate per vehicle. Share the pickup points and shift timings and we propose routes and vehicles.',
      },
      {
        q: 'Do you provide cars for visiting clients and senior executives?',
        a: 'Yes. The automatic Honda Amaze for everyday client movement, and the Toyota Fortuner or Mercedes-Benz E-Class with a uniformed chauffeur for senior guests, including meet-and-greet at IGI Airport.',
      },
      {
        q: 'Can you move a whole team for an offsite outside Delhi?',
        a: 'Yes. Tempo travellers seat 9 to 17 and our buses 21 to 45, and every vehicle carries an all-India tourist permit. On overnight coach journeys two drivers are standard.',
      },
    ],
    related: [
      { to: '/airport-taxi-igi-mahipalpur', title: 'IGI Airport Taxi', text: 'Meet-and-greet for visiting staff', image: '/images/places/igi-airport.jpg' },
      { to: '/mini-bus-on-rent', title: 'Mini Bus & Coach Hire', text: '21 to 45 seats for shuttles and events', image: '/images/fleet/mini-bus-21-seater.jpg' },
      { to: '/travel-agency-delhi-ncr', title: 'Group Tours from Delhi NCR', text: 'Offsites and team trips, planned', image: '/images/places/manali.jpg' },
    ],
    cta: {
      title: 'Need transport for your team?',
      text: 'Tell us the routes, timings and headcount — we propose vehicles and a fixed monthly rate.',
    },
  },

  /* ── Delhi NCR travel agency & destinations hub ───────────────── */
  {
    slug: 'travel-agency-delhi-ncr',
    navLabel: 'Destinations & Delhi NCR',
    serviceType: 'Travel agency and tour operator',
    priority: 0.8,
    metaTitle: 'Travel Agency in Delhi NCR — Tours, Cabs & Group Trips',
    metaDescription:
      'Travel agency in Delhi NCR for Gurgaon, Noida and South Delhi: tour packages, outstation cabs and group trips to Agra, Jaipur and Manali. Get a quote.',
    keywords:
      'travel agency in Delhi NCR, travel agency in Delhi, best travel agency in Delhi NCR, tour operator in Delhi, Delhi tour packages, travel agency Gurgaon, travel agency Noida, travel agency South Delhi, Shimla Manali tour package, Rishikesh Haridwar tour package, Char Dham yatra package Delhi, group tour packages Delhi NCR, school educational tour Delhi',
    eyebrow: 'Delhi · Gurgaon · Noida · South Delhi',
    h1: 'Travel Agency in Delhi NCR',
    h1Accent: 'Tours, cabs and group trips from Gurgaon, Noida and South Delhi',
    heroBg: '/images/hero/bg-manali.jpg',
    image: '/images/places/taj-mahal.jpg',
    imageAlt: 'Taj Mahal, Agra — a tour from Delhi NCR',
    summary:
      'We plan the trip, quote a fixed price and drive it ourselves — a tour operator and a cab service in one, based in Rangpuri near Mahipalpur since 2012. From a weekend in Rishikesh to a ten-day Rajasthan circuit, the people who plan your route are the people who run it.',
    facts: [
      { label: 'Based in', value: 'Rangpuri, near Mahipalpur' },
      { label: 'Operating since', value: '2012' },
      { label: 'Group sizes', value: '1 to 45 travellers' },
      { label: 'Permits', value: 'All-India tourist permits' },
      { label: 'Pickups', value: 'Anywhere in Delhi NCR — Gurgaon, Noida, South Delhi', wide: true },
    ],
    sections: [
      {
        eyebrow: 'Where we pick up',
        title: 'Serving All of Delhi NCR',
        blocks: [
          ['h3', 'Closest to our yard'],
          ['chips', ['Mahipalpur', 'Rangpuri', 'IGI Airport', 'Aerocity', 'Kapashera', 'Vasant Kunj', 'Vasant Vihar', 'RK Puram', 'Munirka', 'Dwarka', 'NH-48 / Gurgaon Road']],
          ['p', 'These neighbourhoods sit around the airport and NH-48, a short run from our yard in Rangpuri — which is why early-morning starts and airport pickups here cost no more than a midday booking.'],
          ['h3', 'Travel agency for Gurgaon'],
          ['p', 'Cyber City, Golf Course Road, Sohna Road and the rest of Gurgaon are a straight run down NH-48. Most of what we do there is [corporate travel](/corporate-travel-delhi), airport drops and weekend trips out of the city.'],
          ['h3', 'Travel agency for Noida'],
          ['p', 'We pick up across Noida and Greater Noida — and the Yamuna Expressway to Agra and Mathura begins on that side of the city, so an Agra day trip from Noida starts with a head start.'],
          ['h3', 'Travel agency for South Delhi'],
          ['p', 'Saket, Hauz Khas, Greater Kailash, Vasant Kunj and Vasant Vihar are regular pickup points for family holidays, pilgrimages and airport runs.'],
          ['h3', 'The rest of Delhi NCR'],
          ['p', 'Ghaziabad, Faridabad and every part of Delhi are covered for outstation trips and tours. Tell us the pickup address and it is built into the written quote.'],
        ],
      },
      {
        eyebrow: 'Where we go',
        title: 'Popular Trips from Delhi',
        tint: true,
        wide: true,
        blocks: [
          ['cards', [
            { title: 'Agra & the Taj Mahal', text: 'About 230 km on the Yamuna Expressway — a day trip, or the first stop of the Golden Triangle.', image: '/images/places/taj-mahal.jpg', to: '/tour-packages/golden-triangle-delhi-agra-jaipur' },
            { title: 'Jaipur & Rajasthan', text: 'Jaipur is about 280 km away; the full circuit takes in Jodhpur, Jaisalmer and Udaipur.', image: '/images/places/hawa-mahal.jpg', to: '/tour-packages/royal-rajasthan-grand-tour' },
            { title: 'Shimla & Manali', text: 'Shimla is about 350 km and Manali about 540 km — hill roads where an SUV with clearance earns its rate.', image: '/images/places/manali.jpg', to: '/outstation-taxi-service-delhi' },
            { title: 'Rishikesh & Haridwar', text: 'Around 220–240 km — a favourite weekend, and the start of the yatra routes into the hills.', image: '/images/places/rishikesh.jpg', to: '/outstation-taxi-service-delhi' },
            { title: 'Char Dham Yatra', text: 'Yamunotri, Gangotri, Kedarnath and Badrinath by road, with hill-experienced drivers and vehicles sized to the group.', image: '/images/places/kedarnath.jpg', to: '/tempo-traveller-on-rent' },
            { title: 'Mathura & Vrindavan', text: 'About 180 km — a day of darshan with the timings planned in.', image: '/images/places/prem-mandir.jpg', to: '/outstation-taxi-service-delhi' },
            { title: 'Amritsar', text: 'About 450 km to the Golden Temple — a long day on the road, best started early.', image: '/images/places/golden-temple.jpg', to: '/outstation-taxi-service-delhi' },
            { title: 'Khatu Shyam & Salasar', text: 'The Shekhawati temple circuit we run more often than any other.', image: '/images/places/khatu-shyam-temple.jpg', to: '/tour-packages/khatu-shyam-salasar-balaji-darshan' },
          ]],
        ],
      },
      {
        eyebrow: 'Travelling together',
        title: 'Group, School and Corporate Tours',
        blocks: [
          ['p', '**Group tours.** Extended families, temple committees and friends travelling together move in one [tempo traveller](/tempo-traveller-on-rent) or [mini bus](/mini-bus-on-rent), so nobody is separated and the luggage rides with its owners.'],
          ['p', '**School and college educational tours.** Buses with a public address system and a microphone at the front for the teacher-in-charge, two-by-two seating and an emergency exit, on routes like Agra and Mathura.'],
          ['p', '**Corporate groups.** Offsites, conferences and team trips — see [corporate travel](/corporate-travel-delhi).'],
          ['p', 'Hotels can be booked alongside the vehicle at our negotiated rates, passed on without markup. Or browse our ready-made [tour packages](/tour-packages).'],
        ],
      },
    ],
    faqs: [
      {
        q: 'Are you a travel agency or a cab company?',
        a: 'Both. We plan itineraries and quote tour packages like a travel agency, and we run our own fleet with our own drivers — so the people who plan the route are the people who drive it.',
      },
      {
        q: 'Do you pick up from Gurgaon and Noida?',
        a: 'Yes, from anywhere in Delhi NCR — Gurgaon, Noida, Greater Noida, Ghaziabad, Faridabad and every part of Delhi. The pickup address is built into the written quote.',
      },
      {
        q: 'Can you plan a Shimla–Manali trip from Delhi?',
        a: 'Yes. We plan the route and stops, and recommend a Scorpio-N or Innova Crysta for up to six people or a 12 seater tempo traveller for groups. Manali is about 12–13 hours from Delhi, so most people break the journey overnight.',
      },
      {
        q: 'Do you arrange school and college tours?',
        a: 'Yes. Our buses carry a public address system with a microphone for the teacher-in-charge, and every vehicle has an all-India tourist permit, insurance and a current fitness certificate.',
      },
      {
        q: 'Can you book hotels as well as the vehicle?',
        a: 'Yes. We have long-standing rates with hotels from budget to five-star and pass on the negotiated rate without any markup. Booking your own hotels is equally fine.',
      },
    ],
    related: [
      { to: '/tour-packages', title: 'Tour Packages', text: 'Golden Triangle, Rajasthan and Shekhawati', image: '/images/places/amber-fort-hill.jpg' },
      { to: '/corporate-travel-delhi', title: 'Corporate Travel', text: 'Shuttles, executive cars and offsites', image: '/images/fleet/mercedes-benz-e-class.jpg' },
      { to: '/outstation-taxi-service-delhi', title: 'Outstation Cabs', text: 'One-way drops and round trips', image: '/images/fleet/toyota-innova-crysta.jpg' },
    ],
    cta: {
      title: 'Tell us where you want to go.',
      text: 'Share your dates, group size and a rough idea of the route — we come back with a plan and a fixed price.',
    },
  },
]

export const getServicePage = (slug) => servicePages.find((s) => s.slug === slug)

/** The category pages these service pages lean on, for cross-linking. */
export const relatedTypes = ['tempo-traveller-on-rent', 'mini-bus-on-rent'].map(typeBySlug)
