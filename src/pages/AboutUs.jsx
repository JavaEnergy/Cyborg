// src/pages/AboutUs.jsx
import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './AboutUs.css';
import image1 from '../assets/images/laptop.jpg'; // Ersetze mit deinen tatsächlichen Bildpfaden
import image2 from '../assets/images/abus.png'; // Verwende ein anderes Bild, falls nötig
import { motion } from 'framer-motion';
import Layout from '../components/Layout'; // Importiere das Layout-Komponente
import ContactForm from '../components/ContactForm'; // Importiere das ContactForm-Komponente

const AboutUs = () => {
  const { t, i18n } = useTranslation();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Ref für den Kontaktbereich (Scroll-Funktion)
  const contactRef = useRef(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const currentLang = i18n.language;
  const isGerman = currentLang === 'de';

  // Animation variants
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

      {/* Erste Content-Sektion: Bild links, Text rechts */}
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
            <img src={image1} alt="About Us" id="firstimg" />
          </div>
          <div className="about-text-content">
            <h2>{t('about_us.about_title')}</h2>
            <p>{t('about_us.about_text')}</p>
            <br />
            <p>{t('about_us.about_text2')}</p>
            <br />
            <p>{t('about_us.about_text3')}</p>
          </div>
        </div>
      </motion.section>

      {/* Zweite Content-Sektion: Bild rechts, Text links */}
      <motion.section
        className="about-content-section"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={1}
      >
        <div className="about-content-container reverse second">
          <div className="about-text-content">
            <p>{t('about_us.mission_text')}</p>
            <br />
            <p>{t('about_us.mission_text2')}</p>
            <br />
            <p>{t('about_us.mission_text3')}</p>
            <br />
            <h2>{t('about_us.mission_title')}</h2>
          </div>
          <div className="about-image-content">
            <img src={image2} alt="Our Mission" className="circle-image" />
          </div>
        </div>
      </motion.section>

      {/* FAQ Sektion */}
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
          {/* Erweiterte FAQ-Liste mit #8 */}
          {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
            <div
              className={`about-faq-item ${openFaqIndex === index ? 'open' : ''}`}
              key={index}
            >
              <h3 onClick={() => toggleFaq(index)}>
                <span>{t(`about_us.faq_question_${item}`)}</span>
                <span className="faq-icon">
                  {openFaqIndex === index ? '−' : '+'}
                </span>
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

      {/* Kontakt Sektion */}
      <motion.section
        className="contact-section"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={5}
        ref={contactRef}
      >
        <h2>{t('home.contact_title')}</h2>
        <ContactForm />
      </motion.section>
    </Layout>
  );
};

export default AboutUs;
