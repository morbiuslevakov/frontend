import React from 'react'
import { Stack } from '@mui/material'
import { BankPreview } from './second-step-sections/BankPreview'
import { useBanks } from '../../hooks/use-banks.hook'
import { PaymentMethod } from './second-step-sections/PaymentMethod'
import { LitePaymentMethod } from './second-step-sections/LitePaymentMethod'

export const SecondStep = ({ states, setState }) => {
  const { allBanks, userPaymentMethods, addPaymentMethod } = useBanks(states.currency)

  console.log(states.currency)

  console.log(allBanks)



  if (states.orderAction === "BUY") {
    return <Stack gap={0.2}>
      {allBanks.map(bank => {
        return <LitePaymentMethod key={bank.id} bank={bank} states={states} setPaymentMethods={setState.paymentMethods} />
      })}
    </Stack>
  }

  return (
    <Stack gap={2}>
      <Stack gap={0.2}>
        {userPaymentMethods.map(method => {
          return <PaymentMethod key={method.id} method={method} states={states} setPaymentMethods={setState.paymentMethods} />
        })}
      </Stack>
      <Stack gap={0.2}>
        {allBanks.map(bank => {
          return <BankPreview key={bank.id} bank={bank} currency={states.currency} addPaymentMethod={addPaymentMethod} />
        })}
      </Stack>
    </Stack>
  )
}
