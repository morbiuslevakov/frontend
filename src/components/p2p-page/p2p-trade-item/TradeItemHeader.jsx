import React from 'react'
import { Stack, Typography } from '@mui/material'
import { OrderActionWrapper } from '../../orderCreate-page/Styled'
import { actionType } from '../../../utils/constants/order-create'
import { FormStackSection } from '../../form/FormStackSection'
import { switchType } from '../../../utils/p2p-utils'

export const TradeItemHeader = ({ states, oneTokenPrice }) => {
  const stringType = switchType(states.type)
  return (
    <FormStackSection >
      <Stack>
        <Typography>{oneTokenPrice} {states.currency}</Typography>
        <Typography variant='gray'>Цена за 1 {states.crypto}</Typography>
      </Stack>
      <OrderActionWrapper>
        <Typography fontWeight={600} variant='blue'>{actionType[stringType]}</Typography>
      </OrderActionWrapper>
    </FormStackSection>
  )
}
