// src/pages/ITServices.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import './ITServices.css'; // Optional CSS

const ITServices = () => {
  const { t } = useTranslation();

  return (
    <div className="it-services">
      <h1>{t('it_services')}</h1>

      <section id="full-service-it">
        <h2>{t('full_service_it')}</h2>
        <p>{t('content_for_full_service_it')}</p>
      </section>

      <section id="server-management">
        <h2>{t('server_management')}</h2>
        <p>{t('content_for_server_management')}</p>
      </section>

      <section id="cloud-backup">
        <h2>{t('cloud_backup')}</h2>
        <p>{t('content_for_cloud_backup')}</p>
      </section>

      <section id="user-support">
        <h2>{t('user_support')}</h2>
        <p>{t('content_for_user_support')}</p>
      </section>
    </div>
  );
};

export default ITServices;
