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
  "& .MuiInputBase-input": {
    "&:focus": {
      color: "#000",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#000",
    "&.Mui-focused": {
      color: "#000",
    },
  },
}));

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login, isAuthenticated } = useContext(AuthContext);

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
    if (!username) {
      newErrors.username = "Email is required";
    } else if (!validateEmail(username)) {
      newErrors.username = "Email is not valid";
    }
    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await login(username, password);
        navigate("/");
      } catch (error) {
        console.error("Error logging in:", error);
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
          Sign in
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <CustomTextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!errors.username}
            helperText={errors.username}
          />
          <CustomTextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
          />
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
            // disabled={isButtonDisabled()}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
