import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { colorSchema } from "../mocks/constants";
export default function Landing() {
  const [headerHeight, setHeaderHeight] = useState(0);
  const { userPreference } = useContext(AuthContext);
  const [colorPreference, setColorPrefernce] = useState({});
  useEffect(() => {
    const userColorPreference = userPreference.colorPreference;
    const selectedColor = colorSchema.find(
      (item) => item.colorPreference === userColorPreference
    );
    setColorPrefernce({ selectedColor });
  }, [userPreference]);
  useEffect(() => {
    function updateHeaderHeight() {
      const headerElement = document.getElementById("header");
      if (headerElement) {
        const height = headerElement.clientHeight;
        const remainingHeight = `calc(100vh - ${height + 2}px)`;
        setHeaderHeight(remainingHeight);
      }
    }

    updateHeaderHeight();

    window.addEventListener("resize", updateHeaderHeight);

    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, []);

  return (
    <Box
      width="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        background: colorPreference.selectedColor?.colorPreference,
        height: headerHeight,
      }}
    >
      <span
        style={{
          color: colorPreference.selectedColor?.color,
          textTransform: "uppercase",
          fontFamily: "Inter, sans-serif",
          fontSize: "3rem",
          fontWeight: 900,
          lineHeight: 1,
        }}
      >
        {colorPreference.selectedColor?.colorName}
      </span>
    </Box>
  );
}
