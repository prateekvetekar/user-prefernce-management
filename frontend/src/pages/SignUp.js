import React, { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import AuthContext from "../context/AuthContext";

const CustomTextField = styled(TextField)(() => ({
  "& .MuiInputBase-root": {
    "&:hover fieldset": {
      border: "1px solid #000",
    },
    "&.Mui-focused fieldset": {
      border: "1px solid #000",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#000",
    "&.Mui-focused": {
      color: "#000",
    },
  },
}));

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { register, isAuthenticated } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstname) newErrors.firstname = "First name is required";
    if (!formData.lastname) newErrors.lastname = "Last name is required";
    if (!formData.username) {
      newErrors.username = "Email is required";
    } else if (!validateEmail(formData.username)) {
      newErrors.username = "Email is not valid";
    }
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (validateForm()) {
      try {
        await register(
          formData.firstname,
          formData.lastname,
          formData.username,
          formData.password
        );
        navigate("/");
      } catch (error) {
        console.error("Error registering:", error);
      }
    }
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "2px solid black",
          width: 500,
          padding: 4,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#000" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          sx={{
            fontWeight: 600,
            fontFamily: "Inter, sans-serif",
            textTransform: "uppercase",
          }}
        >
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                autoComplete="given-name"
                name="firstname"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={formData.firstname}
                onChange={handleInputChange}
                autoFocus
                error={!!errors.firstname}
                helperText={errors.firstname}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                autoComplete="last-name"
                error={!!errors.lastname}
                helperText={errors.lastname}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                required
                fullWidth
                id="username"
                label="Email Address"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                autoComplete="email"
                error={!!errors.username}
                helperText={errors.username}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                autoComplete="new-password"
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "#000",
              color: "#fff",
              fontFamily: "Inter, sans-serif",
              textTransform: "uppercase",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#000",
              },
            }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
