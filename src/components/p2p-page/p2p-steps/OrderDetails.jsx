import React from 'react'
import { Stack, Typography } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { FormStackSection } from '../../form/FormStackSection';
import { FormStackClickSection } from '../../form/FormStackClickSection';

export const OrderDetails = ({ states, setState, order, maxLimit }) => {
  const handleClick = () => {
    setState.step('details')
  }

  const bankNames = Object.keys(order.payments)

  return (
    <Stack gap={0.2}>
      <FormStackSection>
        <Typography>Методы оплаты</Typography>
        <Typography>{bankNames}</Typography>
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
