import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Stack, Typography } from '@mui/material'
import { ReactComponent as ConfirmImage } from '../../../../images/p2p/p2p-confirm.svg'
import { StatusAndAppeal } from './StatusAndAppeal'
import { getStatusMessage } from '../../../../utils/p2p-utils'

export const CompleteStep = ({ states, amount, myRole }) => {
  const navigate = useNavigate()
  const statusText = getStatusMessage(states, myRole, amount)

  const handleP2P = () => {
    navigate('/p2p')
  }

  return (
    <Stack alignItems={'center'} py={5} gap={3} >
      <StatusAndAppeal image={<ConfirmImage />}
        title={'Платеж подтвержден'}
        text={statusText} />
      <Button variant="contained" color='darkAqua' onClick={handleP2P}>
        <Typography variant='aqua'>Открыть P2P Маркет</Typography>
      </Button>
    </Stack>
  )
}
