import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { AUTH } from "../../constants/actionTypes.js";
import { validateToken } from "../../actions/auth.jsx";
import { signIn, signOut } from "../../api/index.jsx";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get("jwtToken");
      if (token) {
        try {
          const userData = await validateToken();
          if (userData) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Error validating token:", error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (formData, navigate, dispatch) => {
    try {
      const { data } = await signIn(formData);
      Cookies.set("jwtToken", data.token, { expires: 1 });
      dispatch({ type: AUTH, data });
      navigate("/");
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = async () => {
    await signOut();
    Cookies.remove("jwtToken");
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
