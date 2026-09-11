/**
 * Photo library and attribution.
 *
 * Every photograph on the site is a freely licensed image from Wikimedia
 * Commons, cropped and resized for the web. The vehicle photos show the
 * *model* we run, not the individual vehicle in our yard — the fleet sections
 * say so, and /image-credits carries the attribution the licences require.
 *
 * Replacing one with a photo of our own vehicle: overwrite the file (and its
 * `-sm` twin) at the same path, then delete its entry below. Nothing else
 * changes — every page reads the path from the data files.
 */

const BY_SA_4 = { license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/' }
const BY_SA_3 = { license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/' }
const BY_SA_2 = { license: 'CC BY-SA 2.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/' }
const BY_4 = { license: 'CC BY 4.0', licenseUrl: 'https://creativecommons.org/licenses/by/4.0/' }
const BY_3 = { license: 'CC BY 3.0', licenseUrl: 'https://creativecommons.org/licenses/by/3.0/' }
const CC0 = { license: 'CC0 (public domain dedication)', licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/' }
const PD = { license: 'Public domain', licenseUrl: '' }

const commons = (file) => `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replace(/ /g, '_'))}`

const CROPPED = 'Cropped and resized'
const BLURRED = 'Cropped, resized; number plate and third-party markings blurred'

export const photoCredits = [
  // ── Fleet ────────────────────────────────────────────────────
  { src: '/images/fleet/maruti-suzuki-swift-dzire.jpg', subject: 'Maruti Suzuki Dzire', file: 'Maruti Suzuki Dzire VXi VVT.JPG', author: 'Biswarup Ganguly', ...BY_3, changes: CROPPED },
  { src: '/images/fleet/honda-amaze.jpg', subject: 'Honda Amaze', file: 'Honda Amaze (front).png', author: 'Agratsa', ...BY_SA_4, changes: CROPPED },
  { src: '/images/fleet/maruti-suzuki-swift.jpg', subject: 'Suzuki Swift (same body as the Maruti Suzuki Swift)', file: 'SUZUKI SWIFT XR-Limited 2018 Front.jpg', author: 'Suzuki-Ham', ...CC0, changes: CROPPED },
  { src: '/images/fleet/toyota-innova-crysta.jpg', subject: 'Toyota Innova Crysta', file: 'Toyota Innova Crysta 2.4 Z front right.jpg', author: 'Premnath Kudva', ...BY_SA_4, changes: CROPPED },
  { src: '/images/fleet/maruti-suzuki-ertiga.jpg', subject: 'Maruti Suzuki Ertiga', file: '2022 Maruti Suzuki Ertiga LXi.jpg', author: 'Ramakrishna Mission Vidyapith', ...PD, changes: CROPPED },
  { src: '/images/fleet/mahindra-scorpio-n.jpg', subject: 'Mahindra Scorpio-N', file: '2024 Mahindra Scorpio Z8L front.jpg', author: 'LuvsMG481', ...BY_SA_4, changes: BLURRED },
  { src: '/images/fleet/toyota-fortuner.jpg', subject: 'Toyota Fortuner', file: '2015 Toyota Fortuner (New Zealand).jpg', author: 'NZ Car Freak', ...BY_SA_4, changes: CROPPED },
  { src: '/images/fleet/mercedes-benz-e-class.jpg', subject: 'Mercedes-Benz E-Class', file: 'MERCEDES-BENZ E-CLASS (W213) China.jpg', author: 'Dinkun Chen', ...BY_SA_4, changes: BLURRED },
  { src: '/images/fleet/force-tempo-traveller-12.jpg', subject: 'Force Traveller', file: 'Force Traveller, Leh-Manali Highway.jpg', author: 'Yann Forget', ...BY_SA_3, changes: CROPPED },
  { src: '/images/fleet/force-tempo-traveller-17.jpg', subject: 'Force Traveller', file: 'ForceTravellerfront.JPG', author: 'OnkelFordTaunus', ...BY_SA_3, changes: CROPPED },
  { src: '/images/fleet/luxury-tempo-traveller-maharaja.jpg', subject: 'Force Traveller, luxury conversion', file: 'Force Traveller Luxury.jpg', author: 'वंपायर (edited by Mr.choppers)', ...BY_SA_2, changes: CROPPED },
  { src: '/images/fleet/traveller-non-ac-26.jpg', subject: 'Force Traveller 26', file: 'Force Motors - Traveller 26 - Agra 2014-05-14 4222.JPG', author: 'Biswarup Ganguly', ...BY_3, changes: BLURRED },
  { src: '/images/fleet/mini-bus-21-seater.jpg', subject: 'Tata mini bus', file: 'Private Bus Asanang Tura Oct24 A7CR 03808.jpg', author: 'Timothy A. Gonsalves', ...BY_SA_4, changes: CROPPED },
  { src: '/images/fleet/mini-bus-32-seater.jpg', subject: 'Tourist bus on the Mount Abu road', file: 'Mount Abu by Photographer Mustafa Khargonewala alias Camaal Mustafa Sikander aka Lens Naayak 012.jpg', author: 'Camaal Mustafa Sikander (Lens Naayak)', ...BY_SA_4, changes: BLURRED },
  { src: '/images/fleet/volvo-luxury-coach-45.jpg', subject: 'Volvo 9400 coach', file: 'KSRTC-Airavat-Club-Class-Volvo-B9R.jpg', author: 'Rsrikanth05', ...BY_SA_4, changes: BLURRED },

  // ── Places ───────────────────────────────────────────────────
  { src: '/images/hero/amber-fort-dusk.jpg', thumb: '/images/hero/amber-fort-dusk-mobile.jpg', subject: 'Amber Fort, Jaipur — homepage header', file: 'Amber Fort-Jaipur-India0033.JPG', author: 'Diego Delso', ...BY_SA_4, changes: 'Cropped; Toyota Innova Crysta (credited above) composited into the scene' },
  { src: '/images/places/amber-fort.jpg', subject: 'Amber Fort and Maota Lake, Jaipur', file: '20191219 Fort Amber, Amer, Jaipur 0955 9481.jpg', author: 'Jakub Hałun', ...BY_SA_4, changes: `${CROPPED}; also used as a page header` },
  { src: '/images/places/amber-fort-hill.jpg', subject: 'Amber Fort, Jaipur', file: 'Amber Fort Jaipur 01.jpg', author: 'Rijin S', ...BY_SA_4, changes: CROPPED },
  { src: '/images/places/taj-mahal.jpg', subject: 'Taj Mahal, Agra', file: 'Taj Mahal, Agra, India edit2.jpg', author: 'Yann; edited by King of Hearts', ...BY_SA_4, changes: CROPPED },
  { src: '/images/places/jodhpur-blue-city.jpg', subject: 'Jodhpur from Mehrangarh Fort', file: 'Remote view of Jodhpur city from Mehrangarh Fort 08.jpg', author: 'Pinakpani', ...BY_4, changes: `${CROPPED}; also used as a page header` },
  { src: '/images/places/mandawa-haveli.jpg', subject: 'Painted haveli, Mandawa', file: 'Haveli, Mandawa 3.jpg', author: 'Clément Bardot', ...BY_SA_4, changes: `${CROPPED}; also used as a page header` },
  { src: '/images/places/mandawa-painted-gate.jpg', subject: 'Painted gateway, Mandawa', file: 'India Mandawa fuerte palacio 03 ni.JPG', author: 'Nicolás Pérez', ...BY_SA_3, changes: CROPPED },
  { src: '/images/places/khatu-shyam-temple.jpg', subject: 'Khatu Shyam Ji temple', file: 'Khatu Shyam Ji - panoramio.jpg', author: 'Indrapal Jangid', ...BY_SA_3, changes: CROPPED },
  { src: '/images/places/hawa-mahal.jpg', subject: 'Hawa Mahal, Jaipur', file: 'East facade Hawa Mahal Jaipur from ground level (July 2022) - img 01.jpg', author: 'Chainwit.', ...BY_SA_4, changes: `${CROPPED}; also used as a page header` },
  { src: '/images/places/sam-sand-dunes.jpg', subject: 'Sam sand dunes, Jaisalmer', file: 'Sam sand dunes.jpg', author: 'Manish Pareek', ...BY_SA_3, changes: `${CROPPED}; also used as a page header` },
  { src: '/images/places/lake-pichola.jpg', subject: 'Lake Pichola and City Palace, Udaipur', file: '20191207 Lake Pichola, City Palace, Udaipur, 1516 7254.jpg', author: 'Jakub Hałun', ...BY_SA_4, changes: `${CROPPED}; also used as a page header` },
  { src: '/images/places/india-gate.jpg', subject: 'India Gate, New Delhi', file: 'India Gate, New Delhi from West.jpg', author: 'Nikhilb239', ...BY_SA_4, changes: `${CROPPED}; also used as a page header` },
  { src: '/images/places/jaisalmer-fort.jpg', subject: 'Jaisalmer Fort', file: 'Jaisalmer Fort, India.jpg', author: 'Clément Bardot', ...BY_SA_4, changes: `${CROPPED}; also used as a page header` },
  { src: '/images/places/nahargarh-sunset.jpg', subject: 'Sunset from Nahargarh Fort, Jaipur', file: 'Sunset at Nahargarh Fort.jpg', author: 'Tanmay Singh', ...BY_SA_4, changes: `${CROPPED}; also used behind the booking banner` },
  { src: '/images/places/igi-airport.jpg', subject: 'Indira Gandhi International Airport, Terminal 3', file: 'Delhi airport terminal 3.jpg', author: 'Ravi Dwivedi', ...BY_SA_4, changes: `${CROPPED}; also used as a page header` },
  { src: '/images/places/manali.jpg', subject: 'Solang Valley, Manali', file: 'Solang Valley ,Manali, Himachal Pardes, India.JPG', author: 'Harvinder Chandigarh', ...BY_SA_4, changes: `${CROPPED}; also used as a page header` },
  { src: '/images/places/rishikesh.jpg', subject: 'Laxman Jhula, Rishikesh', file: 'Laxman Jhula Bridge.jpg', author: 'Dey.sandip', ...BY_SA_4, changes: CROPPED },
  { src: '/images/places/kedarnath.jpg', subject: 'Kedarnath Temple', file: 'Kedarnath Temple in Rainy season.jpg', author: 'Shivam Kumar 766', ...BY_SA_4, changes: CROPPED },
  { src: '/images/places/prem-mandir.jpg', subject: 'Prem Mandir, Vrindavan', file: 'Prem Mandir (Temple of Love).jpg', author: 'Imakanksha', ...BY_SA_4, changes: CROPPED },
  { src: '/images/places/golden-temple.jpg', subject: 'Golden Temple, Amritsar', file: 'Golden Temple, Amritsar 01.jpg', author: 'Bernard Gagnon', ...BY_SA_4, changes: CROPPED },
  { src: '/images/places/cyber-city.jpg', subject: 'Cyber City, Gurgaon', file: 'Gurgaon CyberHub.jpg', author: 'Pithwilds', ...BY_SA_3, changes: `${CROPPED}; also used as a page header` },
  { src: '/images/hero/bg-highway.jpg', thumb: '/images/hero/bg-highway-m.jpg', subject: 'Yamuna Expressway', file: 'Yamuna Expressway Taj Mahal Sign.jpg', author: 'Qirille', ...BY_SA_4, changes: 'Cropped; used as a page header' },
].map((p) => ({ ...p, source: commons(p.file) }))

/** The 600×400 card-grid twin of a fleet or places photo. */
export const smallSrc = (src) => src.replace(/\.jpg$/, '-sm.jpg')

/**
 * `src` + `srcSet` for an <img>. Fleet and places photos ship at 600 and
 * 1200 wide; anything else (a legacy SVG, say) is passed through unchanged.
 */
export const responsive = (src) =>
  /^\/images\/(fleet|places|blog)\/.+\.jpg$/.test(src)
    ? { src, srcSet: `${smallSrc(src)} 600w, ${src} 1200w` }
    : { src }
