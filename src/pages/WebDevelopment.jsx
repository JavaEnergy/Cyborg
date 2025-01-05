// src/pages/WebDevelopment.jsx
import React, { useRef, useState } from 'react';
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
  Modal, // <-- Import Modal
} from '@mui/material';

import {
  Email, // Import Email icon
} from '@mui/icons-material';
import {
  Web as WebIcon,
  Code as CodeIcon,
  ShoppingCart as ECommerceIcon,
  Build as BuildIcon,
} from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import Layout from '../components/Layout';
import './WebDevelopment.css';
import useScrollSpy from '../hooks/useScrollSpy'; // Import the custom hook
import ContactForm from '../components/ContactForm'; // Import ContactForm

// Import images (ensure these paths are correct)
import wordpressImage from '../assets/images/wordpress.jpg';
import reactImage from '../assets/images/react.png';
import angularImage from '../assets/images/angular.png';
import ecommerceImage from '../assets/images/conf.png'; // "conf.png" representing Product Configurator
import customSoftwareImage from '../assets/images/custom.png';

const WebDevelopment = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  // Modal state for card details
  const [openModal, setOpenModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const navigate = useNavigate(); 

  // Define the sections for scroll spy
  const sectionIds = [
    'wordpress',
    'react-applications',
    'angular-development',
    'e-commerce',
    'custom-software',
    'tool-comparison-faq',
  ];

  useScrollSpy(sectionIds);

  // Animation variants for sections
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

  // Animation variants for cards
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

  // Handlers for opening/closing the card modal
  const handleOpenModal = (service) => {
    setSelectedService(service);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedService(null);
  };

  // Define contactRef for smooth scrolling
  const contactRef = useRef(null);

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

  // Contact form submission handler
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  // CTA button click handler
  const handleCTAButtonClick = () => {
    navigate(`/${currentLang}/contact-us`);
  };

  return (
    <Layout>
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
              <Grid container spacing={4} justifyContent="center" alignItems="stretch">
                {services.map((service, index) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={index}
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
                        <CardContent classes={{ root: 'card-content' }}>
                          <Typography variant="h6" component="h3" gutterBottom>
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
                        <Typography id="service-modal-description" variant="body1" paragraph>
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
              </Grid>
            </motion.div>
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
            <Typography variant="h5" align="center" gutterBottom>
              {t('it_consulting.ready_to_transform')}
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              {t('it_consulting.take_next_step')}
            </Typography>
            <div className="cta-button">
              <Button
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<Email />}
                onClick={handleCTAButtonClick}
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={t('it_consulting.contact_us')}
              >
                {t('it_consulting.contact_us')}
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
            ref={contactRef} // Assign ref to Contact Us section
          >
            <Typography variant="h2" component="h2" gutterBottom>
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
