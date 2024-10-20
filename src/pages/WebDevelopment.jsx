// src/pages/WebDevelopment.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import './WebDevelopment.css';

const WebDevelopment = () => {
  const { t } = useTranslation();

  return (
    <div className="web-development">
      <h1>{t('web_development.web_development')}</h1>

      <section id="wordpress">
        <h2>{t('web_development.wordpress')}</h2>
        <p>{t('web_development.content_for_wordpress')}</p>
      </section>

      <section id="react-applications">
        <h2>{t('web_development.react_applications')}</h2>
        <p>{t('web_development.content_for_react_applications')}</p>
      </section>

      <section id="angular-development">
        <h2>{t('web_development.angular_development')}</h2>
        <p>{t('web_development.content_for_angular_development')}</p>
      </section>

      <section id="e-commerce">
        <h2>{t('web_development.e_commerce')}</h2>
        <p>{t('web_development.content_for_e_commerce')}</p>
      </section>

      <section id="custom-software">
        <h2>{t('web_development.custom_software')}</h2>
        <p>{t('web_development.content_for_custom_software')}</p>
      </section>

      <section id="technologies-tools">
        <h2>{t('web_development.technologies_tools')}</h2>
        <p>{t('web_development.content_for_technologies_tools')}</p>
      </section>
    </div>
  );
};

export default WebDevelopment;
