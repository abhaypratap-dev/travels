/**
 * The camel-and-rider mark beside the wordmark.
 *
 * Solid fills rather than gradients: the header and footer both render a
 * logo, and gradient ids would have to be made unique per instance. A flat
 * silhouette also holds up better at 40px, which is where it spends its life.
 */
const CAMEL =
  'M12 22C14 14 21 8 29 8C36 8 40 14 43 19C47 21 50 25 54 23C57 21 58 13 59 9C59.5 6.5 62 5 65 5.5C68 6 70.5 7.5 71.5 9.5C72 11 71 12.5 69 12.5C66 12.5 64 13 63 14.5C62 19 60.5 26 57 30C54 33 50 34 48 33.5L49 54L51 56L46.5 56L46 54L44.5 36C39 37.5 30 37.5 24 35.5L23.5 54L25.5 56L21 56L20.8 54L19 36C16 33 13.5 29 12.8 25C12.5 24 12.2 23 12 22Z'
const FAR_LEGS =
  'M46 33L45 54L47 56L42.5 56L42.3 54L42.5 35ZM26 35L27 54L29 56L24.5 56L24.3 54L22.5 36Z'
const TAIL = 'M13 25C10.5 27 9.5 30.5 10 34L11.3 34C11.2 31 11.8 28.5 13.4 27Z'
const SADDLE = 'M21 10.5C25 7 33 7 37 11L36 14.5C32 12 26 12 22 14Z'
const RIDER = 'M26.5 8.5C26.3 4.8 27.8 2.8 29.8 2.8C31.8 2.8 33.2 4.8 33 8.5Z'

export default function Logo({ light = false }) {
  const body = light ? '#d6a452' : '#b07d2c'
  const shade = light ? '#a47733' : '#7d581d'
  const accent = light ? '#ecd29a' : '#8c3526'

  return (
    <>
      <svg className="brand__mark" viewBox="0 0 76 64" aria-hidden="true" focusable="false">
        <g transform="translate(0 6)">
          <path fill={shade} d={FAR_LEGS} />
          <path fill={body} d={TAIL} />
          <path fill={body} d={CAMEL} />
          <path fill={accent} d={SADDLE} />
          <path fill={shade} d={RIDER} />
          <circle fill={shade} cx="29.8" cy="-0.4" r="2.2" />
          <ellipse fill={accent} cx="29.8" cy="-2" rx="2.7" ry="1.4" />
          <path d="M32.6 5.2 38.2 8.2Q51 8 63.5 10.2" fill="none" stroke={shade} strokeWidth="1" strokeLinecap="round" />
        </g>
      </svg>
      <span className="brand__text">
        <strong>Shekhawat</strong>
        <small>Tours &amp; Travels</small>
      </span>
    </>
  )
}

/** The bare mark, for places that need it without the wordmark. */
export const logoPaths = { CAMEL, FAR_LEGS, TAIL, SADDLE, RIDER }
