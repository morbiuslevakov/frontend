import React from 'react'
import { InfoCard } from './Styled'
import { Box, Stack, Typography } from '@mui/material'

export const PrimaryInfo = ({ user }) => {
  return (
    <InfoCard>
      <Stack gap={2}>
        <Typography fontSize={26} lineHeight={1}>Основные</Typography>
        <Box>
          <Typography variant="lightGray" fontWeight={600} fontSize={14} lineHeight={1}>Адрес:</Typography>
          <Typography >{user.address}</Typography>
        </Box>
        <Box>
          <Typography variant="lightGray" fontWeight={600} fontSize={14} lineHeight={1}>Email:</Typography>
          <Typography >{user.email}</Typography>
        </Box>
        <Box>
          <Typography variant="lightGray" fontWeight={600} fontSize={14} lineHeight={1}>Имя пользователя:</Typography>
          <Typography >{user.username}</Typography>
        </Box>
      </Stack>
    </InfoCard>
  )
}
