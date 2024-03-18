import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Button, Stack, Typography } from '@mui/material'

export const ControlButtons = () => {
  const navigate = useNavigate()

  const handleSend = () => {
    navigate('/p2p/sell')
  }

  const handleBuy = () => {
    navigate('/p2p/buy')
  }

  return (
    <Stack flexDirection={'row'} gap={2} width={'100%'} justifyContent={'center'}>
      <Box width={'45%'}>
        <Button fullWidth variant="outlined" onClick={handleBuy}>
          <Typography pl={1}>Купить</Typography>
        </Button>
      </Box>
      <Box width={'30%'}>
        <Button fullWidth variant="outlined" onClick={handleSend}>
          <Typography pl={1}>Продать</Typography>
        </Button>
      </Box>
    </Stack>
  )
}
