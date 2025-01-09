// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';
import './Home.css';
import initSpiderEffect from '../assets/codes/interactive spider';
import { motion } from 'framer-motion';
import AccordionComponent from '../components/AccordionComponent'; // Import the accordion component

// Components
import Header from '../components/Header/Header';
import ContactForm from '../components/ContactForm';
// Remove Footer import since it's rendered globally in App.jsx

import { Helmet } from 'react-helmet';

// MUI Components
import { Modal, Box, Typography, Button } from '@mui/material';

// Images
import backgroundImage from '../assets/images/bg.jpg';
import itConsultingIcon from '../assets/images/it Consulting.png';
import webDevelopmentIcon from '../assets/images/web Development.png';
import itServicesIcon from '../assets/images/zoho-hm.png';

// Import accordion images
import accImage1 from '../assets/images/project/1.png';
import accImage2 from '../assets/images/project/2.png';
import accImage3 from '../assets/images/project/3.png';
import accImage4 from '../assets/images/project/4.png';

// Import images for Project 2 modal
import project2Img1 from '../assets/images/project/1.png';
import project2Img2 from '../assets/images/project/2.png';
import project2Img3 from '../assets/images/project/3.png';
import project2Img4 from '../assets/images/project/4.png';
import project2Img5 from '../assets/images/project/5.png';
import project2Img6 from '../assets/images/project/6.png';

