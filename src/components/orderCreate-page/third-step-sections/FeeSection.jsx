import React from 'react'
import { FormContentWrapper } from '../Styled'
import { Typography } from '@mui/material'

export const FeeSection = ({ states }) => {
  return (
    <FormContentWrapper>
      <Typography variant='gray' fontSize={14}>Комиссия сервиса за создание ордера: {states.selectedTokenFee} {states.selectedToken}</Typography>
    </FormContentWrapper>
  )
}
