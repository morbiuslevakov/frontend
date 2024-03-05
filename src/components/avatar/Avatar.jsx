import React from 'react'
import { UserAvatar } from './Styled'

export const Avatar = ({  username }) => {
  const firstUsernameLetter = username[0] || ''

  return (
    <UserAvatar>{firstUsernameLetter}</UserAvatar>
  )
}
