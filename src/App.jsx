// src/App.jsx
import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Footer from './components/Footer/Footer';
import './i18n'; // Import i18n setup
import { useTranslation } from 'react-i18next';

const App = () => {
  const { pathname } = useLocation(); // Current path
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
          <Route path="/de" element={<Home />} />
          <Route path="/de/ueber-uns" element={<AboutUs />} />
          <Route path="/en" element={<Home />} />
          <Route path="/en/about-us" element={<AboutUs />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
