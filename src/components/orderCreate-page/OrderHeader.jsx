import React from 'react'
import { IconButton, Stack, Typography } from '@mui/material'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { FormContentWrapper } from './Styled'
import { stepsNames } from '../../utils/constants/order-create';

export const OrderHeader = ({ states, handlePrevious }) => {
  return (
    <FormContentWrapper>
      <Stack flexDirection={'row'} gap={1} alignItems={'center'}>
        <IconButton color="primary" size="small" onClick={handlePrevious}>
          <NavigateBeforeIcon />
        </IconButton>
        <Typography>{stepsNames[states.currentStep]}</Typography>
        <Typography variant='gray'>{states.currentStep}/4</Typography>
      </Stack>
    </FormContentWrapper>
  )
}
