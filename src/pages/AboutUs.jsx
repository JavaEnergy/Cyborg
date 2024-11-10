// src/pages/AboutUs.jsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './AboutUs.css'; // Ensure you have this CSS file
import image1 from '../assets/images/abus.png'; // Replace with your actual image paths
import image2 from '../assets/images/abus.png'; // Use a different image if needed

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

  return (
    <>
      {/* Hero Section */}
      <div className="about-hero">
        <div className="about-hero-content">
          <h1 className={isGerman ? 'de' : ''}>{t('about_us.hero_title')}</h1>
          <p>{t('about_us.hero_subtitle')}</p>
        </div>
      </div>

      {/* First Section: Text on Left, Image on Right */}
      <section className="about-content-section">
        <div className="about-content-container">
          <div className="about-text-content">
            <h2>{t('about_us.about_title')}</h2>
            <p>{t('about_us.about_text')}</p>
          </div>
          <div className="about-image-content">
            <img src={image1} alt="About Us" id="firstimg" />
          </div>
        </div>
      </section>

      {/* Second Section: Image on Left, Content on Right */}
      <section className="about-content-section">
        <div className="about-content-container reverse">
          <div className="about-image-content">
            <img src={image2} alt="Our Mission" className="circle-image" />
          </div>
          <div className="about-text-content">
            <h2>{t('about_us.mission_title')}</h2>
            <p>{t('about_us.mission_text')}</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="about-faq-section">
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
              {openFaqIndex === index && (
                <p>{t(`about_us.faq_answer_${item}`)}</p>
              )}
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

    </>
  );
};

export default AboutUs;
