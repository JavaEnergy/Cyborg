// src/pages/WebDevelopment.jsx

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

// Import Material UI Components
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Modal,
} from '@mui/material';

import {
  Email,
  Web as WebIcon,
  Code as CodeIcon,
  ShoppingCart as ECommerceIcon,
  Build as BuildIcon,
} from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion } from 'framer-motion';

import Layout from '../components/Layout';
import './WebDevelopment.css';
// If you use useScrollSpy, ensure it's defined or remove it
// import useScrollSpy from '../hooks/useScrollSpy';
import ContactForm from '../components/ContactForm';
import HelmetManager from '../components/HelmetManager';

// Import images
import wordpressImage from '../assets/images/wordpress.jpg';
import reactImage from '../assets/images/react.png';
import angularImage from '../assets/images/angular.png';
import ecommerceImage from '../assets/images/conf.png';
import customSoftwareImage from '../assets/images/custom.png';

const WebDevelopment = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const location = useLocation();
  const navigate = useNavigate();

  // State for card modals
  const [openModal, setOpenModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // Framer Motion animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.3,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  // Construct the canonical URL
  const canonicalUrl = `https://cyborg-it.de${location.pathname}`;

  // Hreflang array (assuming DE/EN)
  const alternateLanguages = [
    { lang: 'de', url: 'https://cyborg-it.de/de/web-development' },
    { lang: 'en', url: 'https://cyborg-it.de/en/web-development' },
  ];

  // Handler to open/close modal
  const handleOpenModal = (service) => {
    setSelectedService(service);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setSelectedService(null);
    setOpenModal(false);
  };

  // CTA button click
  const handleCTAButtonClick = () => {
    navigate(`/${currentLang}/contact-us`);
  };

  // Services data
  const services = [
    {
      title: t('web_development.wordpress'),
      description: t('web_development.content_for_wordpress'),
      image: wordpressImage,
      icon: <WebIcon fontSize="large" color="primary" />,
      id: 'wordpress',
      moreInfo: t('web_development.wordpress_more_info'),
    },
    {
      title: t('web_development.react_applications'),
      description: t('web_development.content_for_react_applications'),
      image: reactImage,
      icon: <CodeIcon fontSize="large" color="primary" />,
      id: 'react-applications',
      moreInfo: t('web_development.react_more_info'),
    },
    {
      title: t('web_development.angular_development'),
      description: t('web_development.content_for_angular_development'),
      image: angularImage,
      icon: <CodeIcon fontSize="large" color="primary" />,
      id: 'angular-development',
      moreInfo: t('web_development.angular_more_info'),
    },
    {
      title: t('web_development.e_commerce'),
      description: t('web_development.content_for_e_commerce'),
      image: ecommerceImage,
      icon: <ECommerceIcon fontSize="large" color="primary" />,
      id: 'e-commerce',
      moreInfo: t('web_development.ecommerce_more_info'),
    },
    {
      title: t('web_development.custom_software'),
      description: t('web_development.content_for_custom_software'),
      image: customSoftwareImage,
      icon: <BuildIcon fontSize="large" color="primary" />,
      id: 'custom-software',
      moreInfo: t('web_development.custom_software_more_info'),
    },
  ];

  return (
    <Layout>
      {/* HelmetManager for SEO */}
      <HelmetManager
        title={t('web_development.page_title')}
        description={t('web_development.page_description')}
        canonical={canonicalUrl}
        openGraph={{
          title: t('web_development.page_title'),
          description: t('web_development.page_description'),
          image: 'https://cyborg-it.de/assets/og-image.jpg', // Updated OG image URL
          url: canonicalUrl,
          type: 'website',
        }}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Cyborg IT',
          url: 'https://cyborg-it.de',
          logo: 'https://cyborg-it.de/assets/Cyborg-logo-9-09-DqmwUbnN.png',
          sameAs: [
            'https://www.linkedin.com/company/cyborg-it-l%C3%B6sungen/',
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+995-598-70-79-79',
            contactType: 'Customer Service',
          },
        }}
        alternateLanguages={alternateLanguages}
      />

      <div className="web-development">
        {/* Hero Section */}
        <div className="web-development-hero">
          <Typography variant="h2" component="h1" align="center" color="white">
            {t('web_development.web_development')}
          </Typography>
        </div>

        <Container maxWidth="lg">
          {/* Services Section */}
          <motion.section
            id="software-consulting"
            className="consulting-section"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
          >
            <Typography variant="h4" component="h2" gutterBottom align="center">
              {t('web_development.services_title')}
            </Typography>

            <motion.div initial="hidden" animate="visible">
              <Grid container spacing={4} justifyContent="center">
                {services.map((service) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={service.id}
                    id={service.id}
                    style={{ display: 'flex' }}
                  >
                    <motion.div
                      variants={cardVariants}
                      style={{ flex: 1 }}
                      onClick={() => handleOpenModal(service)}
                      role="button"
                      tabIndex={0}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') handleOpenModal(service);
                      }}
                    >
                      <Card
                        component={motion.div}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="service-card"
                      >
                        <div className="service-icon">{service.icon}</div>
                        <CardMedia
                          component="img"
                          height="140"
                          image={service.image}
                          alt={service.title}
                          className="card-media"
                          loading="lazy"
                        />
                        <CardContent>
                          <Typography variant="h5" component="h3" gutterBottom>
                            {service.title}
                          </Typography>
                          <Typography variant="body2" className="card-description">
                            {service.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>

            {/* Modal for More Information */}
            <Modal
              open={openModal}
              onClose={handleCloseModal}
              aria-labelledby="service-modal-title"
              aria-describedby="service-modal-description"
            >
              <motion.div
                className="modal-content"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                {selectedService && (
                  <>
                    <Typography id="service-modal-title" variant="h4" gutterBottom>
                      {selectedService.title}
                    </Typography>
                    <Typography
                      id="service-modal-description"
                      variant="body1"
                      paragraph
                    >
                      {selectedService.moreInfo}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleCloseModal}
                    >
                      {t('web_development.close')}
                    </Button>
                  </>
                )}
              </motion.div>
            </Modal>
          </motion.section>

          {/* FAQ/Comparison Section */}
          <motion.section
            id="tool-comparison-faq"
            className="webdev-section"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={4}
          >
            <Typography variant="h4" component="h2" gutterBottom align="center">
              {t('web_development.which_tool_title')}
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              {t('web_development.which_tool_intro')}
            </Typography>

            {/* FAQ Accordions */}
            <div className="faq-section">
              {/* WordPress Accordion */}
              <Accordion className="faq-accordion">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="wordpress-content"
                  id="wordpress-header"
                >
                  <Typography variant="h6">
                    {t('web_development.faq_wordpress_title')}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Typography variant="body1">
                      {t('web_development.faq_wordpress_content')}
                    </Typography>
                  </motion.div>
                </AccordionDetails>
              </Accordion>

              {/* React Accordion */}
              <Accordion className="faq-accordion">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="react-content"
                  id="react-header"
                >
                  <Typography variant="h6">
                    {t('web_development.faq_react_title')}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Typography variant="body1">
                      {t('web_development.faq_react_content')}
                    </Typography>
                  </motion.div>
                </AccordionDetails>
              </Accordion>

              {/* Angular Accordion */}
              <Accordion className="faq-accordion">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="angular-content"
                  id="angular-header"
                >
                  <Typography variant="h6">
                    {t('web_development.faq_angular_title')}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Typography variant="body1">
                      {t('web_development.faq_angular_content')}
                    </Typography>
                  </motion.div>
                </AccordionDetails>
              </Accordion>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.div
            className="cta-section"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
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
                startIcon={<Email />}
                size="large"
                onClick={handleCTAButtonClick}
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
            custom={1}
          >
            <Typography variant="h2" gutterBottom align="center">
              {t('home.contact_title')}
            </Typography>
            <ContactForm />
          </motion.section>
        </Container>
      </div>
    </Layout>
  );
};

export default WebDevelopment;
