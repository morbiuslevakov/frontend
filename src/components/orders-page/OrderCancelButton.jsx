import React from 'react'
import { Box, Button } from '@mui/material'
import { ErrorButton } from '../buttons/ErrorButton'
import { cancelOrderApi } from '../../utils/api-utils'

export const OrderCancelButton = ({ orderId, status }) => {
  const handleCancel = async () => {
    cancelOrderApi(orderId).then(() => {
      window.location.reload()
    }).catch(error => {
      console.log(error)
    })
  }

  if (status === 'CANCELED') {
    return (
      <Box>
        <Button disabled variant="contained" color="primary">Возобновить</Button>
      </Box>
    )
  }

  if (status === 'OPENED') {
    return (
      <Box>
        <ErrorButton text={'Отменить'} callback={handleCancel} />
      </Box>
    )
  }

  return null
}
