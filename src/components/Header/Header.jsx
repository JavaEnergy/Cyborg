// src/components/Header/Header.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Header.css';
import logo from '../../assets/images/301963638_404276911813423_143320338695708279_n.png'

const Header = () => {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Switch language and update the path
  const changeLanguage = (lng) => {
    const newPath = pathname.replace(/^\/(en|de)/, `/${lng}`);
    i18n.changeLanguage(lng);
    navigate(newPath);
  };

  const currentLang = i18n.language;

  return (
    <header className="header">
      <div>
      <img src={logo} alt="Logo" style={{ width: '50px' }} />      </div>

      <nav>
        <ul>
          <li><Link to={`/${currentLang}`}>{t('home')}</Link></li>
          <li><Link to={`/${currentLang}/about-us`}>{t('about_us')}</Link></li>
          <li><Link to={`/${currentLang}/solutions`}>{t('solutions')}</Link></li>
          <li><Link to={`/${currentLang}/services`}>{t('services')}</Link></li>
          <li><Link to={`/${currentLang}/contact-us`}>{t('contact_us')}</Link></li>
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
