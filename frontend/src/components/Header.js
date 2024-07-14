import React, { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { styled, alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { colorSchema } from "../mocks/constants";
export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [colorPreference, setColorPrefernce] = useState([]);
  const [userColorPreference, setUsercolorprefernce] = useState({});
  const navigate = useNavigate();
  const { userPreference, logout, updatePreference } = useContext(AuthContext);

  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      border: "1px solid black",
      marginTop: theme.spacing(1),
      minWidth: 180,
      backgroundColor: "#fff",
      color: "#000",
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "4px 0",
      },
      "& .MuiMenuItem-root": {
        fontSize: ".875rem",
        fontWeight: 600,
        lineHeight: "1.25rem",
        fontFamily: "Inter, sans-serif",
        textTransform: "uppercase",
        "& .MuiSvgIcon-root": {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        "&:active": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  }));
  useEffect(() => {
    const userColorPreference = userPreference.colorPreference;
    const selectedColor = colorSchema.find(
      (item) => item.colorPreference === userColorPreference
    );
    setUsercolorprefernce({ selectedColor });
  }, [userPreference]);
  useEffect(() => {
    setColorPrefernce(colorSchema);
  }, []);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleColorChange = async (color) => {
    try {
      await updatePreference(color.colorPreference);
    } catch (error) {
      console.error("Error updating color preference:", error);
    }
    handleMenuClose();
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      console.log("Logout successful!");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div id="header">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            background: userColorPreference.selectedColor?.colorPreference,
            borderBottom: `2px solid ${userColorPreference.selectedColor?.color}`,
            color: userColorPreference.selectedColor?.color,
            fontFamily: "Inter, sans-serif",
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                display: { xs: "block", sm: "block" },
                fontSize: ".875rem",
                fontWeight: 600,
                lineHeight: "1.25rem",
                fontFamily: "Inter, sans-serif",
                textTransform: "uppercase",
              }}
            >
              Preferences
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              id="demo-customized-button"
              aria-controls={
                Boolean(anchorEl) ? "demo-customized-menu" : undefined
              }
              aria-haspopup="true"
              aria-expanded={Boolean(anchorEl) ? "true" : undefined}
              variant="contained"
              disableElevation
              onClick={handleMenuClick}
              endIcon={<KeyboardArrowDownIcon />}
              sx={{
                backgroundColor:
                  userColorPreference.selectedColor?.colorPreference,
                color: userColorPreference.selectedColor?.color,
                "&:hover": {
                  backgroundColor:
                    userColorPreference.selectedColor?.colorPreference,
                },
                fontFamily: "Inter, sans-serif",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              {userColorPreference.selectedColor?.colorName}
            </Button>
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {colorPreference &&
                colorPreference.map((color, i) => (
                  <MenuItem
                    onClick={() => handleColorChange(color)}
                    disableRipple
                    key={i}
                  >
                    {color.colorName}
                  </MenuItem>
                ))}
            </StyledMenu>

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                edge="end"
                aria-haspopup="true"
                color="inherit"
                onClick={handleLogout}
              >
                <LogoutIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-haspopup="true"
                color="inherit"
                onClick={handleLogout}
              >
                <LogoutIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
