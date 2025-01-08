// generate-sitemap.js

import fs from 'fs';
import path from 'path';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import { fileURLToPath } from 'url';

// Define __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define your base URL
const baseUrl = 'https://cyborg-it.de';

// List of static routes
const staticRoutes = [
  '/',
  '/about-us',
  '/contact-us',
  '/it-consulting',
  '/legal',
  '/web-development',
  '/zoho-consulting'
  // Add more routes as needed
];

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: baseUrl });

  const urls = staticRoutes.map(route => ({
    url: route,
    changefreq: 'monthly',
    priority: 0.8,
    lastmodISO: new Date().toISOString()
  }));

  try {
    const sitemapContent = await streamToPromise(
      Readable.from(urls).pipe(sitemap)
    ).then(sm => sm.toString());

    fs.writeFileSync(path.resolve(__dirname, 'public', 'sitemap.xml'), sitemapContent);
    console.log('sitemap.xml generated successfully.');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

generateSitemap();
