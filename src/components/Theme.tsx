import type { PaletteMode } from "@mui/material";
import React from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useSettingStore } from "../stores/settingStore";

const Theme: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, primaryColor, secondaryColor } = useSettingStore();

  return (
    <ThemeProvider theme={lightTheme(theme, primaryColor, secondaryColor)}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

const lightTheme = (mode: PaletteMode, primary: string, secondary: string) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: primary,
      },
      secondary: {
        main: secondary,
      },
    },
    typography: {
      fontFamily: [
        "-apple-system",
        '"OpenSans-Regular"',
        '"OpenSans-SemiBold"',
        '"OpenSans-Medium"',
        '"OpenSans-Bold"',
      ].join(","),
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
              width: "4px",
              height: "6px",
            },
            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
              borderRadius: 8,
              backgroundColor: secondary,
              minHeight: 24,
              border: `1px solid ${secondary}`,
            },
            "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
              {
                backgroundColor: "#959595",
              },
            "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
              {
                backgroundColor: "#959595",
              },
            "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
              {
                backgroundColor: "#959595",
              },
            "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
              backgroundColor: "#2b2b2b",
            },
            "&::-moz-webkit-scrollbar-track, &::-webkit-scrollbar-track": {
              backgroundColor: secondary,
            },
            "& a": {
              color: "inherit",
              textDecoration: "none",
            },
          },
        },
      },
    },
  });

export default Theme;
