import React from 'react'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'

export const RedirectLink = ({ text, linkText }) => {
  return (
    <Typography>{text} <Link to="/login">{linkText}</Link></Typography>
  )
}
