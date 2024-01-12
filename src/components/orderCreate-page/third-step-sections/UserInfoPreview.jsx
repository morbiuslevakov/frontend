import React, { useContext } from 'react'
import { Stack, Typography } from '@mui/material'
import { SmallAvatar } from '../../avatar/SmallAvatart'
import UserContext from '../../../context/user-context'

export const UserInfoPreview = () => {
  const { user } = useContext(UserContext)

  return (
    <Stack flexDirection={'row'} justifyContent={"space-between"}>
      <Stack flexDirection={'row'} gap={2} alignItems={'center'}>
        <SmallAvatar username={user.username} />
        <Typography>{user.username}</Typography>
      </Stack>
      <Stack flexDirection={'row'} gap={1} alignItems={'center'}>
        <Typography>{user.deals} сделок</Typography>
        <Typography>·</Typography>
        <Typography>{user.completedPercent}%</Typography>
      </Stack>
    </Stack>
  )
}
