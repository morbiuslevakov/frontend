import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import Header from '../../components/header/Header'

export const SharedLayout = () => {
  return (
    <>
      <Header />
      <Box mt={11}>
        <Outlet />
      </Box>
    </>
  )
}
