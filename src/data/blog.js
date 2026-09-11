/**
 * Blog posts — the site's top-of-funnel content. Written as trip guides from
 * the people who drive these routes, not as invented customer testimonials.
 *
 * Photography is licensed monument and destination photography (credited on
 * /image-credits), chosen honestly rather than staged as "our customers".
 * Each post that would naturally carry a group or trip photo instead has a
 * `['userphoto', note]` block — a visible, honest placeholder — marking where
 * a real photo from an actual trip (with the travellers' permission) belongs.
 * Swap it for `['img', {...}]` once such a photo exists; see RichBlocks.jsx.
 *
 * `read` is a plain-English reading time, computed once here rather than at
 * render, so it never needs a client-side word count.
 */

const words = (blocks) =>
  blocks.reduce((n, [kind, v]) => {
    if (kind === 'p' || kind === 'tip') return n + String(v).split(/\s+/).length
    if (kind === 'ul') return n + v.join(' ').split(/\s+/).length
    if (kind === 'steps') return n + v.map((s) => s.title + ' ' + s.text).join(' ').split(/\s+/).length
    return n
  }, 0)

const readTime = (sections) => {
  const total = sections.reduce((n, s) => n + words(s.blocks), 0)
  return Math.max(3, Math.round(total / 200))
}

