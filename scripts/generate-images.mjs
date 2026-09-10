/**
 * Generates the site's illustration set into public/images/.
 *
 * Why generated art rather than stock photography: the business has no photo
 * library yet, and a page of empty grey boxes reads as broken. These are flat,
 * on-brand scene illustrations — distinct silhouettes per vehicle body type and
 * per destination — so every card looks deliberate today, weighs a couple of
 * kilobytes, and stays sharp at any size.
 *
 * They are meant to be replaced. Drop a real photograph into public/images and
 * point the `image` field in src/data/fleet.js (or `src` in content.js) at it;
 * nothing else needs to change.
 *
 *   node scripts/generate-images.mjs
 *
 * ── Open Graph twins ──────────────────────────────────────────────────────
 * public/images/og/<name>.jpg holds a 1200x630 raster of each illustration.
 * Social scrapers refuse SVG, so Seo.jsx rewrites `/images/x.svg` to
 * `/images/og/x.jpg` for the og:image tag, and the prerender audit fails the
 * build if one of those files is missing.
 *
 * They are committed rather than built, because rasterising needs a renderer
 * this project does not otherwise depend on. To regenerate after editing the
 * artwork, on macOS:
 *
 *   for f in public/images/{vehicle,scene}-*.svg; do
 *     n=$(basename "$f" .svg)
 *     qlmanage -t -s 1200 -o /tmp "$f"
 *     sips -c 630 1200 "/tmp/$n.svg.png" --out "/tmp/$n-crop.png"
 *     sips -s format jpeg -s formatOptions 82 "/tmp/$n-crop.png" \
 *          --out "public/images/og/$n.jpg"
 *   done
 *
 * On Linux, `rsvg-convert -w 1200 -h 750` then a centre crop to 630 produces
 * the same result.
 */

import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const outDir = path.resolve(__dirname, '..', 'public', 'images')
fs.mkdirSync(outDir, { recursive: true })

/* ── Palette ───────────────────────────────────────────────────────────────
   Each tone is a sky pair plus a ground colour, drawn from the same Rajasthani
   textile palette as the stylesheet so the artwork sits inside the brand rather
   than beside it. */

const TONES = {
  maroon:  { a: '#5f1e27', b: '#8a1c2b', ground: '#3a1218', sun: '#e8b93f' },
  indigo:  { a: '#26304f', b: '#3d4a73', ground: '#1a2136', sun: '#f6d98a' },
  forest:  { a: '#1e3b30', b: '#2f5a48', ground: '#15291f', sun: '#e8b93f' },
  plum:    { a: '#3b2340', b: '#5c3562', ground: '#281829', sun: '#f2c96b' },
  rose:    { a: '#5c2436', b: '#8a3a52', ground: '#3d1724', sun: '#f6d98a' },
  teal:    { a: '#173f45', b: '#256069', ground: '#0f2a2f', sun: '#e8b93f' },
  amber:   { a: '#6b3b12', b: '#9c5c1c', ground: '#452508', sun: '#ffd77a' },
  sand:    { a: '#7a5626', b: '#a8783a', ground: '#553a17', sun: '#ffe3a3' },
  slate:   { a: '#2b3138', b: '#454f59', ground: '#1d2226', sun: '#e8b93f' },
  saffron: { a: '#7a3d10', b: '#b8631c', ground: '#4f2609', sun: '#ffdd8f' },
  blue:    { a: '#1c3355', b: '#2d5183', ground: '#132239', sun: '#f6d98a' },
  gold:    { a: '#6a4a12', b: '#9c7420', ground: '#443008', sun: '#ffe3a3' },
}

const W = 800
const H = 500
const GROUND = 372        // horizon for vehicle scenes — leaves room for road
const SCENE_GROUND = 430  // horizon for destination scenes — landmark sits higher

