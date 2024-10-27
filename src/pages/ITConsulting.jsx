// src/pages/ITConsulting.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout';
import './ITConsulting.css';

const ITConsulting = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="it-consulting">
        <h1>{t('it_consulting.it_consulting')}</h1>

        <section id="from-idea-to-implementation">
          <h2>{t('it_consulting.from_idea_to_implementation')}</h2>
          <p>{t('it_consulting.content_for_from_idea_to_implementation')}</p>
        </section>

        <section id="it-strategy">
          <h2>{t('it_consulting.it_strategy')}</h2>
          <p>{t('it_consulting.content_for_it_strategy')}</p>
        </section>

        <section id="software-consulting">
          <h2>{t('it_consulting.software_consulting')}</h2>
          <p>{t('it_consulting.content_for_software_consulting')}</p>
        </section>

        <section id="it-security">
          <h2>{t('it_consulting.it_security')}</h2>
          <p>{t('it_consulting.content_for_it_security')}</p>
        </section>
      </div>
    </Layout>
  );
};

export default ITConsulting;
