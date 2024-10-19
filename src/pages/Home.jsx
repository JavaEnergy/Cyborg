import React from 'react';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2>{t('home')}</h2>
      <p>{t('welcome_message')}</p>
    </div>
  );
};

export default Home;