/** Shared gradient/filter defs. `id` is suffixed so two inlined SVGs never collide. */
const defs = (id, tone) => `
  <defs>
    <linearGradient id="sky-${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${tone.a}"/>
      <stop offset="1" stop-color="${tone.b}"/>
    </linearGradient>
    <radialGradient id="glow-${id}" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="${tone.sun}" stop-opacity="0.55"/>
      <stop offset="1" stop-color="${tone.sun}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="body-${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fdf6e8"/>
      <stop offset="1" stop-color="#e6d9c2"/>
    </linearGradient>
    <linearGradient id="glass-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${tone.a}" stop-opacity="0.85"/>
      <stop offset="1" stop-color="${tone.b}" stop-opacity="0.7"/>
    </linearGradient>
  </defs>`

/** Sky, sun glow, horizon haze and ground — the stage every scene sits on. */
const stage = (id, tone, ground = GROUND) => `
  <rect width="${W}" height="${H}" fill="url(#sky-${id})"/>
  <circle cx="622" cy="140" r="190" fill="url(#glow-${id})"/>
  <circle cx="622" cy="140" r="46" fill="${tone.sun}" opacity="0.9"/>
  <rect y="${ground}" width="${W}" height="${H - ground}" fill="${tone.ground}"/>
  <rect y="${ground}" width="${W}" height="3" fill="${tone.sun}" opacity="0.5"/>`

/** Dashed centre line, drawn in perspective so the scene reads as a road. */
const road = (tone) => `
  <g opacity="0.35">
    ${[0, 1, 2, 3, 4, 5].map((i) => {
      const x = 40 + i * 132
      return `<rect x="${x}" y="${GROUND + 46}" width="72" height="7" rx="3.5" fill="${tone.sun}"/>`
    }).join('\n    ')}
  </g>`

/* ── Vehicle drawing ───────────────────────────────────────────────────────
   One parametric routine for every body type. Feeding it different
   proportions — bonnet length, roof height, window count, axle positions —
   produces silhouettes that are genuinely distinguishable at card size, which
   a single generic "car" shape would not be. */

function vehicle(id, spec) {
  const {
    x = 70, baseY = GROUND, len, bodyH, roofH,
    noseSlope = 26, tailSlope = 18,
    wheels, wheelR = 30, windows, accent = '#e8b93f',
  } = spec

  const bodyTop = baseY - bodyH
  const roofTop = bodyTop - roofH
  const noseX = x
  const tailX = x + len

  // Lower body: a slab with softened corners.
  const body = `M${noseX} ${baseY}
    L${noseX} ${bodyTop + 14} Q${noseX} ${bodyTop} ${noseX + 16} ${bodyTop}
    L${tailX - 16} ${bodyTop} Q${tailX} ${bodyTop} ${tailX} ${bodyTop + 14}
    L${tailX} ${baseY} Z`

  // Cabin: a trapezoid whose slopes give each body type its character.
  const cabX1 = noseX + (spec.cabinFront ?? 90)
  const cabX2 = tailX - (spec.cabinRear ?? 40)
  const cabin = `M${cabX1} ${bodyTop}
    L${cabX1 + noseSlope} ${roofTop} Q${cabX1 + noseSlope + 8} ${roofTop - 8} ${cabX1 + noseSlope + 22} ${roofTop - 8}
    L${cabX2 - tailSlope - 22} ${roofTop - 8} Q${cabX2 - tailSlope - 8} ${roofTop - 8} ${cabX2 - tailSlope} ${roofTop}
    L${cabX2} ${bodyTop} Z`

  return `
  <g>
    <ellipse cx="${x + len / 2}" cy="${baseY + 12}" rx="${len / 2 + 14}" ry="13" fill="#000" opacity="0.28"/>
    <path d="${body}" fill="url(#body-${id})"/>
    <path d="${cabin}" fill="url(#body-${id})"/>
    <g>${windows.map((w) => `<rect x="${w.x}" y="${roofTop + 4}" width="${w.w}" height="${w.h ?? roofH - 6}" rx="5" fill="url(#glass-${id})"/>`).join('\n      ')}</g>
    <rect x="${noseX + 4}" y="${bodyTop + 16}" width="16" height="11" rx="4" fill="${accent}"/>
    <rect x="${tailX - 18}" y="${bodyTop + 16}" width="14" height="11" rx="4" fill="#e05a4a"/>
    <rect x="${noseX + 10}" y="${baseY - 12}" width="${len - 20}" height="4" rx="2" fill="#000" opacity="0.16"/>
    ${wheels.map((wx) => `
    <circle cx="${wx}" cy="${baseY}" r="${wheelR}" fill="#20191a"/>
    <circle cx="${wx}" cy="${baseY}" r="${wheelR * 0.52}" fill="#8e8378"/>
    <circle cx="${wx}" cy="${baseY}" r="${wheelR * 0.22}" fill="#3a3330"/>`).join('')}
  </g>`
}

