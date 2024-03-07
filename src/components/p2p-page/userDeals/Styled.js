import { Box, Button, Divider, Stack, styled } from "@mui/material";

export const DealsWrapper = styled(Box)({
  width: '100%'
})

export const DealsContainer = styled(Stack)({
  padding: "15px 20px",
})

export const DealButton = styled(Button)({
  textTransform: "unset",
  padding: 0
})

export const LineDivider = styled(Divider)({
  margin: '0 25px',
  backgroundColor: '#000'
})
