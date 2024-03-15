import React from 'react'
import { Stack, Typography } from '@mui/material'
import { OrderActionWrapper } from '../Styled'
import { actionType } from '../../../utils/constants/order-create'
import { FormStackSection } from '../../form/FormStackSection'

export const MainInfoPreview = ({ states }) => {
  const tokenPrice = states.walletInfo.assets[states.selectedToken].price.toFixed(2)
  const orderAction = actionType[states.orderAction]

  const isFloating = states.priceType === 'FLOATING'
  const text = isFloating ? `${states.percentPrice}% от рыночной цены за 1 ${states.selectedToken}` : `${states.percentPrice} ${states.walletInfo.symbol} за 1 ${states.selectedToken}`
  const totalPrice = isFloating ? (tokenPrice * states.percentPrice / 100).toFixed(2) : `${states.percentPrice}`

  return (
    <FormStackSection >
      <Stack>
        <Typography>{totalPrice} {states.walletInfo.currency}</Typography>
        <Typography variant='gray'>{text}</Typography>
      </Stack>
      <OrderActionWrapper>
        <Typography fontWeight={600} variant='lightBrown'>{orderAction}</Typography>
      </OrderActionWrapper>
    </FormStackSection>
  )
}
