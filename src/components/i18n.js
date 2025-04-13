// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Properly import the translation JSON files
import enTranslation from "../translations/en/global.json";
import alTranslation from "../translations/sq/global.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    al: { translation: alTranslation },
  },
  lng: "al", // Default language
  fallbackLng: "en", // Fallback language
  interpolation: {
    escapeValue: false, // React already does escaping
  },
});

export default i18n;
