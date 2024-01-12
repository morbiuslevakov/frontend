import { Stack, Typography } from '@mui/material'
import React from 'react'

export const OrderInfoPreview = ({ states }) => {
  return (
    <Stack pt={2} gap={0.7}>
      <Stack flexDirection={'row'} justifyContent={'space-between'}>
        <Typography variant='gray'>Количество</Typography>
        <Typography>{states.amount} {states.selectedToken}</Typography>
      </Stack>
      <Stack flexDirection={'row'} justifyContent={'space-between'}>
        <Typography variant='gray'>Лимиты</Typography>
        <Typography>5.98 WAVES</Typography>
      </Stack>
      <Stack flexDirection={'row'} justifyContent={'space-between'}>
        <Typography variant='gray'>Методы оплаты</Typography>
        <Typography>5.98 WAVES</Typography>
      </Stack>
      <Stack flexDirection={'row'} justifyContent={'space-between'}>
        <Typography variant='gray'>Время оплаты</Typography>
        <Typography>15 минут</Typography>
      </Stack>
    </Stack>
  )
}
