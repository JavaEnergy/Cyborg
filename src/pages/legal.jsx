// src/pages/Legal.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import './Legal.css'; // Ensure this CSS file exists and is styled appropriately
import { motion } from 'framer-motion';

const Legal = () => {
  const { t } = useTranslation();

  // Animation variants
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
        <p>{t('legal.privacy_policy_content')}</p>
      </section>

      {/* Data Protection Policy Section */}
      <section>
        <h2>{t('legal.data_protection_policy_title')}</h2>
        <p>{t('legal.data_protection_policy_content')}</p>
      </section>

      {/* Terms of Use Section */}
      <section>
        <h2>{t('legal.terms_of_use_title')}</h2>
        <p>{t('legal.terms_of_use_content')}</p>
      </section>

      {/* Additional Sections as Needed */}
      {/* Example: Cookies Policy */}
      <section>
        <h2>{t('legal.cookies_policy_title')}</h2>
        <p>{t('legal.cookies_policy_content')}</p>
      </section>
    </motion.div>
  );
};

export default Legal;
