// src/components/Header/Header.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Header.css';
import logo from '../../assets/images/301963638_404276911813423_143320338695708279_n.png';

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
      <div className="logo-container">
        <img src={logo} alt="Logo" style={{ width: '50px' }} />
      </div>

      <nav>
        <ul className="main-menu">
          <li><Link to={`/${currentLang}`}>{t('home')}</Link></li>

          <li className="dropdown">
            <span>{t('about_us')}</span>
            <ul className="submenu">
              <li><Link to={`/${currentLang}/about-us`}>{t('about_us')}</Link></li>
            </ul>
          </li>

          <li className="dropdown">
            <span>{t('it_consulting')}</span>
            <ul className="submenu">
              <li>{t('from_idea_to_implementation')}</li>
              <li>{t('it_strategy')}</li>
              <li>{t('software_consulting')}</li>
              <li>{t('it_security')}</li>
            </ul>
          </li>

          <li className="dropdown">
            <span>{t('web_development')}</span>
            <ul className="submenu">
              <li>{t('wordpress')}</li>
              <li>{t('react_applications')}</li>
              <li>{t('angular_development')}</li>
              <li>{t('e_commerce')}</li>
              <li>{t('custom_software')}</li>
              <li>{t('technologies_tools')}</li>
            </ul>
          </li>

          <li className="dropdown">
            <span>{t('it_services')}</span>
            <ul className="submenu">
              <li>{t('full_service_it')}</li>
              <li>{t('server_management')}</li>
              <li>{t('cloud_backup')}</li>
              <li>{t('user_support')}</li>
            </ul>
          </li>

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
