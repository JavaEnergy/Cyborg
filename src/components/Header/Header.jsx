import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Header.css';
import logo from '../../assets/images/301963638_404276911813423_143320338695708279_n.png';
import logode from '../../assets/images/germany_round_icon_64 (1).png'
import logouk from '../../assets/images/united_kingdom_round_icon_64.png'


const Header = () => {
  const { t, i18n } = useTranslation();
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false); // Added isScrolled state

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Track scroll position
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (lng) => {
    const newPath = pathname.replace(/^\/(en|de)/, `/${lng}`);
    i18n.changeLanguage(lng);
    navigate(newPath, { replace: true });
  };

  const currentLang = i18n.language;

  const goToHome = () => {
    navigate(`/${currentLang}`, { replace: true });
  };

  const toggleDropdown = (section) => {
    setOpenDropdown(openDropdown === section ? null : section);
  };

  const isActiveLink = (link) => {
    const [linkPathname, linkHash] = link.split('#');
    const linkHashWithHash = linkHash ? `#${linkHash}` : '';
    return pathname === linkPathname && hash === linkHashWithHash;
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}> {/* Added dynamic class */}
      <div className="logo-container" onClick={goToHome} style={{ cursor: 'pointer' }}>
        <img src={logo} alt="Logo" />
      </div>

      <nav>
        <ul className="main-menu">
          <li>
            <NavLink
              to={`/${currentLang}/about-us`}
              className={isActiveLink(`/${currentLang}/about-us`) ? 'active' : ''}
            >
              {t('menu.about_us')}
            </NavLink>
          </li>

          {/* IT Consulting Dropdown */}
          <li
            className={`dropdown ${openDropdown === 'it-consulting' ? 'open' : ''}`}
            onMouseEnter={() => toggleDropdown('it-consulting')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <NavLink
              to={`/${currentLang}/it-consulting`}
              className={isActiveLink(`/${currentLang}/it-consulting`) ? 'active' : ''}
              aria-haspopup="true"
              aria-expanded={openDropdown === 'it-consulting'}
            >
              {t('menu.it_consulting')}
            </NavLink>
            <ul className="submenu">
              <li>
                <NavLink
                  to={`/${currentLang}/it-consulting#from-idea-to-implementation`}
                  className={
                    isActiveLink(`/${currentLang}/it-consulting#from-idea-to-implementation`) ? 'active' : ''
                  }
                >
                  {t('it_consulting.from_idea_to_implementation')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/${currentLang}/it-consulting#it-strategy`}
                  className={
                    isActiveLink(`/${currentLang}/it-consulting#it-strategy`) ? 'active' : ''
                  }
                >
                  {t('it_consulting.it_strategy')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/${currentLang}/it-consulting#software-consulting`}
                  className={
                    isActiveLink(`/${currentLang}/it-consulting#software-consulting`) ? 'active' : ''
                  }
                >
                  {t('it_consulting.software_consulting')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/${currentLang}/it-consulting#it-security`}
                  className={
                    isActiveLink(`/${currentLang}/it-consulting#it-security`) ? 'active' : ''
                  }
                >
                  {t('it_consulting.it_security')}
                </NavLink>
              </li>
            </ul>
          </li>

          {/* Web Development Dropdown */}
          <li
            className={`dropdown ${openDropdown === 'web-development' ? 'open' : ''}`}
            onMouseEnter={() => toggleDropdown('web-development')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <NavLink
              to={`/${currentLang}/web-development`}
              className={isActiveLink(`/${currentLang}/web-development`) ? 'active' : ''}
              aria-haspopup="true"
              aria-expanded={openDropdown === 'web-development'}
            >
              {t('menu.web_development')}
            </NavLink>
            <ul className="submenu">
              <li>
                <NavLink
                  to={`/${currentLang}/web-development#wordpress`}
                  className={
                    isActiveLink(`/${currentLang}/web-development#wordpress`) ? 'active' : ''
                  }
                >
                  {t('web_development.wordpress')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/${currentLang}/web-development#react-applications`}
                  className={
                    isActiveLink(`/${currentLang}/web-development#react-applications`) ? 'active' : ''
                  }
                >
                  {t('web_development.react_applications')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/${currentLang}/web-development#angular-development`}
                  className={
                    isActiveLink(`/${currentLang}/web-development#angular-development`) ? 'active' : ''
                  }
                >
                  {t('web_development.angular_development')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/${currentLang}/web-development#e-commerce`}
                  className={
                    isActiveLink(`/${currentLang}/web-development#e-commerce`) ? 'active' : ''
                  }
                >
                  {t('web_development.e_commerce')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/${currentLang}/web-development#custom-software`}
                  className={
                    isActiveLink(`/${currentLang}/web-development#custom-software`) ? 'active' : ''
                  }
                >
                  {t('web_development.custom_software')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/${currentLang}/web-development#technologies-tools`}
                  className={
                    isActiveLink(`/${currentLang}/web-development#technologies-tools`) ? 'active' : ''
                  }
                >
                  {t('web_development.technologies_tools')}
                </NavLink>
              </li>
            </ul>
          </li>

          {/* IT Services Dropdown */}
          <li
            className={`dropdown ${openDropdown === 'it-services' ? 'open' : ''}`}
            onMouseEnter={() => toggleDropdown('it-services')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <NavLink
              to={`/${currentLang}/it-services`}
              className={isActiveLink(`/${currentLang}/it-services`) ? 'active' : ''}
              aria-haspopup="true"
              aria-expanded={openDropdown === 'it-services'}
            >
              {t('menu.it_services')}
            </NavLink>
            <ul className="submenu">
              <li>
                <NavLink
                  to={`/${currentLang}/it-services#full-service-it`}
                  className={
                    isActiveLink(`/${currentLang}/it-services#full-service-it`) ? 'active' : ''
                  }
                >
                  {t('it_services.full_service_it')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/${currentLang}/it-services#server-management`}
                  className={
                    isActiveLink(`/${currentLang}/it-services#server-management`) ? 'active' : ''
                  }
                >
                  {t('it_services.server_management')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/${currentLang}/it-services#cloud-backup`}
                  className={
                    isActiveLink(`/${currentLang}/it-services#cloud-backup`) ? 'active' : ''
                  }
                >
                  {t('it_services.cloud_backup')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/${currentLang}/it-services#user-support`}
                  className={
                    isActiveLink(`/${currentLang}/it-services#user-support`) ? 'active' : ''
                  }
                >
                  {t('it_services.user_support')}
                </NavLink>
              </li>
            </ul>
          </li>

          <li>
            <NavLink
              to={`/${currentLang}/contact-us`}
              className={isActiveLink(`/${currentLang}/contact-us`) ? 'active' : ''}
            >
              {t('menu.contact_us')}
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="language-switch">
        <button
          className={currentLang === 'de' ? 'active' : ''}
          onClick={() => changeLanguage('de')}
        >

          <img src={logode} alt="German Flag" />
        </button>
        <button
          className={currentLang === 'en' ? 'active' : ''}
          onClick={() => changeLanguage('en')}
        >
          <img src={logouk} alt="UK Flag" />
        </button>
      </div>
    </header>
  );
};

export default Header;
