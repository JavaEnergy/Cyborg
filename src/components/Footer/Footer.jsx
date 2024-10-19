// src/components/Footer/Footer.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} {t('footer_copyright')}</p>
    </footer>
  );
};

export default Footer;
