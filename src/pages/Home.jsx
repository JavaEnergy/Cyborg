// Home.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import './Home.css'; // Import the CSS for styling
import image from '../assets/images/codesurf-caia_image-alamy.jpg'

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="hero">
        <div className="hero-content">
          <h1>{t('home.title')}</h1>
        </div>
      </div>
      <div className="main-content">
        <div className="image-container">
          <img src={image} alt="" />
        </div>
        <div className="text-container">
          <h2>{t('home.subtitle')}</h2>

          <section className="vision-section">
            <p>{t('home.vision_content')}</p>
          </section>

          <section className="wish-section">
            <h2>{t('home.wish_title')}</h2>
            <p>{t('home.wish_content')}</p>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;