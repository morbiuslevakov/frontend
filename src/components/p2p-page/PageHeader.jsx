import React from 'react'
import { Stack, Typography } from '@mui/material'
import { useMediaQueryHook } from '../../hooks/use-media-query.hook'

export const PageHeader = () => {
  const isMobile = useMediaQueryHook('sm')
  const mt = isMobile ? 3 : 0

  return (
    <Stack alignItems={"center"} mt={mt}>
      <Typography fontSize={28} fontWeight={600}>
        P2P Маркет
      </Typography>
      <Typography variant="gray" textAlign={'center'}>Покупайте и продавайте крипту без посредников</Typography>
    </Stack>
  )
}
