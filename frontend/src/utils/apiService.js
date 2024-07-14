// src/apiService.js
import axiosInstance from "./axiosInstance";

export const checkAuth = async () => {
  try {
    const response = await axiosInstance.get("/auth/check", {
      withCredentials: true,
    });
    return response.data.isAuthenticated;
  } catch (error) {
    return false;
  }
};
export const login = async (username, password) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const register = async (firstname, lastname, username, password) => {
  try {
    const response = await axiosInstance.post("/auth/register", {
      firstname,
      lastname,
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const updatePreference = async (colorPreference) => {
  try {
    const response = await axiosInstance.put("/user/preference", {
      colorPreference,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating color preference:", error);
    throw error;
  }
};

// Add more API methods as needed
