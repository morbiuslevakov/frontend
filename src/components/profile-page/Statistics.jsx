import React from 'react'
import { Alert, Stack, Typography } from '@mui/material'
import { InfoCard } from './Styled'

export const Statistics = () => {
  return (
    <InfoCard>
      <Stack gap={2}>
        <Typography fontSize={26} lineHeight={1}>Статистика аккаунта</Typography>
        <Alert variant="filled" severity="warning">
          Статистика пока недоступна для вашего аккаунта
        </Alert>
      </Stack>
    </InfoCard>
  )
}
