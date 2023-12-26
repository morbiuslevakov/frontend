import React from 'react'
import { Stack, Typography } from '@mui/material'
import { BalanceCurrency } from './Styled'

export const TotalBalance = ({ currency, balance }) => {
  return (
    <Stack flexDirection={'row'} gap={2} pb={1}>
      <BalanceCurrency>
        <Typography fontSize={30}>{currency}</Typography>
      </BalanceCurrency>
      <Typography fontSize={30}>{balance}</Typography>
    </Stack>
  )
}
