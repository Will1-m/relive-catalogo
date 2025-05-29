// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/relive-catalogo/',
  plugins: [react()],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        entryFileNames: `main.js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      }
    }
  }
})
