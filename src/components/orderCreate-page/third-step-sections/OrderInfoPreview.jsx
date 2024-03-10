import React from 'react'
import { Stack, Typography } from '@mui/material'

export const OrderInfoPreview = ({ states }) => {
  const paymentMethods = states.paymentMethods

  const displayPaymentMethods = states.orderAction === "SELL" ? paymentMethods.length > 1
    ? paymentMethods.map(method => method.bank.name).join(', ')
    : paymentMethods.map(method => method.bank.name) : paymentMethods.length > 1
    ? paymentMethods.map(bank => bank.name).join(', ')
    : paymentMethods.map(bank => bank.name)

  const totalPrice = (states.selectedTokenPrice * states.amount * states.percentPrice / 100).toFixed(2)

  return (
    <Stack pt={2} gap={0.7}>
      <Stack flexDirection={'row'} justifyContent={'space-between'}>
        <Typography variant='gray'>Количество</Typography>
        <Typography>{states.amount} {states.selectedToken}</Typography>
      </Stack>
      <Stack flexDirection={'row'} justifyContent={'space-between'}>
        <Typography variant='gray'>Лимиты</Typography>
        <Typography>{states.dealSum} - {totalPrice} {states.currency}</Typography>
      </Stack>
      <Stack flexDirection={'row'} justifyContent={'space-between'}>
        <Typography variant='gray'>Методы оплаты</Typography>
        <Stack flexDirection={'row'}>
          <Typography >{displayPaymentMethods}</Typography>
        </Stack>
      </Stack>
      <Stack flexDirection={'row'} justifyContent={'space-between'}>
        <Typography variant='gray'>Время оплаты</Typography>
        <Typography>{states.time} минут</Typography>
      </Stack>
    </Stack>
  )
}
