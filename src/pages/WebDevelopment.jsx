// src/pages/WebDevelopment.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from '@mui/material';
import {
  Web as WebIcon,
  Code as CodeIcon,
  ShoppingCart as ECommerceIcon,
  Build as BuildIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import './WebDevelopment.css';
import useScrollSpy from '../hooks/useScrollSpy'; // Import the hook

// Import images
import wordpressImage from '../assets/images/abusbg.jpg';
import reactImage from '../assets/images/abusbg.jpg';
import angularImage from '../assets/images/abusbg.jpg';
import ecommerceImage from '../assets/images/abusbg.jpg';
import customSoftwareImage from '../assets/images/abusbg.jpg';
import technologiesImage from '../assets/images/abusbg.jpg';

const WebDevelopment = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const sectionIds = [
    'wordpress',
    'react-applications',
    'angular-development',
    'e-commerce',
    'custom-software',
    'technologies-tools',
  ];

  useScrollSpy(sectionIds);

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

  // Services data
  const services = [
    {
      title: t('web_development.wordpress'),
      description: t('web_development.content_for_wordpress'),
      image: wordpressImage,
      icon: <WebIcon fontSize="large" color="primary" />,
      id: 'wordpress',
    },
    {
      title: t('web_development.react_applications'),
      description: t('web_development.content_for_react_applications'),
      image: reactImage,
      icon: <CodeIcon fontSize="large" color="primary" />,
      id: 'react-applications',
    },
    {
      title: t('web_development.angular_development'),
      description: t('web_development.content_for_angular_development'),
      image: angularImage,
      icon: <CodeIcon fontSize="large" color="primary" />,
      id: 'angular-development',
    },
    {
      title: t('web_development.e_commerce'),
      description: t('web_development.content_for_e_commerce'),
      image: ecommerceImage,
      icon: <ECommerceIcon fontSize="large" color="primary" />,
      id: 'e-commerce',
    },
    {
      title: t('web_development.custom_software'),
      description: t('web_development.content_for_custom_software'),
      image: customSoftwareImage,
      icon: <BuildIcon fontSize="large" color="primary" />,
      id: 'custom-software',
    },
  ];

  // Contact form submission handler
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
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
            animate="visible"
            custom={3}
          >
            <Typography variant="h4" component="h2" gutterBottom align="center">
              {t('web_development.services_title')}
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              {t('web_development.services_description')}
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
                    <motion.div variants={cardVariants} style={{ flex: 1 }}>
                      <Card
                        component={motion.div}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        classes={{ root: 'service-card' }}
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
              </Grid>
            </motion.div>
          </motion.section>

          {/* Technologies & Tools Section */}
          <motion.section
            id="technologies-tools"
            className="webdev-section"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <Typography variant="h4" component="h2" gutterBottom align="center">
              {t('web_development.technologies_tools')}
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              {t('web_development.content_for_technologies_tools')}
            </Typography>
            <img
              src={technologiesImage}
              alt="Technologies & Tools"
              className="section-image"
            />
          </motion.section>

          {/* CTA Section */}
          <motion.div
            className="cta-section"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <div className="cta-content">
              <Typography variant="h4" align="center" gutterBottom>
                {t('web_development.ready_to_transform')}
              </Typography>
              <Typography variant="h6" align="center" paragraph>
                {t('web_development.cta_description')}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                href={`/${currentLang}/contact-us`}
                className="cta-button"
              >
                {t('web_development.contact_us')}
              </Button>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.section
            className="contact-section"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            custom={4}
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

export default WebDevelopment;