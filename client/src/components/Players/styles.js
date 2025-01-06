//styles.js - Styles for /Players/Players.js
import { styled } from "@mui/system"; // Importera styled från MUI

export const Root = styled("div")({
  marginTop: "2rem",
  marginBottom: "2rem",
});

export const AppBar = styled("div")(({ theme }) => ({
  borderRadius: 15,
  margin: "30px 0",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
}));

export const Heading = styled("h1")({
  color: "rgba(0,183,255, 1)",
});

export const Image = styled("img")({
  marginLeft: "15px",
});

export const Media = styled("div")({
  height: 140,
  paddingTop: "56.25%", // 16:9 aspect ratio
  marginTop: "30px",
});

export const CloseButton = styled("button")(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1),
  right: theme.spacing(1),
}));
