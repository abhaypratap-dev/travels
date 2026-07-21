import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'

/**
 * Renders one route to an HTML string plus its collected <head> tags.
 * Consumed by scripts/prerender.js at build time.
 */
export function render(url) {
  const helmetContext = {}

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url} future={{ v7_relativeSplatPath: true }}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  )

  const { helmet } = helmetContext

  // `prioritizeSeoTags` on <Helmet> routes the SEO-critical tags — canonical,
  // description, robots, og:* and the JSON-LD scripts — into a separate
  // `priority` bucket. It must be rendered explicitly, and first, or those
  // tags are silently dropped from the output.
  const head = [
    helmet?.priority?.toString(),
    helmet?.title?.toString(),
    helmet?.meta?.toString(),
    helmet?.link?.toString(),
    helmet?.script?.toString(),
  ].filter(Boolean).join('\n    ')

  return { html, head, htmlAttributes: helmet?.htmlAttributes?.toString() || 'lang="en-IN"' }
}
