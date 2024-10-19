// src/pages/Home.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import './Home.css'; // Import the CSS for styling

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="home-container">
      <div className="content">
        <h2>{t('home')}</h2>
        <p>{t('welcome_message')}</p>
      </div>
    </div>
  );
};

export default Home;
