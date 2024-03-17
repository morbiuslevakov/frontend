import React from 'react'
import { Button, Stack, Typography } from '@mui/material'
import { ProfileCard } from './Styled'
import { ChangePassword } from './ChangePassword'

export const Security = () => {
  return (
    <ProfileCard>
      <Stack gap={2}>
        <Typography fontSize={26} lineHeight={1}>Безопасность</Typography>
        <Stack gap={1} width={'200px'}>
          <ChangePassword />
          <Button variant="outlined" disabled>Включить F2A</Button>
        </Stack>
      </Stack>
    </ProfileCard>
  )
}
