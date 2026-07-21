import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import Header from './components/Header'
import Footer from './components/Footer'
import { ScrollToTop, FloatingActions } from './components/Common'
import { organizationSchema, websiteSchema } from './components/Seo'

import Home from './pages/Home'
import About from './pages/About'
import Fleet from './pages/Fleet'
import Packages from './pages/Packages'
import Services from './pages/Services'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <>
      {/* Site-wide structured data — emitted on every page. */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      </Helmet>

      <ScrollToTop />
      <a className="skiplink" href="#main">Skip to main content</a>
      <Header />

      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/tour-packages" element={<Packages />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <FloatingActions />
    </>
  )
}
