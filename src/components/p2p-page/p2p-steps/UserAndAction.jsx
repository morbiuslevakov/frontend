import React from 'react'
import { Stack, Typography } from '@mui/material'
import { SmallAvatar } from '../../avatar/SmallAvatart'

export const UserAndAction = ({ username, text }) => {
  return (
    <Stack flexDirection={'row'} alignItems={'center'} gap={2}>
      <SmallAvatar username={username} />
      <Typography>{text} {username}</Typography>
    </Stack>
  )
}
