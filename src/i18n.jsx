// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enTranslation from './locales/en/translation.json';
import koTranslation from './locales/ko/translation.json';
import zhTranslation from './locales/zh/translation.json';
import jaTranslation from './locales/ja/translation.json';

// Retrieve the saved language from localStorage or default to 'ko'
const savedLanguage = localStorage.getItem('language') || 'ko';

i18n
    .use(initReactI18next) // Passes i18n down to react-i18next
    .init({
        resources: {
            en: { translation: enTranslation },
            ko: { translation: koTranslation },
            zh: { translation: zhTranslation },
            ja: { translation: jaTranslation },
        },
        lng: savedLanguage, // Sets the initial language
        fallbackLng: 'en', // Fallback language if the current language translation is missing
        interpolation: {
            escapeValue: false, // React already protects from XSS
        },
    });

export default i18n;
