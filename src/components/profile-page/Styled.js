import { Box, Stack, styled } from "@mui/material"
import { DefaultCard } from "../card-wrappers/Styled"

export const Wrapper = styled(Stack)({
  alignItems: "center"
})

export const PageContent = styled(Box)({
  maxWidth: '1000px',
  width: '100%'
})

export const InfoCard = styled(DefaultCard)({
  padding: '20px'
})
