// src/pages/AboutUs.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2>{t('about_us')}</h2>
      <p>{t('about_us_description')}</p>
    </div>
  );
};

export default AboutUs;
