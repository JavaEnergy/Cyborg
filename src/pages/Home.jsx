// src/pages/Home.jsx

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';
import './Home.css';
import initSpiderEffect from '../assets/codes/interactive spider';
import { motion } from 'framer-motion';
import AccordionComponent from '../components/AccordionComponent';
import Layout from '../components/Layout';
import ContactForm from '../components/ContactForm';
import HelmetManager from '../components/HelmetManager';

// MUI Components
import { Modal, Box, Typography, Button } from '@mui/material';

// Images
import backgroundImage from '../assets/images/bg.webp';
import itConsultingIcon from '../assets/images/it-consulting.png';
import webDevelopmentIcon from '../assets/images/web-development.png';
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
  const { pathname } = useLocation();
  const [hovered, setHovered] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [openProjectModal, setOpenProjectModal] = useState(false);

  // Track mobile device
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Manage spider effect based on mouse movement
  useEffect(() => {
    const handleMouseMove = (event) => {
      // Check if a modal is open
      const anyModalOpen = document.querySelector('[role="dialog"][aria-modal="true"]') !== null;
      if (isMobile || openProjectModal || anyModalOpen) {
        setHovered(false);
        return;
      }
      const isOverExcluded = event.target.closest('.exclude-spider');
      setHovered(!isOverExcluded);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile, openProjectModal]);

  // Initialize spider effect if hovered
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
        canvas.style.zIndex = '999';
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

  // Accordion items
  const accordionItems = [
    { id: 1, img: accImage1, alt: t('home.accordion_image_alt_1') },
    { id: 2, img: accImage2, alt: t('home.accordion_image_alt_2') },
    { id: 3, img: accImage3, alt: t('home.accordion_image_alt_3') },
    { id: 4, img: accImage4, alt: t('home.accordion_image_alt_4') },
  ];

  // Modal for Project 2
  const handleOpenProjectModal = () => {
    setOpenProjectModal(true);
  };
  const handleCloseProjectModal = () => {
    setOpenProjectModal(false);
  };
  const project2MoreInfo = {
    title: t('home.project_2_title'),
    description: t('home.project_2_more_info'),
    images: [project2Img6, project2Img2, project2Img1, project2Img5, project2Img3, project2Img4],
  };

  // Canonical + alternate
  const canonicalUrl = `https://cyborg-it.de${pathname}`;
  const alternateLanguages = [
    { lang: 'de', url: 'https://cyborg-it.de/de' },
    { lang: 'en', url: 'https://cyborg-it.de/en' },
  ];

  // Emit 'page-loaded'
  useEffect(() => {
    window.dispatchEvent(new Event('page-loaded'));
  }, []);

  return (
    <Layout>
 <HelmetManager
  title={t('home.page_title')}
  description={t('home.page_description')}
  canonical={`https://cyborg-it.de/${i18n.language}`}
  openGraph={{
    title: t('home.page_title'),
    description: t('home.page_description'),
    image: 'https://cyborg-it.de/assets/Cyborg-og-image.jpg',
    url: `https://cyborg-it.de/${i18n.language}`,
    type: 'website',
  }}
  structuredData={{
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Cyborg IT",
    "url": "https://cyborg-it.de",
    "logo": "https://cyborg-it.de/assets/Cyborg-logo-9-09-DqmwUbnN.png",
    "sameAs": [
      "https://www.linkedin.com/company/cyborg-it-l%C3%B6sungen/"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+995-597-01-13-09",
      "contactType": "Customer Service"
    }
  }}
  alternateLanguages={[
    { lang: 'de', url: 'https://cyborg-it.de/de' },
    { lang: 'en', url: 'https://cyborg-it.de/en' }
  ]}
/>

      {/* Main Content */}
      <main className="home-page">
        {/* Hero Section */}
        <section className="hero">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className={isGerman ? 'de' : ''}>{t('home.title')}</h1>
          </motion.div>
        </section>

        {/* Main Content */}
        <section className="home-main-content">
          <motion.div
            className="image-container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            custom={1}
          >
            <img
              src={backgroundImage}
              alt={t('home.image_alt')}
              loading="lazy"
              width="1200"
              height="800"
            />
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
        </section>

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
                loading="lazy"
                width="80"
                height="80"
              />
              <h3>{t('home.service_it_consulting_title')}</h3>
              <p>{t('home.service_it_consulting_description')}</p>
            </NavLink>

            <NavLink to={`/${currentLang}/web-development`} className="service-item">
              <img
                src={webDevelopmentIcon}
                alt={t('home.service_web_development_alt')}
                loading="lazy"
                width="80"
                height="80"
              />
              <h3>{t('home.service_web_development_title')}</h3>
              <p>{t('home.service_web_development_description')}</p>
            </NavLink>

            <NavLink to={`/${currentLang}/zoho-consulting`} className="service-item">
              <img
                id="zoho"
                src={itServicesIcon}
                alt={t('home.service_it_services_alt')}
                loading="lazy"
                width="100"
                height="100"
              />
              <h3>{t('home.service_it_services_title')}</h3>
              <p>{t('home.service_it_services_description')}</p>
            </NavLink>
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          className="projects-section exclude-spider"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          custom={3}
        >
          <h2>{t('home.projects_title')}</h2>
          <div className="projects-list">
            {/* First Project - Single Column */}
            <article className="project-item project-1">
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
            </article>

            {/* Second Project - Project 2 */}
            <article className="project-item project-2 exclude-spider">
              <div className="project-content">
                <h3>{t('home.project_2_title')}</h3>
                <p>{t('home.project_2_description')}</p>

                {/* Accordion Component */}
                <AccordionComponent items={accordionItems} />

                {/* "Learn More" Button */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOpenProjectModal}
                  style={{ marginTop: '16px' }}
                >
                  {t('home.project_view_more')}
                </Button>
              </div>
            </article>

            {/* Third Project - Two Columns */}
            <article className="project-item project-3">
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
            </article>
          </div>
        </motion.section>

        {/* Project 2 Modal */}
        <Modal
          open={openProjectModal}
          onClose={handleCloseProjectModal}
          aria-labelledby="project-modal-title"
          aria-describedby="project-modal-description"
        >
          <Box className="project-modal-box exclude-spider">
            <Typography id="project-modal-title" variant="h4" gutterBottom>
              {project2MoreInfo.title}
            </Typography>
            <Typography id="project-modal-description" variant="body1" paragraph>
              {project2MoreInfo.description}
            </Typography>

            {project2MoreInfo.images && project2MoreInfo.images.length > 0 && (
              <Box className="project-modal-images">
                {project2MoreInfo.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${project2MoreInfo.title} detail ${idx + 1}`}
                    className="project-modal-image exclude-spider"
                    loading="lazy"
                    width="600"
                    height="400"
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

        {/* FAQ Section (Old Design) */}
        <motion.section
          className="about-faq-section exclude-spider"
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
                <h3
                  onClick={() => toggleFaq(index)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') toggleFaq(index);
                  }}
                >
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
          className="contact-section exclude-spider"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
        >
          <h2>{t('home.contact_title')}</h2>
          <ContactForm />
        </motion.section>
      </main>
    </Layout>
  );
};

export default Home;
