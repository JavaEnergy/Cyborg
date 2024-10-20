// src/App.jsx
import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import ITConsulting from './pages/ITConsulting'; // Import IT Consulting page
import Home from './pages/Home';
import Footer from './components/Footer/Footer';
import './i18n'; // Import i18n setup

const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const languageFromPath = pathname.startsWith('/en') ? 'en' : 'de';
    if (languageFromPath) {
      document.documentElement.lang = languageFromPath;
    }
  }, [pathname]);

  return (
    <>
      <Header />
      <div style={{ padding: '20px', minHeight: '80vh' }}>
        <Routes>
          <Route path="/:lng" element={<Home />} />
          <Route path="/:lng/it-consulting" element={<ITConsulting />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
