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

// Configure i18next
i18n
  .use(LanguageDetector) // Use the language detector
  .use(initReactI18next)  // Connect i18n to React
  .init({
    resources,
    fallbackLng: 'de', // If no match is found, use German as default
    detection: {
      order: ['querystring', 'localStorage', 'navigator'], // Priority order
      caches: ['localStorage'], // Cache the detected language in localStorage
    },
    interpolation: {
      escapeValue: false, // React already handles escaping
    },
  });

export default i18n;
