import React, { useCallback, useEffect } from "react";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { styled } from "@mui/material/styles";

/**
 * LanguageToggle component allows users to switch between different languages.
 *
 * @returns {JSX.Element} The rendered LanguageToggle component.
 */
const LanguageToggle = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // När komponenten monteras, kontrollera om en språk-cookie finns
    const savedLanguage = Cookies.get("language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    } else {
      // Standard till norska om ingen språk-cookie hittas
      i18n.changeLanguage("no");
    }
  }, [i18n]);

  /**
   * Växlar språket mellan norska och engelska.
   * Om användaren har accepterat cookies, sparas det valda språket i en cookie.
   */
  const toggleLanguage = useCallback(() => {
    const newLanguage = i18n.language === "no" ? "en" : "no";
    i18n.changeLanguage(newLanguage);

    // Kontrollera om cookies har accepterats innan språk-cookien sätts
    const consent = Cookies.get("cookieConsent");
    if (consent === "true") {
      Cookies.set("language", newLanguage, {
        expires: 365,
        secure: true,
        httpOnly: true,
      });
    }
  }, [i18n]);

  return (
    <button
      onClick={toggleLanguage}
      className="shadow-[inset_0_0_0_2px_#616467] text-slate-400 px-4 py-2 rounded-full tracking-widest uppercase font-bold bg-slate-900 hover:bg-slate-800 hover:text-white dark:text-neutral-200 transition duration-200"
    >
      {i18n.language === "no" ? "En" : "No"}
    </button>
  );
};

export default LanguageToggle;
