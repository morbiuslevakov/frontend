import React from 'react'
import { FormContentWrapper, FormSectionWrapper } from '../Styled';
import { Checkbox, Stack, Typography } from '@mui/material';

export const LitePaymentMethod = ({ bank, states, setPaymentMethods }) => {
  const isSelected = states.paymentMethods.some(payment => {
    return payment.id === bank.id
  });

  const handleChange = () => {
    if (isSelected) {
      setPaymentMethods(state => {
        return state.filter(state => state.id !== bank.id)
      })
    } else {
      setPaymentMethods(state => {
        return [...state, bank]
      })
    }
  }
  return (
    <FormSectionWrapper>
      <FormContentWrapper>
        <Stack flexDirection={'row'} alignItems={'center'}>
          <Checkbox color='blue' onChange={handleChange} checked={isSelected} />
          <Typography>
            {bank.name}
          </Typography>
        </Stack>
      </FormContentWrapper>
    </FormSectionWrapper>
  )
}
