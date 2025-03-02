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
const languages = ['en', 'de']; // Extend if needed

// Define static routes without language prefixes
const staticRoutes = [
  '/',          // Homepage route
  '/about-us',
  '/contact-us',
  '/it-consulting',
  '/legal',
  '/web-development',
  '/zoho-consulting'
];

const generateUrls = () => {
  const urls = [];

  languages.forEach(lang => {
    staticRoutes.forEach(route => {
      if (route === '/') {
        // Homepage: use a trailing slash to avoid redirect issues
        urls.push({
          url: `/${lang}/`, // e.g. "/de/" instead of "/de"
          changefreq: 'monthly',
          priority: lang === 'de' ? 1.0 : 0.8,
          lastmodISO: new Date().toISOString(),
          alternateRefs: languages
            .filter(aLang => aLang !== lang)
            .map(aLang => ({
              href: `${baseUrl}/${aLang}/`, // with trailing slash
              hreflang: aLang
            }))
        });
      } else {
        // Other routes remain unchanged
        urls.push({
          url: `/${lang}${route}`, // e.g. "/de/about-us"
          changefreq: 'monthly',
          priority: 0.8,
          lastmodISO: new Date().toISOString(),
          alternateRefs: languages
            .filter(aLang => aLang !== lang)
            .map(aLang => ({
              href: `${baseUrl}/${aLang}${route}`,
              hreflang: aLang
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
