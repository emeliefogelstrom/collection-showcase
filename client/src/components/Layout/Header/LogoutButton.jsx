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
  return (
    <button
      onClick={handleLogout}
      className="shadow-[inset_0_0_0_2px_#616467] text-slate-400 px-4 py-2 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-slate-800 hover:text-white dark:text-neutral-200 transition duration-200 max-w-full truncate"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
