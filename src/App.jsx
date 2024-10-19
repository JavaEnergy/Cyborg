// src/App.jsx
import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Solutions from './pages/Solutions';
import Services from './pages/Services';
import ContactUs from './pages/ContactUs';
import Footer from './components/Footer/Footer';
import './i18n'; // Import i18n setup
import { useTranslation } from 'react-i18next';

const App = () => {
  const { pathname } = useLocation(); // Get current path
  const { i18n } = useTranslation(); // i18n instance

  // Ensure the content language matches the URL path
  useEffect(() => {
    const languageFromPath = pathname.startsWith('/en') ? 'en' : 'de';
    if (i18n.language !== languageFromPath) {
      i18n.changeLanguage(languageFromPath); // Sync language with path
    }
  }, [pathname, i18n]);

  // Redirect `/` to `/de` by default
  if (pathname === '/') {
    return <Navigate to="/de" replace />;
  }

  return (
    <>
      <Header />
      <div style={{ padding: '20px', minHeight: '80vh' }}>
        <Routes>
          <Route path="/:lng" element={<Home />} />
          <Route path="/:lng/about-us" element={<AboutUs />} />
          <Route path="/:lng/solutions" element={<Solutions />} />
          <Route path="/:lng/services" element={<Services />} />
          <Route path="/:lng/contact-us" element={<ContactUs />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
