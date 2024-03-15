import React from 'react'
import { FormContentWrapper, FormInput, FormSectionWrapper } from '../Styled'
import { InputAdornment, Stack, Typography } from '@mui/material'

export const PercentPriceSection = ({ errorMessage, percentPrice, type, setPercentPrice }) => {
  const labelText = type === "FLOATING" ? "Процент от рыночной цены" : "Фиксированная цена"
  return (
    <FormSectionWrapper mt={2}>
      <FormContentWrapper>
        <Stack gap={1}>
          <Typography variant='blue' fontWeight={600}>{labelText}</Typography>
          <FormInput error={!!errorMessage} helperText={errorMessage} variant="standard"
            onChange={(event) => { setPercentPrice(event.target.value) }}
            value={percentPrice} type="number" placeholder="70 ~ 150"
            InputProps={{
              endAdornment: (
                <InputAdornment position='start'>
                  <Typography variant='gray'>%</Typography>
                </InputAdornment>
              )
            }}
          />
        </Stack>
      </FormContentWrapper>
    </FormSectionWrapper>
  )
}
