import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import AuthContext from "./context/AuthContext";
import { Alert, Stack } from "@mui/material";
function App() {
  const { isAuthenticated, checkAuthenticationStatus, error } =
    useContext(AuthContext);
  const ProtectedRoute = ({ element }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const authenticate = async () => {
        try {
          await checkAuthenticationStatus();
          setIsLoading(false);
        } catch (error) {
          console.error("Authentication check failed:", error);
          setIsLoading(false);
        }
      };
      authenticate();
    }, []);
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return isAuthenticated ? element : <Navigate to="/login" />;
  };
  return (
    <div>
      {error && (
        <Stack
          sx={{ position: "absolute", width: "100%", zIndex: 1 }}
          spacing={2}
        >
          <Alert severity="error">{error}</Alert>
        </Stack>
      )}{" "}
      <Routes>
        <Route path="/" exact element={<ProtectedRoute element={<Home />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
