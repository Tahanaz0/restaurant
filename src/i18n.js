import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation files
import en from './locales/en/translation.json';
import ar from './locales/ar/translation.json';
import he from './locales/he/translation.json';

// the translations
const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
  he: {
    translation: he,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en', // language to use
    fallbackLng: 'en', // use en if detected lng is not available

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
