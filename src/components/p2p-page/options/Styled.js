import { Box, styled } from "@mui/material";

export const OptionWrapper = styled(Box)(({ theme }) => ({
  background: theme.palette.secondary.main,
  borderRadius: "5px",
  padding: "5px 10px"
}))