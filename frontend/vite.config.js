import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/analyze': {
        target: 'https://healthprism-production.up.railway.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})