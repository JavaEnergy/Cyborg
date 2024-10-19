// src/components/Header/Header.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Header.css';

const Header = () => {
  const { t, i18n } = useTranslation(); // i18n instance for language management
  const { pathname } = useLocation(); // Current path
  const navigate = useNavigate(); // Navigate between routes

  // Switch the language and adjust the path
  const changeLanguage = (lng) => {
    const newPath = pathname.replace(/^\/(en|de)/, `/${lng}`); // Update path with the new language
    i18n.changeLanguage(lng); // Change content language
    navigate(newPath); // Navigate to the new path
  };

  const currentLang = i18n.language; // Current language

  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <Link to={`/${currentLang}`}>{t('home')}</Link>
          </li>
          <li>
            <Link to={
              currentLang === 'de'
                ? `/${currentLang}/ueber-uns`
                : `/${currentLang}/about-us`
            }>
              {t('about_us')}
            </Link>
          </li>
        </ul>
      </nav>
      <div className="language-switch">
        <button onClick={() => changeLanguage('de')}>Deutsch</button>
        <button onClick={() => changeLanguage('en')}>English</button>
      </div>
    </header>
  );
};

export default Header;
