import React from 'react'
import { Typography } from '@mui/material'
import { SubmitButton } from './Styled'

export const SubmitFormButton = ({ text }) => {
  return (
    <SubmitButton type="submit">
      <Typography>{text}</Typography>
    </SubmitButton>
  )
}
