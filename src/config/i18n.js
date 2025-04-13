// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Konfigurimi i i18next
i18n
  .use(LanguageDetector) // për të detektuar gjuhën e përdoruesit
  .use(initReactI18next) // për t'i lidhur me React
  .init({
    resources: {
      en: {
        translation: {
          home: "Home",
          catalog: "Catalog",
          about: "About Us",
          contact: "Contact",
          login: "Login",
          logout: "Logout",
          changeLanguage: "Change Language",
        },
      },
      sq: {
        translation: {
          home: "Krye",
          catalog: "Katalogu",
          about: "Rreth Nesh",
          contact: "Kontaktoni",
          login: "Kyçu",
          logout: "Dil",
          changeLanguage: "Ndrysho Gjuhën",
        },
      },
    },
    fallbackLng: "sq", // Gjuha që do të përdoret nëse gjuha e detektuar nuk ekziston
    interpolation: {
      escapeValue: false, // Nuk ka nevojë për sigurimin e XSS për këtë rast
    },
  });

export default i18n;
