// src/App.jsx

import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ITConsulting from './pages/ITConsulting';
import WebDevelopment from './pages/WebDevelopment';
import ZohoConsulting from './pages/ZohoConsulting';
import ContactUs from './pages/ContactUs';
import Legal from './pages/Legal'; // Ensure correct capitalization
import Footer from './components/Footer/Footer';
import './i18n'; // Import i18n setup
import './App.css';
import { useTranslation } from 'react-i18next';
import ScrollToTop from './components/ScrollToTop';
import CookieConsent from 'react-cookie-consent'; // Import CookieConsent
// import LanguageSwitcher from './components/LanguageSwitcher'; // Import LanguageSwitcher
import { analytics } from './firebase'; // Import analytics instance

const App = () => {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation(); // Destructure t and i18n

  useEffect(() => {
    // Determine the language from the path
    const languageFromPath = pathname.startsWith('/en') ? 'en' : 'de';
    if (i18n.language !== languageFromPath) {
      i18n.changeLanguage(languageFromPath);
    }
  }, [pathname, i18n]);

  // Redirect root to default language (e.g., German)
  if (pathname === '/') {
    return <Navigate to="/de" replace />;
  }

  return (
    <>
      <Header />
      <ScrollToTop /> {/* Ensures scrolling to top on route change */}
      {/* <LanguageSwitcher />  */}
      <div>
        <Routes>
          <Route path="/:lang" element={<Home />} />
          <Route path="/:lang/about-us" element={<AboutUs />} />
          <Route path="/:lang/it-consulting" element={<ITConsulting />} />
          <Route path="/:lang/web-development" element={<WebDevelopment />} />
          <Route path="/:lang/zoho-consulting" element={<ZohoConsulting />} />
          <Route path="/:lang/contact-us" element={<ContactUs />} />
          <Route path="/:lang/legal" element={<Legal />} /> {/* Added Legal route */}
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/de" replace />} />
        </Routes>
      </div>
      <Footer />
      {/* Optional: Remove CookieConsent if no longer needed */}
      
      <CookieConsent
  location="bottom"
  buttonText={t('cookieConsent.button')}
  cookieName="cyborgCookieConsent"
  className="cookie-consent"
  buttonClasses="cookie-consent-button"
  expires={150}
  onAccept={() => {}}
>
  <span className="cookie-message">
    {t('cookieConsent.message')}
    <a href={`/${i18n.language}/legal`} className="cookie-learn-more">
      {t('cookieConsent.learnMore')}
    </a>
  </span>
</CookieConsent>
    </>
  );
};

export default App;