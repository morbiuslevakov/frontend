import React from 'react'
import { LargeUserAvatar } from './Styled'

export const LargeAvatar = ({ link, username }) => {
  const firstUsernameLetter = username[0] || ''

  if (link) {
    return <LargeUserAvatar alt="user-avatar" src={link} />
  }

  return (
    <LargeUserAvatar>{firstUsernameLetter}</LargeUserAvatar>
  )
}
