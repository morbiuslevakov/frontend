import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { InfoCard } from './Styled'
import { CopyButton } from '../p2p-page/orderDeal/CopyButton';

export const PrimaryInfo = ({ user }) => {
  return (
    <InfoCard>
      <Stack gap={2}>
        <Typography fontSize={26} lineHeight={1}>Основные</Typography>
        <Box>
          <Typography variant="lightGray" fontWeight={600} fontSize={14} lineHeight={1}>Адрес:</Typography>
          <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
            <Typography>{user.address}</Typography>
            <CopyButton text={user.address} />
          </Stack>
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
