import React from 'react'
import { Stack, Typography } from '@mui/material'

export const TradeItemDetails = ({ states, order, token, maxLimit, isMobile }) => {
  const bankNames = Object.keys(order.payments)
  const fontSize = isMobile ? "14px" : "16px"

  return (
    <Stack pt={2} gap={0.7}>
      <Stack flexDirection={'row'} justifyContent={'space-between'}>
        <Typography variant='gray'>Доступно</Typography>
        <Typography>{order.available} {token}</Typography>
      </Stack>
      <Stack flexDirection={'row'} justifyContent={'space-between'}>
        <Typography variant='gray'>Лимиты</Typography>
        <Typography>{order.minSum} - {maxLimit} {states.currency}</Typography>
      </Stack>
      <Stack flexDirection={'row'} justifyContent={'space-between'}>
        <Typography variant='gray'>Методы оплаты</Typography>
        <Stack flexDirection={'row'}>
          <Typography fontSize={fontSize}>{bankNames.join(', ')}</Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}
