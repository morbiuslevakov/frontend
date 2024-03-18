import React from 'react'
import { Box, Stack, Typography } from '@mui/material'

export const StatusAndAppeal = ({ image, title, text }) => {

  // const handleAppeal = () => {
  //   console.log('Appeal click')
  // }

  return (
    <>
      <Box width={'100%'} maxWidth={700} sx={{ margin: 'auto', display: 'flex', justifyContent: 'center' }}>
        <Box width={'50%'} height={'auto'} sx={{ '& svg': { width: '100%', height: 'auto' } }}>
          {image}
        </Box>
      </Box>
      <Stack alignItems={'center'} >
        <Typography fontSize={24} fontWeight={500} textAlign={'center'}>{title}</Typography>
        <Typography textAlign={'center'} width={'80%'}>{text}</Typography>
      </Stack>
      {/* <Button onClick={handleAppeal}>
        <Typography fontWeight={600} variant='aqua'>Отправить апелляцию</Typography>
      </Button> */}
    </>
  )
}
