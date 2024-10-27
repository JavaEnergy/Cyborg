// src/pages/ContactUs.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout';

const ContactUs = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <h2>{t('contact_us')}</h2>
    </Layout>
  );
};

export default ContactUs;
