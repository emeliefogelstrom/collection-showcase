import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Soccer1 from "../../../images/soccer1.png";

// Styled Components
const OuterContainer = styled(Grid)({
  flexGrow: 1,
  backgroundColor: "black",
});

const TextContainer = styled(Grid)(({ theme }) => ({
  flex: 1,
  maxWidth: "75%",
  padding: theme.spacing(2),
  margin: "5rem",
  color: "white",
}));

const ImageContainer = styled("div")({
  flex: 1,
  position: "relative",
  marginBottom: "16px", // theme.spacing(2)
});

const StyledImage = styled("img")({
  marginTop: "5rem",
  marginLeft: "0.5rem",
  width: "80%",
  height: "auto",
  objectFit: "cover",
  borderRadius: 0,
});

const ReadMoreButton = styled(Button)(({ theme }) => ({
  color: "white",
  borderColor: "white",
  "&:hover": {
    color: "black",
    backgroundColor: "white",
  },
}));

// Separate component for the image section
const ImageSection = () => (
  <Grid item xs={12}>
    <ImageContainer>
      <StyledImage src={Soccer1} alt="Bild" />
    </ImageContainer>
  </Grid>
);

/**
 * About component displays information about the application or organization.
 * It may include details such as mission, vision, values, and key features.
 *
 * @returns {JSX.Element} The rendered About component.
 */
const About = () => {
  return (
    <OuterContainer container spacing={3}>
      {/* Vänster sida */}
      <TextContainer item xs={12} sm={12} md={6} lg={6}>
        <Typography variant="h4" gutterBottom>
          About
        </Typography>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
          quis nostrud exercitation ullamco laboris nisi ut.
        </Typography>
        <ReadMoreButton variant="outlined" color="primary">
          Read more
        </ReadMoreButton>
      </TextContainer>

      {/* Höger sida med separat bildsektion */}
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <ImageSection />
      </Grid>
    </OuterContainer>
  );
};

export default About;
