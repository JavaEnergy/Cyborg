// vite.config.cjs
const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');
const path = require('path');

module.exports = defineConfig(({ mode }) => {
  const isDebug = mode === 'debug';

  return {
    plugins: [
      react(),
    ],
    build: {
      minify: !isDebug,   // Disable minification only in debug
      sourcemap: true,    // <-- Always generate source maps
      // or: sourcemap: isDebug ? true : false, if you only want them in debug
    },
    define: {
      __VITE_GTM_ID__: JSON.stringify(process.env.VITE_GTM_ID),
    },
  };
});
