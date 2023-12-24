import React from 'react'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'

export const RedirectLink = ({ text, linkText, link }) => {
  return (
    <Typography>{text} <Link to={link}>{linkText}</Link></Typography>
  )
}
