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
    gray: {
      main: "#898989"
    },
    lightGray: {
      main: "#808080"
    },
    lightBrown: {
      main: "#a19d9d"
    },
  },
  typography: {
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif`,
    body1: {
      color: "#FFF"
    },
    light: {
      color: "#262626"
    },
    gray: {
      color: "#898989"
    },
    lightGray: {
      color: "#808080"
    },
    lightBrown: {
      color: "#a19d9d"
    }
  },
});
