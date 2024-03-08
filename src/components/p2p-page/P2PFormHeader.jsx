import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IconButton, Stack, Typography } from '@mui/material'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { FormContentWrapper } from '../orderCreate-page/Styled'

export const P2PFormHeader = ({ step, setStep, setOrder }) => {
  const navigate = useNavigate()

  const handleBack = () => {
    if (step === 'details') {
      setStep(2)
      return;
    }
    if (step === 'payments') {
      setStep(2)
      return;
    }
    if (step === 1) {
      navigate(-1)
    }
    if (step === 2) {
      setOrder('')
    }
    setStep(state => state - 1)
  }

  return (
    <FormContentWrapper>
      <Stack flexDirection={'row'} gap={1} alignItems={'center'}>
        <IconButton color="primary" size="small" onClick={handleBack}>
          <NavigateBeforeIcon />
        </IconButton>
        <Typography>P2P Маркет</Typography>
      </Stack>
    </FormContentWrapper>
  )
}
