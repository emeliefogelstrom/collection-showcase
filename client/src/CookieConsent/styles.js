import { styled } from "@mui/material/styles";

const SnackbarStyled = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  boxShadow: theme.shadows[3],
  color: theme.palette.text.primary,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export default SnackbarStyled;
