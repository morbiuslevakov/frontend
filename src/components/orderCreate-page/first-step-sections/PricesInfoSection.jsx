import React from 'react'
import { FormContentWrapper } from '../Styled'
import { Box, Stack, Typography } from '@mui/material'

export const PricesInfoSection = ({ states }) => {
  const tokenPrice = states.walletInfo.assets[states.selectedToken].price.toFixed(2)
  const text = states.priceType === "FLOATING" ? `${states.customTokenPrice}${states.walletInfo.symbol} за 1 ${states.selectedToken}` : `${states.percentPrice || 0}${states.walletInfo.symbol} за 1 ${states.selectedToken}`

  return (
    <FormContentWrapper>
      <Box>
        <Stack flexDirection={'row'} gap={1}>
          <Typography variant='gray'>Рыночная цена:</Typography>
          <Typography>{tokenPrice}{states.walletInfo.symbol} за 1 {states.selectedToken}</Typography>
        </Stack>
        <Stack flexDirection={'row'} gap={1}>
          <Typography variant='gray'>Ваша цена:</Typography>
          <Typography>{text}</Typography>
        </Stack>
      </Box>
    </FormContentWrapper>
  )
}
