import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Input from "./Input";

/**
 * LoginForm component renders a form for user authentication.
 * It includes input fields for the username and password,
 * and a button to submit the form. The component handles
 * password visibility toggling and loading state while
 * signing in.
 *
 * @param {Function} handleChange - Function to handle input changes.
 * @param {Function} handleSignIn - Function to handle form submission.
 * @param {boolean} showPassword - Determines if the password should be visible.
 * @param {Function} handleShowPassword - Function to toggle password visibility.
 * @param {boolean} loading - Indicates if the form is in a loading state.
 *
 * @returns {JSX.Element} The rendered LoginForm component.
 */
const LoginForm = ({
  handleChange,
  handleSignIn,
  showPassword,
  handleShowPassword,
  loading,
}) => {
  return (
    <form onSubmit={handleSignIn}>
      <Grid container spacing={2}>
        <Input name="username" label="Username" handleChange={handleChange} />
        <Input
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          handleChange={handleChange}
          handleShowPassword={handleShowPassword}
        />
        <Grid item xs={12}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            style={{ marginBottom: 20 }}
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign in"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginForm;
