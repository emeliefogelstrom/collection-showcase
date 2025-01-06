import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles"; // Importera styled från MUI

// Stilad komponent för knappen
const LogoutButtonStyled = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.contrastText, // Huvudfärg för texten
  backgroundColor: theme.palette.primary.light, // Bakgrundsfärg
  border: "1px solid", // Gräns för knappen
  borderColor: theme.palette.text.primary, // Gränsfärgen matchar texten
  "&:hover": {
    backgroundColor: theme.palette.action.hover, // Hover effekt
  },
}));

/**
 * LogoutButton component renders a button that triggers the logout functionality when clicked.
 *
 * @param {Function} handleLogout - Function to be called when the user clicks the button to log out.
 * @returns {JSX.Element} The rendered LogoutButton component.
 */
const LogoutButton = ({ handleLogout }) => {
  return <LogoutButtonStyled onClick={handleLogout}>Logout</LogoutButtonStyled>;
};

export default LogoutButton;
