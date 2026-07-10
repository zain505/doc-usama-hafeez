"use client";

import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/lib/i18n";

const normalizeLanguage = (language) => (language?.startsWith("ur") ? "ur" : "en");

export default function I18nProvider({ children }) {
  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("dental-square-language");

    if (savedLanguage === "ur" || savedLanguage === "en") {
      i18n.changeLanguage(savedLanguage);
    }

    const applyDirection = (language) => {
      const nextLanguage = normalizeLanguage(language);
      document.documentElement.lang = nextLanguage;
      document.documentElement.dir = nextLanguage === "ur" ? "rtl" : "ltr";
    };

    applyDirection(i18n.language);
    i18n.on("languageChanged", applyDirection);

    return () => {
      i18n.off("languageChanged", applyDirection);
    };
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
