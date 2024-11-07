// src/pages/AboutUs.jsx

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/Layout';
import './AboutUs.css'; // Ensure this CSS file exists
// import heroImage from '../assets/images/about-us-hero.jpg'; // Replace with your actual image path

const AboutUs = () => {
  const { t } = useTranslation();

  // Add useState hook to manage the active FAQ index
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);

  // Define the toggleFaq function
  const toggleFaq = (index) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  return (
    <Layout>
      <div className="about-us">
        {/* Hero Section */}
        <section
          className="hero-section"
          // style={{ backgroundImage: `url(${heroImage})` }}
        >
          <h1>{t('about_us.hero_title')}</h1>
        </section>

        {/* Introduction Section */}
        <section className="introduction-section">
          <div className="intro-content">
            <h2>{t('about_us.intro_title')}</h2>
            <p>{t('about_us.intro_text')}</p>
          </div>
        </section>

        {/* About Us Section */}
        <section className="about-section">
          <div className="about-content">
            <h2>{t('about_us.about_title')}</h2>
            <p>{t('about_us.about_text')}</p>
          </div>
          <div className="about-image">
            {/* <img src={require('../assets/images/about-image1.jpg')} alt="About Us" /> */}
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="mission-section">
          <div className="mission-image">
            {/* <img src={require('../assets/images/mission-image.jpg')} alt="Our Mission" /> */}
          </div>
          <div className="mission-content">
            <h2>{t('about_us.mission_title')}</h2>
            <p>{t('about_us.mission_text')}</p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <h2>{t('about_us.faq_title')}</h2>
          <div className="faq-list">
            {[1, 2, 3].map((item, index) => (
              <div
                className={`faq-item ${activeFaqIndex === index ? 'active' : ''}`}
                key={index}
                onClick={() => toggleFaq(index)} // Ensure toggleFaq is correctly referenced here
              >
                <h3>{t(`about_us.faq_question_${item}`)}</h3>
                <p>{t(`about_us.faq_answer_${item}`)}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AboutUs;
