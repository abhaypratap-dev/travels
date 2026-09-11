import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import Header from './components/Header'
import Footer from './components/Footer'
import { ScrollToTop, FloatingActions } from './components/Common'
import { RevealObserver, ScrollProgress, PageTransition } from './components/Motion'
import { organizationSchema, websiteSchema } from './components/Seo'

import Home from './pages/Home'
import About from './pages/About'
import Fleet from './pages/Fleet'
import Packages from './pages/Packages'
import Services from './pages/Services'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import VehicleType from './pages/VehicleType'
import VehicleDetail from './pages/VehicleDetail'
import PackageDetail from './pages/PackageDetail'
import ServicePage from './pages/ServicePage'
import FaqPage from './pages/FaqPage'
import BlogIndex from './pages/BlogIndex'
import BlogPost from './pages/BlogPost'
import Credits from './pages/Credits'
import NotFound from './pages/NotFound'

import { vehicleTypes } from './data/vehicleTypes'
import { fleet } from './data/fleet'
import { packages } from './data/packages'
import { servicePages } from './data/servicePages'
import { posts } from './data/blog'

export default function App() {
  return (
    <>
      {/* Site-wide structured data — emitted on every page. */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      </Helmet>

      <ScrollToTop />
      <RevealObserver />
      <ScrollProgress />

      <a className="skiplink" href="#main">Skip to main content</a>
      <Header />

      <main id="main">
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/fleet" element={<Fleet />} />

            {/* Vehicle category landing pages — one prerendered route each. */}
            {vehicleTypes.map((type) => (
              <Route
                key={type.slug}
                path={`/${type.slug}`}
                element={<VehicleType type={type} />}
              />
            ))}

            {/* One page per vehicle, below the category pages. */}
            {fleet.map((v) => (
              <Route
                key={v.slug}
                path={`/fleet/${v.slug}`}
                element={<VehicleDetail vehicle={v} />}
              />
            ))}

            <Route path="/tour-packages" element={<Packages />} />

            {/* One page per itinerary. */}
            {packages.map((p) => (
              <Route
                key={p.slug}
                path={`/tour-packages/${p.slug}`}
                element={<PackageDetail pkg={p} />}
              />
            ))}
            <Route path="/services" element={<Services />} />

            {/* Dedicated service landing pages — IGI airport, outstation,
                corporate travel and the Delhi NCR destinations hub. */}
            {servicePages.map((sp) => (
              <Route key={sp.slug} path={`/${sp.slug}`} element={<ServicePage page={sp} />} />
            ))}

            <Route path="/faq" element={<FaqPage />} />
            <Route path="/blog" element={<BlogIndex />} />
            {posts.map((p) => (
              <Route key={p.slug} path={`/blog/${p.slug}`} element={<BlogPost post={p} />} />
            ))}

            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/image-credits" element={<Credits />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </main>

      <Footer />
      <FloatingActions />
    </>
  )
}
