import { Stack, Typography } from '@mui/material'
import React from 'react'
import { FormStackSection } from '../../form/FormStackSection'
import { countFinalAmountInCurrency } from '../../../utils/p2p-utils'

export const SmallDetails = ({ states, bankNames, amount, tokenPrice }) => {
  const finalAmount = countFinalAmountInCurrency(states.type, amount, tokenPrice)

  return (
    <Stack gap={0.2}>
      <FormStackSection>
        <Typography>Цена за 1 {states.crypto}</Typography>
        <Typography>{tokenPrice} {states.currency}</Typography>
      </FormStackSection>
      <FormStackSection>
        <Typography>Сумма</Typography>
        <Typography>{finalAmount} {states.currency}</Typography>
      </FormStackSection>
      <FormStackSection>
        <Typography>Методы оплаты</Typography>
        <Typography>{bankNames}</Typography>
      </FormStackSection>
      <FormStackSection>
        <Typography>Время на оплату</Typography>
        <Typography>15 мин</Typography>
      </FormStackSection>
    </Stack>
  )
}
