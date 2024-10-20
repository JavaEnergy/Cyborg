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
          <li>
            <Link to={`/${currentLang}/about-us`}>{t('menu.about_us')}</Link>
          </li>

          <li className="dropdown">
            <Link to={`/${currentLang}/it-consulting`} className="dropdown-link">
              {t('menu.it_consulting')}
            </Link>
            <ul className="submenu">
              <li>
                <Link to={`/${currentLang}/it-consulting#from-idea-to-implementation`}>
                  {t('it_consulting.from_idea_to_implementation')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/it-consulting#it-strategy`}>
                  {t('it_consulting.it_strategy')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/it-consulting#software-consulting`}>
                  {t('it_consulting.software_consulting')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/it-consulting#it-security`}>
                  {t('it_consulting.it_security')}
                </Link>
              </li>
            </ul>
          </li>

          <li className="dropdown">
            <Link to={`/${currentLang}/web-development`} className="dropdown-link">
              {t('menu.web_development')}
            </Link>
            <ul className="submenu">
              <li>
                <Link to={`/${currentLang}/web-development#wordpress`}>
                  {t('web_development.wordpress')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/web-development#react-applications`}>
                  {t('web_development.react_applications')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/web-development#angular-development`}>
                  {t('web_development.angular_development')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/web-development#e-commerce`}>
                  {t('web_development.e_commerce')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/web-development#custom-software`}>
                  {t('web_development.custom_software')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/web-development#technologies-tools`}>
                  {t('web_development.technologies_tools')}
                </Link>
              </li>
            </ul>
          </li>

          <li className="dropdown">
            <Link to={`/${currentLang}/it-services`} className="dropdown-link">
              {t('menu.it_services')}
            </Link>
            <ul className="submenu">
              <li>
                <Link to={`/${currentLang}/it-services#full-service-it`}>
                  {t('it_services.full_service_it')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/it-services#server-management`}>
                  {t('it_services.server_management')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/it-services#cloud-backup`}>
                  {t('it_services.cloud_backup')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLang}/it-services#user-support`}>
                  {t('it_services.user_support')}
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to={`/${currentLang}/contact-us`}>{t('menu.contact_us')}</Link>
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
