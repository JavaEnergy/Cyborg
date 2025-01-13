// src/components/Footer/Footer.jsx
import React, { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.css';
import { NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';

// Use forwardRef to allow refs to be passed to the Footer component
const Footer = forwardRef(({ className = '' }, ref) => { // Added className prop
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <footer ref={ref} className={`footer ${className} exclude-spider`}> {/* Added exclude-spider class */}
      <div className="footer-container">
        {/* Contact Information */}
        <div className="footer-section contact-info">
          <h3>{t('footer.contact_info')}</h3>
          <p>+995 598 70 79 73</p>
          <p>(+ WhatsApp)</p>
          <p>
            Email:{' '}
            <a href="mailto:info@cyborg-it.de">info@cyborg-it.de</a>
          </p>
          <p className="contactable-notice">
            {t('footer.contactable_24_7')}
          </p>
        </div>

        {/* Social Media */}
        <div className="footer-section social-media">
          <h3>{t('footer.social')}</h3>
          <div className="social-icons">
            <a
              href="https://www.linkedin.com/company/cyborg-it-l%C3%B6sungen/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedInIcon fontSize="large" />
            </a>
            <a
              href="https://wa.me/995598707973"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon fontSize="large" />
            </a>
            <a
              href="mailto:info@cyborg-it.de"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email"
            >
              <EmailIcon fontSize="large" />
            </a>
          </div>
        </div>

        {/* Company Links */}
        <div className="footer-section company-links">
          <h3>{t('footer.company')}</h3>
          <ul>
            <li>
              <HashLink smooth to={`/${currentLang}#services`}>
                {t('footer.company_services')}
              </HashLink>
            </li>
            <li>
              <NavLink to={`/${currentLang}/contact-us`}>
                {t('footer.company_contact_us')}
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Useful Links */}
        <div className="footer-section useful-links">
          <h3>{t('footer.useful_links')}</h3>
          <ul>
            <li>
              <NavLink to={`/${currentLang}/about-us`}>
                {t('footer.useful_about_us')}
              </NavLink>
            </li>
            <li>
              <NavLink to={`/${currentLang}/legal`}>
                {t('footer.useful_legal')}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Cyborg Automation. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
});

// Assign a display name for better debugging
Footer.displayName = 'Footer';

export default Footer;
