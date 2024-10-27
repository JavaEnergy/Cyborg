// src/pages/AboutUs.jsx
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout'; // Import Layout component

const AboutUs = () => {
  const { t, i18n } = useTranslation();
  const [content, setContent] = useState('');

  useEffect(() => {
    setContent(t('about_us')); // Update content when language changes
  }, [i18n.language]);

  if (!content) return <div>Loading...</div>; // Prevent white screen

  return (
    <Layout> {/* Wrap content inside the Layout */}
      <div className="about-us">
        <h2>{content}</h2>
        <p>
          {t('about_us_description')}
        </p>
      </div>
    </Layout>
  );
};

export default AboutUs;
