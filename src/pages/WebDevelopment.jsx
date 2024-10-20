// src/pages/WebDevelopment.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import './WebDevelopment.css'; // Optional CSS

const WebDevelopment = () => {
  const { t } = useTranslation();

  return (
    <div className="web-development">
      <h1>{t('web_development')}</h1>

      <section id="wordpress">
        <h2>{t('wordpress')}</h2>
        <p>{t('content_for_wordpress')}</p>
      </section>

      <section id="react-applications">
        <h2>{t('react_applications')}</h2>
        <p>{t('content_for_react_applications')}</p>
      </section>

      <section id="angular-development">
        <h2>{t('angular_development')}</h2>
        <p>{t('content_for_angular_development')}</p>
      </section>

      <section id="e-commerce">
        <h2>{t('e_commerce')}</h2>
        <p>{t('content_for_e_commerce')}</p>
      </section>

      <section id="custom-software">
        <h2>{t('custom_software')}</h2>
        <p>{t('content_for_custom_software')}</p>
      </section>

      <section id="technologies-tools">
        <h2>{t('technologies_tools')}</h2>
        <p>{t('content_for_technologies_tools')}</p>
      </section>
    </div>
  );
};

export default WebDevelopment;
