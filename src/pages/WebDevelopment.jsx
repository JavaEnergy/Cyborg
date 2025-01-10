// src/pages/WebDevelopment.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate

import {
  Email,
} from '@mui/icons-material';
import {
  Web as WebIcon,
  Code as CodeIcon,
  ShoppingCart as ECommerceIcon,
  Build as BuildIcon,
} from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion } from 'framer-motion';

import Layout from '../components/Layout';
import './WebDevelopment.css';
import useScrollSpy from '../hooks/useScrollSpy';
import ContactForm from '../components/ContactForm';

import HelmetManager from '../components/HelmetManager'; // Import HelmetManager

// Import images (ensure these paths are correct)
import wordpressImage from '../assets/images/wordpress.jpg';
import reactImage from '../assets/images/react.png';
import angularImage from '../assets/images/angular.png';
import ecommerceImage from '../assets/images/conf.png';
import customSoftwareImage from '../assets/images/custom.png';

const WebDevelopment = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const location = useLocation(); // Initialize useLocation
  const navigate = useNavigate(); // Initialize useNavigate

  // Modal state for card details
  const [openModal, setOpenModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // Framer Motion animation variants
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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  // Handlers for modal
  const handleOpenModal = (service) => {
    setSelectedService(service);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setSelectedService(null);
    setOpenModal(false);
  };

  // CTA button click handler
  const handleCTAButtonClick = () => {
    navigate(`/${currentLang}/contact-us`); // Navigate to Contact Us page
  };

  // Services data (with "moreInfo" for modal content)
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
      title: t('web_development.e_commerce'), // "Product Configurator"
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

  // Contact form submission handler (if any within this page)
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <Layout>
      {/* HelmetManager Component for SEO */}
      <HelmetManager
        title={t('web_development.page_title')}
        description={t('web_development.page_description')}
        openGraph={{
          title: t('web_development.page_title'),
          description: t('web_development.page_description'),
          image: 'https://cyborg-it.de/assets/Cyborg-logo-9-09-DqmwUbnN.png',
          url: `https://cyborg-it.de${location.pathname}`,
          type: 'website',
        }}
        twitter={{
          card: 'summary_large_image',
          title: t('web_development.page_title'),
          description: t('web_development.page_description'),
          image: 'https://cyborg-it.de/assets/Cyborg-logo-9-09-DqmwUbnN.png',
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
            "telephone": "+995-598-70-79-79",
            "contactType": "Customer Service"
          }
        }}
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
                    key={service.id} // Ensure unique key
                    id={service.id}
                    style={{ display: 'flex' }}
                  >
                    <motion.div
                      variants={cardVariants}
                      style={{ flex: 1 }}
                      onClick={() => handleOpenModal(service)} // Open modal
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
                    <Typography
                      id="service-modal-title"
                      variant="h4"
                      gutterBottom
                    >
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
                startIcon={<Email />} // Use the Email icon here
                size="large"
                onClick={handleCTAButtonClick} // Use onClick to navigate
                className="cta-button"
              >
                {t('zoho_consulting.contact_us')}
              </Button>
            </div>
          </motion.div>

          {/* Remove the Contact Section if not needed */}
          
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

        {/* Modal for More Information */}
        {/* Ensure only one Modal is present */}
      </div>
    </Layout>
  );
};

export default WebDevelopment;
