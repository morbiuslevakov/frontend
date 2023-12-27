import { Box, Button, Stack, styled } from "@mui/material"

export const Wrapper = styled(Stack)({
  flexDirection: 'column',
  alignItems: 'center',
})

export const PageContent = styled(Box)({
  maxWidth: '1000px',
  width: '100%'
})

export const WalletTokensWrapper = styled(Box)({
  background: "#262626",
  borderRadius: "15px"
})

export const BalanceCurrency = styled(Box)({
  background: "#898989",
  padding: '3px 9px',
  borderRadius: '5px',
})

export const WalletButton = styled(Button)({
  padding: '5px',
  width: '100%',
  display: 'flex',
  gap: '5px'
})