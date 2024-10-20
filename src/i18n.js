// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslations from './locales/en/translation.json';
import deTranslations from './locales/de/translation.json';

// Language resources
const resources = {
  en: enTranslations,
  de: deTranslations,
};

// Configure i18n
i18n
  .use(LanguageDetector) // Detect language from URL or browser settings
  .use(initReactI18next)  // Initialize react-i18next
  .init({
    resources,
    fallbackLng: 'de',  // Default language
    detection: {
      order: ['path', 'localStorage', 'navigator'], // Detect language from URL first
      caches: ['localStorage'], // Cache detected language in localStorage
    },
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
