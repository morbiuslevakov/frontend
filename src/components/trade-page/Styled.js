import { Box, Stack, styled } from "@mui/material";
import { DefaultCard } from "../card-wrappers/Styled";

export const Wrapper = styled(Stack)({
  flexDirection: 'column',
  alignItems: 'center',
})

export const PageContent = styled(Box)({
  maxWidth: '850px'
})

export const TradeCard = styled(DefaultCard)({
  padding: '20px',
  cursor: "pointer",
  "&:hover": {
    opacity: 0.9
  }
})
