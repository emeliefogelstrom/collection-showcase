import React from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { FooterMessage, FooterLinks } from "./FooterComponents"; // Importera de nya komponenterna

// Styled components
const RootFooter = styled("footer")({
  flexGrow: 1,
  backgroundColor: "black",
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "200px",
});

const FooterDivider = styled("hr")({
  borderColor: "white",
  width: "80%",
  margin: "1rem 0",
});

// Footer component
function Footer() {
  return (
    <RootFooter>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <FooterMessage />
        </Grid>
        <Grid item xs={12}>
          <FooterDivider />
        </Grid>
        <Grid item xs={12}>
          <FooterLinks />
        </Grid>
      </Grid>
    </RootFooter>
  );
}

export default Footer;
