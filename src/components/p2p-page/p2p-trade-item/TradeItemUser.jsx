import React from 'react'
import { Stack, Typography } from '@mui/material'
import { SmallAvatar } from '../../avatar/SmallAvatart'

export const TradeItemUser = ({ username, deals, completedPercent }) => {
  return (
    <Stack flexDirection={'row'} justifyContent={"space-between"}>
      <Stack flexDirection={'row'} gap={2} alignItems={'center'}>
        <SmallAvatar username={username} />
        <Typography>{username}</Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={1} alignItems={'center'}>
        <Typography>{deals} сделок</Typography>
        <Typography>·</Typography>
        <Typography>{completedPercent}%</Typography>
      </Stack>
    </Stack>
  )
}
