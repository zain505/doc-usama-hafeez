"use client";

import { useTranslation } from "react-i18next";
import styles from "./LanguageSwitcher.module.css";

export default function LanguageSwitcher({ compact = false }) {
  const { i18n } = useTranslation();
  const activeLanguage = i18n.language?.startsWith("ur") ? "ur" : "en";

  const changeLanguage = (language) => {
    window.localStorage.setItem("dental-square-language", language);
    i18n.changeLanguage(language);
  };

  return (
    <div className={`${styles.switcher} ${compact ? styles.compact : ""}`} aria-label="Language switcher">
      <button
        className={activeLanguage === "en" ? styles.active : ""}
        type="button"
        aria-pressed={activeLanguage === "en"}
        onClick={() => changeLanguage("en")}
      >
        ENG
      </button>
      <button
        className={activeLanguage === "ur" ? styles.active : ""}
        type="button"
        aria-pressed={activeLanguage === "ur"}
        onClick={() => changeLanguage("ur")}
      >
        URDU
      </button>
    </div>
  );
}
