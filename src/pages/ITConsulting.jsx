// src/pages/ITConsulting.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const ITConsulting = () => {
  const { t } = useTranslation();

  return (
    <div className="it-consulting">
      <h1>{t('it_consulting')}</h1>

      {/* Section 1: From Idea to Implementation */}
      <section id="idea-implementation">
        <h2>{t('from_idea_to_implementation')}</h2>
        <p>{t('content_for_idea_implementation')}</p>
      </section>

      {/* Section 2: IT Strategy & Digitalization */}
      <section id="it-strategy">
        <h2>{t('it_strategy')}</h2>
        <p>{t('content_for_it_strategy')}</p>
      </section>

      {/* Section 3: Software Consulting */}
      <section id="software-consulting">
        <h2>{t('software_consulting')}</h2>
        <p>{t('content_for_software_consulting')}</p>
      </section>

      {/* Section 4: IT Security & Audits */}
      <section id="it-security">
        <h2>{t('it_security')}</h2>
        <p>{t('content_for_it_security')}</p>
      </section>
    </div>
  );
};

export default ITConsulting;
