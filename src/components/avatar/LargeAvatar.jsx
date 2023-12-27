import React from 'react'
import { LargeUserAvatar } from './Styled'

export const LargeAvatar = ({ link, name }) => {
  const firstNameLetter = name[0] || ''

  if (link) {
    return <LargeUserAvatar alt="user-avatar" src={link} />
  }

  return (
    <LargeUserAvatar>{firstNameLetter}</LargeUserAvatar>
  )
}
