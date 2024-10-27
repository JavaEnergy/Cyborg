// src/pages/ITServices.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout';
import './ITServices.css';

const ITServices = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="it-services">
        <h1>{t('menu.it_services')}</h1>

        <section id="full-service-it">
          <h2>{t('it_services.full_service_it')}</h2>
          <p>{t('it_services.content_for_full_service_it')}</p>
        </section>

        <section id="server-management">
          <h2>{t('it_services.server_management')}</h2>
          <p>{t('it_services.content_for_server_management')}</p>
        </section>

        <section id="cloud-backup">
          <h2>{t('it_services.cloud_backup')}</h2>
          <p>{t('it_services.content_for_cloud_backup')}</p>
        </section>

        <section id="user-support">
          <h2>{t('it_services.user_support')}</h2>
          <p>{t('it_services.content_for_user_support')}</p>
        </section>
      </div>
    </Layout>
  );
};

export default ITServices;
