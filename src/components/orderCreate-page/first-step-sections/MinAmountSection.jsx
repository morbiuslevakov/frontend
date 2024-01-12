import React from 'react'
import { Stack, Typography } from '@mui/material'
import { FormContentWrapper, FormInput, FormSectionWrapper } from '../Styled'

export const MinAmountSection = ({ errorMessage, states, setDealSum }) => {
  return (
    <FormSectionWrapper>
      <FormContentWrapper>
        <Stack gap={1}>
          <Typography variant='blue' fontWeight={600}>Мин. сумма сделки</Typography>
          <FormInput variant="standard"
            error={!!errorMessage}
            helperText={errorMessage}
            onChange={(event) => { setDealSum(event.target.value) }}
            value={states.dealSum}
            type="number"
            placeholder="Мин. 100"
            endAdornment={<Typography variant='gray'>{states.currency}</Typography>} />
        </Stack>
      </FormContentWrapper>
    </FormSectionWrapper>
  )
}
