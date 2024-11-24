// src/pages/Home.jsx
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './Home.css';
import image from '../assets/images/bg.jpg';
import { NavLink } from 'react-router-dom';
import itConsultingIcon from '../assets/images/it Consulting.png';
import webDevelopmentIcon from '../assets/images/web Development.png';
import itServicesIcon from '../assets/images/Zoho.png';
import initSpiderEffect from '../assets/codes/interactive spider'; // Correct path for import
import { motion } from 'framer-motion'; // Import Framer Motion

const Home = () => {
  const { t, i18n } = useTranslation();
  const [hovered, setHovered] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Refs for excluded sections
  const contactRef = useRef(null);
  const faqRef = useRef(null);

  // Handle mouse movements to determine if over excluded sections
  useEffect(() => {
    const handleMouseMove = (event) => {
      const contact = contactRef.current;
      const faq = faqRef.current;

      // Check if mouse is over Contact Us or FAQ sections
      if (
        (contact && contact.contains(event.target)) ||
        (faq && faq.contains(event.target))
      ) {
        // Mouse is over excluded sections
        setHovered(false);
      } else {
        // Mouse is outside excluded sections
        setHovered(true);
      }
    };

    // Add event listener
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Initialize or cleanup spider effect based on hovered state
  useEffect(() => {
    let cleanup; // For storing the cleanup function
    if (hovered) {
      let canvas = document.getElementById('spider-canvas');
      if (!canvas) {
        // Create canvas if it doesn't exist
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
        canvas.style.display = 'block'; // Show canvas
      }
      cleanup = initSpiderEffect(); // Initialize spider effect
    } else {
      // Hide canvas when not hovered
      const canvas = document.getElementById('spider-canvas');
      if (canvas) {
        canvas.style.display = 'none';
      }
      if (cleanup) cleanup(); // Call cleanup function
    }

    // Cleanup when component unmounts or hovered changes
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
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
        delay: custom * 0.2, // Adjusted delay for faster animations
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  };

  return (
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
          </section>

          <section className="wish-section">
            <h2>{t('home.wish_title')}</h2>
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
        id="services" // Added id for anchor link
      >
        <h2>{t('home.services_title')}</h2>
        <div className="services-list">
          <NavLink
            to={`/${currentLang}/it-consulting`}
            className="service-item"
          >
            <img src={itConsultingIcon} alt={t('home.service_it_consulting_title')} />
            <h3>{t('home.service_it_consulting_title')}</h3>
            <p>{t('home.service_it_consulting_description')}</p>
          </NavLink>

          <NavLink
            to={`/${currentLang}/web-development`}
            className="service-item"
          >
            <img src={webDevelopmentIcon} alt={t('home.service_web_development_title')} />
            <h3>{t('home.service_web_development_title')}</h3>
            <p>{t('home.service_web_development_description')}</p>
          </NavLink>

          <NavLink
            to={`/${currentLang}/zoho-consulting`}
            className="service-item"
          >
            <img id="zoho" src={itServicesIcon} alt={t('home.service_it_services_title')} />
            <h3>{t('home.service_it_services_title')}</h3>
            <p>{t('home.service_it_services_description')}</p>
          </NavLink>
        </div>
      </motion.section>
      
      {/* Our Projects Section */}
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
            <div className="project-item" key={item}>
              <div className="project-content">
                <h3>{t(`home.project_${item}_title`)}</h3>
                <p>{t(`home.project_${item}_description`)}</p>
                <button>{t('home.project_view_more')}</button>
              </div>
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
        custom={5}
        ref={contactRef} // Assign ref to Contact Us section
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

      {/* FAQ Section */}
      <motion.section
        className="faq-section"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={6}
        ref={faqRef} // Assign ref to FAQ section
      >
        <h2>{t('home.faq_title')}</h2>
        <div className="faq-list">
          {[1, 2, 3].map((item, index) => (
            <div
              className={`faq-item ${openFaqIndex === index ? 'open' : ''}`}
              key={index}
            >
              <h3 onClick={() => toggleFaq(index)}>
                {t(`home.faq_question_${item}`)}
              </h3>
              {openFaqIndex === index && <p>{t(`home.faq_answer_${item}`)}</p>}
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
