import { Box, Stack, styled } from "@mui/material";

export const Wrapper = styled(Stack)({
  flexDirection: 'column',
  alignItems: 'center',
})

export const PageContent = styled(Box)({
  maxWidth: '850px'
})

export const TradeCard = styled(Box)({
  backgroundColor: "#2D2E2F",
  padding: '20px',
  borderRadius: '20px',
  cursor: "pointer",
  "&:hover": {
    opacity: 0.9
  }
})
