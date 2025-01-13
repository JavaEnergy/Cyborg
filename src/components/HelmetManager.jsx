// src/components/HelmetManager.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * HelmetManager Component
 * @param {Object} props - Component props.
 * @param {string} props.title - The title of the page.
 * @param {string} props.description - The meta description.
 * @param {string} [props.canonical] - The canonical URL of the page.
 * @param {Object} [props.openGraph] - Open Graph meta tags.
 * @param {Object} [props.twitter] - Twitter Card meta tags.
 * @param {Object} [props.structuredData] - Structured data scripts.
 * @param {Array} [props.alternateLanguages] - Array of alternate language URLs for hreflang tags.
 */
const HelmetManager = ({
  title,
  description,
  canonical, // Added canonical prop
  openGraph = {},
  twitter = {},
  structuredData = {},
  alternateLanguages = [], // For hreflang
}) => {
  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      
      {/* Canonical Tag */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph Tags */}
      {openGraph.title && <meta property="og:title" content={openGraph.title} />}
      {openGraph.description && (
        <meta property="og:description" content={openGraph.description} />
      )}
      {openGraph.image && <meta property="og:image" content={openGraph.image} />}
      {openGraph.url && <meta property="og:url" content={openGraph.url} />}
      {openGraph.type && <meta property="og:type" content={openGraph.type} />}

      {/* Twitter Card Tags */}
      {twitter.card && <meta name="twitter:card" content={twitter.card} />}
      {twitter.title && <meta name="twitter:title" content={twitter.title} />}
      {twitter.description && (
        <meta name="twitter:description" content={twitter.description} />
      )}
      {twitter.image && <meta name="twitter:image" content={twitter.image} />}

      {/* Structured Data */}
      {Object.keys(structuredData).length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}

      {/* Hreflang Tags */}
      {alternateLanguages.length > 0 && alternateLanguages.map((lang) => (
        <link
          key={lang.lang}
          rel="alternate"
          hrefLang={lang.lang}
          href={lang.url}
        />
      ))}
    </Helmet>
  );
};

export default HelmetManager;
