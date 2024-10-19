// src/pages/AboutUs.jsx
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const AboutUs = () => {
  const { t, i18n } = useTranslation();
  const [content, setContent] = useState('');

  useEffect(() => {
    setContent(t('about_us')); // Update content when language changes
  }, [i18n.language]);

  if (!content) return <div>Loading...</div>; // Prevent white screen

  return <h2>{content}</h2>;
};

export default AboutUs;
