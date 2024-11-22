// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './Home.css';
import image from '../assets/images/bg.jpg';
import { NavLink } from 'react-router-dom';
import itConsultingIcon from '../assets/images/it Consulting.png';
import webDevelopmentIcon from '../assets/images/web Development.png';
import itServicesIcon from '../assets/images/Zoho.png';
import initSpiderEffect from '../assets/codes/interactive spider'; // Correct path for import

const Home = () => {
  const { t, i18n } = useTranslation();
  const [hoveredHero, setHoveredHero] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    let cleanup; // For storing the cleanup function
    if (hoveredHero) {
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
  }, [hoveredHero]);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  const currentLang = i18n.language;
  const isGerman = currentLang === 'de';

  return (
    <>
      <div
        className="hero"
        onMouseEnter={() => setHoveredHero(true)}
        onMouseLeave={() => setHoveredHero(false)}
      >
        <div className="hero-content">
          <h1 className={isGerman ? 'de' : ''}>{t('home.title')}</h1>
        </div>
      </div>

      <div className="home-main-content">
        <div className="image-container">
          <img src={image} alt="Coding Surf" />
        </div>

        <div className="text-container">
          <h2>{t('home.subtitle')}</h2>

          <section className="vision-section">
            <p>{t('home.vision_content')}</p>
          </section>

          <section className="wish-section">
            <h2>{t('home.wish_title')}</h2>
            <p>{t('home.wish_content')}</p>
          </section>
        </div>
      </div>

      {/* Services Overview Section */}
      <section className="services-overview">
        <h2>{t('home.services_title')}</h2>
        <div className="services-list">
          <NavLink to={`/${currentLang}/it-consulting`} className="service-item">
            <img src={itConsultingIcon} alt="IT Consulting" />
            <h3>{t('home.service_it_consulting_title')}</h3>
            <p>{t('home.service_it_consulting_description')}</p>
          </NavLink>

          <NavLink to={`/${currentLang}/web-development`} className="service-item">
            <img src={webDevelopmentIcon} alt="Web Development" />
            <h3>{t('home.service_web_development_title')}</h3>
            <p>{t('home.service_web_development_description')}</p>
          </NavLink>

          <NavLink to={`/${currentLang}/zoho-consulting`} className="service-item">
            <img id='zoho' src={itServicesIcon} alt="IT Services" />
            <h3>{t('home.service_it_services_title')}</h3>
            <p>{t('home.service_it_services_description')}</p>
          </NavLink>
        </div>
      </section>

      {/* Our Projects Section */}
      <section className="projects-section">
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
      </section>

      {/* Contact Section */}
      <section className="contact-section">
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
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
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
      </section>
    </>
  );
};

export default Home;
