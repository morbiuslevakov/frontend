import React from 'react'
import { Stack, Switch, Typography } from '@mui/material'
import { FormStackSection } from '../../form/FormStackSection';

export const PaymentMethod = ({ method, states, setPaymentMethods, isDeal }) => {
  const isSelected = states.paymentMethods.some(payment => {
    return payment.id === method.id
  });

  const handleChange = () => {
    setPaymentMethods(state => {
      if (isSelected) {
        return state.filter(payment => payment.id !== method.id);
      } else {
        if (isDeal) {
          return [method];
        } else {
          return [...state, method];
        }
      }
    });
  }

  return (
    <FormStackSection >
      <Stack>
        <Typography>
          {method.bank.name}
        </Typography>
        <Stack flexDirection={'row'} gap={1} >
          <Typography fontSize={14} variant={'gray'}>
            {method.bank.name}
          </Typography>
          <Typography fontSize={14} variant={'gray'}>
            ·
          </Typography>
          <Typography fontSize={14} variant={'gray'}>
            {states.currency}
          </Typography>
        </Stack>
        <Typography fontSize={14} variant={'gray'}>
          {method.account}
        </Typography>
      </Stack>
      <Switch color="blue"
        checked={isSelected}
        onChange={handleChange}
      />
    </FormStackSection>
  )
}
