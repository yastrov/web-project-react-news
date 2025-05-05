import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/web-project-react-news/',  // Для GitHub Pages
  build: {
    outDir: 'dist',
    manifest: true,  // Генерирует asset-manifest.json
    rollupOptions: {
      input: {
        main: './index.html'  // Точка входа
      }
    }
  }
})
