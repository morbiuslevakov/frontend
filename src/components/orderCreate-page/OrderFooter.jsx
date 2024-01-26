import React from 'react'
import { Box } from '@mui/material'
import { FormFooterButton } from '../buttons/FormFooterButton'

export const OrderFooter = ({ states, handleNext }) => {
  const isDisabled = !states.isAvailableNext
  const buttonText = states.currentStep === 4 ? "Создать объявление" : "Далее"

  return (
    <Box mt={2}>
      <FormFooterButton text={buttonText} isDisabled={isDisabled} callback={handleNext} />
    </Box>
  )
}
