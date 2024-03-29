import React from 'react'
import { Box, Typography } from '@mui/material'
import { useMediaQueryHook } from '../../hooks/use-media-query.hook'

export const WelcomeText = () => {
  const isTablet = useMediaQueryHook('md')

  return !isTablet ? (
    <Box textAlign={'center'} width={'40%'}>
      <Typography fontWeight={600} fontSize={36}>Deaslide Network</Typography>
      <Typography variant='lightBrown'>Децентрализованный торговый протокол</Typography>
      <Typography pt={3}>Легко покупайте, торгуйте и зарабатывайте на крипте</Typography>
    </Box>
  ) : null
}
