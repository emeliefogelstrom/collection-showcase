import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Soccer3 from "../../../images/soccer3.png";

// Styled component for the image section
const ImageContainer = styled("div")(({ theme }) => ({
  flex: 1,
  position: "relative",
  marginBottom: theme.spacing(2),
}));

const Image = styled("img")({
  marginTop: "5rem",
  marginLeft: "7.5rem",
  width: "80%",
  height: "auto",
  objectFit: "cover",
  borderRadius: 0,
});

// Styled component for the text section
const TextContainer = styled("div")(({ theme }) => ({
  flex: 1,
  maxWidth: "75%",
  padding: theme.spacing(2),
  margin: "5rem",
  color: "white",
}));

const ButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  marginTop: "1rem",
});

const ReadMoreButton = styled(Button)(({ theme }) => ({
  color: "white",
  borderColor: "white",
  "&:hover": {
    color: "black",
    backgroundColor: "white",
  },
}));

/**
 * Welcome component serves as a greeting or introductory section of the application.
 * It may include a welcome message, application features, or a call to action.
 *
 * @returns {JSX.Element} The rendered Welcome component.
 */
const Welcome = () => {
  return (
    <Grid container spacing={3} sx={{ flexGrow: 1, backgroundColor: "black" }}>
      {/* Left side */}
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <ImageContainer>
          <Image src={Soccer3} alt="Soccer Image" />
        </ImageContainer>
      </Grid>

      {/* Right side */}
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <TextContainer>
          <Typography variant="h4" gutterBottom>
            Welcome
          </Typography>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
            quis nostrud exercitation ullamco laboris nisi ut
          </Typography>
          <ButtonContainer>
            <ReadMoreButton variant="outlined" color="primary">
              Read more
            </ReadMoreButton>
          </ButtonContainer>
        </TextContainer>
      </Grid>
    </Grid>
  );
};

export default Welcome;
