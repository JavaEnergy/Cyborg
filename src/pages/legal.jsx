// src/pages/Legal.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

import './legal.css';
import HelmetManager from '../components/HelmetManager';
import Layout from '../components/Layout';

const Legal = () => {
  const { t, i18n } = useTranslation(); // Destructure i18n as well as t
  const location = useLocation();

  // Build a canonical URL based on the current language
  const canonicalUrl = `https://cyborg-it.de/${i18n.language}/legal/`;

  // Define alternate language URLs
  const alternateLanguages = [
    { lang: 'de', url: 'https://cyborg-it.de/de/legal/' },
    { lang: 'en', url: 'https://cyborg-it.de/en/legal/' },
  ];

  // Framer Motion animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <Layout>
     <HelmetManager
  title={t('legal.page_title')}
  description={t('legal.page_description')}
  canonical={`https://cyborg-it.de/${i18n.language}/legal`}
  alternateLanguages={[
    { lang: 'de', url: 'https://cyborg-it.de/de/legal' },
    { lang: 'en', url: 'https://cyborg-it.de/en/legal' },
  ]}
  openGraph={{
    title: t('legal.page_title'),
    description: t('legal.page_description'),
    image: 'https://cyborg-it.de/assets/og-image.jpg',
    url: `https://cyborg-it.de/${i18n.language}/legal`,
    type: 'website',
  }}
  structuredData={{
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Cyborg IT",
    "url": "https://cyborg-it.de",
    "logo": "https://cyborg-it.de/assets/Cyborg-logo-9-09-DqmwUbnN.png",
    "sameAs": ["https://www.linkedin.com/company/cyborg-it-l%C3%B6sungen/"],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+995-597-01-13-09",
      "contactType": "Customer Service"
    }
  }}
/>

      <motion.div
        className="legal-page"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <h1>{t('legal.title')}</h1>

        {/* Privacy Policy Section */}
        <section>
          <h2>{t('legal.privacy_policy_title')}</h2>
          <p>{t('legal.privacy_policy_aim')}</p>
          <p>{t('legal.privacy_policy_commitment')}</p>

          <h3>{t('legal.privacy_policy_principles_title')}</h3>
          <p>{t('legal.privacy_policy_principles_intro')}</p>
          <ol>
            <li>{t('legal.privacy_policy_principles.a')}</li>
            <li>{t('legal.privacy_policy_principles.b')}</li>
            <li>{t('legal.privacy_policy_principles.c')}</li>
            <li>{t('legal.privacy_policy_principles.d')}</li>
            <li>{t('legal.privacy_policy_principles.e')}</li>
            <li>{t('legal.privacy_policy_principles.f')}</li>
          </ol>

          <h3>{t('legal.privacy_policy_lawfulness_title')}</h3>
          <p>{t('legal.privacy_policy_lawfulness_intro')}</p>
          <ol>
            <li>{t('legal.privacy_policy_lawfulness.a')}</li>
            <li>{t('legal.privacy_policy_lawfulness.b')}</li>
            <li>{t('legal.privacy_policy_lawfulness.c')}</li>
          </ol>

          <h3>{t('legal.privacy_policy_collection_title')}</h3>
          <p>{t('legal.privacy_policy_collection_intro')}</p>
          <ul>
            <li>{t('legal.privacy_policy_collection.method1')}</li>
            <li>{t('legal.privacy_policy_collection.method2')}</li>
            <li>{t('legal.privacy_policy_collection.method3')}</li>
            <li>{t('legal.privacy_policy_collection.method4')}</li>
          </ul>

          <h3>{t('legal.privacy_policy_personal_data_title')}</h3>
          <p>{t('legal.privacy_policy_personal_data_intro')}</p>
          <ul>
            <li>{t('legal.privacy_policy_personal_data.type1')}</li>
            <li>{t('legal.privacy_policy_personal_data.type2')}</li>
            <li>{t('legal.privacy_policy_personal_data.type3')}</li>
            <li>{t('legal.privacy_policy_personal_data.type4')}</li>
            <li>{t('legal.privacy_policy_personal_data.type5')}</li>
          </ul>

          <h3>{t('legal.privacy_policy_security_title')}</h3>
          <p>{t('legal.privacy_policy_security_intro')}</p>
          <ul>
            <li>{t('legal.privacy_policy_security.measure1')}</li>
            <li>{t('legal.privacy_policy_security.measure2')}</li>
            <li>{t('legal.privacy_policy_security.measure3')}</li>
            <li>{t('legal.privacy_policy_security.measure4')}</li>
          </ul>

          <h3>{t('legal.privacy_policy_rights_title')}</h3>
          <ol>
            <li>{t('legal.privacy_policy_rights.access')}</li>
            <li>{t('legal.privacy_policy_rights.rectification')}</li>
            <li>{t('legal.privacy_policy_rights.erasure')}</li>
            <li>{t('legal.privacy_policy_rights.restriction')}</li>
            <li>{t('legal.privacy_policy_rights.object')}</li>
            <li>{t('legal.privacy_policy_rights.portability')}</li>
            <li>{t('legal.privacy_policy_rights.revocation')}</li>
            <li>{t('legal.privacy_policy_rights.complain')}</li>
          </ol>

          <h3>{t('legal.privacy_policy_international_transfers_title')}</h3>
          <p>{t('legal.privacy_policy_international_transfers_intro')}</p>
        </section>

        {/* Terms of Use Section */}
        <section>
          <h2>{t('terms_conditions_title')}</h2>
          <p>{t('terms_intro')}</p>
          <ol>
            <li>
              <h3>{t('terms.general_terms_title')}</h3>
              <ol>
                <li>{t('terms.general_terms.1')}</li>
                <li>{t('terms.general_terms.2')}</li>
                <li>{t('terms.general_terms.3')}</li>
                <li>{t('terms.general_terms.4')}</li>
              </ol>
            </li>
            <li>
              <h3>{t('terms.restrictions_title')}</h3>
              <p>{t('terms.restrictions_content')}</p>
            </li>
            <li>
              <h3>{t('terms.intellectual_property_title')}</h3>
              <p>{t('terms.intellectual_property_content')}</p>
            </li>
            <li>
              <h3>{t('terms.links_title')}</h3>
              <p>{t('terms.links_content')}</p>
            </li>
            <li>
              <h3>{t('terms.privacy_policy_title')}</h3>
              <p>{t('terms.privacy_policy_content')}</p>
            </li>
            <li>
              <h3>{t('terms.limitations_liability_title')}</h3>
              <p>{t('terms.limitations_liability_content')}</p>
            </li>
            <li>
              <h3>{t('terms.disclaimer_title')}</h3>
              <p>{t('terms.disclaimer_content')}</p>
            </li>
            <li>
              <h3>{t('terms.governing_law_title')}</h3>
              <p>{t('terms.governing_law_content')}</p>
            </li>
            <li>
              <h3>{t('terms.severability_title')}</h3>
              <p>{t('terms.severability_content')}</p>
            </li>
            <li>
              <h3>{t('terms.contact_us_title')}</h3>
              <p>{t('terms.contact_us_content')}</p>
            </li>
          </ol>
          <p>{t('terms.updated_date')}</p>
        </section>
      </motion.div>
    </Layout>
  );
};

export default Legal;
