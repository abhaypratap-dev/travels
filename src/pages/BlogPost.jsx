import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Icon from '../components/Icon'
import RichBlocks from '../components/RichBlocks'
import { CtaBand } from '../components/Common'
import { Reveal } from '../components/Motion'
import { site } from '../data/site'
import { posts } from '../data/blog'
import { responsive } from '../data/photos'

export default function BlogPost({ post: p }) {
  const path = `/blog/${p.slug}`
  const pageUrl = `${site.url}${path}`
  const others = posts.filter((o) => o.slug !== p.slug).slice(0, 3)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${pageUrl}#article`,
    headline: p.title,
    description: p.excerpt,
    image: `${site.url}${p.image}`,
    datePublished: p.published,
    dateModified: p.published,
    author: { '@type': 'Organization', name: site.name },
    publisher: { '@id': `${site.url}/#organization` },
    mainEntityOfPage: pageUrl,
  }

  return (
    <>
      <Seo
        title={p.metaTitle}
        description={p.metaDescription}
        path={path}
        image={p.image}
        imageAlt={p.imageAlt}
        type="article"
        keywords={p.keywords}
        schema={articleSchema}
        article={{ published: p.published, modified: p.published }}
        breadcrumbs={[{ name: 'Blog', path: '/blog' }, { name: p.title, path }]}
      />

      <article className="section">
        <div className="container container--narrow">
          <nav className="crumbs" aria-label="Breadcrumb">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li aria-current="page"><span>{p.title}</span></li>
            </ol>
          </nav>

          <p className="blogpost__tag">{p.category}</p>
          <h1 className="blogpost__title">{p.title}</h1>
          <p className="blogpost__meta">
            <Icon name="clock-o" size={14} /> {p.readMins} min read ·{' '}
            <time dateTime={p.published}>
              {new Date(p.published).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </time>
          </p>

          <figure className="blogpost__hero">
            <img
              {...responsive(p.image)}
              sizes="(max-width: 960px) 100vw, 760px"
              alt={p.imageAlt}
              loading="eager"
              fetchpriority="high"
              decoding="async"
              width="1200"
              height="800"
            />
          </figure>

          <Reveal className="prose" variant="up">
            {p.sections.map((sec, i) => (
              <div key={i}>
                <h2>{sec.h2}</h2>
                <RichBlocks blocks={sec.blocks} />
              </div>
            ))}
          </Reveal>
        </div>
      </article>

      <section className="section section--tint">
        <div className="container">
          <h2 className="sechead__title" style={{ marginBottom: 24 }}>More Guides</h2>
          <div className="bloggrid">
            {others.map((o) => (
              <article className="blogcard" key={o.slug}>
                <Link className="blogcard__media" to={`/blog/${o.slug}`} tabIndex={-1} aria-hidden="true">
                  <img {...responsive(o.image)} sizes="(max-width: 720px) 100vw, 380px" alt="" loading="lazy" decoding="async" width="600" height="400" />
                  <span className="blogcard__tag">{o.category}</span>
                </Link>
                <div className="blogcard__body">
                  <h3 className="blogcard__title"><Link to={`/blog/${o.slug}`}>{o.title}</Link></h3>
                  <p className="blogcard__excerpt">{o.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
