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

  const changeLanguage = (lng) => {
    const newPath = pathname.replace(/^\/(en|de)/, `/${lng}`);
    i18n.changeLanguage(lng);
    navigate(newPath, { replace: true });
  };

  const currentLang = i18n.language;

  const goToHome = () => {
    navigate(`/${currentLang}`, { replace: true });
  };

  return (
    <header className="header">
      <div className="logo-container" onClick={goToHome} style={{ cursor: 'pointer' }}>
        <img src={logo} alt="Logo" />
      </div>

      <nav>
        <ul className="main-menu">
          <li><Link to={`/${currentLang}/about-us`}>{t('about_us')}</Link></li>

          <li className="dropdown">
            <span>{t('it_consulting')}</span>
            <ul className="submenu">
              <li><Link to={`/${currentLang}/it-consulting#from-idea-to-implementation`}>{t('from_idea_to_implementation')}</Link></li>
              <li><Link to={`/${currentLang}/it-consulting#it-strategy`}>{t('it_strategy')}</Link></li>
              <li><Link to={`/${currentLang}/it-consulting#software-consulting`}>{t('software_consulting')}</Link></li>
              <li><Link to={`/${currentLang}/it-consulting#it-security`}>{t('it_security')}</Link></li>
            </ul>
          </li>

          <li className="dropdown">
            <span>{t('web_development')}</span>
            <ul className="submenu">
              <li><Link to={`/${currentLang}/web-development#wordpress`}>{t('wordpress')}</Link></li>
              <li><Link to={`/${currentLang}/web-development#react-applications`}>{t('react_applications')}</Link></li>
              <li><Link to={`/${currentLang}/web-development#angular-development`}>{t('angular_development')}</Link></li>
              <li><Link to={`/${currentLang}/web-development#e-commerce`}>{t('e_commerce')}</Link></li>
              <li><Link to={`/${currentLang}/web-development#custom-software`}>{t('custom_software')}</Link></li>
              <li><Link to={`/${currentLang}/web-development#technologies-tools`}>{t('technologies_tools')}</Link></li>
            </ul>
          </li>

          <li className="dropdown">
            <span>{t('it_services')}</span>
            <ul className="submenu">
              <li>
                <Link to={`/${currentLang}/it-services#full-service-it`}>
                  {t('full_service_it')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/it-services#server-management`}>
                  {t('server_management')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/it-services#cloud-backup`}>
                  {t('cloud_backup')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/it-services#user-support`}>
                  {t('user_support')}
                </Link>
              </li>
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
