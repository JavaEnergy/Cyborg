// src/pages/Home.jsx
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import './Home.css';

// Spider effect import
import initSpiderEffect from '../assets/codes/interactive spider'; 
import { motion } from 'framer-motion';

// Components
import Header from '../components/Header/Header';  // <--- Import your Header
import ContactForm from '../components/ContactForm';

// Images
import image from '../assets/images/bg.jpg';
import itConsultingIcon from '../assets/images/it Consulting.png';
import webDevelopmentIcon from '../assets/images/web Development.png';
import itServicesIcon from '../assets/images/zoho-hm.png';

const Home = () => {
  const { t, i18n } = useTranslation();
  const [hovered, setHovered] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Refs for excluded sections
  const headerRef = useRef(null);
  const contactRef = useRef(null);
  const faqRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const header = headerRef.current;
      const contact = contactRef.current;
      const faq = faqRef.current;

      // Check if mouse is over Contact, FAQ, or Header
      if (
        (header && header.contains(event.target)) ||
        (contact && contact.contains(event.target)) ||
        (faq && faq.contains(event.target))
      ) {
        setHovered(false);
      } else {
        setHovered(true);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Initialize or cleanup spider effect based on hovered state
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
      // Cleanup on unmount or when hovered changes
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
            <img src={image} alt="Coding Surf" />
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
              <br />
              <p>{t('home.vision_content2')}</p>
              <br />
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
                alt={t('home.service_it_consulting_title')}
              />
              <h3>{t('home.service_it_consulting_title')}</h3>
              <p>{t('home.service_it_consulting_description')}</p>
            </NavLink>

            <NavLink to={`/${currentLang}/web-development`} className="service-item">
              <img
                src={webDevelopmentIcon}
                alt={t('home.service_web_development_title')}
              />
              <h3>{t('home.service_web_development_title')}</h3>
              <p>{t('home.service_web_development_description')}</p>
            </NavLink>

            <NavLink to={`/${currentLang}/zoho-consulting`} className="service-item">
              <img
                id="zoho"
                src={itServicesIcon}
                alt={t('home.service_it_services_title')}
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
            {[1, 2, 3].map((item) => (
              <div className={`project-item project-${item}`} key={item}>
                <div className="project-content">
                  <h3>{t(`home.project_${item}_title`)}</h3>
                  <p>{t(`home.project_${item}_description`)}</p>

                  {item === 1 && (
                    <div
                      className="project-iframe-container"
                      style={{ marginTop: '1rem' }}
                    >
                      <iframe
                        src="https://product-card-plum-mu.vercel.app"
                        width="100%"
                        height="700"
                        style={{ border: 'none' }}
                        title="Product Card Preview"
                      ></iframe>
                    </div>
                  )}

                  {item === 3 && (
                    <div
                      className="project-iframe-container"
                      style={{ marginTop: '1rem' }}
                    >
                      <iframe
                        src="https://clock-teal-tau.vercel.app/"
                        width="100%"
                        height="400"
                        style={{ border: 'none' }}
                        title="Quiz App Preview"
                      ></iframe>
                    </div>
                  )}

                  {item === 1 && (
                    <a
                      href="https://product-card-plum-mu.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button>{t('home.project_view_more')}</button>
                    </a>
                  )}

                  {item === 3 && (
                    <a
                      href="https://clock-teal-tau.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button>{t('home.project_view_more')}</button>
                    </a>
                  )}

                  {item !== 1 && item !== 3 && (
                    <button>{t('home.project_view_more')}</button>
                  )}
                </div>
              </div>
            ))}
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
          ref={faqRef}  // <-- Add ref for FAQ
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
          className="contact-section"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
          ref={contactRef}  // <-- Add ref for Contact
        >
          <h2>{t('home.contact_title')}</h2>
          <ContactForm />
        </motion.section>
      </div>
    </>
  );
};

export default Home;
