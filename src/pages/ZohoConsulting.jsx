// src/pages/ZohoConsulting.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Typography, Grid, Button } from '@mui/material';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import './ZohoConsulting.css';

// Import images
import zohoHeroImage from '../assets/images/bg.jpg'; // Replace with your actual image
import zohoAppsImage from '../assets/images/bg.jpg'; // Image representing Zoho apps
import zohoImplementationImage from '../assets/images/bg.jpg'; // Image for implementation services

const ZohoConsulting = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.3,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <Layout>
      <div className="zoho-consulting">
        {/* Hero Section */}
        <div className="zoho-hero">
          <Typography
            variant="h2"
            component={motion.h1}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            align="center"
            color="white"
          >
            {t('zoho_consulting.title')}
          </Typography>
        </div>

        <Container maxWidth="lg">
          {/* Introduction Section */}
          <motion.section
            id="introduction"
            className="zoho-intro-section"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
          >
            <Typography variant="h4" component="h2" gutterBottom align="center">
              {t('zoho_consulting.intro_title')}
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              {t('zoho_consulting.intro_description')}
            </Typography>
            <img
              src={zohoAppsImage}
              alt="Zoho Applications"
              className="section-image"
            />
          </motion.section>

          {/* Zoho CRM Section */}
          <motion.section
            id="zoho-crm"
            className="zoho-service-section"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
          >
            <Typography variant="h4" component="h2" gutterBottom>
              {t('zoho_consulting.zoho_crm')}
            </Typography>
            <Typography variant="body1" paragraph>
              {t('zoho_consulting.zoho_crm_description')}
            </Typography>
          </motion.section>

          {/* Zoho Books Section */}
          <motion.section
            id="zoho-books"
            className="zoho-service-section"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
          >
            <Typography variant="h4" component="h2" gutterBottom>
              {t('zoho_consulting.zoho_books')}
            </Typography>
            <Typography variant="body1" paragraph>
              {t('zoho_consulting.zoho_books_description')}
            </Typography>
          </motion.section>

          {/* Zoho Projects Section */}
          <motion.section
            id="zoho-projects"
            className="zoho-service-section"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={4}
          >
            <Typography variant="h4" component="h2" gutterBottom>
              {t('zoho_consulting.zoho_projects')}
            </Typography>
            <Typography variant="body1" paragraph>
              {t('zoho_consulting.zoho_projects_description')}
            </Typography>
          </motion.section>

          {/* Custom Development Section */}
          <motion.section
            id="custom-development"
            className="zoho-service-section"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={4}
          >
            <Typography variant="h4" component="h2" gutterBottom>
              {t('zoho_consulting.custom_development')}
            </Typography>
            <Typography variant="body1" paragraph>
              {t('zoho_consulting.custom_development_description')}
            </Typography>
          </motion.section>

          {/* CTA Section */}
          <motion.div
            className="cta-section"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={4}
          >
            <div className="cta-content">
              <Typography variant="h4" align="center" gutterBottom>
                {t('zoho_consulting.cta_title')}
              </Typography>
              <Typography variant="h6" align="center" paragraph>
                {t('zoho_consulting.cta_description')}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                href={`/${currentLang}/contact-us`}
                className="cta-button"
              >
                {t('zoho_consulting.contact_us')}
              </Button>
            </div>
          </motion.div>

          {/* Contact Section */}
<motion.section
  className="contact-section"
  variants={sectionVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  custom={3}
>
  <Typography variant="h4" component="h2" align="center" gutterBottom>
    {t('home.contact_title')}
  </Typography>
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

        </Container>
      </div>
    </Layout>
  );
};

export default ZohoConsulting;