/** Evenly spaced side windows, for the van and bus bodies. */
const windowRun = (startX, count, w, gap) =>
  Array.from({ length: count }, (_, i) => ({ x: startX + i * (w + gap), w }))

const VEHICLES = {
  hatchback: {
    tone: 'teal', label: 'Hatchback',
    spec: { len: 430, bodyH: 66, roofH: 62, noseSlope: 30, tailSlope: 8,
            cabinFront: 78, cabinRear: 26, wheels: [175, 415], wheelR: 30,
            windows: [{ x: 190, w: 82 }, { x: 282, w: 66 }] },
  },
  sedan: {
    tone: 'indigo', label: 'Sedan',
    spec: { len: 520, bodyH: 62, roofH: 60, noseSlope: 34, tailSlope: 30,
            cabinFront: 110, cabinRear: 96, wheels: [190, 470], wheelR: 31,
            windows: [{ x: 222, w: 84 }, { x: 316, w: 76 }] },
  },
  suv: {
    tone: 'forest', label: 'SUV / MUV',
    spec: { len: 530, bodyH: 78, roofH: 74, noseSlope: 26, tailSlope: 10,
            cabinFront: 104, cabinRear: 28, wheels: [196, 476], wheelR: 36,
            windows: [{ x: 214, w: 78 }, { x: 300, w: 70 }, { x: 378, w: 62 }] },
  },
  luxury: {
    tone: 'gold', label: 'Luxury Sedan',
    spec: { len: 560, bodyH: 58, roofH: 56, noseSlope: 40, tailSlope: 36,
            cabinFront: 128, cabinRear: 108, wheels: [200, 494], wheelR: 32,
            windows: [{ x: 248, w: 88 }, { x: 346, w: 80 }] },
  },
  tempo: {
    tone: 'plum', label: 'Tempo Traveller',
    spec: { len: 600, bodyH: 92, roofH: 86, noseSlope: 20, tailSlope: 6,
            cabinFront: 74, cabinRear: 16, wheels: [178, 552], wheelR: 34,
            windows: [{ x: 158, w: 62 }, ...windowRun(230, 4, 62, 12)] },
  },
  bus: {
    tone: 'rose', label: 'Mini Bus',
    spec: { x: 56, len: 660, bodyH: 104, roofH: 100, noseSlope: 14, tailSlope: 6,
            cabinFront: 56, cabinRear: 14, wheels: [170, 590], wheelR: 38,
            windows: [{ x: 136, w: 58 }, ...windowRun(204, 6, 58, 12)] },
  },
  coach: {
    tone: 'slate', label: 'Luxury Coach',
    spec: { x: 40, len: 700, bodyH: 116, roofH: 108, noseSlope: 10, tailSlope: 4,
            cabinFront: 46, cabinRear: 10, wheels: [156, 566, 636], wheelR: 38,
            windows: [{ x: 112, w: 56 }, ...windowRun(178, 7, 56, 11)] },
  },
}

