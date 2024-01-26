import React from 'react'
import { Modal, Stack, Typography } from '@mui/material'
import { DefaultModal } from '../../card-wrappers/Styled'
import { ErrorButton } from '../../buttons/ErrorButton'

export const OrderErrorModal = ({ error, setError }) => {
  const handleClose = () => {
    setError('')
  }

  return (
    <Modal open={!!error} onClose={handleClose}>
      <DefaultModal>
        <Stack gap={3}>
          <Typography fontSize={22} textAlign={'center'}>{error}</Typography>
          <ErrorButton text={'Закрыть'} callback={handleClose} />
        </Stack>
      </DefaultModal>
    </Modal>
  )
}
