// src/pages/Home.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import './Home.css'; // Import the CSS for styling

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="home-container">
      <div className="content">
        <h1>{t('home.title')}</h1>
        {/* <h2>{t('home.subtitle')}</h2>

        <section className="vision-mission">
          <p>{t('home.vision_content')}</p>
        </section> */}

        {/* <section className="it-wish">
          <h2>{t('home.wish_title')}</h2>
          <p>{t('home.wish_content')}</p>
        </section> */}
      </div>
    </div>
  );
};

export default Home;
