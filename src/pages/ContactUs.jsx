// src/pages/ContactUs.jsx
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import Layout from '../components/Layout';
import './ContactUs.css';

const ContactUs = () => {
  const { t } = useTranslation();
  const formRef = useRef(null);

  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    setStatus(''); // Clear old status

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      formRef.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    ).then(
      (result) => {
        console.log('Email successfully sent!', result.text);
        setStatus(t('contact.success_message')); // e.g. "Thank you for your message!"
        formRef.current.reset();
        setLoading(false);
      },
      (error) => {
        console.log('Email sending failed:', error.text);
        setStatus(t('contact.error_message')); // e.g. "Oops, something went wrong."
        setLoading(false);
      }
    );
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

          {/* The FORM with matching name="user_*" attributes */}
          <form className="contact-form" onSubmit={handleSubmit} ref={formRef}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={t('contact_us.name')}
                  name="user_name"         // <-- match EmailJS var
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={t('contact_us.email')}
                  name="user_email"        // <-- match EmailJS var
                  type="email"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label={t('contact_us.subject')}
                  name="user_subject"      // <-- match EmailJS var
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label={t('contact_us.message')}
                  name="user_message"      // <-- match EmailJS var
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
                  disabled={loading}
                >
                  {loading ? t('contact.sending') : t('contact_us.submit')}
                </Button>
              </Grid>
            </Grid>
          </form>

          {/* Show status message below the form */}
          {status && <Typography variant="body1" align="center" style={{ marginTop: '1rem' }}>{status}</Typography>}
        </motion.section>
      </Container>

      {/* Map or Additional Info (Optional) */}
      <Container maxWidth="lg">
        <motion.section
          className="additional-info-section"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          {/* ...whatever extra content you want... */}
        </motion.section>
      </Container>
    </Layout>
  );
};

export default ContactUs;
