import React from 'react'
import { Box, Button, Typography } from '@mui/material'

export const OrderFooter = ({ states, handleNext }) => {
  const isDisabled = !states.isAvailableNext
  const buttonText = states.currentStep === 3 ? "Создать объявление" : "Далее"

  return (
    <Box mt={2}>
      <Button variant="contained" color="blue" fullWidth disabled={isDisabled} onClick={handleNext}>
        <Typography variant="secondary">{buttonText}</Typography>
      </Button>
    </Box>
  )
}
