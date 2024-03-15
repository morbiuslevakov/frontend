import React from 'react'
import { FormContentWrapper, FormInput, FormSectionWrapper } from '../Styled'
import { InputAdornment, Stack, Typography } from '@mui/material'

export const PercentPriceSection = ({ errorMessage, setPercentPrice, states }) => {
  const isFloating = states.priceType === "FLOATING";
  const labelText = isFloating ? "Процент от рыночной цены" : "Фиксированная цена"
  const adornment = isFloating ? "%" : `${states.walletInfo.symbol}`
  const placeholder = isFloating ? "70 ~ 150" : "Цена токена"

  return (
    <FormSectionWrapper mt={2}>
      <FormContentWrapper>
        <Stack gap={1}>
          <Typography variant='blue' fontWeight={600}>{labelText}</Typography>
          <FormInput error={!!errorMessage} helperText={errorMessage} variant="standard"
            onChange={(event) => { setPercentPrice(event.target.value) }}
            value={states.percentPrice} type="number" placeholder={placeholder}
            InputProps={{
              endAdornment: (
                <InputAdornment position='start'>
                  <Typography variant='gray'>{adornment}</Typography>
                </InputAdornment>
              )
            }}
          />
        </Stack>
      </FormContentWrapper>
    </FormSectionWrapper>
  )
}
