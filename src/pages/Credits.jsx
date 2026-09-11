import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { PageHero } from '../components/Common'
import { photoCredits, smallSrc } from '../data/photos'

/**
 * Attribution for every photograph on the site. The Creative Commons licences
 * the photos are used under require the author, the licence and the source to
 * be credited — this page is where that happens, linked from every footer.
 */
export default function Credits() {
  return (
    <>
      <Seo
        title="Image Credits"
        description="Credits and licences for the photographs on the Shekhawat Tours and Travels website — freely licensed images from Wikimedia Commons."
        path="/image-credits"
        breadcrumbs={[{ name: 'Image credits', path: '/image-credits' }]}
      />

      <PageHero
        eyebrow="Photography"
        title="Image Credits"
        text="The photographs on this site are freely licensed images from Wikimedia Commons. Vehicle photos show the model we run, not the individual vehicle — we send photos of your actual vehicle on WhatsApp before you confirm."
        crumbs={[{ name: 'Image credits', path: '/image-credits' }]}
        bg="/images/hero/bg-hawa-mahal.jpg"
      />

      <section className="section">
        <div className="container container--narrow">
          <ul className="credits">
            {photoCredits.map((c) => (
              <li className="credit" key={c.src}>
                <img src={c.thumb || smallSrc(c.src)} alt="" loading="lazy" decoding="async" width="120" height="80" />
                <div>
                  <p className="credit__title">{c.subject}</p>
                  <p className="credit__meta">
                    “<a href={c.source} target="_blank" rel="noopener noreferrer">{c.file}</a>” by {c.author},{' '}
                    {c.licenseUrl
                      ? <a href={c.licenseUrl} target="_blank" rel="noopener noreferrer license">{c.license}</a>
                      : c.license}
                    . {c.changes}.
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <p className="muted" style={{ marginTop: 24 }}>
            Took one of these photographs and want the credit worded differently?{' '}
            <Link to="/contact">Get in touch</Link> and we will change it.
          </p>
        </div>
      </section>
    </>
  )
}
