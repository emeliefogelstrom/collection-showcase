import { styled } from "@mui/system"; // Importera styled från MUI
import Typography from "@mui/material/Typography";

export const Card = styled("div")(({ theme }) => ({
  opacity: 0.8,
  "&:hover": {
    opacity: 1,
  },
  display: "flex",
  flexDirection: "column", // Vertikal layout
  justifyContent: "flex-start",
  alignItems: "center", // Centrerar texten och bilden horisontellt
  borderRadius: "15px",
  height: "100%",
  position: "relative",
  padding: "16px", // Lägg till padding för att få mer utrymme
  gap: "8px", // Ger avstånd mellan bild och text
}));

export const CardAction = styled("span")({
  display: "block",
  textAlign: "initial",
});

export const CardActions = styled("div")({
  padding: "0 16px 8px 16px",
  display: "flex",
  justifyContent: "space-between",
});

export const Name = styled(Typography)({
  margin: "0", // Ingen extra marginal
  fontWeight: "bold",
  textAlign: "center", // Centrerar texten under bilden
});

export const Club = styled(Typography)({
  margin: "0",
  textAlign: "center",
  color: "gray", // Gör klubben mer subtil
});

export const Media = styled("div")({
  height: 140,
  paddingTop: "56.25%", // 16:9
  marginTop: "30px",
});

export const Overlay = styled("div")({
  position: "absolute",
  bottom: "40px",
  right: "20px",
  color: "black",
});
