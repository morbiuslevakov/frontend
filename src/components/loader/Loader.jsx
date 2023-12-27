import React from 'react'
import { CircularProgress } from '@mui/material'
import { Wrapper } from './Styled'

export const Loader = () => {
  return (
    <Wrapper>
      <CircularProgress color="inherit" />
    </Wrapper>
  )
}
