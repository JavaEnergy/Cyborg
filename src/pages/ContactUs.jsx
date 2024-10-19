import React from 'react';
import { useTranslation } from 'react-i18next';

const ContactUs = () => {
  const { t } = useTranslation();
  return <h2>{t('contact_us')}</h2>;
};

export default ContactUs;
