// src/components/HelmetManager.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

/**
 * HelmetManager Component
 * Manages SEO-related meta tags for each page.
 *
 * @param {Object} props - Component props.
 * @param {string} props.title - The title of the page.
 * @param {string} props.description - The meta description.
 * @param {string} [props.canonical] - The canonical URL of the page.
 * @param {Object} [props.openGraph] - Open Graph meta tags.
 * @param {Object} [props.structuredData] - Structured data scripts (JSON-LD).
 * @param {Array} [props.alternateLanguages] - Array of alternate language URLs for hreflang tags.
 */
const HelmetManager = ({
  title,
  description,
  canonical,
  openGraph = {},
  structuredData = {},
  alternateLanguages = [],
}) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph Tags */}
      {openGraph.title && <meta property="og:title" content={openGraph.title} />}
      {openGraph.description && (
        <meta property="og:description" content={openGraph.description} />
      )}
      {openGraph.image && <meta property="og:image" content={openGraph.image} />}
      {openGraph.url && <meta property="og:url" content={openGraph.url} />}
      {openGraph.type && <meta property="og:type" content={openGraph.type} />}

      {/* Structured Data (JSON-LD) */}
      {Object.keys(structuredData).length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}

      {/* Hreflang Tags */}
      {alternateLanguages.length > 0 &&
        alternateLanguages.map((lang) => (
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

// PropTypes for type checking
HelmetManager.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  canonical: PropTypes.string,
  openGraph: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    url: PropTypes.string,
    type: PropTypes.string,
  }),
  structuredData: PropTypes.object,
  alternateLanguages: PropTypes.arrayOf(
    PropTypes.shape({
      lang: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ),
};

export default HelmetManager;
