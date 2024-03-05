import React from 'react'
import { Button, Typography } from '@mui/material'

export const FormFooterButton = ({ text, isDisabled, callback }) => {
  return (
    <Button variant="contained" color="blue" fullWidth disabled={isDisabled} onClick={callback}>
      <Typography variant="secondary">{text}</Typography>
    </Button>
  )
}
