import React from 'react'
import { Stack, Typography } from '@mui/material'
import { FormContentWrapper } from '../../orderCreate-page/Styled'
import { Status } from './Status';
import { Time } from './Time';
import { SmallDetails } from './SmallDetails';
import { DealPayments } from './DealPayments';
import { countFinalAmount } from '../../../utils/p2p-utils';

export const OrderDeal = ({ deal, states, amount, tokenPrice, order }) => {
  const finalAmount = countFinalAmount(states.inputValue, amount, tokenPrice)
  const bankNames = Object.keys(order.payments)

  console.log(tokenPrice)

  return (
    <Stack gap={3}>
      <FormContentWrapper>
        <Stack flexDirection={'row'} gap={2} justifyContent={'center'}>
          <Typography fontSize={48} fontWeight={600}>{finalAmount}</Typography>
          <Typography variant={'gray'} fontSize={32} fontWeight={600} pt={2.7}>{states.crypto}</Typography>
        </Stack>
      </FormContentWrapper>
      <Stack gap={0.2}>
        <Status
          type={states.type}
          deal={deal}
        />
        <Time />
      </Stack>
      <SmallDetails deal={deal} states={states} bankNames={bankNames} amount={amount} tokenPrice={tokenPrice} />
      <DealPayments payment={deal.payment} />
    </Stack>
  )
}
