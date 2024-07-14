import React, { createContext, useState, useEffect } from "react";
import {
  login as loginUser,
  register as registerUser,
  checkAuth as checkAuthentication,
  updatePreference as updateColorPreference,
} from "../utils/apiService";
import axiosInstance from "../utils/axiosInstance"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userPreference, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const colorPreference = localStorage.getItem("colorPreference");
        if (colorPreference) {
          setUser({ colorPreference });
        }
      } catch (error) {
        handleError("Failed to fetch user");
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
    checkAuthenticationStatus(); // eslint-disable-next-line
  }, []);
  const handleError = (error) => {
    console.error(error);
    setError(error || "Something went wrong");
  };
  const checkAuthenticationStatus = async () => {
    try {
      const isAuthenticated = await checkAuthentication();
      setIsAuthenticated(isAuthenticated);
    } catch (error) {
      handleError("Error checking authentication status");
      console.error("Error checking authentication status:", error);
    }
  };
  const login = async (username, password) => {
    try {
      const data = await loginUser(username, password);
      const { colorPreference } = data;
      localStorage.setItem("colorPreference", colorPreference);
      setUser({ colorPreference });
      checkAuthenticationStatus();
    } catch (error) {
      handleError("Login failed");
      throw new Error("Login failed");
    }
  };

  const register = async (firstname, lastname, username, password) => {
    try {
      await registerUser(firstname, lastname, username, password);
      await login(username, password);
    } catch (error) {
      handleError("Registration failed");
      throw new Error("Registration failed");
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      localStorage.removeItem("colorPreference");
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      handleError("Error logging out");
      console.error("Error logging out:", error);
    }
  };

  const updatePreference = async (colorPreference) => {
    try {
      await updateColorPreference(colorPreference);
      setUser({ colorPreference });
      localStorage.setItem("colorPreference", colorPreference);
    } catch (error) {
      handleError("Error updating color preference");
      console.error("Error updating color preference:", error);
      throw new Error("Failed to update color preference");
    }
  };
  return (
    <AuthContext.Provider
      value={{
        userPreference,
        login,
        register,
        logout,
        checkAuthenticationStatus,
        isAuthenticated,
        updatePreference,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
