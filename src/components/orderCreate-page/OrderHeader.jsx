import React from 'react'
import { IconButton, Stack, Typography } from '@mui/material'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { FormContentWrapper } from './Styled'
import { stepsNames } from '../../utils/constants/order-create';

export const OrderHeader = ({ states, handlePrevious }) => {
  const isDisabled = states.currentStep === 1

  return (
    <FormContentWrapper>
      <Stack flexDirection={'row'} gap={1} alignItems={'center'}>
        <IconButton color="primary" size="small" onClick={handlePrevious} disabled={isDisabled}>
          <NavigateBeforeIcon />
        </IconButton>
        <Typography>{stepsNames[states.currentStep]}</Typography>
        <Typography variant='gray'>{states.currentStep}/4</Typography>
      </Stack>
    </FormContentWrapper>
  )
}
