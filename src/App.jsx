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
import { logEvent } from './firebase';
import { reportWebVitals } from './reportWebVitals';

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

  // Dynamically set the lang attribute
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  // Log web vitals and page view events
  useEffect(() => {
    reportWebVitals(metric => {
      const { name, value } = metric;
      console.log(`${name}: ${value}`);
      logEvent('web_vitals', {
        metric_name: name,
        metric_value: value,
        url: window.location.href,
      });
    });

    // Log page view event
    logEvent('page_view', {
      page_path: pathname,
      page_title: document.title || 'No Title',
      language: i18n.language,
    });
  }, [pathname, i18n.language]);

  return (
    <>
      <Header className="exclude-spider" />
      <ScrollToTop />

      <div>
        <Routes>
          {/* Redirect root to default language */}
          <Route path="/" element={<Navigate to="/de" replace />} />

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

      <Footer className="exclude-spider" />

      {/* Cookie Consent Banner (Data Collection Ignored) */}
      <CookieConsent
        location="bottom"
        buttonText={t('cookieConsent.button')}
        cookieName="cyborgCookieConsent"
        className="cookie-consent"
        buttonClasses="cookie-consent-button"
        expires={150}
        // No onAccept handler since consent is ignored
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
