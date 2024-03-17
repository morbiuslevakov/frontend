import React from 'react'
import { Alert, Stack, Typography } from '@mui/material'
import { ProfileCard } from './Styled'

export const Statistics = () => {
  return (
    <ProfileCard>
      <Stack gap={2}>
        <Typography fontSize={26} lineHeight={1}>Статистика аккаунта</Typography>
        <Alert variant="filled" severity="warning">
          Статистика пока недоступна для вашего аккаунта
        </Alert>
      </Stack>
    </ProfileCard>
  )
}
