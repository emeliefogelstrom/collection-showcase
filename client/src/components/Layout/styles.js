import { styled } from "@mui/material/styles";
import { alpha } from "@mui/system";

// Root component styles
export const Root = styled("div")({
  flexGrow: 1,
});

// Background styles
export const TransparentBackground = styled("div")({
  backgroundColor: "transparent",
});

export const BlackBackground = styled("div")({
  backgroundColor: "black",
});

// Header styles
export const Title = styled("div")(({ theme }) => ({
  flexGrow: 1,
  textDecoration: "none",
}));

export const Language = styled("div")({
  paddingLeft: 30,
});

export const AppBar = styled("div")(({ theme }) => ({
  position: "relative",
  zIndex: 2,
  backgroundColor: "transparent",
}));

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

export const SearchIcon = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const InputRoot = styled("div")({
  color: "inherit",
});

export const InputInput = styled("input")(({ theme }) => ({
  padding: theme.spacing(1, 1, 1, 0),
  // vertical padding + font size from searchIcon
  paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  transition: theme.transitions.create("width"),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "12ch",
    "&:focus": {
      width: "20ch",
    },
  },
}));

export const LogoutButton = styled("button")(({ theme }) => ({
  backgroundColor: theme.palette.primary.light, // Use the desired color from your theme
}));

// Sidebar styles
export const List = styled("div")({
  width: 250,
});

export const FullList = styled("div")({
  width: "auto",
});

// Hero Section styles
export const HomeContainer = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 0,
  width: "100%",
  height: "100vh",
});

export const Hero = styled("div")({
  display: "flex",
  height: "100vh", // 100% of the viewport height
  overflow: "hidden",
});

export const HeroImage = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  backgroundAttachment: "fixed",
  [theme.breakpoints.up("md")]: {
    display: "block",
  },
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));

export const HeroImagePhone = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  backgroundAttachment: "fixed",

  [theme.breakpoints.up("md")]: {
    display: "none",
  },
  [theme.breakpoints.down("md")]: {
    display: "block",
  },

  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));

export const ContentContainer = styled("div")({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
  color: "white",
});

export const WelcomeText = styled("div")(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

export const ReadMoreButton = styled("button")({
  color: "white",
  borderColor: "white",
  "&:hover": {
    color: "black",
    backgroundColor: "white",
  },
});

// Image Section styles
export const ImagesContainer = styled("div")({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const BottomImage = styled("img")({
  width: "100%",
  height: "auto",
  position: "relative",
  zIndex: 1,
});

export const TopImage = styled("img")({
  width: "75%", // Adjust as needed
  height: "auto",
  position: "absolute",
  top: "25%", // Adjust as needed
  left: "12.5%", // Adjust as needed
  zIndex: 2,
});

// Footer Styles
export const RootFooter = styled("div")({
  flexGrow: 1,
  backgroundColor: "black",
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "200px",
});

export const FooterText = styled("h1")({
  color: "white",
  textAlign: "center",
});

export const Row = styled("div")({});

export const ColSm = styled("div")({
  color: "white",
});

export const Link = styled("a")({
  color: "#FFF",
  textDecoration: "none",
});
