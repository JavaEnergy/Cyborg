// src/pages/ITConsulting.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import {
  Security,
  Cloud,
  Web,
  PhoneIphone,
  Code,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Parallax } from 'react-parallax';
import Layout from '../components/Layout';
import './ITConsulting.css';

// Import images
import heroImage from '../assets/images/abus.png';
import ideaToImplementationImage from '../assets/images/abus.png';
import itStrategyImage from '../assets/images/abus.png';
import itSecurityImage from '../assets/images/abus.png';
import softwareDevelopmentImage from '../assets/images/abus.png';
import webConsultingImage from '../assets/images/abus.png';
import mobileConsultingImage from '../assets/images/abus.png';
import saasConsultingImage from '../assets/images/abus.png';
import cloudConsultingImage from '../assets/images/abus.png';

const ITConsulting = () => {
  const { t } = useTranslation();

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.3 },
    }),
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Services data
  const services = [
    {
      title: t('it_consulting.software_development_consulting'),
      description: t('it_consulting.software_development_consulting_description'),
      image: softwareDevelopmentImage,
      icon: <Code fontSize="large" color="primary" />,
    },
    {
      title: t('it_consulting.web_consulting'),
      description: t('it_consulting.web_consulting_description'),
      image: webConsultingImage,
      icon: <Web fontSize="large" color="primary" />,
    },
    {
      title: t('it_consulting.mobile_consulting'),
      description: t('it_consulting.mobile_consulting_description'),
      image: mobileConsultingImage,
      icon: <PhoneIphone fontSize="large" color="primary" />,
    },
    {
      title: t('it_consulting.saas_consulting'),
      description: t('it_consulting.saas_consulting_description'),
      image: saasConsultingImage,
      icon: <Cloud fontSize="large" color="primary" />,
    },
    {
      title: t('it_consulting.cloud_consulting'),
      description: t('it_consulting.cloud_consulting_description'),
      image: cloudConsultingImage,
      icon: <Cloud fontSize="large" color="primary" />,
    },
  ];

  // Contact form submission handler
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <Layout>
      <div className="it-consulting">
        {/* Hero Section with Parallax Effect */}
        <div className="it-consulting-hero">
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
                  alt="Idea to Implementation"
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
                  alt="IT Strategy"
                  className="section-image"
                />
              </Grid>
            </Grid>
          </motion.section>

          {/* Software Consulting */}
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
            {/* Services Cards */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Grid container spacing={4} justifyContent="center">
                {services.map((service, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <motion.div variants={cardVariants}>
                      <Card
                        component={motion.div}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="service-card"
                      >
                        <div className="service-icon">{service.icon}</div>
                        <CardMedia
                          component="img"
                          height="140"
                          image={service.image}
                          alt={service.title}
                        />
                        <CardContent>
                          <Typography variant="h6" component="h3" gutterBottom>
                            {service.title}
                          </Typography>
                          <Typography variant="body2">{service.description}</Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </motion.section>

          {/* IT Security & Audits */}
          <motion.section
            id="it-security"
            className="consulting-section"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={4}
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
                <img
                  src={itSecurityImage}
                  alt="IT Security"
                  className="section-image"
                />
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
            custom={5}
          >
            <Typography variant="h5" align="center" gutterBottom>
              {t('it_consulting.ready_to_transform')}
            </Typography>
          </motion.div>

      {/* Contact Section */}
<motion.section
  className="contact-section"
  variants={sectionVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  custom={6}
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

export default ITConsulting;
