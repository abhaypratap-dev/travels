import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        /**
         * Split the framework out of the app bundle.
         *
         * React, the router and Helmet change only when a dependency is
         * upgraded, while the app chunk changes on every copy edit — and this
         * is a site whose content gets edited often. Separating them means a
         * routine content deploy invalidates roughly 60 kB rather than the
         * whole 115 kB, so returning visitors re-download far less.
         */
        // Rolldown (Vite 8's bundler) takes only the function form here; the
        // object map that Rollup accepted is rejected at build time.
        manualChunks: (id) =>
          id.includes('node_modules') ? 'vendor' : undefined,
      },
    },
  },
  ssr: {
    // react-helmet-async ships CommonJS. Left external, Node's ESM loader
    // cannot pull named exports off it when the prerenderer imports the SSR
    // bundle, so bundle it in instead.
    noExternal: ['react-helmet-async'],
  },
  server: {
    port: 5173,
    open: true,
  },
})
