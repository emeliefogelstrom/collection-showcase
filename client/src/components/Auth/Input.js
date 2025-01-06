import React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

/**
 * Input component used for authentication forms.
 * Displays a text input field with optional password visibility toggle.
 *
 * @param {string} name - The name of the input field.
 * @param {Function} handleChange - Function to handle changes in the input field.
 * @param {string} label - Label for the input field.
 * @param {string} type - The type of input field (e.g., "text", "password").
 * @param {Function} handleShowPassword - Function to toggle password visibility.
 * @param {boolean} half - Determines the width of the input field (full width or half width).
 * @returns {JSX.Element} - Rendered Input component.
 */
const Input = ({
  name,
  handleChange,
  label,
  type,
  handleShowPassword,
  half,
}) => (
  <Grid item xs={12} sm={half ? 6 : 12} component={"div"}>
    <TextField
      name={name}
      onChange={handleChange}
      variant="outlined"
      required
      fullWidth
      label={label}
      type={type}
      InputProps={
        name === "password" && {
          endAdornment: (
            <InputAdornment position="end" component={"div"}>
              <IconButton onClick={handleShowPassword}>
                {type === "password" ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }
      }
    />
  </Grid>
);

export default Input;
