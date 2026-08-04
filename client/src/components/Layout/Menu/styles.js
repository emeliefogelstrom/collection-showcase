import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

// Styled button component
export const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(1, 2),
  backgroundColor: theme.palette.primary.light,
  transition: "background-color 0.3s",
  "&:focus": {
    backgroundColor: theme.palette.primary.light,
    outline: "none",
  },
  "&:active": {
    backgroundColor: theme.palette.primary.main,
  },
}));

// Styled head menu container
export const MainMenuContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: theme.spacing(2),
  justifyContent: "flex-start",
  alignItems: "flex-start",
  width: "100%",
}));

// Styled head menu item
export const MainMenuItem = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: "1rem",
  paddingLeft: theme.spacing(1),
  minWidth: "150px",
}));

// Styled sub menu item
export const SubMenuItem = styled("div")(({ theme }) => ({
  fontSize: "0.2rem",
  display: "flex",
  color: "#264554",
  paddingLeft: theme.spacing(3),
  cursor: "pointer",
}));

// Styled button for adding a category
export const AddCategoryButton = styled(Button)(({ theme }) => ({
  paddingTop: 2,
  paddingBottom: 1,
  paddingLeft: theme.spacing(3),
}));

// Styled close button for menu
export const CloseMenuButton = styled(Button)(({ theme }) => ({
  alignSelf: "flex-start",
  margin: theme.spacing(2),
}));
