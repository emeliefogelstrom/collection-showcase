// PageNotFound.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * PageNotFound component to handle non-existent routes.
 * Redirects the user to a 404 page and displays a "Page Not Found" message.
 *
 * @component
 */
const PageNotFound = () => {
  const navigate = useNavigate();

  // Automatically redirects to the /404 route when the component is mounted
  useEffect(() => {
    navigate("/404", { replace: true });
  }, [navigate]);

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

export default PageNotFound;
