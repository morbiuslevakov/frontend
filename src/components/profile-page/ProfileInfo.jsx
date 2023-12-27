import React from 'react'
import { Stack, Tooltip, Typography } from '@mui/material'
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import { LargeAvatar } from '../avatar/LargeAvatar'

export const ProfileInfo = ({ user }) => {
  return (
    <Stack flexDirection={'row'} gap={10}>
      <LargeAvatar name={user.name} />
      <Stack gap={3}>
        <Stack flexDirection={'row'} gap={5}>
          <Stack alignItems={'center'}>
            <Typography fontSize={30} lineHeight={1}>87</Typography>
            <Typography >дней</Typography>
          </Stack>
          <Stack alignItems={'center'}>
            <Typography fontSize={30} lineHeight={1}>159</Typography>
            <Typography>сделок</Typography>
          </Stack>
          <Stack alignItems={'center'}>
            <Typography fontSize={30} lineHeight={1}>156</Typography>
            <Typography>успех</Typography>
          </Stack>
        </Stack>
        <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
          <Typography fontSize={26} fontWeight={600}>{user.name}</Typography>
          <Tooltip title={<Typography width={'180px'} fontSize={12}>Ваше имя которое будет отображаться в рамках ордера</Typography>}>
            <HelpOutlineRoundedIcon fontSize="small" color="primary" />
          </Tooltip>
        </Stack>
      </Stack>
    </Stack>
  )
}
