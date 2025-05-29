//// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/relive-catalogo/',
  plugins: [react()],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        // Emitir un único bundle main.js sin hash
        entryFileNames: `main.js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      }
    }
  },
})
