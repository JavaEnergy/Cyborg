import React from 'react';
import { useTranslation } from 'react-i18next';

const Services = () => {
  const { t } = useTranslation();
  return <h2>{t('services')}</h2>;
};

export default Services;
