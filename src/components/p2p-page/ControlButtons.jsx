import React from 'react'
import { Button, Stack, Typography } from '@mui/material'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import { useNavigate } from 'react-router-dom';

export const ControlButtons = () => {
  const navigate = useNavigate()

  const handleSend = () => {
    navigate('/p2p/sell')
  }

  const handleBuy = () => {
    // navigate('/p2p/buy')
  }

  return (
    <Stack flexDirection={'row'} gap={2}>
      <Button fullWidth variant="outlined" onClick={handleBuy}>
        <ArrowCircleUpIcon fontSize="small" />
        <Typography pl={1}>Купить</Typography>
      </Button>
      <Button fullWidth variant="outlined" onClick={handleSend}>
        <ArrowCircleDownIcon fontSize="small" />
        <Typography pl={1}>Продать</Typography>
      </Button>
    </Stack>
  )
}