const vehicleScene = (key) => {
  const { tone: toneKey, spec, label } = VEHICLES[key]
  const tone = TONES[toneKey]
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${label} illustration">
  <title>${label}</title>${defs(key, tone)}
  ${stage(key, tone)}
  ${road(tone)}
  ${vehicle(key, spec)}
</svg>
`
}

/* ── Destination scenes ────────────────────────────────────────────────────
   Layered silhouettes. Each landmark gets a recognisable profile — crenellated
   fort wall, temple shikhara, dune ridge — so the gallery reads as places
   rather than as decoration. */

const layers = () => `
  <path d="M0 ${SCENE_GROUND} L0 330 Q160 292 300 322 Q460 356 620 314 Q720 288 800 312 L800 ${SCENE_GROUND} Z" fill="#000" opacity="0.2"/>
  <path d="M0 ${SCENE_GROUND} L0 372 Q200 344 400 368 Q600 392 800 358 L800 ${SCENE_GROUND} Z" fill="#000" opacity="0.16"/>`

/** Foreground ridge, painted over the landmark to close the composition. */
const foreground = (tone) => `
  <path d="M0 500 L0 452 Q180 424 380 448 Q580 472 800 440 L800 500 Z" fill="${tone.ground}"/>
  <path d="M0 500 L0 470 Q240 448 480 470 Q640 484 800 464 L800 500 Z" fill="#000" opacity="0.35"/>`

const SCENES = {
  fort: { tone: 'amber', label: 'Hill fort', art: (t) => `
    <path d="M120 430 L120 200 L152 200 L152 176 L184 176 L184 200 L216 200 L216 152
             L248 152 L248 200 L296 200 L296 176 L328 176 L328 200 L360 200 L360 430 Z"
          fill="#2a1608" opacity="0.94"/>
    <path d="M400 430 L400 232 L432 232 L432 208 L464 208 L464 232 L512 232 L512 430 Z" fill="#2a1608" opacity="0.8"/>
    ${[140, 176, 212, 260, 308, 344].map((x) => `<rect x="${x}" y="248" width="18" height="30" rx="9" fill="${t.sun}" opacity="0.55"/>`).join('')}
    ${[416, 452, 488].map((x) => `<rect x="${x}" y="272" width="15" height="26" rx="7.5" fill="${t.sun}" opacity="0.4"/>`).join('')}` },

  dunes: { tone: 'sand', label: 'Desert dunes', art: (t) => `
    <path d="M0 430 Q140 288 300 330 Q420 362 520 320 Q640 270 800 318 L800 430 Z" fill="#3f2a10" opacity="0.9"/>
    <path d="M0 430 Q180 330 360 358 Q540 386 800 348 L800 430 Z" fill="#2b1c09" opacity="0.85"/>
    <g fill="#1d1305" opacity="0.9">
      <path d="M556 330 q10 -26 26 -26 q6 -18 20 -12 q12 -16 22 -2 q16 -2 14 16 l-4 34 l-8 0 l2 -26 l-14 4 l-4 22 l-8 0 l2 -22 l-18 -2 l-6 24 l-8 0 l4 -26 z"/>
      <rect x="566" y="330" width="6" height="26" rx="3"/><rect x="612" y="332" width="6" height="24" rx="3"/>
    </g>` },

  lake: { tone: 'blue', label: 'Lake palace', art: (t) => `
    <path d="M250 430 L250 250 L268 250 L268 226 Q290 200 312 226 L312 250 L400 250 L400 226
             Q422 198 444 226 L444 250 L462 250 L462 430 Z" fill="#101d31" opacity="0.95"/>
    ${[268, 306, 344, 382, 420].map((x) => `<rect x="${x}" y="278" width="16" height="28" rx="8" fill="${t.sun}" opacity="0.5"/>`).join('')}
    <rect y="${GROUND}" width="${W}" height="${H - GROUND}" fill="#12283f"/>
    ${[0, 1, 2, 3, 4].map((i) => `<rect x="${120 + i * 130}" y="${GROUND + 26 + i * 14}" width="${180 - i * 14}" height="5" rx="2.5" fill="${t.sun}" opacity="${0.3 - i * 0.05}"/>`).join('')}` },

  haveli: { tone: 'rose', label: 'Painted haveli', art: (t) => `
    <path d="M190 430 L190 210 L610 210 L610 430 Z" fill="#2e1018" opacity="0.94"/>
    <path d="M176 214 L400 158 L624 214 Z" fill="#3d1620" opacity="0.96"/>
    ${[220, 300, 380, 460, 540].map((x) => `
      <path d="M${x} 330 L${x} 272 q22 -26 44 0 L${x + 44} 330 Z" fill="${t.sun}" opacity="0.42"/>`).join('')}
    <rect x="352" y="188" width="96" height="22" rx="6" fill="${t.sun}" opacity="0.34"/>` },

  temple: { tone: 'saffron', label: 'Temple', art: (t) => `
    <path d="M330 430 L330 244 Q400 96 470 244 L470 430 Z" fill="#3a1c06" opacity="0.95"/>
    <circle cx="400" cy="104" r="15" fill="${t.sun}"/>
    <rect x="396" y="62" width="8" height="40" rx="4" fill="${t.sun}"/>
    <path d="M366 430 L366 292 q34 -40 68 0 L434 430 Z" fill="${t.sun}" opacity="0.42"/>
    <path d="M240 430 L240 268 L330 268 L330 430 Z M470 430 L470 268 L560 268 L560 430 Z" fill="#3a1c06" opacity="0.8"/>
    ${[262, 300, 492, 530].map((x) => `<rect x="${x}" y="300" width="16" height="28" rx="8" fill="${t.sun}" opacity="0.38"/>`).join('')}` },

  city: { tone: 'maroon', label: 'City gateway', art: (t) => `
    <path d="M150 430 L150 226 L230 226 L230 430 Z M570 430 L570 226 L650 226 L650 430 Z" fill="#2b0f14" opacity="0.94"/>
    <path d="M230 430 L230 200 q170 -110 340 0 L570 430 Z" fill="#38131a" opacity="0.96"/>
    <path d="M330 430 L330 266 q70 -78 140 0 L470 430 Z" fill="${t.sun}" opacity="0.34"/>
    ${[168, 596].map((x) => `<path d="M${x} 226 l22 -34 l22 34 Z" fill="${t.sun}" opacity="0.5"/>`).join('')}` },

  wedding: { tone: 'rose', label: 'Wedding car', art: (t) => `
    ${vehicle('wedding', { ...VEHICLES.luxury.spec, x: 110, len: 520, wheels: [230, 500] })}
    ${Array.from({ length: 16 }, (_, i) => {
      const x = 130 + i * 32, y = 214 + (i % 3) * 9
      return `<circle cx="${x}" cy="${y}" r="9" fill="${t.sun}" opacity="0.85"/>`
    }).join('')}
    ${Array.from({ length: 10 }, (_, i) => `<circle cx="${170 + i * 48}" cy="${196 - (i % 2) * 12}" r="5" fill="#fff" opacity="0.6"/>`).join('')}` },

  corporate: { tone: 'slate', label: 'Corporate transfer', art: () => `
    <g opacity="0.5">
      ${[110, 190, 270, 520, 600, 680].map((x, i) => `<rect x="${x}" y="${180 + (i % 3) * 34}" width="62" height="${GROUND - 180 - (i % 3) * 34}" fill="#141a20"/>`).join('')}
    </g>
    ${vehicle('corporate', { ...VEHICLES.tempo.spec, x: 130, len: 540, wheels: [212, 590 - 60] })}` },
}

const destinationScene = (key) => {
  const { tone: toneKey, label, art } = SCENES[key]
  const tone = TONES[toneKey]
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${label} illustration">
  <title>${label}</title>${defs(key, tone)}
  ${stage(key, tone, SCENE_GROUND)}
  ${layers()}
  ${art(tone)}
  ${foreground(tone)}
</svg>
`
}

/* ── Write ─────────────────────────────────────────────────────────────── */

let count = 0
const emit = (name, svg) => {
  fs.writeFileSync(path.join(outDir, name), svg, 'utf-8')
  count += 1
  console.log(`  ✓ ${name.padEnd(28)} ${(svg.length / 1024).toFixed(1)} kB`)
}

console.log('\n▸ Vehicle illustrations\n')
for (const key of Object.keys(VEHICLES)) emit(`vehicle-${key}.svg`, vehicleScene(key))

console.log('\n▸ Destination & occasion illustrations\n')
for (const key of Object.keys(SCENES)) emit(`scene-${key}.svg`, destinationScene(key))

console.log(`\n✓ ${count} illustrations written to public/images/\n`)
