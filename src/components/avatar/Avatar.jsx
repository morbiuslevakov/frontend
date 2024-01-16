import React from 'react'
import { UserAvatar } from './Styled'

export const Avatar = ({ link, username }) => {
  const firstUsernameLetter = username[0] || ''

  if (link) {
    return <UserAvatar alt="user-avatar" src={link} />
  }

  return (
    <UserAvatar>{firstUsernameLetter}</UserAvatar>
  )
}
