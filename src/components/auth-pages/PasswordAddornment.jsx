import React from 'react'
import { IconButton, InputAdornment } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const PasswordAddornment = ({ callback, isVisible }) => {
  return (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={callback}
        edge="end"
        color="lightGray"
      >
        {isVisible ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  )
}
