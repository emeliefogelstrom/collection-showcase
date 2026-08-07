import React, { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import Button from "@mui/material/Button";
import SnackBar from "@mui/material/Snackbar";
import SnackbarStyled from "./styles"; // Importera styles från styles-filen

/**
 * CookieConsent component displays a snackbar for cookie consent.
 *
 * @returns {JSX.Element} The rendered CookieConsent component.
 */
const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("cookieConsent");
    if (!consent) {
      setIsVisible(true); // Show snackbar if no consent found
    }
  }, []);

  const handleAccept = useCallback(() => {
    Cookies.set("cookieConsent", "true", {
      expires: 365,
      secure: true,
      httpOnly: true,
    });
    setIsVisible(false);
  }, []);

  const handleDecline = useCallback(() => {
    Cookies.set("cookieConsent", "false", {
      expires: 365,
      secure: true,
      httpOnly: true,
    });
    setIsVisible(false);
  }, []);

  const handleClose = useCallback((event, reason) => {
    if (reason === "clickaway") return; // Prevent closing on clickaway
    setIsVisible(false);
  }, []);

  return (
    <SnackBar
      open={isVisible}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      onClose={handleClose}
    >
      <SnackbarStyled>
        <div>We use cookies to improve your experience. Do you accept?</div>
        <div style={{ marginTop: "10px" }}>
          <Button
            onClick={handleAccept}
            style={{ marginRight: "10px", color: "green" }}
          >
            Accept
          </Button>
          <Button onClick={handleDecline} style={{ color: "red" }}>
            Decline
          </Button>
        </div>
      </SnackbarStyled>
    </SnackBar>
  );
};

export default CookieConsent;
