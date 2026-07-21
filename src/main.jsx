import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import './styles/global.css'

const tree = (
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)

const container = document.getElementById('root')

// Prerendered HTML is present in production builds — hydrate it rather than
// throwing it away, so the crawled markup and the rendered page agree.
// Checking for an *element* child rather than any child node matters: the
// unreplaced `<!--app-html-->` comment counts as a child node in dev.
if (container.firstElementChild) {
  hydrateRoot(container, tree)
} else {
  createRoot(container).render(tree)
}
