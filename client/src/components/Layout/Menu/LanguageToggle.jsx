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
    // On mount, check if a language cookie exists
    const savedLanguage = Cookies.get("language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    } else {
      // Default to Norwegian if no language cookie is found
      i18n.changeLanguage("no");
    }
  }, [i18n]);

  /**
   * Toggles the language between Norwegian and English.
   * If the user has accepted cookies, the selected language is saved in a cookie.
   */
  const toggleLanguage = useCallback(() => {
    const newLanguage = i18n.language === "no" ? "en" : "no";
    i18n.changeLanguage(newLanguage);

    // Check if cookies have been accepted before setting the language cookie
    const consent = Cookies.get("cookieConsent");
    if (consent === "true") {
      Cookies.set("language", newLanguage, {
        expires: 365,
        secure: true,
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