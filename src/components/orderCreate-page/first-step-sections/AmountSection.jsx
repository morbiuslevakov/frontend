import React from 'react'
import { FormContentWrapper, FormInput, FormSectionWrapper } from '../Styled'
import { Stack, Typography } from '@mui/material'

export const AmountSection = ({ errorMessage, amount, setAmount, selectedToken }) => {
  return (
    <FormSectionWrapper>
      <FormContentWrapper>
        <Stack gap={1}>
          <Typography variant='blue' fontWeight={600}>Сумма</Typography>
          <FormInput error={!!errorMessage} helperText={errorMessage} variant="standard" onChange={(event) => { setAmount(event.target.value) }} value={amount} type="number" placeholder="5 ~ 10000" endAdornment={<Typography variant='gray'>{selectedToken}</Typography>} />
        </Stack>
      </FormContentWrapper>
    </FormSectionWrapper>
  )
}
