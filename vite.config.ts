// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/relive-catalogo/',      // Ruta base en GitHub Pages
  plugins: [react()],
  build: {
    sourcemap: false,             // Sin sourcemaps en producción
    rollupOptions: {
      output: {
        entryFileNames: 'main.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
})