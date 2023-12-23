import React from 'react'
import { Stack, Typography } from '@mui/material'
import { HeaderMenuItem } from './Styled'

export const HeaderMenu = ({ isLogged }) => {
  return (
    <Stack alignItems={'center'} flexDirection={'row'} gap={2}>
      <HeaderMenuItem to={'/trade'}>
        <Typography>
          Торговля
        </Typography>
      </HeaderMenuItem>
      {isLogged && <HeaderMenuItem to={'/wallet'}>
        <Typography>
          Кошелек
        </Typography>
      </HeaderMenuItem>}
    </Stack>
  )
}
