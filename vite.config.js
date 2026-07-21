import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    cssCodeSplit: false,
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
