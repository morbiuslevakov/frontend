import { styled, Stack, Box, Button } from "@mui/material";
import { DefaultCard } from "../card-wrappers/Styled";

export const Wrapper = styled(Stack)({
  flexDirection: 'column',
  alignItems: 'center',
})

export const PageContent = styled(Box)({
  maxWidth: '1000px',
  width: '100%',
})

export const AddsCard = styled(DefaultCard)({
  overflow: "hidden"
})

export const AddsButton = styled(Button)({
  padding: "15px 20px",
})