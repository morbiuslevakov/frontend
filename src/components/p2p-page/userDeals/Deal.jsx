import React from 'react'
import { FormWrapper } from '../../orderCreate-page/Styled'
import { Box, Button, Stack, Typography } from '@mui/material'
import { DealButton } from './Styled'
import { transformToDate } from '../../../utils/date-utils'
import { actionType } from '../../../utils/constants/order-create'
import { dealString } from '../../../utils/deal-utils'

export const Deal = ({ deal }) => {
  console.log(deal)

  // amount: 12.171052631578949
  // createdAt: 1709409258637
  // dealId: "65e383ea57c44e38659371f3"
  // payment: "Тинькофф"
  // sum: 222.00000000000003

  const status = dealString[deal.status]
  const fixedAmount = deal.amount.toFixed(2)
  const fixedSum = deal.sum.toFixed(2)
  const date = transformToDate(deal.createdAt)
  const stringType = actionType[deal.type]

  return (
    <DealButton>
      <Stack py={'15px'} px={'20px'} width={'100%'} alignItems={'start'}>
        <Typography variant={'gray'}>{status}</Typography>
        <Typography>{stringType} {fixedAmount} {deal.asset} за {fixedSum} {deal.currency}</Typography>
        <Typography variant={'gray'}>Метод оплаты: {deal.payment}</Typography>
        <Typography variant={'gray'}>{date}</Typography>
      </Stack>
    </DealButton>
  )
}
