import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#FFF"
    },
    secondary: {
      main: "#262626",
      light: "#808080",
    },
    lightGray: {
      main: "#808080"
    }
  },
  typography: {
    body1: {
      color: "#FFF"
    },
    light: {
      color: "#262626"
    },
    lightGray: {
      color: "#808080"
    }
  },
});
