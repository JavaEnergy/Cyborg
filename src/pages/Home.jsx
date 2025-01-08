// src/pages/Home.jsx
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import './Home.css';
import initSpiderEffect from '../assets/codes/interactive spider';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom'; // Import useLocation

// Components
import Header from '../components/Header/Header';
import ContactForm from '../components/ContactForm';
import { Helmet } from 'react-helmet';

// Images
import image from '../assets/images/bg.jpg';
import itConsultingIcon from '../assets/images/it Consulting.png';
import webDevelopmentIcon from '../assets/images/web Development.png';
import itServicesIcon from '../assets/images/zoho-hm.png';

const Home = () => {
  const { t, i18n } = useTranslation();
  const [hovered, setHovered] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const location = useLocation(); // Initialize useLocation

  const headerRef = useRef(null);
  const contactRef = useRef(null);
  const faqRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (
        headerRef.current?.contains(event.target) ||
        contactRef.current?.contains(event.target) ||
        faqRef.current?.contains(event.target)
      ) {
        setHovered(false);
      } else {
        setHovered(true);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Initialize/cleanup spider effect
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

  return (
    <>
      {/* React Helmet for SEO */}
      <Helmet>
        <title>{t('home.page_title')}</title>
        <meta name="description" content={t('home.page_description')} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={t('home.page_title')} />
        <meta property="og:description" content={t('home.page_description')} />
        <meta property="og:image" content="https://cyborg-it.de/assets/Cyborg-logo-9-09-DqmwUbnN.png" />
        <meta property="og:url" content={`https://cyborg-it.de${location.pathname}`} />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Pass the ref to Header so we can detect mouse over the header */}
      <Header ref={headerRef} />

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
            <img src={image} alt={t('home.image_alt')} />
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
            <NavLink
              to={`/${currentLang}/it-consulting`}
              className="service-item"
            >
              <img
                src={itConsultingIcon}
                alt={t('home.service_it_consulting_alt')}
              />
              <h3>{t('home.service_it_consulting_title')}</h3>
              <p>{t('home.service_it_consulting_description')}</p>
            </NavLink>

            <NavLink
              to={`/${currentLang}/web-development`}
              className="service-item"
            >
              <img
                src={webDevelopmentIcon}
                alt={t('home.service_web_development_alt')}
              />
              <h3>{t('home.service_web_development_title')}</h3>
              <p>{t('home.service_web_development_description')}</p>
            </NavLink>

            <NavLink
              to={`/${currentLang}/zoho-consulting`}
              className="service-item"
            >
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
          className="projects-section"
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
                  <button>{t('home.project_view_more')}</button>
                </a>
              </div>
            </div>

            {/* Second and Third Projects - Two Columns */}
            <div className="project-item project-2">
              <div className="project-content">
                <h3>{t('home.project_2_title')}</h3>
                <p>{t('home.project_2_description')}</p>

                <button>{t('home.project_view_more')}</button>
              </div>
            </div>

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
                  <button>{t('home.project_view_more')}</button>
                </a>
              </div>
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
          ref={faqRef}
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
      </div>
    </>
  );
};

export default Home;
