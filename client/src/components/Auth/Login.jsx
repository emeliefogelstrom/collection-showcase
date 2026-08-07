import React, { useState, useEffect, useRef, useCallback } from "react";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import DOMPurify from "dompurify";
import { useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import LoginForm from "./LoginForm";
import { StyledContainer, StyledPaper, StyledAvatar } from "./styles";

const initialState = { username: "", password: "" };

// Snackbar Component
const AlertSnackbar = ({ open, message, onClose }) => (
  <Snackbar open={open} autoHideDuration={5000} onClose={onClose}>
    <MuiAlert elevation={6} variant="filled" severity="error" onClose={onClose}>
      {message}
    </MuiAlert>
  </Snackbar>
);

/**
 * Login component handles user authentication by providing
 * a login form. It allows users to enter their credentials
 * and navigate to the application upon successful login.
 *
 * @returns {JSX.Element} The rendered Login component.
 */
function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleChange = useCallback(
    (e) => {
      const sanitizedValue = DOMPurify.sanitize(e.target.value);
      setFormData({ ...formData, [e.target.name]: sanitizedValue });
    },
    [formData]
  );

  const handleSignIn = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        await login(formData, navigate, dispatch);
        if (isMounted.current) {
          setLoading(false);
        }
      } catch (error) {
        if (isMounted.current) {
          setLoading(false);
          setSnackbarOpen(true);
          console.error("Login failed:", error.message);
          setSnackbarMessage(error.message || "Login failed");
        }
      }
    },
    [formData, navigate, dispatch, login]
  );

  const handleShowPassword = useCallback(
    () => setShowPassword((prevShowPassword) => !prevShowPassword),
    []
  );

  const handleCloseSnackbar = useCallback(() => {
    setSnackbarOpen(false);
  }, []);

  return (
    <StyledContainer component="main" maxWidth="xs">
      <StyledPaper elevation={10}>
        <StyledAvatar>
          <LockOutlinedIcon />
        </StyledAvatar>
        <Typography variant="h5">Sign In</Typography>
        <LoginForm
          handleChange={handleChange}
          handleSignIn={handleSignIn}
          showPassword={showPassword}
          handleShowPassword={handleShowPassword}
          loading={loading}
        />
        <AlertSnackbar
          open={snackbarOpen}
          message={snackbarMessage}
          onClose={handleCloseSnackbar}
        />
      </StyledPaper>
    </StyledContainer>
  );
}

export default Login;
