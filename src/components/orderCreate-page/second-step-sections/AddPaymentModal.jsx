import React, { useContext, useState } from 'react'
import { Button, CircularProgress, Modal, Stack, Typography } from '@mui/material'
import { DefaultModal } from '../../card-wrappers/Styled';
import { postPaymentMethodsToApi } from '../../../utils/api-utils';
import UserContext from '../../../context/user-context';
import { FormInput } from '../Styled';

export const AddPaymentModal = ({ bank, isOpen, handleClose, currency, addPaymentMethod }) => {
  const { user } = useContext(UserContext)
  const [number, setNumber] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (event) => {
    setError('')
    setNumber(event.target.value)
  }

  const handleSave = async () => {
    try {
      setIsAdding(true)
      const paymentData = {
        "bankId": bank.id,
        "account": number
      }
      const newPayment = await postPaymentMethodsToApi(paymentData)
      addPaymentMethod(newPayment)
      handleClose()
      setNumber('')
    } catch (error) {
      setError(error)
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <DefaultModal>
        <Stack gap={1}>
          <Typography fontSize={22}>
            {`${bank.name} • ${currency}`}
          </Typography>
          <FormInput error={!!error} helperText={error} onChange={handleChange} value={number} variant="standard" placeholder="Аккаунт, номер карты или телефон" />
          <Stack flexDirection={'row'} justifyContent={'end'} gap={2} pt={2} alignItems={'center'}>
            {isAdding ? <CircularProgress size={20} /> : <Button variant="contained" color='blue' disabled={!!!number} onClick={handleSave}>Сохранить</Button>}
            <Button onClick={handleClose}>Отмена</Button>
          </Stack>
        </Stack>
      </DefaultModal>
    </Modal>
  )
}