const Home = () => {
  const { t, i18n } = useTranslation();
  const [hovered, setHovered] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const location = useLocation(); // Initialize useLocation

  // State to track if the device is mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isMobile) {
        // Do not activate spider effect on mobile
        setHovered(false);
        return;
      }

      const isOverExcluded = event.target.closest('.exclude-spider');
      setHovered(!isOverExcluded);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  // Initialize/cleanup spider effect based on hovered state
  useEffect(() => {
    let cleanup;
    if (hovered) {
      let canvas = document.getElementById('spider-canvas');
      if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'spider-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '9999';
        document.body.appendChild(canvas);
      } else {
        canvas.style.display = 'block';
      }
      cleanup = initSpiderEffect();
    } else {
      const canvas = document.getElementById('spider-canvas');
      if (canvas) canvas.style.display = 'none';
      if (cleanup) cleanup();
    }
    return () => {
      if (cleanup) cleanup();
      const canvas = document.getElementById('spider-canvas');
      if (canvas) {
        canvas.style.display = 'none';
      }
    };
  }, [hovered]);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const currentLang = i18n.language;
  const isGerman = currentLang === 'de';

  // Framer Motion variants
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

  // Data for AccordionComponent
  const accordionItems = [
    { id: 1, img: accImage1 },
    { id: 2, img: accImage2 },
    { id: 3, img: accImage3 },
    { id: 4, img: accImage4 },
  ];

  // Modal state for Project 2
  const [openProjectModal, setOpenProjectModal] = useState(false);

  const handleOpenProjectModal = () => {
    setOpenProjectModal(true);
  };

  const handleCloseProjectModal = () => {
    setOpenProjectModal(false);
  };

  // Data for Project 2's modal
  const project2MoreInfo = {
    title: t('home.project_2_title'),
    description: t('home.project_2_more_info'), // Ensure this key exists in your translation files
    images: [
      project2Img6,
      project2Img2,
      project2Img1,
      project2Img5,
      project2Img3,
      project2Img4,
      // Add more image imports as needed
    ],
  };

  return (
    <>
      {/* React Helmet for SEO */}
      <Helmet>
        <title>{t('home.page_title')}</title>
        <meta name="description" content={t('home.page_description')} />

        {/* Open Graph Tags */}
        <meta property="og:title" content={t('home.page_title')} />
        <meta property="og:description" content={t('home.page_description')} />
        <meta
          property="og:image"
          content="https://cyborg-it.de/assets/Cyborg-logo-9-09-DqmwUbnN.png"
        />
        <meta
          property="og:url"
          content={`https://cyborg-it.de${location.pathname}`}
        />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Pass the className to Header */}
      <Header className="exclude-spider" />

      <div className="home-page">
        {/* Hero Section */}
        <div className="hero">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className={isGerman ? 'de' : ''}>{t('home.title')}</h1>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="home-main-content">
          <motion.div
            className="image-container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            custom={1}
          >
            <img src={backgroundImage} alt={t('home.image_alt')} />
          </motion.div>

          <motion.div
            className="text-container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            custom={2}
          >
            <h2>{t('home.subtitle')}</h2>
            <section className="vision-section">
              <p>{t('home.vision_content')}</p>
              <p>{t('home.vision_content2')}</p>
              <p>{t('home.wish_content')}</p>
            </section>
          </motion.div>
        </div>

        {/* Services Overview Section */}
        <motion.section
          className="services-overview"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          custom={3}
          id="services"
        >
          <h2>{t('home.services_title')}</h2>
          <div className="services-list">
            <NavLink to={`/${currentLang}/it-consulting`} className="service-item">
              <img
                src={itConsultingIcon}
                alt={t('home.service_it_consulting_alt')}
              />
              <h3>{t('home.service_it_consulting_title')}</h3>
              <p>{t('home.service_it_consulting_description')}</p>
            </NavLink>

            <NavLink to={`/${currentLang}/web-development`} className="service-item">
              <img
                src={webDevelopmentIcon}
                alt={t('home.service_web_development_alt')}
              />
              <h3>{t('home.service_web_development_title')}</h3>
              <p>{t('home.service_web_development_description')}</p>
            </NavLink>

            <NavLink to={`/${currentLang}/zoho-consulting`} className="service-item">
              <img
                id="zoho"
                src={itServicesIcon}
                alt={t('home.service_it_services_alt')}
              />
              <h3>{t('home.service_it_services_title')}</h3>
              <p>{t('home.service_it_services_description')}</p>
            </NavLink>
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          className="projects-section exclude-spider" // Added exclude-spider class
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          custom={4}
        >
          <h2>{t('home.projects_title')}</h2>
          <div className="projects-list">
            {/* First Project - Single Column */}
            <div className="project-item project-1">
              <div className="project-content">
                <h3>{t('home.project_1_title')}</h3>
                <p>{t('home.project_1_description')}</p>

                <div className="project-iframe-container">
                  <iframe
                    src="https://product-card-plum-mu.vercel.app"
                    width="100%"
                    height="700"
                    style={{ border: 'none' }}
                    title="Product Card Preview"
                  ></iframe>
                </div>

                <a
                  href="https://product-card-plum-mu.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="contained" color="primary">
                    {t('home.project_view_more')}
                  </Button>
                </a>
              </div>
            </div>

            {/* Second Project - Project 2 */}
            <div className="project-item project-2 exclude-spider"> {/* Added exclude-spider class */}
              <div className="project-content">
                <h3>{t('home.project_2_title')}</h3>
                <p>{t('home.project_2_description')}</p>

                {/* Accordion Component */}
                <AccordionComponent items={accordionItems} />

                {/* "View More" Button */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOpenProjectModal}
                  style={{ marginTop: '16px' }}
                >
                  {t('home.project_view_more')}
                </Button>
              </div>
            </div>

            {/* Third Project - Two Columns */}
            <div className="project-item project-3">
              <div className="project-content">
                <h3>{t('home.project_3_title')}</h3>
                <p>{t('home.project_3_description')}</p>

                <div className="project-iframe-container">
                  <iframe
                    src="https://clock-teal-tau.vercel.app/"
                    width="100%"
                    height="400"
                    style={{ border: 'none' }}
                    title="Quiz App Preview"
                  ></iframe>
                </div>

                <a
                  href="https://clock-teal-tau.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="contained" color="primary">
                    {t('home.project_view_more')}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Project 2 Modal */}
        <Modal
          open={openProjectModal}
          onClose={handleCloseProjectModal}
          aria-labelledby="project-modal-title"
          aria-describedby="project-modal-description"
        >
          <Box className="project-modal-box">
            <Typography id="project-modal-title" variant="h4" gutterBottom>
              {project2MoreInfo.title}
            </Typography>
            <Typography id="project-modal-description" variant="body1" paragraph>
              {project2MoreInfo.description}
            </Typography>

            {/* Display additional images if available */}
            {project2MoreInfo.images && project2MoreInfo.images.length > 0 && (
              <Box className="project-modal-images">
                {project2MoreInfo.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${project2MoreInfo.title} detail ${idx + 1}`}
                    className="project-modal-image"
                  />
                ))}
              </Box>
            )}

            <Button
              variant="contained"
              color="secondary"
              onClick={handleCloseProjectModal}
              style={{ marginTop: '16px' }}
            >
              {t('home.close')}
            </Button>
          </Box>
        </Modal>

        {/* FAQ Section */}
        <motion.section
          className="about-faq-section exclude-spider" // Added exclude-spider class
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
                className={`about-faq-item ${
                  openFaqIndex === index ? 'open' : ''
                }`}
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

        {/* Contact Section */}
        <motion.section
          className="contact-section exclude-spider" // Added exclude-spider class
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
        >
          <h2>{t('home.contact_title')}</h2>
          <ContactForm />
        </motion.section>
      </div>

      {/* Remove Footer from Home.jsx since it's rendered globally in App.jsx */}
      {/* <Footer ref={footerRef1} /> */}
    </>
  );
};

export default Home;
