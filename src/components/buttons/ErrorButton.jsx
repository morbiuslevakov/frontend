import React from 'react'
import { Button, Typography } from '@mui/material'

export const ErrorButton = ({ text, callback }) => {
  return (
    <Button fullWidth variant="contained" color='lightRed' onClick={callback} disableElevation  >
      <Typography color='red' variant='red' fontWeight={600}>{text}</Typography>
    </Button>
  )
}
