// src/pages/ContactUs.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import './ContactUs.css';

const ContactUs = () => {
  const { t } = useTranslation();

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="contact-hero">
        <Typography
          variant="h2"
          component={motion.h1}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          align="center"
          color="white"
        >
          {t('contact_us.title')}
        </Typography>
      </div>

      {/* Contact Form Section */}
      <Container maxWidth="md">
        <motion.section
          className="contact-section"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <Typography variant="h5" align="center" paragraph>
            {t('contact_us.subtitle')}
          </Typography>
          <form className="contact-form" onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={t('contact_us.name')}
                  name="name"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={t('contact_us.email')}
                  name="email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label={t('contact_us.subject')}
                  name="subject"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label={t('contact_us.message')}
                  name="message"
                  variant="outlined"
                  fullWidth
                  required
                  multiline
                  rows={6}
                />
              </Grid>
              <Grid item xs={12} align="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  size="large"
                >
                  {t('contact_us.submit')}
                </Button>
              </Grid>
            </Grid>
          </form>
        </motion.section>
      </Container>

      {/* Map or Additional Contact Info (Optional) */}
      <Container maxWidth="lg">
        <motion.section
          className="additional-info-section"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>
                {t('contact_us.address_title')}
              </Typography>
              <Typography variant="body1" paragraph>
                {t('contact_us.address_line1')}
              </Typography>
              <Typography variant="body1" paragraph>
                {t('contact_us.address_line2')}
              </Typography>
              <Typography variant="body1" paragraph>
                {t('contact_us.phone')}
              </Typography>
              <Typography variant="body1" paragraph>
                {t('contact_us.email_contact')}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Optional: Embed a Google Map or add an image */}
              <div className="map-container">
                <iframe
                  title="Company Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!..." // Replace with your location
                  width="100%"
                  height="300"
                  frameBorder="0"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  aria-hidden="false"
                  tabIndex="0"
                ></iframe>
              </div>
            </Grid>
          </Grid>
        </motion.section>
      </Container>
    </Layout>
  );
};

export default ContactUs;
