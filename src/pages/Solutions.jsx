import React from 'react';
import { useTranslation } from 'react-i18next';

const Solutions = () => {
  const { t } = useTranslation();
  return <h2>{t('solutions')}</h2>;
};

export default Solutions;
