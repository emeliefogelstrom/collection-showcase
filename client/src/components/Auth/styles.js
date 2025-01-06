import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export const StyledContainer = styled(Container)(({ theme }) => ({
  width: "100%",
}));

// Styled components
export const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(2),
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
}));

export const FieldsWrapper = styled(Box)(() => ({
  marginTop: 30,
}));

export const StyledForm = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(3),
}));
