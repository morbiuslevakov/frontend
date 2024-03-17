import React from 'react'
import { FormContentWrapper, FormSectionWrapper } from '../Styled';
import { Checkbox, Stack, Typography } from '@mui/material';

export const LitePaymentMethod = ({ bank, states, setPaymentMethods, isDeal }) => {
  const isSelected = states.paymentMethods.some(payment => {
    return payment.id === bank.id
  });

  const handleChange = () => {
    setPaymentMethods(state => {
      if (isSelected) {
        return state.filter(payment => payment.id !== bank.id);
      } else {
        if (isDeal) {
          return [bank];
        } else {
          return [...state, bank];
        }
      }
    });
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
