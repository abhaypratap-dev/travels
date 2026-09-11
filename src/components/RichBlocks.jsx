import { Link } from 'react-router-dom'
import Icon from './Icon'
import { responsive } from '../data/photos'

/**
 * Renders inline markdown-lite: `**bold**` and `[label](/path)`. Links
 * starting with `/` become a router `<Link>`; anything else an `<a>`.
 * Deliberately minimal — this is copy formatting, not a markdown engine.
 */
function Inline({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).filter(Boolean)
  return parts.map((part, i) => {
    const bold = part.match(/^\*\*([^*]+)\*\*$/)
    if (bold) return <strong key={i}>{bold[1]}</strong>
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link) {
      const [, label, href] = link
      return href.startsWith('/')
        ? <Link key={i} to={href}>{label}</Link>
        : <a key={i} href={href} target="_blank" rel="noopener noreferrer">{label}</a>
    }
    return part
  })
}

/**
 * Renders the `blocks` array used by service and blog pages — a small,
 * data-driven set of shapes (`p`, `h3`, `ul`, `tip`, `table`, `chips`,
 * `steps`, `cards`, `img`) so a page's copy lives entirely in its data file
 * rather than being hand-assembled JSX every time.
 */
export default function RichBlocks({ blocks }) {
  return blocks.map(([kind, value], i) => {
    switch (kind) {
      case 'p':
        return <p key={i}><Inline text={value} /></p>
      case 'h3':
        return <h3 key={i}>{value}</h3>
      case 'ul':
        return (
          <ul className="prose__list" key={i}>
            {value.map((item, j) => (
              <li key={j}><Icon name="check" size={15} /> <span><Inline text={item} /></span></li>
            ))}
          </ul>
        )
      case 'tip':
        return (
          <p className="tipbox" key={i}>
            <Icon name="spark" size={16} /> <span><Inline text={value} /></span>
          </p>
        )
      case 'chips':
        return (
          <p className="pills" key={i}>
            {value.map((c) => <span className="pill" key={c}><Icon name="pin" size={13} /> {c}</span>)}
          </p>
        )
      case 'table':
        return (
          <div className="ratetable" key={i}>
            <div className="ratetable__scroll">
              <table>
                <thead><tr>{value.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
                <tbody>
                  {value.rows.map((row, r) => (
                    <tr key={r}>{row.map((cell, c) => <td key={c}><Inline text={String(cell)} /></td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
            {value.note && <p className="ratetable__note">{value.note}</p>}
          </div>
        )
      case 'steps':
        return (
          <ol className="steps steps--inline" key={i}>
            {value.map((s, j) => (
              <li className="steps__item" key={j}>
                <span className="steps__num">{j + 1}</span>
                <h4 className="steps__title">{s.title}</h4>
                <p className="steps__text">{s.text}</p>
              </li>
            ))}
          </ol>
        )
      case 'cards':
        return (
          <div className="destgrid" key={i}>
            {value.map((c) => (
              <Link className="destcard" to={c.to} key={c.title}>
                <span className="destcard__img">
                  <img {...responsive(c.image)} sizes="(max-width: 720px) 100vw, 280px" alt="" loading="lazy" decoding="async" width="600" height="400" />
                </span>
                <span className="destcard__body">
                  <strong>{c.title}</strong>
                  <span>{c.text}</span>
                </span>
              </Link>
            ))}
          </div>
        )
      case 'userphoto':
        // A marked, honest placeholder — not a stock photo dressed up as a
        // customer's. Swapping in a real trip photo means dropping a file at
        // `value.src` in /public/images/blog and changing this block to
        // ['img', { src, alt, caption }] in the post's data.
        return (
          <div className="userphoto" key={i}>
            <Icon name="camera" size={22} />
            <p>{value}</p>
          </div>
        )
      case 'img':
        return (
          <figure className="prose__figure" key={i}>
            <img
              {...responsive(value.src)}
              sizes="(max-width: 960px) 100vw, 760px"
              alt={value.alt}
              loading="lazy"
              decoding="async"
              width="1200"
              height="800"
            />
            {value.caption && <figcaption>{value.caption}</figcaption>}
          </figure>
        )
      default:
        return null
    }
  })
}
