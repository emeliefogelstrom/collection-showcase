import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer";
import Container from "@mui/material/Container";
import { useAuth } from "../Auth/AuthContext";
import { styled } from "@mui/material/styles"; // Importera styled från MUI

// Stilad rootHeader-komponent
const RootHeader = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh", // Se till att hela sidan täcks
}));

// Stilad container-komponent
const StyledContainer = styled(Container)(({ theme }) => ({
  flex: 1, // Gör så att innehållet fyller den lediga platsen
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

/**
 * Main component serves as the primary layout structure for the application, including the header, footer, and the main content area.
 *
 * @param {React.ReactNode} children - The child components to be displayed within the main content area.
 * @returns {JSX.Element} The rendered Main layout component.
 */
const Main = ({ children }) => {
  const { isAuthenticated, logout, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <RootHeader>
      <Header isAuthenticated={isAuthenticated} logout={logout} />
      <StyledContainer>{children}</StyledContainer>
      <Footer />
    </RootHeader>
  );
};

export default Main;
