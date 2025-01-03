// src/components/Header/Header.jsx
import { useState, useEffect, forwardRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useTranslation } from 'react-i18next';
import './Header.css';

// Import icons from MUI
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';

// Import logo images
import logo from '../../assets/images/logo/Cyborg-logo-9-09.png';
import logoDark from '../../assets/images/logo/Cyborg-logo 10-10.png'; // Dark logo for scrolled state
import logode from '../../assets/images/germany_round_icon_640.png';
import logouk from '../../assets/images/united_kingdom_round_icon_640.png';

const Header = forwardRef((props, ref) => {
  const { t, i18n } = useTranslation();
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [openDropdown, setOpenDropdown] = useState(null);

  const currentLang = i18n.language;
  const isGerman = currentLang === 'de';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const changeLanguage = (lng) => {
    const newPath = pathname.replace(/^\/(en|de)/, `/${lng}`) + hash;
    i18n.changeLanguage(lng);
    navigate(newPath, { replace: true });
  };

  const goToHome = () => {
    navigate(`/${currentLang}`, { replace: true });
  };

  const isActiveLink = (link) => {
    const linkPathname = link.split('#')[0];
    const currentPathname = pathname.replace(/\/$/, '');
    const linkPath = linkPathname.replace(/\/$/, '');
    return currentPathname === linkPath;
  };

  const isActiveSubmenuLink = (link) => {
    const linkHash = link.split('#')[1] ? `#${link.split('#')[1]}` : '';
    return hash === linkHash && isActiveLink(link);
  };

  // Close mobile menu when clicking outside the header
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        ref.current &&
        !ref.current.contains(event.target) &&
        !event.target.closest('.hamburger')
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen, ref]);

  // Top bar message based on language
  const topBarMessage = isGerman
    ? "Wir sind 24/7 für Sie da!"
    : "We are available 24/7!";

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-bar-content">
          <span className="top-bar-message">{topBarMessage}</span>
          <div className="top-bar-contact-group">
            <span className="top-bar-contact">
              <EmailIcon fontSize="small" className="top-bar-icon email-icon" />
              <a href="mailto:info@cyborg.com">info@cyborg.com</a>
            </span>
            <span className="top-bar-contact">
              <a href="https://wa.me/995598707973" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <WhatsAppIcon fontSize="small" className="top-bar-icon whatsapp-icon" />
              </a>
            </span>
          </div>
        </div>
      </div>

      {/* Horizontal Rule between Top Bar and Header */}
      <hr className="topbar-hr" />

      {/* Main Header */}
      <header ref={ref} className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          {/* Mobile Language Switcher */}
          {isMobile && (
            <div className="language-switch mobile-language-switch">
              <button
                className={currentLang === 'de' ? 'active' : ''}
                onClick={() => changeLanguage('de')}
                aria-label="German Language"
              >
                <img src={logode} alt="German Flag" />
              </button>
              <button
                className={currentLang === 'en' ? 'active' : ''}
                onClick={() => changeLanguage('en')}
                aria-label="English Language"
              >
                <img src={logouk} alt="UK Flag" />
              </button>
            </div>
          )}

          {/* Hamburger Menu for Mobile */}
          {isMobile && (
            <button
              className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          )}

          {/* Logo */}
          <div className="logo-container" onClick={goToHome} style={{ cursor: 'pointer' }}>
            <img src={isScrolled ? logoDark : logo} alt="Logo" />
            <h1 className="it-title">
              IT Solutions
              <div className="it-aurora">
                <div className="it-aurora__item"></div>
                <div className="it-aurora__item"></div>
                <div className="it-aurora__item"></div>
                <div className="it-aurora__item"></div>
              </div>
            </h1>
          </div>

          {/* Desktop Navigation and Language Switcher */}
          {!isMobile && (
            <>
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
                    onMouseEnter={() => setOpenDropdown('it-consulting')}
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
                        <HashLink
                          smooth
                          to={`/${currentLang}/it-consulting#from-idea-to-implementation`}
                          className={
                            isActiveSubmenuLink(`/${currentLang}/it-consulting#from-idea-to-implementation`)
                              ? 'active'
                              : ''
                          }
                        >
                          {t('it_consulting.from_idea_to_implementation')}
                        </HashLink>
                      </li>
                      <li>
                        <HashLink
                          smooth
                          to={`/${currentLang}/it-consulting#it-strategy`}
                          className={
                            isActiveSubmenuLink(`/${currentLang}/it-consulting#it-strategy`)
                              ? 'active'
                              : ''
                          }
                        >
                          {t('it_consulting.it_strategy')}
                        </HashLink>
                      </li>
                      <li>
                        <HashLink
                          smooth
                          to={`/${currentLang}/it-consulting#software-consulting`}
                          className={
                            isActiveSubmenuLink(`/${currentLang}/it-consulting#software-consulting`)
                              ? 'active'
                              : ''
                          }
                        >
                          {t('it_consulting.software_consulting')}
                        </HashLink>
                      </li>
                      <li>
                        <HashLink
                          smooth
                          to={`/${currentLang}/it-consulting#it-security`}
                          className={
                            isActiveSubmenuLink(`/${currentLang}/it-consulting#it-security`)
                              ? 'active'
                              : ''
                          }
                        >
                          {t('it_consulting.it_security')}
                        </HashLink>
                      </li>
                    </ul>
                  </li>

                  {/* Web Development Dropdown */}
                  <li
                    className={`dropdown ${openDropdown === 'web-development' ? 'open' : ''}`}
                    onMouseEnter={() => setOpenDropdown('web-development')}
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
                        <HashLink
                          smooth
                          to={`/${currentLang}/web-development#wordpress`}
                          className={
                            isActiveSubmenuLink(`/${currentLang}/web-development#wordpress`) ? 'active' : ''
                          }
                        >
                          {t('web_development.wordpress')}
                        </HashLink>
                      </li>
                      <li>
                        <HashLink
                          smooth
                          to={`/${currentLang}/web-development#react-applications`}
                          className={
                            isActiveSubmenuLink(`/${currentLang}/web-development#react-applications`)
                              ? 'active'
                              : ''
                          }
                        >
                          {t('web_development.react_applications')}
                        </HashLink>
                      </li>
                      <li>
                        <HashLink
                          smooth
                          to={`/${currentLang}/web-development#angular-development`}
                          className={
                            isActiveSubmenuLink(`/${currentLang}/web-development#angular-development`)
                              ? 'active'
                              : ''
                          }
                        >
                          {t('web_development.angular_development')}
                        </HashLink>
                      </li>
                      <li>
                        <HashLink
                          smooth
                          to={`/${currentLang}/web-development#e-commerce`}
                          className={
                            isActiveSubmenuLink(`/${currentLang}/web-development#e-commerce`) ? 'active' : ''
                          }
                        >
                          {t('web_development.e_commerce')}
                        </HashLink>
                      </li>
                      <li>
                        <HashLink
                          smooth
                          to={`/${currentLang}/web-development#custom-software`}
                          className={
                            isActiveSubmenuLink(`/${currentLang}/web-development#custom-software`)
                              ? 'active'
                              : ''
                          }
                        >
                          {t('web_development.custom_software')}
                        </HashLink>
                      </li>
                      <li>
                        <HashLink
                          smooth
                          to={`/${currentLang}/web-development#technologies-tools`}
                          className={
                            isActiveSubmenuLink(`/${currentLang}/web-development#technologies-tools`)
                              ? 'active'
                              : ''
                          }
                        >
                          {t('web_development.technologies_tools')}
                        </HashLink>
                      </li>
                    </ul>
                  </li>

                  {/* Zoho Consulting Dropdown */}
                  <li
                    className={`dropdown ${openDropdown === 'zoho-consulting' ? 'open' : ''}`}
                    onMouseEnter={() => setOpenDropdown('zoho-consulting')}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <NavLink
                      to={`/${currentLang}/zoho-consulting`}
                      className={isActiveLink(`/${currentLang}/zoho-consulting`) ? 'active' : ''}
                      aria-haspopup="true"
                      aria-expanded={openDropdown === 'zoho-consulting'}
                    >
                      {t('menu.zoho_consulting')}
                    </NavLink>
                    <ul className="submenu">
                      <li>
                        <HashLink
                          smooth
                          to={`/${currentLang}/zoho-consulting#zoho-crm`}
                          className={
                            isActiveSubmenuLink(`/${currentLang}/zoho-consulting#zoho-crm`) ? 'active' : ''
                          }
                        >
                          {t('zoho_consulting.zoho_crm')}
                        </HashLink>
                      </li>
                      <li>
                        <HashLink
                          smooth
                          to={`/${currentLang}/zoho-consulting#zoho-books`}
                          className={
                            isActiveSubmenuLink(`/${currentLang}/zoho-consulting#zoho-books`) ? 'active' : ''
                          }
                        >
                          {t('zoho_consulting.zoho_books')}
                        </HashLink>
                      </li>
                      <li>
                        <HashLink
                          smooth
                          to={`/${currentLang}/zoho-consulting#zoho-projects`}
                          className={
                            isActiveSubmenuLink(`/${currentLang}/zoho-consulting#zoho-projects`) ? 'active' : ''
                          }
                        >
                          {t('zoho_consulting.zoho_projects')}
                        </HashLink>
                      </li>
                      <li>
                        <HashLink
                          smooth
                          to={`/${currentLang}/zoho-consulting#custom-development`}
                          className={
                            isActiveSubmenuLink(`/${currentLang}/zoho-consulting#custom-development`) ? 'active' : ''
                          }
                        >
                          {t('zoho_consulting.custom_development')}
                        </HashLink>
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
              {/* Language Switcher for Desktop */}
              <div className="language-switch desktop-language-switch">
                <button
                  className={currentLang === 'de' ? 'active' : ''}
                  onClick={() => changeLanguage('de')}
                  aria-label="German Language"
                >
                  <img src={logode} alt="German Flag" />
                </button>
                <button
                  className={currentLang === 'en' ? 'active' : ''}
                  onClick={() => changeLanguage('en')}
                  aria-label="English Language"
                >
                  <img src={logouk} alt="UK Flag" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Slide-Down Mobile Menu */}
        {isMobile && (
          <div className={`mobile-menu-slide ${isMobileMenuOpen ? 'open' : ''}`}>
            <ul className="mobile-main-menu">
              <li>
                <NavLink
                  to={`/${currentLang}/about-us`}
                  className={isActiveLink(`/${currentLang}/about-us`) ? 'active' : ''}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('menu.about_us')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/${currentLang}/it-consulting`}
                  className={isActiveLink(`/${currentLang}/it-consulting`) ? 'active' : ''}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('menu.it_consulting')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/${currentLang}/web-development`}
                  className={isActiveLink(`/${currentLang}/web-development`) ? 'active' : ''}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('menu.web_development')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/${currentLang}/zoho-consulting`}
                  className={isActiveLink(`/${currentLang}/zoho-consulting`) ? 'active' : ''}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('menu.zoho_consulting')}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/${currentLang}/contact-us`}
                  className={isActiveLink(`/${currentLang}/contact-us`) ? 'active' : ''}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('menu.contact_us')}
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
});

Header.displayName = 'Header';

export default Header;
