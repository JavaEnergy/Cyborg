// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const isDebug = mode === 'debug';

  return {
    plugins: [react()],
    build: {
      minify: !isDebug, // Disable minification in debug mode
      sourcemap: isDebug, // Enable source maps in debug mode
    },
    define: {
      __VITE_GTM_ID__: JSON.stringify(process.env.VITE_GTM_ID),
    },
  }
})
