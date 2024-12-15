// src/pages/AboutUs.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './AboutUs.css';
import image1 from '../assets/images/abus.png'; // Replace with your actual image paths
import image2 from '../assets/images/abus.png'; // Use a different image if needed
import { motion } from 'framer-motion';
import Layout from '../components/Layout'; // Import the Layout component

const AboutUs = () => {
  const { t, i18n } = useTranslation();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const currentLang = i18n.language;
  const isGerman = currentLang === 'de';

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2, // Adjusted delay
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="about-hero">
        {/* Wrapper div to handle additional transforms if needed */}
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

      {/* First Section: Image on Left, Text on Right */}
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
          </div>
        </div>
      </motion.section>

      {/* Second Section: Image on Right, Text on Left */}
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
            <h2>{t('about_us.mission_title')}</h2>
            <p>{t('about_us.mission_text')}</p>
          </div>
          <div className="about-image-content">
            <img src={image2} alt="Our Mission" className="circle-image" />
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
          {[1, 2, 3].map((item, index) => (
            <div
              className={`about-faq-item ${openFaqIndex === index ? 'open' : ''}`}
              key={index}
            >
              <h3 onClick={() => toggleFaq(index)}>
                {t(`about_us.faq_question_${item}`)}
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
        custom={3}
      >
        <h2>{t('home.contact_title')}</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder={t('home.contact_name_placeholder')}
            required
          />
          <input
            type="email"
            name="email"
            placeholder={t('home.contact_email_placeholder')}
            required
          />
          <textarea
            name="message"
            placeholder={t('home.contact_message_placeholder')}
            required
          ></textarea>
          <button type="submit">{t('home.contact_submit_button')}</button>
        </form>
      </motion.section>
    </Layout>
  );
};

export default AboutUs;
