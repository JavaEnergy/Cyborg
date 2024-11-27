// Header.jsx
import { useState, useEffect, forwardRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useTranslation } from 'react-i18next';
import './Header.css';
import logo from '../../assets/images/301963638_404276911813423_143320338695708279_n.png';
import logode from '../../assets/images/germany_round_icon_64 (1).png';
import logouk from '../../assets/images/united_kingdom_round_icon_64.png';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';

const Header = forwardRef((props, ref) => {
  const { t, i18n } = useTranslation();
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Clean up event listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (lng) => {
    const newPath = pathname.replace(/^\/(en|de)/, `/${lng}`) + hash;
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
    const linkPathname = link.split('#')[0];
    const currentPathname = pathname.replace(/\/$/, '');
    const linkPath = linkPathname.replace(/\/$/, '');
    return currentPathname === linkPath;
  };

  const isActiveSubmenuLink = (link) => {
    const linkHash = link.split('#')[1] ? `#${link.split('#')[1]}` : '';
    return hash === linkHash && isActiveLink(link);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  // Update isMobile on window resize
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);

    // Clean up event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header ref={ref} className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="logo-container" onClick={goToHome}>
        <img src={logo} alt="Logo" />
      </div>

      {/* Hamburger Icon */}
      <button
        className="hamburger"
        onClick={toggleMobileMenu}
        aria-label="Menu"
        aria-expanded={mobileMenuOpen}
      >
        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Desktop Navigation */}
      {!isMobile && (
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
                      isActiveSubmenuLink(`/${currentLang}/it-consulting#it-strategy`) ? 'active' : ''
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
                      isActiveSubmenuLink(`/${currentLang}/it-consulting#it-security`) ? 'active' : ''
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
                      isActiveSubmenuLink(`/${currentLang}/zoho-consulting#zoho-projects`)
                        ? 'active'
                        : ''
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
                      isActiveSubmenuLink(`/${currentLang}/zoho-consulting#custom-development`)
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
      )}

      {/* Mobile Navigation */}
      {isMobile && (
        <>
          <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
            <ul>
              <li>
                <NavLink
                  to={`/${currentLang}/about-us`}
                  className={isActiveLink(`/${currentLang}/about-us`) ? 'active' : ''}
                  onClick={closeMobileMenu}
                >
                  {t('menu.about_us')}
                </NavLink>
              </li>

              {/* IT Consulting Dropdown */}
              <li className={`dropdown ${openDropdown === 'it-consulting' ? 'open' : ''}`}>
                <div className="dropdown-header" onClick={() => toggleDropdown('it-consulting')}>
                  <span className="menu-item">
                    {t('menu.it_consulting')}
                    <FaChevronDown className="submenu-icon" />
                  </span>
                </div>
                {openDropdown === 'it-consulting' && (
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
                        onClick={closeMobileMenu}
                      >
                        {t('it_consulting.from_idea_to_implementation')}
                      </HashLink>
                    </li>
                    <li>
                      <HashLink
                        smooth
                        to={`/${currentLang}/it-consulting#it-strategy`}
                        className={
                          isActiveSubmenuLink(`/${currentLang}/it-consulting#it-strategy`) ? 'active' : ''
                        }
                        onClick={closeMobileMenu}
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
                        onClick={closeMobileMenu}
                      >
                        {t('it_consulting.software_consulting')}
                      </HashLink>
                    </li>
                    <li>
                      <HashLink
                        smooth
                        to={`/${currentLang}/it-consulting#it-security`}
                        className={
                          isActiveSubmenuLink(`/${currentLang}/it-consulting#it-security`) ? 'active' : ''
                        }
                        onClick={closeMobileMenu}
                      >
                        {t('it_consulting.it_security')}
                      </HashLink>
                    </li>
                  </ul>
                )}
              </li>

              {/* Web Development Dropdown */}
              <li className={`dropdown ${openDropdown === 'web-development' ? 'open' : ''}`}>
                <div className="dropdown-header" onClick={() => toggleDropdown('web-development')}>
                  <span className="menu-item">
                    {t('menu.web_development')}
                    <FaChevronDown className="submenu-icon" />
                  </span>
                </div>
                {openDropdown === 'web-development' && (
                  <ul className="submenu">
                    <li>
                      <HashLink
                        smooth
                        to={`/${currentLang}/web-development#wordpress`}
                        className={
                          isActiveSubmenuLink(`/${currentLang}/web-development#wordpress`) ? 'active' : ''
                        }
                        onClick={closeMobileMenu}
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
                        onClick={closeMobileMenu}
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
                        onClick={closeMobileMenu}
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
                        onClick={closeMobileMenu}
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
                        onClick={closeMobileMenu}
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
                        onClick={closeMobileMenu}
                      >
                        {t('web_development.technologies_tools')}
                      </HashLink>
                    </li>
                  </ul>
                )}
              </li>

              {/* Zoho Consulting Dropdown */}
              <li className={`dropdown ${openDropdown === 'zoho-consulting' ? 'open' : ''}`}>
                <div className="dropdown-header" onClick={() => toggleDropdown('zoho-consulting')}>
                  <span className="menu-item">
                    {t('menu.zoho_consulting')}
                    <FaChevronDown className="submenu-icon" />
                  </span>
                </div>
                {openDropdown === 'zoho-consulting' && (
                  <ul className="submenu">
                    <li>
                      <HashLink
                        smooth
                        to={`/${currentLang}/zoho-consulting#zoho-crm`}
                        className={
                          isActiveSubmenuLink(`/${currentLang}/zoho-consulting#zoho-crm`) ? 'active' : ''
                        }
                        onClick={closeMobileMenu}
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
                        onClick={closeMobileMenu}
                      >
                        {t('zoho_consulting.zoho_books')}
                      </HashLink>
                    </li>
                    <li>
                      <HashLink
                        smooth
                        to={`/${currentLang}/zoho-consulting#zoho-projects`}
                        className={
                          isActiveSubmenuLink(`/${currentLang}/zoho-consulting#zoho-projects`)
                            ? 'active'
                            : ''
                        }
                        onClick={closeMobileMenu}
                      >
                        {t('zoho_consulting.zoho_projects')}
                      </HashLink>
                    </li>
                    <li>
                      <HashLink
                        smooth
                        to={`/${currentLang}/zoho-consulting#custom-development`}
                        className={
                          isActiveSubmenuLink(`/${currentLang}/zoho-consulting#custom-development`)
                            ? 'active'
                            : ''
                        }
                        onClick={closeMobileMenu}
                      >
                        {t('zoho_consulting.custom_development')}
                      </HashLink>
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <NavLink
                  to={`/${currentLang}/contact-us`}
                  className={isActiveLink(`/${currentLang}/contact-us`) ? 'active' : ''}
                  onClick={closeMobileMenu}
                >
                  {t('menu.contact_us')}
                </NavLink>
              </li>

              {/* Language Switcher in Mobile Menu */}
              <li>
                <div className="language-switch">
                  <button
                    className={currentLang === 'de' ? 'active' : ''}
                    onClick={() => {
                      changeLanguage('de');
                      closeMobileMenu();
                    }}
                  >
                    <img src={logode} alt="German Flag" />
                  </button>
                  <button
                    className={currentLang === 'en' ? 'active' : ''}
                    onClick={() => {
                      changeLanguage('en');
                      closeMobileMenu();
                    }}
                  >
                    <img src={logouk} alt="UK Flag" />
                  </button>
                </div>
              </li>
            </ul>
          </div>
          {/* Overlay */}
          {mobileMenuOpen && <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>}
        </>
      )}

      {/* Language Switcher */}
      {!isMobile && (
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
      )}
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
