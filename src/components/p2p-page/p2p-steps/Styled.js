import { TextField, styled } from "@mui/material";

export const FormInput = styled(TextField)(({ theme, width }) => ({
  input: {
    fontSize: 60,
    color: theme.palette.primary.main,
  },
  width: width,
}))
