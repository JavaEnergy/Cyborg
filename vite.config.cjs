// vite.config.cjs
const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');
const prerender = require('vite-plugin-prerender');
const path = require('path');

module.exports = defineConfig(({ mode }) => {
  const isDebug = mode === 'debug';

  return {
    plugins: [
      react(),
      prerender({
        staticDir: path.resolve(__dirname, 'dist'),
        routes: [
          '/de',
          '/de/about-us',
          '/de/contact-us',
          '/de/it-consulting',
          '/de/web-development',
          '/de/zoho-consulting',
          '/de/legal',
          '/en',
          '/en/about-us',
          '/en/contact-us',
          '/en/it-consulting',
          '/en/web-development',
          '/en/zoho-consulting',
          '/en/legal',
        ],
        renderAfterDocumentEvent: 'page-loaded',
      }),
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
