import React from "react";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles"; // Importera styled från MUI

// Stilad Title-komponent
const StyledTitle = styled(Typography)(({ theme }) => ({
  color: "inherit",
  textDecoration: "none", // Se till att länken inte har någon undermarkering
  "&:hover": {
    textDecoration: "underline", // Understryk titeln vid hover
  },
}));

/**
 * Title component renders the application's main title, styled as a clickable link that navigates to the homepage.
 *
 * @returns {JSX.Element} The rendered Title component.
 */
const Title = () => {
  return (
    <StyledTitle variant="h6" component={Link} to="./../">
      Norsk Fotballdraktmuseum
    </StyledTitle>
  );
};

export default Title;
