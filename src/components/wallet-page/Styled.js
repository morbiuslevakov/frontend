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
  borderRadius: "15px",
  "@media(max-width: 600px)": {
    borderRadius: "0",
    background: '#151515',
    height: "66vh"
  }
})

export const BalanceCurrency = styled(Box)({
  background: "#262626",
  padding: '3px 9px',
  borderRadius: '5px',
})

export const WalletButton = styled(Button)({
  padding: '5px',
  width: '100%',
  display: 'flex',
  gap: '5px'
})

export const TokenIcon = styled(Box)({
  width: "34px",
  height: "34px",
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  }
})