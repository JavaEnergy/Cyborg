// src/pages/AboutUs.jsx
import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './AboutUs.css';
import image1 from '../assets/images/laptop.jpg';
import image2 from '../assets/images/hand.png';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import ContactForm from '../components/ContactForm';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom'; // Import useLocation


const AboutUs = () => {
  const { t, i18n } = useTranslation();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const location = useLocation(); // Initialize useLocation

  // Ref for the contact section (if needed for scrolling)
  const contactRef = useRef(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const currentLang = i18n.language;
  const isGerman = currentLang === 'de';

  // Animation variants for framer-motion
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <Layout>
      {/* React Helmet for SEO */}
  <Helmet>
        <title>{t('about_us.page_title')}</title>
        <meta name="description" content={t('about_us.page_description')} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={t('about_us.page_title')} />
        <meta property="og:description" content={t('about_us.page_description')} />
        <meta property="og:image" content="https://cyborg-it.de/assets/Cyborg-logo-9-09-DqmwUbnN.png" />
        <meta property="og:url" content={`https://cyborg-it.de${location.pathname}`} />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Section */}
      <div className="about-hero">
        <div className="about-hero-content-wrapper">
          <motion.div
            className="about-hero-content"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className={isGerman ? 'de' : ''}>{t('about_us.hero_title')}</h1>
          </motion.div>
        </div>
      </div>

      {/* First Content Section: Image Left, Text Right */}
      <motion.section
        className="about-content-section"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0}
      >
        <div className="about-content-container">
          <div className="about-image-content">
            <img src={image1} alt={t('about_us.image1_alt')} id="firstimg" />
          </div>
          <div className="about-text-content">
            <h2>{t('about_us.about_title')}</h2>
            <p>{t('about_us.about_text')}</p>
            <p>{t('about_us.about_text2')}</p>
            <p>{t('about_us.about_text3')}</p>
          </div>
        </div>
      </motion.section>

      {/* Mission Title */}
      <motion.h2
        className="mission-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        {t('about_us.mission_title')}
      </motion.h2>

      {/* Second Content Section: Image Right, Text Left */}
      <motion.section
        className="about-content-section"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={1}
      >
        <div className="about-content-container reverse">
          <div className="about-text-content">
            <p>{t('about_us.mission_text')}</p>
            <p>{t('about_us.mission_text2')}</p>
            <p>{t('about_us.mission_text3')}</p>
          </div>
          <div className="about-image-content">
            <img src={image2} alt={t('about_us.image2_alt')} className="circle-image" />
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        className="about-faq-section"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={2}
      >
        <h2>{t('about_us.faq_title')}</h2>
        <div className="about-faq-list">
          {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
            <div
              className={`about-faq-item ${openFaqIndex === index ? 'open' : ''}`}
              key={index}
            >
              <h3 onClick={() => toggleFaq(index)}>
                <span>{t(`about_us.faq_question_${item}`)}</span>
                <span className="faq-icon">{openFaqIndex === index ? '−' : '+'}</span>
              </h3>
              <motion.p
                initial={{ height: 0, opacity: 0 }}
                animate={
                  openFaqIndex === index
                    ? { height: 'auto', opacity: 1 }
                    : { height: 0, opacity: 0 }
                }
                transition={{ duration: 0.3 }}
                className="faq-answer"
              >
                {t(`about_us.faq_answer_${item}`)}
              </motion.p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        className="contact-section"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={2}
        ref={contactRef}
      >
        <h2>{t('home.contact_title')}</h2>
        <ContactForm />
      </motion.section>
    </Layout>
  );
};

export default AboutUs;
