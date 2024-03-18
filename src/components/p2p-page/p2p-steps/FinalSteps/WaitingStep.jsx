import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Stack, Typography } from '@mui/material'
import { ReactComponent as WaitingImage } from '../../../../images/p2p/p2p-waiting.svg'
import { StatusAndAppeal } from './StatusAndAppeal'

export const WaitingStep = () => {
  const navigate = useNavigate()

  const handleP2P = () => {
    navigate('/p2p')
  }

  return (
    <Stack alignItems={'center'} py={5} gap={3}>
      <StatusAndAppeal image={<WaitingImage />}
        title={'Дождитесь подтверждения об оплате'}
        text={'Продавец должен подтвердить получение платежа в течение 10 мин'} />
      <Button variant="contained" color='darkAqua' onClick={handleP2P}>
        <Typography variant='aqua'>Открыть P2P Маркет</Typography>
      </Button>
    </Stack>
  )
}
