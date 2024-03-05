import React from 'react'
import { Stack, Typography } from '@mui/material'
import { FormContentWrapper } from '../../orderCreate-page/Styled'
import { Status } from './Status';
import { Time } from './Time';
import { SmallDetails } from './SmallDetails';
import { DealPayments } from './DealPayments';


const fakeDeal = {
  "dealId": "65e383ea57c44e38659371f3", "status": "OPENED",
  "assetId": "65d305b8ead27cc777095fe8", "assetAlias": "YUSRA",
  "amount": 12.171052631578949, "sum": 222.00000000000003, "price": 18.24,
  "currency": "RUB", "paymentTime": 15, "chatAvailable": true,
  "payment": { "id": "65dcfb727364a9728fbd2ecb", "type": "BANK", "account": "79999999999", "bank": { "id": "65d324fd97ba9a0aac8b07a6", "name": "Тинькофф" } },
  "createdAt": 1709409258637, "maker": { "role": "SELLER", "deals": 0, "completedPercent": 0, "username": "morbiuslevakov" },
  "taker": { "role": "SELLER", "deals": 0, "completedPercent": 0, "username": "howtonik" }
}


export const OrderDeal = ({ deal, states, setState, amount, tokenPrice, order }) => {
  const finalAmount = (amount / tokenPrice).toFixed(2)
  const bankNames = Object.keys(order.payments)

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
          //  deal={deal} 
          deal={fakeDeal}
        />
        <Time />
      </Stack>
      <SmallDetails deal={fakeDeal} states={states} bankNames={bankNames} amount={amount} tokenPrice={tokenPrice} />
      <DealPayments payment={fakeDeal.payment} />
    </Stack>
  )
}
