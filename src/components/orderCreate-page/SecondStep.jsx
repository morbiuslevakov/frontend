import React from 'react'
import { Stack } from '@mui/material'
import { BankPreview } from './second-step-sections/BankPreview'
import { useBanks } from '../../hooks/use-banks.hook'
import { PaymentMethod } from './second-step-sections/PaymentMethod'

export const SecondStep = ({ states, setState }) => {
  const { allBanks, userPaymentMethods, addPaymentMethod } = useBanks(states.currency)

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
