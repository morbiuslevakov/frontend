import React from 'react'
import { SmallUserAvatar } from './Styled'

export const SmallAvatar = ({ link, username }) => {
  const firstUsernameLetter = username[0] || ''

  if (link) {
    return <SmallUserAvatar alt="user-avatar" src={link} />
  }

  return (
    <SmallUserAvatar>{firstUsernameLetter}</SmallUserAvatar>
  )
}
