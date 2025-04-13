// LanguageSwitcher.js
import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "sq" ? "en" : "sq";
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-4 py-2 border rounded-lg hover:bg-gray-200"
    >
      {i18n.language === "sq" ? "EN" : "AL"}
    </button>
  );
};

export default LanguageSwitcher;
