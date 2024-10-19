// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import translationEN from './locales/en/translation.json';
import translationDE from './locales/de/translation.json';

// Define language resources
const resources = {
  en: { translation: translationEN },
  de: { translation: translationDE },
};

i18n
  .use(LanguageDetector) // Detect language from browser or URL
  .use(initReactI18next)  // Connect with React
  .init({
    resources,
    fallbackLng: 'de', // Default to German if no language is detected
    detection: {
      order: ['querystring', 'localStorage', 'navigator'], // Language detection order
      caches: ['localStorage'], // Cache selected language in localStorage
    },
    interpolation: {
      escapeValue: false, // React handles escaping by default
    },
  });

export default i18n;
