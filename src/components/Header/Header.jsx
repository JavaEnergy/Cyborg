// src/components/Header/Header.jsx
import { useState, useEffect, forwardRef, useMemo } from 'react';
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

const Header = forwardRef(({ className = '' }, ref) => { // Added className prop
  const { t, i18n } = useTranslation();
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 400);
  const [openDropdown, setOpenDropdown] = useState(null);

  const currentLang = i18n.language;
  const isGerman = currentLang === 'de';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsSmallScreen(window.innerWidth <= 400);
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
    const linkPathname = link.split('#')[0].replace(/\/$/, '');
    const currentPathnameCleaned = pathname.replace(/\/$/, '');
    return currentPathnameCleaned === linkPathname;
  };

  const isActiveSubmenuLink = (link) => {
    const linkHash = link.split('#')[1] ? `#${link.split('#')[1]}` : '';
    return hash === linkHash && isActiveLink(link);
  };

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

  // Short heading for small screens vs. normal heading
  const topBarMessage = useMemo(() => {
    if (isGerman) {
      return isSmallScreen ? '24/7 für Sie da!' : 'Wir sind 24/7 für Sie da!';
    } else {
      return isSmallScreen ? 'Available 24/7!' : 'We are available 24/7!';
    }
  }, [isGerman, isSmallScreen]);

  return (
    <>
      {/* Top Bar */}
      <div className={`top-bar ${className}`}> {/* Added className */}
        <div className="top-bar-content">
          <span className="top-bar-message">{topBarMessage}</span>
          <div className="top-bar-contact-group">
            <span className="top-bar-contact">
              <EmailIcon
                fontSize="small"
                className="top-bar-icon email-icon"
                aria-hidden="true"
              />
              <a href="mailto:info@cyborg-it.de">info@cyborg-it.de</a>
            </span>
            <span className="top-bar-contact">
              <a
                href="https://wa.me/995598707973"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon
                  fontSize="small"
                  className="top-bar-icon whatsapp-icon"
                />
              </a>
            </span>
          </div>
        </div>
      </div>

      {/* Horizontal Rule between Top Bar and Header */}
      <hr className={`topbar-hr ${className}`} /> {/* Added className */}

      {/* Main Header */}
      <header ref={ref} className={`header ${isScrolled ? 'scrolled' : ''} ${className}`}> {/* Added className */}
        <div className="header-container">
          {/* Mobile Language Switcher */}
          {isMobile && (
            <div className="language-switch mobile-language-switch exclude-spider"> {/* Added exclude-spider */}
              <button
                className={currentLang === 'de' ? 'active' : ''}
                onClick={() => changeLanguage('de')}
                aria-label="German Language"
              >
                <img
                  src={logode}
                  alt="German flag for language selection"
                />
              </button>
              <button
                className={currentLang === 'en' ? 'active' : ''}
                onClick={() => changeLanguage('en')}
                aria-label="English Language"
              >
                <img
                  src={logouk}
                  alt="English flag for language selection"
                />
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
          <div
            className="logo-container"
            onClick={goToHome}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={isScrolled ? logoDark : logo}
              alt="Cyborg Automation logo"
            />
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
                    className={`dropdown ${
                      openDropdown === 'it-consulting' ? 'open' : ''
                    }`}
                    onMouseEnter={() => setOpenDropdown('it-consulting')}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <NavLink
                      to={`/${currentLang}/it-consulting`}
                      className={
                        isActiveLink(`/${currentLang}/it-consulting`)
                          ? 'active'
                          : ''
                      }
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
                            isActiveSubmenuLink(
                              `/${currentLang}/it-consulting#from-idea-to-implementation`
                            )
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
                            isActiveSubmenuLink(
                              `/${currentLang}/it-consulting#it-strategy`
                            )
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
                            isActiveSubmenuLink(
                              `/${currentLang}/it-consulting#software-consulting`
                            )
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
                            isActiveSubmenuLink(
                              `/${currentLang}/it-consulting#it-security`
                            )
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
                    className={`dropdown ${
                      openDropdown === 'web-development' ? 'open' : ''
                    }`}
                    onMouseEnter={() => setOpenDropdown('web-development')}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <NavLink
                      to={`/${currentLang}/web-development`}
                      className={
                        isActiveLink(`/${currentLang}/web-development`)
                          ? 'active'
                          : ''
                      }
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
                            isActiveSubmenuLink(
                              `/${currentLang}/web-development#wordpress`
                            )
                              ? 'active'
                              : ''
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
                            isActiveSubmenuLink(
                              `/${currentLang}/web-development#react-applications`
                            )
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
                            isActiveSubmenuLink(
                              `/${currentLang}/web-development#angular-development`
                            )
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
                            isActiveSubmenuLink(
                              `/${currentLang}/web-development#e-commerce`
                            )
                              ? 'active'
                              : ''
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
                            isActiveSubmenuLink(
                              `/${currentLang}/web-development#custom-software`
                            )
                              ? 'active'
                              : ''
                          }
                        >
                          {t('web_development.custom_software')}
                        </HashLink>
                      </li>
                    </ul>
                  </li>

                  {/* Zoho Consulting Dropdown */}
                  <li
                    className={`dropdown ${
                      openDropdown === 'zoho-consulting' ? 'open' : ''
                    }`}
                    onMouseEnter={() => setOpenDropdown('zoho-consulting')}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <NavLink
                      to={`/${currentLang}/zoho-consulting`}
                      className={
                        isActiveLink(`/${currentLang}/zoho-consulting`)
                          ? 'active'
                          : ''
                      }
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
                            isActiveSubmenuLink(
                              `/${currentLang}/zoho-consulting#zoho-crm`
                            )
                              ? 'active'
                              : ''
                          }
                        >
                          {t('zoho_consulting.zoho_crm')}
                        </HashLink>
                      </li>
                      <li>
                        <HashLink
                          smooth
                          to={`/${currentLang}/zoho-consulting#zoho-marketing`}
                          className={
                            isActiveSubmenuLink(
                              `/${currentLang}/zoho-consulting#zoho-marketing`
                            )
                              ? 'active'
                              : ''
                          }
                        >
                          {t('zoho_consulting.zoho_marketing')}
                        </HashLink>
                      </li>
                      <li>
                        <HashLink
                          smooth
                          to={`/${currentLang}/zoho-consulting#zoho-finance`}
                          className={
                            isActiveSubmenuLink(
                              `/${currentLang}/zoho-consulting#zoho-finance`
                            )
                              ? 'active'
                              : ''
                          }
                        >
                          {t('zoho_consulting.zoho_finance')}
                        </HashLink>
                      </li>
                      <li>
                        <HashLink
                          smooth
                          to={`/${currentLang}/zoho-consulting#zoho-human-resources`}
                          className={
                            isActiveSubmenuLink(
                              `/${currentLang}/zoho-consulting#zoho-human-resources`
                            )
                              ? 'active'
                              : ''
                          }
                        >
                          {t('zoho_consulting.zoho_human_resources')}
                        </HashLink>
                      </li>
                      <li>
                        <HashLink
                          smooth
                          to={`/${currentLang}/zoho-consulting#custom-development`}
                          className={
                            isActiveSubmenuLink(
                              `/${currentLang}/zoho-consulting#custom-development`
                            )
                              ? 'active'
                              : ''
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
              <div className="language-switch desktop-language-switch exclude-spider"> {/* Added exclude-spider class */}
                <button
                  className={currentLang === 'de' ? 'active' : ''}
                  onClick={() => changeLanguage('de')}
                  aria-label="German Language"
                >
                  <img
                    src={logode}
                    alt="German flag for language selection"
                  />
                </button>
                <button
                  className={currentLang === 'en' ? 'active' : ''}
                  onClick={() => changeLanguage('en')}
                  aria-label="English Language"
                >
                  <img
                    src={logouk}
                    alt="English flag for language selection"
                  />
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
