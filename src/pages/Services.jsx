// src/pages/Services.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout';

const Services = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <h2>{t('services')}</h2>
    </Layout>
  );
};

export default Services;
