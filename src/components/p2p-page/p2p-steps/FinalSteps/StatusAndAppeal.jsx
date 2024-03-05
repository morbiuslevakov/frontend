import React from 'react'
import { Button, Stack, Typography } from '@mui/material'

export const StatusAndAppeal = ({ image, title, text }) => {

  const handleAppeal = () => {
    console.log('Appeal click')
  }

  return (
    <>
      {image}
      <Stack alignItems={'center'} >
        <Typography fontSize={24} fontWeight={500}>{title}</Typography>
        <Typography textAlign={'center'} width={'80%'}>{text}</Typography>
      </Stack>
      <Button onClick={handleAppeal}>
        <Typography fontWeight={600} variant='aqua'>Отправить апелляцию</Typography>
      </Button>
    </>
  )
}
