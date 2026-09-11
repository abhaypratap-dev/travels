import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Icon from '../components/Icon'
import { PageHero, CtaBand } from '../components/Common'
import { Reveal, stagger } from '../components/Motion'
import { site } from '../data/site'
import { posts, blogCategories } from '../data/blog'
import { responsive } from '../data/photos'

export default function BlogIndex() {
  const [filter, setFilter] = useState('All')
  const visible = useMemo(() => posts.filter((p) => filter === 'All' || p.category === filter), [filter])

  const listSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${site.url}/blog#blog`,
    name: `${site.name} — Travel Guides`,
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${site.url}/blog/${p.slug}`,
      datePublished: p.published,
      image: `${site.url}${p.image}`,
    })),
  }

  return (
    <>
      <Seo
        title="Travel Guides & Trip Planning Blog"
        description="Guides for planning a trip from Delhi — Agra, Jaipur, the hills and the airport — written by the people who drive these routes every week."
        path="/blog"
        keywords="Delhi travel blog, Agra Jaipur trip guides, things to do near Delhi, Rajasthan trip planning"
        schema={listSchema}
        breadcrumbs={[{ name: 'Blog', path: '/blog' }]}
      />

      <PageHero
        eyebrow="From the road"
        title="Travel Guides & Trip Planning"
        text="Practical guides for the trips people actually take out of Delhi — written by the people who drive them."
        crumbs={[{ name: 'Blog', path: '/blog' }]}
        bg="/images/hero/bg-highway.jpg"
      />

      <section className="section">
        <div className="container">
          <div className="filters__chips filters__chips--center">
            {blogCategories.map((c) => (
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

          <div className="bloggrid">
            {visible.map((p, i) => (
              <Reveal as="article" className="blogcard" variant="up" delay={stagger(i, 60)} key={p.slug}>
                <Link className="blogcard__media" to={`/blog/${p.slug}`} tabIndex={-1} aria-hidden="true">
                  <img
                    {...responsive(p.image)}
                    sizes="(max-width: 720px) 100vw, (max-width: 1180px) 50vw, 380px"
                    alt={p.imageAlt}
                    loading="lazy"
                    decoding="async"
                    width="600"
                    height="400"
                  />
                  <span className="blogcard__tag">{p.category}</span>
                </Link>
                <div className="blogcard__body">
                  <h2 className="blogcard__title"><Link to={`/blog/${p.slug}`}>{p.title}</Link></h2>
                  <p className="blogcard__excerpt">{p.excerpt}</p>
                  <p className="blogcard__meta"><Icon name="clock-o" size={14} /> {p.readMins} min read</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Ready to plan the trip?" text="Tell us your dates and route — we'll recommend the right vehicle and a fixed quote." />
    </>
  )
}
