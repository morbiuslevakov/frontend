import React from 'react'
import { Stack, Typography } from '@mui/material'

export const PageHeader = () => {
  return (
    <Stack alignItems={"center"}>
      <Typography fontSize={28} fontWeight={600}>
        P2P Маркет
      </Typography>
      <Typography variant="gray" textAlign={'center'}>Покупайте и продавайте крипту без посредников</Typography>
    </Stack>
  )
}
