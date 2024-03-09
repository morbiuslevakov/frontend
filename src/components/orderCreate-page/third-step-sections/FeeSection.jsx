import React from 'react'
import { FormContentWrapper } from '../Styled'
import { Typography } from '@mui/material'

export const FeeSection = () => {
  return (
    <FormContentWrapper>
      <Typography variant='gray' fontSize={14}>Комиссия равна 1% от суммы сделки</Typography>
    </FormContentWrapper>
  )
}
