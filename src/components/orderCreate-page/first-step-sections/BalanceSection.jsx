import React from 'react'
import { FormContentWrapper } from '../Styled'
import { Button, Stack, Typography } from '@mui/material'

export const BalanceSection = ({ states, setState }) => {
  const walletBalance = states.walletInfo.assets[states.selectedToken].balance.toFixed(3)

  const handleMaxBalance = () => {
    setState.amount(walletBalance)
  }

  return (
    <FormContentWrapper>
      <Stack flexDirection={'row'} gap={1} alignItems={'center'}>
        <Typography variant='gray'>Ваш баланс:</Typography>
        <Typography>{walletBalance} {states.selectedToken}</Typography>
        <Typography>·</Typography>
        <Button color={"blue"} onClick={handleMaxBalance} size='small'>Макс.</Button>
      </Stack>
    </FormContentWrapper>
  )
}
