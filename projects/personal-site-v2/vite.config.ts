import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',  // Netlify root path (was '/personal-site-v2/' for GitHub Pages)
})
