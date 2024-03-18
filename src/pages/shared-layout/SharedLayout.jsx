import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import { AppHeader } from '../../components/Header/AppHeader'
import { useMediaQueryHook } from "../../hooks/use-media-query.hook";

export const SharedLayout = () => {
  const isMobile = useMediaQueryHook('sm')
  const marginTop = isMobile ? 9 : 11

  return (
    <>
      <AppHeader />
      <Box mt={marginTop}>
        <Outlet />
      </Box>
    </>
  )
}
