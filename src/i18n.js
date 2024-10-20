// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enTranslations from './locales/en/translation.json';
import deTranslations from './locales/de/translation.json';

// Language resources
const resources = {
  en: {
    translation: enTranslations,
  },
  de: {
    translation: deTranslations,
  },
};

// Configure i18n
i18n
  .use(initReactI18next) // Initialize react-i18next
  .init({
    resources,
    fallbackLng: 'de', // Default language
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
