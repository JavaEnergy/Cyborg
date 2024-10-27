// Home.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Home.css'; // Import the CSS for styling
import image from '../assets/images/codesurf-caia_image-alamy.jpg';

const Home = () => {
  const { t } = useTranslation();

  // State for FAQ interactivity
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <>
      <div className="hero">
        <div className="hero-content">
          <h1>{t('home.title')}</h1>
        </div>
      </div>

      <div className="main-content">
        <div className="image-container">
          <img src={image} alt="" />
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
          <div className="service-item">
            <h3>{t('home.service_it_consulting_title')}</h3>
            <p>{t('home.service_it_consulting_description')}</p>
          </div>
          <div className="service-item">
            <h3>{t('home.service_web_development_title')}</h3>
            <p>{t('home.service_web_development_description')}</p>
          </div>
          <div className="service-item">
            <h3>{t('home.service_it_services_title')}</h3>
            <p>{t('home.service_it_services_description')}</p>
          </div>
        </div>
      </section>

      {/* Our Projects Section */}
      <section className="projects-section">
        <h2>{t('home.projects_title')}</h2>
        <div className="projects-list">
          <div className="project-item">
            <h3>{t('home.project_one_title')}</h3>
            <p>{t('home.project_one_description')}</p>
          </div>
          <div className="project-item">
            <h3>{t('home.project_one_title')}</h3>
            <p>{t('home.project_one_description')}</p>
          </div>
          <div className="project-item">
            <h3>{t('home.project_one_title')}</h3>
            <p>{t('home.project_one_description')}</p>
          </div>
          <div className="project-item">
            <h3>{t('home.project_one_title')}</h3>
            <p>{t('home.project_one_description')}</p>
          </div>
        </div>
      </section>

      {/* Contact Us/Get in Touch Form */}
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
              <p>{t(`home.faq_answer_${item}`)}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
