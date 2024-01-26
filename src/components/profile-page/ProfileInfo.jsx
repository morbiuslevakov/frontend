import React from 'react'
import { Stack, Tooltip, Typography } from '@mui/material'
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import { LargeAvatar } from '../avatar/LargeAvatar'

export const ProfileInfo = ({ user, userDetails }) => {
  return (
    <Stack flexDirection={'row'} gap={10}>
      <LargeAvatar username={user.username} />
      <Stack gap={3}>
        <Stack flexDirection={'row'} gap={5}>
          <Stack alignItems={'center'}>
            <Typography fontSize={30} lineHeight={1}>-</Typography>
            <Typography >дней</Typography>
          </Stack>
          <Stack alignItems={'center'}>
            <Typography fontSize={30} lineHeight={1}>{userDetails.deals}</Typography>
            <Typography>сделок</Typography>
          </Stack>
          <Stack alignItems={'center'}>
            <Typography fontSize={30} lineHeight={1}>{userDetails.completedDeals}</Typography>
            <Typography>успех</Typography>
          </Stack>
        </Stack>
        <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
          <Typography fontSize={26} fontWeight={600}>{user.username}</Typography>
          <Tooltip title={<Typography width={'180px'} fontSize={12}>Ваше имя которое будет отображаться в рамках ордера</Typography>}>
            <HelpOutlineRoundedIcon fontSize="small" color="primary" />
          </Tooltip>
        </Stack>
      </Stack>
    </Stack>
  )
}
