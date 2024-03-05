import React from 'react'
import { Stack, Typography } from '@mui/material'
import { SmallAvatar } from '../../avatar/SmallAvatart'
import { FormContentWrapper } from '../../orderCreate-page/Styled'

export const UserAndAction = ({ step, username, text }) => {
  if (step === 'details') { // потом поменять на complete
    return null
  }

  if (step === 'details') { // потом поменять на waiting
    return null
  }

  return (
    <FormContentWrapper margin={'20px 0'}>
      <Stack flexDirection={'row'} alignItems={'center'} gap={2}>
        <SmallAvatar username={username} />
        <Typography>{text} {username}</Typography>
      </Stack>
    </FormContentWrapper>
  )
}
