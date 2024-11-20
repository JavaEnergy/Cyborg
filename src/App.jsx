// src/App.jsx
import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ITConsulting from './pages/ITConsulting';
import WebDevelopment from './pages/WebDevelopment';
import ITServices from './pages/ITServices';
import ContactUs from './pages/ContactUs';
import Footer from './components/Footer/Footer';
import './i18n'; // Import i18n setup
import { useTranslation } from 'react-i18next';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const languageFromPath = pathname.startsWith('/en') ? 'en' : 'de';
    if (i18n.language !== languageFromPath) {
      i18n.changeLanguage(languageFromPath);
    }
  }, [pathname, i18n]);

  if (pathname === '/') {
    return <Navigate to="/de" replace />;
  }

  return (
    <>
      <Header />
      <ScrollToTop /> {/* Moved outside of Routes */}
      <div>
        <Routes>
          {/* Removed ScrollToTop from here */}
          <Route path="/:lng" element={<Home />} />
          <Route path="/:lng/about-us" element={<AboutUs />} />
          <Route path="/:lng/it-consulting" element={<ITConsulting />} />
          <Route path="/:lng/web-development" element={<WebDevelopment />} />
          <Route path="/:lng/it-services" element={<ITServices />} />
          <Route path="/:lng/contact-us" element={<ContactUs />} />
          {/* Add a fallback route if needed */}
          <Route path="*" element={<Navigate to="/de" replace />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
