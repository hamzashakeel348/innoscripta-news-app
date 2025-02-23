import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0", // Ensures the app is accessible outside the container
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true, // Ensures live reload works in Docker
    },
  },
})
