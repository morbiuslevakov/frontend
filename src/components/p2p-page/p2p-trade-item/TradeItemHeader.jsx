import React from 'react'
import { Stack, Typography } from '@mui/material'
import { OrderActionWrapper } from '../../orderCreate-page/Styled'
import { actionType } from '../../../utils/constants/order-create'
import { FormStackSection } from '../../form/FormStackSection'

export const TradeItemHeader = ({ states, oneTokenPrice }) => {
  return (
    <FormStackSection >
      <Stack>
        <Typography>{oneTokenPrice} {states.currency}</Typography>
        <Typography variant='gray'>Цена за 1 {states.crypto}</Typography>
      </Stack>
      <OrderActionWrapper>
        <Typography fontWeight={600} variant='blue'>{actionType[states.type]}</Typography>
      </OrderActionWrapper>
    </FormStackSection>
  )
}
