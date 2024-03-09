import React from 'react'
import { Button, Stack, Typography } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { FormStackSection } from '../../form/FormStackSection';
import { FormStackClickSection } from '../../form/FormStackClickSection';

export const OrderDetails = ({ states, setState, order, maxLimit, cryptoBalance }) => {
  const isBuy = states.type === "BUY"
  const bankNames = Object.keys(order.payments)
  const paymentsName = states.paymentMethods.map(payment => payment.bank.name);

  const handleClick = () => {
    setState.step('details')
  }

  const handlePayments = () => {
    setState.step('payments')
  }

  return (
    <Stack gap={0.2}>
      {isBuy && <FormStackSection>
        <Typography>Доступный баланс</Typography>
        <Typography>{cryptoBalance} {states.crypto}</Typography>
      </FormStackSection>}
      <FormStackSection>
        <Typography>Методы оплаты</Typography>
        {isBuy ?
          <Button color='blue' onClick={handlePayments}>{!states.paymentMethods.length ? 'Добавить' : paymentsName.join(', ')}</Button>
          : <Typography>{bankNames}</Typography>}
      </FormStackSection>
      <FormStackSection>
        <Typography>Лимиты</Typography>
        <Typography>{order.minSum} ~ {maxLimit} {states.currency}</Typography>
      </FormStackSection>
      <FormStackClickSection handleClick={handleClick}>
        <Typography>Детали ордера</Typography>
        <ArrowForwardIosIcon color='gray' />
      </FormStackClickSection>
    </Stack>
  )
}
