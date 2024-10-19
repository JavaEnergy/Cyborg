import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import './i18n'; // Import the i18n setup
import { useTranslation } from 'react-i18next';
import Footer from './components/Footer/Footer';

const App = () => {
  // const { i18n, t } = useTranslation(); // Get translation function and language changer

  // Language switch function
  // const changeLanguage = (lng) => {
  //   i18n.changeLanguage(lng);
  // };

  return (
    <Router>
      <Header />
      <div style={{ padding: '20px', minHeight: '80vh' }}>
        {/* Language Switch Buttons */}
      

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
};

export default App;
