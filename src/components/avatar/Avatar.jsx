import React from 'react'
import { UserAvatar } from './Styled'

export const Avatar = ({ link, name }) => {
  const firstNameLetter = name[0] || ''

  if (link) {
    return <UserAvatar alt="user-avatar" src={link} />
  }

  return (
    <UserAvatar>{firstNameLetter}</UserAvatar>
  )
}
