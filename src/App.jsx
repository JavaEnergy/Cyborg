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
import Legal from './pages/Legal';
import Footer from './components/Footer/Footer';
import './i18n';
import './App.css';

import { useTranslation } from 'react-i18next';
import ScrollToTop from './components/ScrollToTop';
import CookieConsent from 'react-cookie-consent';

// Firebase Analytics
import { analytics } from './firebase';
import { logEvent } from 'firebase/analytics';

const App = () => {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();

  // Update language from path
  useEffect(() => {
    const languageFromPath = pathname.startsWith('/en') ? 'en' : 'de';
    if (i18n.language !== languageFromPath) {
      i18n.changeLanguage(languageFromPath);
    }
  }, [pathname, i18n]);

  // Log page view event
  useEffect(() => {
    logEvent(analytics, 'page_view', {
      page_path: pathname,
      page_title: document.title || 'No Title',
      language: i18n.language,
    });
  }, [pathname, i18n.language]);

  // Dynamically set the lang attribute
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  // Redirect root ("/") to default language route (German: "/de")
  if (pathname === '/') {
    return <Navigate to="/de" replace />;
  }

  return (
    <>
      <Header className="exclude-spider" /> {/* Added className here */}
      <ScrollToTop />

      <div>
        <Routes>
          <Route path="/:lang" element={<Home />} />
          <Route path="/:lang/about-us" element={<AboutUs />} />
          <Route path="/:lang/it-consulting" element={<ITConsulting />} />
          <Route path="/:lang/web-development" element={<WebDevelopment />} />
          <Route path="/:lang/zoho-consulting" element={<ZohoConsulting />} />
          <Route path="/:lang/contact-us" element={<ContactUs />} />
          <Route path="/:lang/legal" element={<Legal />} />
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/de" replace />} />
        </Routes>
      </div>

      {/* Pass className="exclude-spider" to Footer */}
      <Footer className="exclude-spider" />

      {/* Cookie Consent Banner */}
      <CookieConsent
        location="bottom"
        buttonText={t('cookieConsent.button')}
        cookieName="cyborgCookieConsent"
        className="cookie-consent"
        buttonClasses="cookie-consent-button"
        expires={150}
      >
        <span className="cookie-message">
          {t('cookieConsent.message')}{' '}
          <a href={`/${i18n.language}/legal`} className="cookie-learn-more">
            {t('cookieConsent.learnMore')}
          </a>
        </span>
      </CookieConsent>
    </>
  );
};

export default App;
