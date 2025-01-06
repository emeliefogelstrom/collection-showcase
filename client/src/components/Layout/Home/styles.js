import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Soccer2 from "../../../images/soccer2.jpg";

// Styled Components
export const OuterContainer = styled(Box)({
  flexGrow: 1,
  backgroundColor: "black",
});

export const ImageContainer = styled(Box)({
  flex: 1,
  position: "relative",
  marginBottom: "16px", // theme.spacing(2) motsvarar 16px
});

export const StyledImage = styled("img")({
  marginTop: "5rem",
  marginLeft: "7.5rem",
  width: "80%",
  height: "auto",
  objectFit: "cover",
  borderRadius: 0,
});

export const StyledImageAbout = styled("img")({
  marginTop: "5rem",
  marginLeft: "0.5rem",
  width: "80%",
  height: "auto",
  objectFit: "cover",
  borderRadius: 0,
});

export const ButtonContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  marginTop: "16px", // theme.spacing(2)
});

export const ReadMoreButton = styled(Button)(({ theme }) => ({
  color: "white",
  borderColor: "white",
  "&:hover": {
    color: "black",
    backgroundColor: "white",
  },
}));

export const TextContainer = styled(Box)({
  flex: 1,
  maxWidth: "75%",
  padding: "16px", // theme.spacing(2)
  margin: "5rem",
  color: "white",
});

export const TextContainerAbout = styled(Box)({
  flex: 1,
  maxWidth: "75%",
  padding: "16px", // theme.spacing(2)
  marginTop: "5rem",
  marginLeft: "6.5rem",
  color: "white",
});

export const RelativeContainer = styled(Box)({
  position: "relative",
});

export const HeroImage = styled(Box)({
  backgroundImage: `url(${Soccer2})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
  width: "100%",
  height: "100vh",
});

export const BackgroundImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});
