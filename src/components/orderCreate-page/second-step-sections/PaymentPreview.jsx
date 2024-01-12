import React from 'react'
import { FormContentWrapper, FormSectionWrapper, FormStack } from '../Styled'
import { Stack, Switch, Typography } from '@mui/material'

export const PaymentPreview = ({ payment, selectedMehod, setPayment }) => {
  const isSelected = selectedMehod === payment.id;

  const handleChange = () => {
    setPayment(payment.id)
  }

  return (
    <FormSectionWrapper>
      <FormContentWrapper>
        <FormStack>
          <Stack>
            <Typography>
              {payment.name}
            </Typography>
            <Stack flexDirection={'row'} gap={1} >
              <Typography fontSize={14} variant={'gray'}>
                {payment.name}
              </Typography>
              <Typography fontSize={14} variant={'gray'}>
                ·
              </Typography>
              <Typography fontSize={14} variant={'gray'}>
                {payment.currency}
              </Typography>
            </Stack>
            <Typography fontSize={14} variant={'gray'}>
              {payment.number}
            </Typography>
          </Stack>
          <Switch color="blue" checked={isSelected} onChange={handleChange} />
        </FormStack>
      </FormContentWrapper>
    </FormSectionWrapper>
  )
}
