import React from 'react'
import { Button, Stack, Typography } from '@mui/material'
import { InfoCard } from './Styled'

export const Security = () => {
  return (
    <InfoCard>
      <Stack gap={2}>
        <Typography fontSize={26} lineHeight={1}>Безопасность</Typography>
        <Stack gap={1} width={'200px'}>
          <Button variant="outlined">Изменить пароль</Button>
          <Button variant="outlined">Включить F2A</Button>
        </Stack>
      </Stack>
    </InfoCard>
  )
}
