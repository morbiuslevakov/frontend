import React from 'react'
import { SmallUserAvatar } from './Styled'

export const SmallAvatar = ({  username }) => {
  const firstUsernameLetter = username[0] || ''

  return (
    <SmallUserAvatar>{firstUsernameLetter}</SmallUserAvatar>
  )
}
