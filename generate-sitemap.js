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

// Define supported languages
const languages = ['en', 'de']; // Add more languages as needed

// Define static routes without language prefixes
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

// Function to generate URLs for all languages
const generateUrls = () => {
  const urls = [];

  languages.forEach(lang => {
    staticRoutes.forEach(route => {
      if (route === '/') {
        // Use language prefix for homepage without trailing slash
        urls.push({
          url: `/${lang}`,
          changefreq: 'monthly',
          priority: lang === 'de' ? 1.0 : 0.8, // Adjust priorities as needed
          lastmodISO: new Date().toISOString(),
          alternateRefs: languages
            .filter(alternateLang => alternateLang !== lang)
            .map(alternateLang => ({
              href: `${baseUrl}/${alternateLang}`,
              hreflang: alternateLang
            }))
        });
      } else {
        urls.push({
          url: `/${lang}${route}`,
          changefreq: 'monthly',
          priority: 0.8,
          lastmodISO: new Date().toISOString(),
          alternateRefs: languages
            .filter(alternateLang => alternateLang !== lang)
            .map(alternateLang => ({
              href: `${baseUrl}/${alternateLang}${route}`,
              hreflang: alternateLang
            }))
        });
      }
    });
  });

  return urls;
};

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: baseUrl });
  const urls = generateUrls();

  try {
    const sitemapContent = await streamToPromise(
      Readable.from(urls).pipe(sitemap)
    ).then(sm => sm.toString());

    // Ensure the 'public' directory exists
    const publicDir = path.resolve(__dirname, 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Write sitemap.xml to the public directory
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent);
    console.log('sitemap.xml generated successfully.');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

generateSitemap();
