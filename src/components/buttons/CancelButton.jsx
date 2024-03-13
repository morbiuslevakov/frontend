import React from 'react'
import { Button, Typography } from '@mui/material'

export const CancelButton = ({ text, isDisabled, callback }) => {
  return (
    <Button variant="contained" color="secondary" fullWidth disabled={isDisabled} onClick={callback}>
      <Typography variant="red">{text}</Typography>
    </Button>
  )
}