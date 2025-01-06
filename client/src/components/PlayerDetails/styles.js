import { styled } from "@mui/system";
import { Paper, CardMedia, Dialog, IconButton, Grid } from "@mui/material";

export const CircularPaper = styled(Paper)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  borderRadius: "15px",
  height: "39vh",
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 0,
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(2),
}));

export const StyledPaperGrid = styled(Grid)(({ theme }) => ({
  margin: theme.spacing(4),
  alignItems: "center",
  justifyContent: "space-between",
}));

export const StyledCardMediaGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export const StyledCardMedia = styled(CardMedia)(() => ({
  objectFit: "cover",
  maxWidth: 300,
}));

export const StyledImageContainerGrid = styled(Grid)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const StyledImageContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column", // Standard: vertical layout
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  overflowY: "auto",
  paddingRight: 16,
  [theme.breakpoints.down("sm")]: {
    flexDirection: "row", // Horizontal layout on medium screens
    width: "100%",
    height: "40%",
    maxHeight: "150px",
    paddingTop: theme.spacing(1),
  },
  [theme.breakpoints.up("md")]: {
    height: "auto",
    maxHeight: "350px",
    maxWidth: "200px",
  },
}));

export const StyledImage = styled("img")(({ theme }) => ({
  width: "100%",
  objectFit: "cover",
  objectPosition: "center",
  paddingBottom: theme.spacing(1),
  opacity: 0.5,
  transition: "opacity 0.3s ease",
  cursor: "pointer",
  [theme.breakpoints.down("sm")]: {
    paddingTop: theme.spacing(1),
    margin: "0 4px",
    width: "45%",
  },
  "&:hover": {
    opacity: 1,
  },

  [theme.breakpoints.up("sm")]: {
    height: "40%",
    maxHeight: "350px",
    maxWidth: "200px",
  },
}));

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    width: "300px",
    height: "auto",
    maxWidth: "none",
    margin: 0,
    padding: 0,
    border: "none",
    objectFit: "contain",
  },
  [theme.breakpoints.down("md")]: {
    width: "auto",
    height: "100%",
  },
}));

export const StyledDialogContent = styled("div")(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  overflow: "hidden",
}));

export const StyledIconButtonClose = styled(IconButton)(() => ({
  position: "absolute",
  top: 10,
  right: 10,
  zIndex: 10,
}));

export const StyledIconButtonRight = styled(IconButton)(() => ({
  position: "absolute",
  right: 10,
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 10,
}));

export const StyledIconButtonLeft = styled(IconButton)(() => ({
  position: "absolute",
  left: 10,
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 10,
}));
