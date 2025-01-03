// src/pages/ZohoConsulting.jsx
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
  Modal,
} from '@mui/material';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import './ZohoConsulting.css';

import {
  Email, // Import Email icon
} from '@mui/icons-material';
import ContactForm from '../components/ContactForm';

// Example images (update paths accordingly)
import zohoCRMImage from '../assets/images/crm.png';
import zohoMarketingImage from '../assets/images/marketing.png';
import zohoFinanceImage from '../assets/images/finance.png';
import zohoHRImage from '../assets/images/people.png';
import zohoCustomDevImage from '../assets/images/Zoho.png';

const ZohoConsulting = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const contactRef = useRef(null);

  // Modal states
  const [openModal, setOpenModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // Animation for page sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  };

  // Card hover animation
  const cardVariants = {
    rest: {
      scale: 1,
      boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
    },
    hover: {
      scale: 1.05,
      boxShadow: '0px 8px 20px rgba(0,0,0,0.2)',
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  // Services array, including "moreInfo" for modal content
  const services = [
    {
      title: t('zoho_consulting.zoho_crm'),
      description: t('zoho_consulting.zoho_crm_description'),
      image: zohoCRMImage,
      alt: 'Zoho CRM',
      moreInfo: t('zoho_consulting.zoho_crm_more_info'),
    },
    {
      title: t('zoho_consulting.zoho_marketing'),
      description: t('zoho_consulting.zoho_marketing_description'),
      image: zohoMarketingImage,
      alt: 'Zoho Marketing',
      moreInfo: t('zoho_consulting.zoho_marketing_more_info'),
    },
    {
      title: t('zoho_consulting.finance'),
      description: t('zoho_consulting.finance_description'),
      image: zohoFinanceImage,
      alt: 'Finance',
      moreInfo: t('zoho_consulting.finance_more_info'),
    },
    {
      title: t('zoho_consulting.human_resources'),
      description: t('zoho_consulting.human_resources_description'),
      image: zohoHRImage,
      alt: 'Human Resources',
      moreInfo: t('zoho_consulting.human_resources_more_info'),
    },
    {
      title: t('zoho_consulting.custom_development'),
      description: t('zoho_consulting.custom_development_description'),
      image: zohoCustomDevImage,
      alt: 'Custom Development',
      moreInfo: t('zoho_consulting.custom_development_more_info'),
    },
  ];

  // Open/close modal logic
  const handleOpenModal = (service) => {
    setSelectedService(service);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedService(null);
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
         
          </motion.section>

          {/* Services Grid */}
          <motion.section
            className="zoho-services-grid"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
          >
            <Grid container spacing={4}>
              {services.map((service, index) => (
                <Grid
                  key={service.title}
                  item
                  xs={12}
                  /* 
                    First row (index 0 and 1) => md={6} 
                    Second row (index 2, 3, 4) => md={4} 
                  */
                  md={index < 2 ? 6 : 4}
                >
                  <motion.div
                    className="zoho-service-card"
                    variants={cardVariants}
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                    onClick={() => handleOpenModal(service)}
                  >
                    <Card className="card">
                      <CardMedia
                        component="img"
                        height="140"
                        image={service.image}
                        alt={service.alt}
                      />
                      <CardContent>
                        <Typography variant="h5" gutterBottom>
                          {service.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {service.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
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
            custom={1}
            ref={contactRef}
          >
            <Typography variant="h2" gutterBottom align="center">
              {t('home.contact_title')}
            </Typography>
            <ContactForm />
          </motion.section>
        </Container>

        {/* Modal for More Information */}
        <Modal
          open={openModal}
          onClose={handleCloseModal} 
          /* 
            By setting onClose to handleCloseModal,
            clicking the backdrop (outside the card) will close the modal.
          */
          aria-labelledby="service-modal-title"
          aria-describedby="service-modal-description"
        >
          {/* We can wrap content in a Framer Motion div for animations */}
          <motion.div
            className="modal-content"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()} 
            /* 
              Stop propagation so clicking inside the card doesn't close the modal,
              but clicking outside (on backdrop) will.
            */
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
                  {t('zoho_consulting.close')}
                </Button>
              </>
            )}
          </motion.div>
        </Modal>
      </div>
    </Layout>
  );
};

export default ZohoConsulting;
