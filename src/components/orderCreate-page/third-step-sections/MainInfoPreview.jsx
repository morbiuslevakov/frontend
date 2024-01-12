import React from 'react'
import { Stack, Typography } from '@mui/material'
import { FormContentWrapper, FormSectionWrapper, FormStack, OrderActionWrapper } from '../Styled'

export const MainInfoPreview = ({ states }) => {
  const tokenPrice = states.walletInfo.assets[states.selectedToken].price.toFixed(2)
  const totalPrice = (tokenPrice * states.amount * states.percentPrice / 100).toFixed(2)

  return (
    <FormSectionWrapper>
      <FormContentWrapper>
        <FormStack>
          <Stack>
            <Typography>{totalPrice} RUB</Typography>
            <Typography variant='gray'>{states.percentPrice}% от рыночной цены за {states.amount} {states.selectedToken}</Typography>
          </Stack>
          <OrderActionWrapper>
            <Typography fontWeight={600} variant='lightBrown'>{states.orderAction}</Typography>
          </OrderActionWrapper>
        </FormStack>
      </FormContentWrapper>
    </FormSectionWrapper>
  )
}
