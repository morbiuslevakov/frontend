import React from 'react'
import { LargeUserAvatar } from './Styled'

export const LargeAvatar = ({ username }) => {
  const firstUsernameLetter = username[0] || ''


  return (
    <LargeUserAvatar>{firstUsernameLetter}</LargeUserAvatar>
  )
}
