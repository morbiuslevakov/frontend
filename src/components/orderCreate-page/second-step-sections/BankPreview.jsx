import React, { useState } from 'react'
import { Button, Typography } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { FormSectionWrapper, FormStack } from '../Styled'
import { AddPaymentModal } from './AddPaymentModal';

export const BankPreview = ({ bank, currency, addPaymentMethod }) => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleOpen = () => {
    setIsOpenModal(true)
  }

  const handleClose = () => {
    setIsOpenModal(false)
  }

  return (
    <FormSectionWrapper>
      <AddPaymentModal bank={bank} isOpen={isOpenModal} handleClose={handleClose} currency={currency} addPaymentMethod={addPaymentMethod} />
      <Button fullWidth onClick={handleOpen}>
        <FormStack width={'100%'} padding={"10px 30px"}>
          <Typography>
            {bank.name}
          </Typography>
          <ArrowForwardIosIcon color="blue" />
        </FormStack >
      </Button>
    </FormSectionWrapper>
  )
}