import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import SearchIcon from "@mui/icons-material/Search";

// Root-styling för Header
export const Root = styled("div")(({ theme }) => ({
  flexGrow: 1,
  position: "relative",
  zIndex: 1000,
}));

// AppBar-styling med dynamisk bakgrundsfärg
export const AppBarStyled = styled(AppBar)(({ location }) => ({
  backgroundColor: location.pathname === "/" ? "transparent" : "#475569",
  transition: "background-color 0.3s ease",
}));

// Toolbar-styling med flexbox
export const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const DialogContentStyled = styled(DialogContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(2),
}));

// Wrapper för SearchBar och LanguageToggle
export const SearchLanguageWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "16px",
  paddingRight: "50px", // default för desktop
  [theme.breakpoints.down("sm")]: {
    paddingRight: 0, // tar bort på små skärmar
  },
}));

export const MobileSearchIconStyled = styled(SearchIcon)`
  color: #ffffff; /* Vit färg */
`;

// Wrapper för mobil sökikon
export const MobileSearchIconWrapper = styled("div")(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

// Dialog för mobil sökning
export const DialogStyled = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    background: "transparent",
  },
}));

export const SearchWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "transparent",
  borderRadius: "4px",
  padding: "2px 8px",
  border: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down("sm")]: {
    display: "none", // hide on smaller devices
  },
}));

export const SearchIconWrapper = styled("div")({
  padding: "8px",
});

export const SearchInput = styled(InputBase)(({ theme }) => ({
  marginLeft: "8px",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: "8px",
    borderRadius: "4px",
    backgroundColor: theme.palette.background.default,
  },
}));
