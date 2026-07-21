import { useMemo, useState } from 'react'
import Seo from '../components/Seo'
import Icon from '../components/Icon'
import { SectionHead } from '../components/Faq'
import { PageHero, CtaBand } from '../components/Common'
import { site } from '../data/site'
import { galleryItems } from '../data/content'

const categories = ['All', 'Destinations', 'Fleet', 'Occasions']

export default function Gallery() {
  const [filter, setFilter] = useState('All')

  const visible = useMemo(
    () => galleryItems.filter((g) => filter === 'All' || g.category === filter),
    [filter]
  )

  const gallerySchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: `${site.name} — Photo Gallery`,
    description: 'Photographs of our fleet, the destinations we drive to across Rajasthan, and the weddings and corporate events we serve.',
    author: { '@type': 'Organization', name: site.name },
  }

  return (
    <>
      <Seo
        title="Gallery — Our Fleet, Rajasthan Destinations & Client Events"
        description="Photo gallery of Shekhawat Tours and Travels: our cars, tempo travellers and buses, the Rajasthan destinations we drive to, and the weddings and corporate groups we have served."
        path="/gallery"
        keywords="Rajasthan travel photos, tempo traveller photos, wedding car decoration, Jaisalmer desert photos, Shekhawat travels gallery"
        schema={gallerySchema}
        breadcrumbs={[{ name: 'Gallery', path: '/gallery' }]}
      />

      <PageHero
        eyebrow="From the road"
        title="Gallery"
        text="Our vehicles, the places we drive to, and the occasions we have been part of across thirteen years."
        crumbs={[{ name: 'Gallery', path: '/gallery' }]}
      />

      <section className="section">
        <div className="container">
          <div className="filters__chips filters__chips--center">
            {categories.map((c) => (
              <button
                key={c}
                className={`chip${filter === c ? ' is-active' : ''}`}
                onClick={() => setFilter(c)}
                aria-pressed={filter === c}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="gallery">
            {visible.map((g) => (
              <figure className={`gitem tone-${g.tone}`} key={g.title}>
                {g.src ? (
                  <img src={g.src} alt={g.title} loading="lazy" width="600" height="400" />
                ) : (
                  <span className="gitem__ph" aria-hidden="true">
                    <Icon name={g.category === 'Fleet' ? 'fleet' : g.category === 'Occasions' ? 'heart' : 'camera'} size={40} />
                  </span>
                )}
                <figcaption className="gitem__cap">
                  <strong>{g.title}</strong>
                  <small>{g.category}</small>
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="gallery__note">
            <Icon name="camera" size={16} />
            Drop your own photographs into <code>/public/images</code> and add a <code>src</code> to each
            entry in <code>src/data/content.js</code> to replace these placeholders.
          </p>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container">
          <SectionHead
            eyebrow="Where we go"
            title="Destinations We Cover"
            text="Regular routes across Rajasthan and neighbouring states — and we will happily go further."
          />
          <div className="pills">
            {site.serviceAreas.map((a) => (
              <span className="pill" key={a}><Icon name="pin" size={14} /> {a}</span>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Planning a trip to any of these?" text="Send us your dates and we will put together a route and a fixed quote." />
    </>
  )
}
