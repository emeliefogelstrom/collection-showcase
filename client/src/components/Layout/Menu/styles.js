import { styled } from "@mui/material/styles"; // Importera styled från MUI

// Stilad knappkomponent
export const Button = styled("button")(({ theme }) => ({
  borderRadius: theme.spacing(2),
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(1, 2),
  backgroundColor: theme.palette.primary.light,
  transition: "background-color 0.3s",
  "&:focus": {
    backgroundColor: theme.palette.primary.light, // Återgå till ljus färg vid fokus
    outline: "none", // Ta bort standardfokusram
  },
  "&:active": {
    backgroundColor: theme.palette.primary.main, // Färg vid klick
  },
}));

// Stilad container för huvudmenyn
export const MainMenuContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexFlow: "column wrap",
  maxHeight: 500,
  overflow: "auto",
}));

// Stilad huvudmenyobjekt
export const MainMenuItem = styled("div")(({ theme }) => ({
  fontSize: "1rem",
  paddingTop: 1,
  paddingBottom: 1,
}));

// Stilad undermenyobjekt
export const SubMenuItem = styled("div")(({ theme }) => ({
  fontSize: "0.2rem",
  paddingTop: 1,
  paddingBottom: 1,
  paddingLeft: theme.spacing(3),
}));

// Stilad knapp för att lägga till en kategori
export const AddCategoryButton = styled("button")(({ theme }) => ({
  paddingTop: 2,
  paddingBottom: 1,
  paddingLeft: theme.spacing(3),
}));

// Stilad stängknapp för menyn
export const CloseMenuButton = styled("button")(({ theme }) => ({
  alignSelf: "flex-start",
  margin: theme.spacing(2),
}));
