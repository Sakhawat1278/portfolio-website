import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Raise the chunk warning threshold to avoid noise
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Split vendor code into separate cacheable chunks
        manualChunks: {
          // React core — very stable, cache-friendly
          'react-vendor': ['react', 'react-dom'],
          // Framer Motion is large (~150KB gz) — isolate it
          'motion': ['framer-motion'],
          // Swiper — only needed for testimonials
          'swiper': ['swiper'],
          // Lenis smooth scroll
          'lenis': ['lenis'],
        },
      },
    },
    // Enable minification with esbuild (default) — ensure no sourcemaps in prod
    sourcemap: false,
    // Enable CSS code splitting so only required CSS is loaded per chunk
    cssCodeSplit: true,
  },
})
