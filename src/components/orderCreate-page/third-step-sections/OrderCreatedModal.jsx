import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Modal, Stack, Typography } from '@mui/material'
import { DefaultModal } from '../../card-wrappers/Styled'

export const OrderCreatedModal = ({ isOpen }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/p2p')
  }

  return (
    <Modal open={isOpen} >
      <DefaultModal>
        <Stack gap={3}>
          <Typography fontSize={22} textAlign={'center'}>
            Объявление успешно создано!
          </Typography>
          <Button fullWidth variant="contained" color='blue' onClick={handleClick}>К объявлениям</Button>
        </Stack>
      </DefaultModal>
    </Modal>
  )
}
