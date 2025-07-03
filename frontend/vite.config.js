// filepath: c:\Users\onilu\New Chatbot\frontend\vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // This is the corrected alias configuration.
      // It correctly resolves the "@" symbol to your "src" directory.
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Make sure this is your backend's port
        changeOrigin: true,
        secure: false,
      },
    },
  },
})