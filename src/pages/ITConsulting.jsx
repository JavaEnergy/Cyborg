// src/pages/ITConsulting.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Modal,
} from '@mui/material';
import {
  Cloud,
  SmartToy,
  Web,
  PhoneIphone,
  Code,
  Email,
  Security, // Import Security icon for IT Security & Audits
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import './ITConsulting.css';
import ContactForm from '../components/ContactForm';
import { Helmet } from 'react-helmet';

// Import images (ensure the paths are correct)
import heroImage from '../assets/images/b1.png';
import ideaToImplementationImage from '../assets/images/b3.png';
import itStrategyImage from '../assets/images/b2.png';
import softwareDevelopmentImage from '../assets/images/soft.png';
import webConsultingImage from '../assets/images/bbb.png';
import mobileConsultingImage from '../assets/images/mob.png';
import cloudConsultingImage from '../assets/images/clod.png';
import aiConsultingImage from '../assets/images/ai3k.png';        // <-- Correct AI image
import itSecurityImage from '../assets/images/secr.png';        // <-- IT Security & Audits image

const ITConsulting = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const currentLang = i18n.language;
  const contactRef = useRef(null);

  // Track the previous pathname to detect changes (for scroll-to-top)
  const prevPathnameRef = useRef(location.pathname);

  useEffect(() => {
    const prevPathname = prevPathnameRef.current;
    const currentPathname = location.pathname;

    // Function to remove language codes from the path for comparison
    const stripLangFromPath = (path) => path.replace(/^\/(en|de)/, '');

    if (
      stripLangFromPath(prevPathname) !== stripLangFromPath(currentPathname) &&
      !location.hash
    ) {
      window.scrollTo(0, 0);
    }

    prevPathnameRef.current = currentPathname;
  }, [location]);

  // Framer Motion animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.3, duration: 0.6, ease: 'easeOut' },
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

  // State for the modal
  const [openModal, setOpenModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

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
    navigate(`/${currentLang}/contact-us`);
  };

  // Services data (5 Consulting Cards)
  const services = [
    {
      id: 'software-development-consulting',
      title: t('it_consulting.software_development_consulting'),
      description: t('it_consulting.software_development_consulting_description'),
      image: softwareDevelopmentImage,
      icon: <Code fontSize="large" color="primary" />,
      moreInfo: t('it_consulting.software_development_consulting_more_info'),
    },
    {
      id: 'web-consulting',
      title: t('it_consulting.web_consulting'),
      description: t('it_consulting.web_consulting_description'),
      image: webConsultingImage,
      icon: <Web fontSize="large" color="primary" />,
      moreInfo: t('it_consulting.web_consulting_more_info'),
    },
    {
      id: 'mobile-consulting',
      title: t('it_consulting.mobile_consulting'),
      description: t('it_consulting.mobile_consulting_description'),
      image: mobileConsultingImage,
      icon: <PhoneIphone fontSize="large" color="primary" />,
      moreInfo: t('it_consulting.mobile_consulting_more_info'),
    },
    {
      id: 'ai-consulting',
      title: t('it_consulting.ai_consulting'),
      description: t('it_consulting.ai_consulting_description'),
      image: aiConsultingImage,
      icon: <SmartToy fontSize="large" color="primary" />,
      moreInfo: t('it_consulting.ai_consulting_more_info'),
    },
    {
      id: 'cloud-consulting',
      title: t('it_consulting.cloud_consulting'),
      description: t('it_consulting.cloud_consulting_description'),
      image: cloudConsultingImage,
      icon: <Cloud fontSize="large" color="primary" />,
      moreInfo: t('it_consulting.cloud_consulting_more_info'),
    },
  ];

  // Separate IT Security & Audits Service
  const itSecurityAuditsService = {
    id: 'it-security-audits',
    title: t('it_consulting.it_security'),
    moreInfo: t('it_consulting.it_security_audits_more_info'),
  };

  return (
    <Layout>
      {/* React Helmet for SEO */}
      <Helmet>
        <title>{t('it_consulting.page_title')}</title>
        <meta name="description" content={t('it_consulting.page_description')} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={t('it_consulting.page_title')} />
        <meta property="og:description" content={t('it_consulting.page_description')} />
        <meta property="og:image" content="https://cyborg-it.de/assets/Cyborg-logo-9-09-DqmwUbnN.png" />
        <meta property="og:url" content={`https://cyborg-it.de${location.pathname}`} />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="it-consulting">
        {/* Hero Section */}
        <div
          className="it-consulting-hero"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <Typography variant="h2" component="h1" align="center" color="white">
            {t('it_consulting.it_consulting')}
          </Typography>
        </div>

        <Container maxWidth="lg">
          {/* From Idea to Implementation */}
          <motion.section
            id="from-idea-to-implementation"
            className="consulting-section"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h4" component="h2" gutterBottom>
                  {t('it_consulting.from_idea_to_implementation')}
                </Typography>
                <Typography variant="body1" paragraph>
                  {t('it_consulting.content_for_from_idea_to_implementation')}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <img
                  src={ideaToImplementationImage}
                  alt={t('it_consulting.from_idea_to_implementation_alt')}
                  className="section-image"
                />
              </Grid>
            </Grid>
          </motion.section>

          {/* IT Strategy & Digitalization */}
          <motion.section
            id="it-strategy"
            className="consulting-section"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
          >
            <Grid container spacing={4} alignItems="center" direction="row-reverse">
              <Grid item xs={12} md={6}>
                <Typography variant="h4" component="h2" gutterBottom>
                  {t('it_consulting.it_strategy')}
                </Typography>
                <Typography variant="body1" paragraph>
                  {t('it_consulting.content_for_it_strategy')}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <img
                  src={itStrategyImage}
                  alt={t('it_consulting.it_strategy_alt')}
                  className="section-image"
                />
              </Grid>
            </Grid>
          </motion.section>

          {/* Consulting Services (5 Cards) */}
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
              {t('it_consulting.software_consulting')}
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              {t('it_consulting.content_for_software_consulting')}
            </Typography>

            {/* Services Cards (5) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Grid container spacing={4} justifyContent="center">
                {services.map((service) => (
                  <Grid item xs={12} sm={6} md={4} key={service.id}>
                    <motion.div variants={cardVariants}>
                      <Card
                        component={motion.div}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="service-card"
                        onClick={() => handleOpenModal(service)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="service-icon">{service.icon}</div>
                        <CardMedia
                          component="img"
                          height="140"
                          image={service.image}
                          alt={service.title}
                          style={{
                            objectFit: service.image === cloudConsultingImage ? 'contain' : 'cover',
                          }}
                        />
                        <CardContent>
                          <Typography variant="h6" component="h3" gutterBottom>
                            {service.title}
                          </Typography>
                          <Typography variant="body2">
                            {service.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>

            {/* Modal for Consulting Cards */}
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
                      {t('it_consulting.close')}
                    </Button>
                  </>
                )}
              </motion.div>
            </Modal>
          </motion.section>

          {/* IT Security & Audits (Separate Clickable Section) */}
          <motion.section
            id="it-security"
            className="consulting-section"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h4" component="h2" gutterBottom>
                  {t('it_consulting.it_security')}
                </Typography>
                <Typography variant="body1" paragraph>
                  {t('it_consulting.content_for_it_security')}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                {/* Clickable image to open modal */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOpenModal(itSecurityAuditsService)}
                  style={{ cursor: 'pointer' }}
                  aria-label={t('it_consulting.it_security')}
                >
                  <Card
                    component={motion.div}
                    className="service-card"
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="service-icon">
                      <Security fontSize="large" color="primary" />
                    </div>
                    <CardMedia
                      component="img"
                      height="140"
                      image={itSecurityImage}
                      alt={t('it_consulting.it_security_alt')}
                      style={{ objectFit: 'contain' }}
                    />
                    <CardContent>
                      <Typography variant="h6" component="h3" gutterBottom>
                        {t('it_consulting.it_security')}
                      </Typography>
                      <Typography variant="body2">
                        {t('it_consulting.content_for_it_security')}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
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
            ref={contactRef}
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

export default ITConsulting;
