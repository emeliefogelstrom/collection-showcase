import React, { useCallback, useEffect } from "react";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { styled } from "@mui/material/styles";

// Skapa en stilad knappkomponent
const LanguageButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(1, 2),
  backgroundColor: theme.palette.primary.light,
  transition: "background-color 0.3s",
  "&:focus": {
    backgroundColor: theme.palette.primary.light,
    outline: "none",
  },
  "&:active": {
    backgroundColor: theme.palette.primary.main,
  },
}));

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
    <LanguageButton onClick={toggleLanguage}>
      {i18n.language === "no" ? "En" : "No"}
    </LanguageButton>
  );
};

export default LanguageToggle;