const raw = [
  {
    slug: 'delhi-to-agra-same-day-trip-train-vs-car',
    title: 'Delhi to Agra Same-Day Trip: Train vs Car',
    excerpt: 'Both get you to the Taj and back in a day. Here is the honest trade-off between the Gatimaan Express and a car with driver.',
    category: 'Planning',
    image: '/images/places/taj-mahal.jpg',
    imageAlt: 'Taj Mahal, Agra, on a same-day trip from Delhi',
    metaTitle: 'Delhi to Agra Same Day: Train vs Car — Which Is Better?',
    metaDescription: 'Gatimaan Express or a car with driver for a same-day Delhi to Agra trip? Compare cost, timing and flexibility, plus what a taxi actually costs.',
    keywords: 'same day Agra tour by train vs car, Delhi to Agra taxi same day, Gatimaan Express vs car, one day Agra trip from Delhi',
    published: '2026-01-15',
    sections: [
      {
        h2: 'The two ways to do it',
        blocks: [
          ['p', 'A same-day Agra trip from Delhi has exactly two practical options: the **Gatimaan Express**, India\'s fastest train, or a **car with driver** on the Yamuna Expressway. Both can have you at the Taj Mahal by mid-morning and back in Delhi that night — the difference is in what happens between the stations.'],
          ['h3', 'Gatimaan Express'],
          ['p', 'Leaves Hazrat Nizamuddin around 8:10 AM and reaches Agra Cantt in about 100 minutes. It is genuinely fast and comfortable, but you arrive without a vehicle — you still need an auto or a cab at the Agra end to reach the Taj, Agra Fort and back to the station in time for the return train, which typically leaves Agra in the early evening.'],
          ['h3', 'Car with driver'],
          ['p', 'About 230 km each way on the [Yamuna Expressway](/outstation-taxi-service-delhi), roughly 3½–4 hours depending on traffic. You leave from your own door, the car waits at every stop, and there is no fixed return time to watch the clock against — if the Taj queue is long or you want an extra hour at Agra Fort, the day simply runs long instead of ending at a train you cannot miss.'],
        ],
      },
      {
        h2: 'Cost and timing side by side',
        blocks: [
          ['table', {
            head: ['', 'Gatimaan Express', 'Car with driver'],
            rows: [
              ['Total travel time', '~2 hrs each way (train only)', '~3½–4 hrs each way (door to door)'],
              ['Local transport in Agra', 'Extra — auto or cab needed', 'Included — same car all day'],
              ['Flexibility', 'Fixed departure times', 'Leaves and returns on your schedule'],
              ['Best for', 'Solo travellers comfortable with local transport', 'Families, groups, or anyone who wants one vehicle all day'],
            ],
          }],
          ['p', 'A [Dzire or similar sedan](/fleet/maruti-suzuki-swift-dzire) for the round trip runs at the per-kilometre sedan rate — see current fares on our [outstation taxi page](/outstation-taxi-service-delhi) — with toll and parking added at actuals. For three or four people travelling together, the car usually works out close to the combined train fares, without the scramble to catch a return train.'],
        ],
      },
      {
        h2: 'Making the day work',
        blocks: [
          ['ul', [
            '**Leave by 6 AM** if going by car — you reach the Taj before the worst of the crowd and the midday heat.',
            '**Remember the Taj Mahal is closed on Fridays** — plan the trip around that regardless of which way you travel.',
            '**Agra Fort takes about 90 minutes** and pairs naturally with the Taj in the same morning.',
            '**Fatehpur Sikri** is a worthwhile detour if you have the car for the day — it adds roughly an hour each way and is impractical on the train-only plan.',
          ]],
          ['tip', 'Travelling with elderly parents or small children? The car wins outright — no station transfers, no queue for tickets, and stops whenever someone needs one.'],
        ],
      },
    ],
  },
  {
    slug: 'best-time-to-visit-taj-mahal',
    title: 'Best Time to Visit the Taj Mahal',
    excerpt: 'Season, day of the week and time of day all change the experience. Here is what actually matters.',
    category: 'Planning',
    image: '/images/places/taj-mahal.jpg',
    imageAlt: 'Taj Mahal at sunrise, Agra',
    metaTitle: 'Best Time to Visit the Taj Mahal — Season, Day & Hour',
    metaDescription: 'When to visit the Taj Mahal: best months, why Friday is the one day it is closed, and why sunrise beats every other hour of the day.',
    keywords: 'best time to visit Taj Mahal, Taj Mahal sunrise timing, Taj Mahal closed Friday, when to visit Agra',
    published: '2026-01-20',
    sections: [
      {
        h2: 'Season: October to March',
        blocks: [
          ['p', 'Agra is genuinely pleasant to walk around between **October and March** — daytime temperatures sit in the low-to-mid twenties Celsius, and the marble does not turn into a griddle underfoot by 10 AM. April through June push past 40°C, which is punishing rather than merely warm, and the monsoon months bring their own unpredictability.'],
        ],
      },
      {
        h2: 'Day of the week: never a Friday',
        blocks: [
          ['p', 'The **Taj Mahal is closed to visitors every Friday**, for prayers at the mosque inside the complex. It catches first-time visitors out more than any other planning detail — if your dates land on a Friday, either shift the day or plan Agra Fort and Fatehpur Sikri for that day instead and see the Taj on the day either side.'],
        ],
      },
      {
        h2: 'Time of day: sunrise, without much competition',
        blocks: [
          ['p', 'The Taj opens roughly 30 minutes before sunrise, and that first hour is worth planning the whole trip around: the light is soft, the marble has not yet started to glare, and the crowd is a fraction of what arrives by mid-morning. Gates open around 6 AM for most of the year — check the seasonal timing before you go.'],
          ['p', 'Midday is the least forgiving hour — hard light, full heat, the largest crowds. Late afternoon is the second-best window, with warmer light back on the marble as the day cools.'],
        ],
      },
      {
        h2: 'Getting there for sunrise',
        blocks: [
          ['p', 'A sunrise slot from Delhi means leaving well before dawn, which is exactly what a [same-day car trip](/blog/delhi-to-agra-same-day-trip-train-vs-car) makes possible — no train timetable to work around. Our [Golden Triangle tour](/tour-packages/golden-triangle-delhi-agra-jaipur) builds a sunrise Taj slot into day one for the same reason.'],
          ['userphoto', 'A sunrise photo from one of our own Golden Triangle trips will go here — if you travelled with us and would like your photo featured, let us know.'],
        ],
      },
    ],
  },
  {
    slug: 'things-to-do-in-jaipur-in-2-days',
    title: 'Things to Do in Jaipur in 2 Days',
    excerpt: 'The Pink City in a well-ordered two days — forts in the morning, bazaars in the evening, and nothing rushed.',
    category: 'Destinations',
    image: '/images/places/hawa-mahal.jpg',
    imageAlt: 'Hawa Mahal, Jaipur',
    metaTitle: 'Things to Do in Jaipur in 2 Days — A Practical Itinerary',
    metaDescription: 'A two-day Jaipur itinerary: Amber Fort, City Palace, Hawa Mahal, Jantar Mantar and the bazaars, sequenced to beat the crowds.',
    keywords: 'things to do in Jaipur in 2 days, Jaipur 2 day itinerary, Jaipur sightseeing plan, Amber Fort timing',
    published: '2026-01-25',
    sections: [
      {
        h2: 'Day one: Amber Fort and the old city',
        blocks: [
          ['p', '**Morning — Amber Fort.** Go first, before the tour coaches arrive. The fort sits on a hill outside the city and the light on the ramparts is best before 9 AM.'],
          ['p', '**Midday — City Palace and Jantar Mantar.** Both sit in the old city and their courtyards give shade through the hottest part of the day — a sensible pairing for the middle hours.'],
          ['p', '**Evening — Hawa Mahal and the bazaars.** The Palace of Winds photographs best in the late-afternoon light from across the street, and Johari Bazaar and Bapu Bazaar come alive as the day cools.'],
        ],
      },
      {
        h2: 'Day two: Nahargarh and the wider city',
        blocks: [
          ['p', '**Morning — Jal Mahal and a slower pace.** A photo stop at the lake palace, then whatever the first day left out — Albert Hall, the Birla Mandir, or simply more of the old city at a slower pace.'],
          ['p', '**Sunset — Nahargarh Fort.** The hill fort above the city gives the single best sunset view of Jaipur, looking down over the pink-washed old city as the light turns gold.'],
        ],
      },
      {
        h2: 'Getting the sequence right',
        blocks: [
          ['tip', 'The order matters more than the list. Amber Fort in the same slot as everyone else\'s tour bus turns the same sights into a day of queuing — starting early is the entire trick.'],
          ['p', 'We run a [one-day Jaipur city tour](/tour-packages/jaipur-one-day-city-tour) for visitors with less time, and the [Golden Triangle](/tour-packages/golden-triangle-delhi-agra-jaipur) and [Royal Rajasthan](/tour-packages/royal-rajasthan-grand-tour) packages both build Jaipur in with the same sequencing described here.'],
        ],
      },
    ],
  },
  {
    slug: 'how-to-reach-mahipalpur-from-igi-airport',
    title: 'How to Reach Mahipalpur from IGI Airport',
    excerpt: 'Mahipalpur sits right beside the airport — here is the fastest way there from each terminal.',
    category: 'Airport',
    image: '/images/places/igi-airport.jpg',
    imageAlt: 'Indira Gandhi International Airport, Terminal 3',
    metaTitle: 'How to Reach Mahipalpur from IGI Airport',
    metaDescription: 'Mahipalpur is minutes from IGI Airport along NH-48. Here is the quickest way there from Terminal 1, 2 and 3, by taxi or otherwise.',
    keywords: 'how to reach Mahipalpur from IGI airport, IGI airport to Mahipalpur distance, Mahipalpur near airport',
    published: '2026-02-01',
    sections: [
      {
        h2: 'The short answer',
        blocks: [
          ['p', 'Mahipalpur sits directly alongside NH-48, immediately south of the airport boundary — it is the closest built-up neighbourhood to Terminal 3, and the drive from any of the three terminals is normally under fifteen minutes outside peak traffic.'],
        ],
      },
      {
        h2: 'From each terminal',
        blocks: [
          ['ul', [
            '**Terminal 3** — the closest; a short run down NH-48 and off at the Mahipalpur flyover.',
            '**Terminal 1** — a little further round via the airport approach roads, still a short taxi ride.',
            '**Terminal 2** — similar distance to T1, on the domestic side.',
          ]],
        ],
      },
      {
        h2: 'By taxi',
        blocks: [
          ['p', 'A prepaid or pre-booked taxi is the simplest option, especially with luggage or at night. See our [IGI airport taxi service](/airport-taxi-igi-mahipalpur) — our own yard is in Rangpuri, right next to Mahipalpur, so pickups here are some of the quickest we run.'],
        ],
      },
    ],
  },
  {
    slug: 'best-areas-to-stay-near-delhi-airport',
    title: 'Best Areas to Stay Near Delhi Airport',
    excerpt: 'Aerocity, Mahipalpur or further into the city — where to book depending on your flight times and budget.',
    category: 'Airport',
    image: '/images/places/igi-airport.jpg',
    imageAlt: 'Delhi airport terminal',
    metaTitle: 'Best Areas to Stay Near Delhi Airport (IGI)',
    metaDescription: 'Aerocity vs Mahipalpur vs Vasant Kunj for a stay near IGI Airport — what each area suits, and how far each really is from the terminals.',
    keywords: 'best areas to stay near Delhi airport, Aerocity vs Mahipalpur, where to stay near IGI airport, hotels near IGI airport',
    published: '2026-02-05',
    sections: [
      {
        h2: 'Aerocity',
        blocks: [
          ['p', 'The purpose-built hotel district directly opposite Terminal 3, connected by the Airport Express metro. Mostly business and upscale hotels, walkable restaurants, and the shortest possible transfer to the terminal — the obvious choice for a short layover or an early flight where every extra minute of sleep counts.'],
        ],
      },
      {
        h2: 'Mahipalpur',
        blocks: [
          ['p', 'Along NH-48 just south of the airport, with a much wider range of budget and mid-range hotels and guest houses than Aerocity. A few minutes further by road, noticeably cheaper, and still close enough that a 4 AM pickup is routine rather than a favour.'],
        ],
      },
      {
        h2: 'Vasant Kunj and RK Puram',
        blocks: [
          ['p', 'A short taxi ride further in, with more residential character and easy access to South Delhi\'s malls and markets — worth considering if you have a day or two before or after the flight and want somewhere less airport-adjacent to spend it.'],
        ],
      },
      {
        h2: 'Whichever you choose',
        blocks: [
          ['p', 'All three are within our normal pickup radius — see our [IGI airport taxi service](/airport-taxi-igi-mahipalpur) for fixed fares and flight-tracked timing regardless of which neighbourhood you land in.'],
        ],
      },
    ],
  },
  {
    slug: 'how-much-does-delhi-to-agra-taxi-cost',
    title: 'How Much Does a Delhi to Agra Taxi Cost?',
    excerpt: 'A plain breakdown of what a Delhi–Agra taxi actually costs, by vehicle, with tolls and permits accounted for.',
    category: 'Fares',
    image: '/images/places/taj-mahal.jpg',
    imageAlt: 'Road to Agra from Delhi',
    metaTitle: 'Delhi to Agra Taxi Cost — A Real Breakdown by Vehicle',
    metaDescription: 'What a Delhi to Agra taxi actually costs by vehicle type, including toll and driver allowance — sedan, SUV and tempo traveller fares compared.',
    keywords: 'how much does a Delhi to Agra taxi cost, Delhi Agra cab fare, Delhi Agra taxi price, one way cab Delhi to Agra',
    published: '2026-02-10',
    sections: [
      {
        h2: 'The distance that sets the price',
        blocks: [
          ['p', 'Delhi to Agra is roughly 230 km one way on the Yamuna Expressway — call it 460–480 km for a same-day round trip once you add the driving done inside Agra itself. Every fare below is built on that distance.'],
        ],
      },
      {
        h2: 'By vehicle',
        blocks: [
          ['table', {
            head: ['Vehicle', 'Rate', 'Same-day round trip (approx.)', 'Best for'],
            rows: [
              ['[Maruti Suzuki Swift](/fleet/maruti-suzuki-swift)', '₹11/km', '~₹5,100–5,300 + toll', 'Two to three people, budget trip'],
              ['[Maruti Suzuki Dzire](/fleet/maruti-suzuki-swift-dzire)', '₹12/km', '~₹5,500–5,800 + toll', 'Four passengers, two suitcases'],
              ['[Toyota Innova Crysta](/fleet/toyota-innova-crysta)', '₹19/km', '~₹8,700–9,100 + toll', 'Families, full luggage'],
            ],
            note: 'Figures are approximate and depend on the exact pickup point, actual distance driven and time of travel; toll on the Yamuna Expressway and Agra parking are added at actuals, and a driver night allowance applies if the day runs past 10 PM.',
          }],
        ],
      },
      {
        h2: 'What is never added on top',
        blocks: [
          ['ul', [
            'No surge pricing for early-morning departures or Friday-evening returns.',
            'No "waiting charge" surprise — the free waiting window is agreed before you leave.',
            'Toll and parking billed at exactly what the receipt says, never rounded up.',
          ]],
          ['p', 'For the full comparison against going by train, see our [same-day Agra: train vs car](/blog/delhi-to-agra-same-day-trip-train-vs-car) guide, or get a fixed quote from our [outstation taxi page](/outstation-taxi-service-delhi).'],
        ],
      },
    ],
  },
  {
    slug: 'weekend-getaways-from-delhi',
    title: 'Weekend Getaways from Delhi',
    excerpt: 'Seven places within a comfortable weekend\'s drive of Delhi, sorted by how far you actually want to go.',
    category: 'Destinations',
    image: '/images/places/rishikesh.jpg',
    imageAlt: 'Laxman Jhula, Rishikesh — a weekend getaway from Delhi',
    metaTitle: 'Best Weekend Getaways from Delhi (By Car)',
    metaDescription: 'Seven weekend getaways from Delhi within a comfortable drive — Rishikesh, Neemrana, Jaipur, Mandawa and more, with distances and drive times.',
    keywords: 'weekend getaways from Delhi, weekend trips near Delhi, short trips from Delhi by car, Rishikesh weekend trip',
    published: '2026-02-14',
    sections: [
      {
        h2: 'Under 250 km — a genuine two-day trip',
        blocks: [
          ['ul', [
            '**Mathura & Vrindavan** (~180 km) — a full day of darshan, easily done as a long day trip or a relaxed overnight.',
            '**Rishikesh** (~220–240 km) — the river, the Laxman Jhula bridge and a genuinely different pace from Delhi.',
            '**Neemrana / Alwar side** — forts and heritage stays a short drive down NH-48.',
          ]],
        ],
      },
      {
        h2: '250–350 km — worth the extra hour',
        blocks: [
          ['ul', [
            '**Jaipur** (~280 km) — see our [one-day Jaipur itinerary](/blog/things-to-do-in-jaipur-in-2-days) if you can stretch the weekend to two nights.',
            '**Agra** (~230 km) — the Taj is a weekend trip in its own right; see our [Delhi–Agra cost breakdown](/blog/how-much-does-delhi-to-agra-taxi-cost).',
            '**Shekhawati (Mandawa, Nawalgarh)** (~250 km) — painted havelis and almost no tour buses; our [Shekhawati Haveli Trail](/tour-packages/shekhawati-haveli-heritage-trail) covers it properly.',
            '**Chandigarh** — a clean, planned city and a good stopover if you are continuing to the hills.',
          ]],
        ],
      },
      {
        h2: 'Choosing between them',
        blocks: [
          ['tip', 'For a weekend rather than a week, stay under 300 km each way — anything further eats too much of the two days in the car. Our [outstation taxi service](/outstation-taxi-service-delhi) covers every route above with a fixed fare agreed before you leave.'],
        ],
      },
    ],
  },
  {
    slug: 'best-hill-stations-near-delhi-for-summer',
    title: 'Best Hill Stations Near Delhi for Summer',
    excerpt: 'When Delhi hits 40°C, these are the hill towns within reach of a day or two on the road.',
    category: 'Destinations',
    image: '/images/places/manali.jpg',
    imageAlt: 'Solang Valley, Manali',
    metaTitle: 'Best Hill Stations Near Delhi for Summer',
    metaDescription: 'Escape the Delhi heat: Shimla, Manali, Mussoorie and Nainital compared by distance, drive time and what each hill station is actually like.',
    keywords: 'best hill stations near Delhi for summer, Delhi to Shimla taxi, Delhi to Manali taxi, hill stations near Delhi',
    published: '2026-02-19',
    sections: [
      {
        h2: 'Mussoorie — the closest',
        blocks: [
          ['p', 'The nearest proper hill station to Delhi, with sweeping views over the Doon Valley and a manageable drive that suits a shorter trip.'],
        ],
      },
      {
        h2: 'Shimla — a classic, and closer than people think',
        blocks: [
          ['p', 'About 350 km from Delhi, roughly 7–8 hours by road. The Mall Road, the Ridge and the old colonial architecture make it the hill station most people picture first, and it is reachable comfortably inside a long day.'],
        ],
      },
      {
        h2: 'Manali — worth the extra day',
        blocks: [
          ['p', 'About 540 km, 12–13 hours, and almost always better split with an overnight stop rather than driven straight through. Solang Valley and the approach to Rohtang reward the extra distance for anyone chasing snow into June.'],
        ],
      },
      {
        h2: 'Nainital — the lake option',
        blocks: [
          ['p', 'About 310 km, 7–8 hours, and the obvious choice if a lake rather than a mountain ridge is the draw.'],
        ],
      },
      {
        h2: 'Which vehicle',
        blocks: [
          ['p', 'For any of these, ground clearance matters more than horsepower — we recommend the [Mahindra Scorpio-N or Toyota Innova Crysta](/7-seater-suv-on-rent) for the climbs, and the 12 seater over the 17 seater [tempo traveller](/tempo-traveller-on-rent) on the narrower hill roads. See fares and routes on our [outstation taxi page](/outstation-taxi-service-delhi).'],
        ],
      },
    ],
  },
]

export const posts = raw
  .map((p) => ({ ...p, readMins: readTime(p.sections) }))
  .sort((a, b) => new Date(b.published) - new Date(a.published))

export const getPostBySlug = (slug) => posts.find((p) => p.slug === slug)

export const blogCategories = ['All', ...new Set(posts.map((p) => p.category))]
