import { styled } from "@mui/system"; // Importera styled från MUI
import Typography from "@mui/material/Typography";

export const Card = styled("div")(({ theme }) => ({
  opacity: 0.8,
  "&:hover": {
    opacity: 1,
  },
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "auto",
  position: "relative",
}));

export const StyledCardMedia = styled("img")({
  width: "100%",
  height: "450px",
  objectFit: "cover",
  objectPosition: "bottom",
});

export const CardActions = styled("div")({
  padding: "0 16px 8px 16px",
  display: "flex",
  justifyContent: "space-between",
});

export const TextActions = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

export const Name = styled("h2")({
  paddingLeft: "1rem",
});

export const Club = styled(Typography)({
  paddingLeft: "1rem",
  textAlign: "left", // Texten justeras till vänster
  color: "gray",
});

export const Year = styled(Typography)({
  paddingRight: "1rem",
  textAlign: "right", // Texten justeras till höger
  color: "gray",
});

export const Media = styled("div")({
  height: 140,
  paddingTop: "56.25%", // 16:9
  marginTop: "30px",
});

export const Overlay = styled("div")({
  position: "absolute",
  display: "flex",
  justifyContent: "space-between",
  bottom: "40px",
  left: "20px",
  color: "black",
});
