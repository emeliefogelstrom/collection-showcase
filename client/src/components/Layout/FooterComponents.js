import React from "react";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

// Styled components
const FooterMessageText = styled(Typography)(({ theme }) => ({
  color: "white",
  textAlign: "center",
  margin: theme.spacing(2, 0),
}));

const FooterLinksText = styled(Typography)(({ theme }) => ({
  color: "white",
  textAlign: "center",
  fontSize: "0.875rem",
  marginTop: theme.spacing(1),
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: "#FFF",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
}));

/**
 * FooterMessage component displays a message in the footer section
 * of the application. It uses internationalization for translating
 * the message based on the user's selected language.
 *
 * @returns {JSX.Element} The rendered FooterMessage component.
 */
const FooterMessage = () => {
  const { t } = useTranslation();
  return (
    <FooterMessageText variant="h6" component="h6">
      {t("welcome_message")}
    </FooterMessageText>
  );
};

/**
 * FooterLinks component renders a set of links in the footer section
 * of the application. It provides users with navigation options
 * and important information related to the website.
 *
 * @returns {JSX.Element} The rendered FooterLinks component.
 */
const FooterLinks = () => {
  return (
    <FooterLinksText variant="body2" component="h2">
      &copy;{new Date().getFullYear()}{" "}
      <FooterLink to="https://www.limestoneweb.se">LIMESTONEWEB.SE</FooterLink>{" "}
      | All rights reserved | Terms Of Service | Privacy |
    </FooterLinksText>
  );
};

export { FooterMessage, FooterLinks };
