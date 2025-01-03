import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Typography,
  Button,
  Paper,
  IconButton,
  Box,
  CircularProgress
} from '@mui/material';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import Layout from '../components/Layout';
import './ContactUs.css';

// Import Material UI Icons
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailIcon from '@mui/icons-material/Email';
import SubjectIcon from '@mui/icons-material/Subject';
import ChatIcon from '@mui/icons-material/Chat';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const ContactUs = () => {
  const { t } = useTranslation();
  const formRef = useRef(null);

  const [status, setStatus] = useState('');
  const [isSuccess, setIsSuccess] = useState(false); // Tracks success state
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    setIsSuccess(false); // Reset before submission

    console.time('EmailJS Submission Time'); // Start timer

    try {
      const result = await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      console.log('Email successfully sent!', result.text);
      setStatus(t('contact.success_message')); // e.g., "Thank you for your message!"
      setIsSuccess(true); // Set success state to true
      formRef.current.reset();
    } catch (error) {
      console.log('Email sending failed:', error.text);
      setStatus(t('contact.error_message')); // e.g., "Oops, something went wrong."
      setIsSuccess(false); // Ensure error state
    } finally {
      setLoading(false);
      console.timeEnd('EmailJS Submission Time'); // End timer
    }
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
          {/* Optional: Add a title here */}
        </Typography>
      </div>

      {/* Contact Form Section */}
      <Container maxWidth="md" className="contact-container">
        <motion.section
          className="contact-section"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <Typography variant="h3" className="h3" align="center" paragraph>
            {t('contact_us.title')}
          </Typography>
          <Typography variant="h5" align="center" paragraph>
            {t('contact_us.subtitle')}
          </Typography>

          {/* Modern Contact Form */}
          <Paper elevation={6} className="modern-form-container">
            <form className="modern-contact-form" onSubmit={handleSubmit} ref={formRef}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="input-wrapper"
              >
                <PersonOutlineIcon className="input-icon" />
                <input
                  type="text"
                  name="user_name"
                  placeholder={t('contact_us.name')}
                  required
                />
              </Box>

              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="input-wrapper"
              >
                <EmailIcon className="input-icon" />
                <input
                  type="email"
                  name="user_email"
                  placeholder={t('contact_us.email')}
                  required
                  // pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                  title="Please enter a valid email address."
                />
              </Box>

              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="input-wrapper"
              >
                <SubjectIcon className="input-icon" />
                <input
                  type="text"
                  name="user_subject"
                  placeholder={t('contact_us.subject')}
                />
              </Box>

              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="input-wrapper"
              >
                <ChatIcon className="input-icon" />
                <textarea
                  rows="5"
                  name="user_message"
                  placeholder={t('contact_us.message')}
                  required
                />
              </Box>

              <Box textAlign="center" mt={3}>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  className="submit-button"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      {t('contact.sending')} <CircularProgress size={20} style={{ marginLeft: '10px' }} />
                    </>
                  ) : (
                    t('contact_us.submit')
                  )}
                </Button>
              </Box>
            </form>

            {/* Social Icons at the Bottom of the Form */}
            <Box className="social-links-box" display="flex" justifyContent="center" mt={2}>
              <IconButton
                component="a"
                href="https://www.linkedin.com/company/cyborg-it-l%C3%B6sungen/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="LinkedIn"
              >
                <LinkedInIcon fontSize="large" color="primary" />
              </IconButton>
              <IconButton
                component="a"
                href="https://wa.me/995598707973"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon fontSize="large" style={{ color: '#25D366' }} />
              </IconButton>
            </Box>
          </Paper>

          {/* Show status message below the form */}
          {status && (
            <Typography
              variant="body1"
              align="center"
              style={{ marginTop: '1rem' }}
              className={`status-message ${isSuccess ? 'success' : 'error'}`}
            >
              {status}
            </Typography>
          )}
        </motion.section>
      </Container>

      {/* Additional Info or Map Section */}
      <Container maxWidth="lg">
        <motion.section
          className="additional-info-section"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          {/* ...additional content... */}
        </motion.section>
      </Container>
    </Layout>
  );

};
export default ContactUs;
