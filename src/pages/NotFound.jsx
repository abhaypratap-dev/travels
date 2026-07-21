import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Icon from '../components/Icon'
import { site, nav } from '../data/site'

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page Not Found (404)"
        description="The page you were looking for does not exist. Browse our fleet, tour packages and services, or call us to book directly."
        path="/404"
        noindex
      />
      <section className="section notfound">
        <div className="container container--narrow">
          <p className="notfound__code">404</p>
          <h1 className="notfound__title">This road leads nowhere</h1>
          <p className="notfound__text">
            The page you were looking for has moved or never existed. Here is the way back —
            or call us on <a href={`tel:${site.phoneRaw}`}>{site.phone}</a> and we will sort it out.
          </p>
          <div className="notfound__links">
            {nav.map((n) => (
              <Link className="chip" to={n.to} key={n.to}>{n.label}</Link>
            ))}
          </div>
          <Link className="btn btn--primary btn--lg" to="/">
            <Icon name="arrow" size={18} /> Back to homepage
          </Link>
        </div>
      </section>
    </>
  )
}
