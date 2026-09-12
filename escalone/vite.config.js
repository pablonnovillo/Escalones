import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // permite acceso desde cualquier host
    allowedHosts: [
      'unrivalable-ayana-oligopoly.ngrok-free.dev', // tu URL de ngrok
      'localhost',
      '127.0.0.1'
    ],
  },
})
