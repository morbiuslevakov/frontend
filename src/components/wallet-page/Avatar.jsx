import React from 'react'
import { UserAvatart } from './Styled'

export const Avatar = ({ link }) => {
  return (
    <UserAvatart alt="user-avatar" src={link} />
  )
}
