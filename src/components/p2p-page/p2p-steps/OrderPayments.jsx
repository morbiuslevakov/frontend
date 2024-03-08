import { Stack } from '@mui/material'
import React from 'react'
import { PaymentMethod } from '../../orderCreate-page/second-step-sections/PaymentMethod'
import { BankPreview } from '../../orderCreate-page/second-step-sections/BankPreview'

export const OrderPayments = ({ order, states, setState }) => {
  const orderPayments = order.payments;
  const allowedBankIds = Object.values(orderPayments);
  const filteredBanks = states.allBanks.filter(bank => allowedBankIds.includes(bank.id));
  const filteredUserPaymentMethods = states.userPaymentMethods.filter(method => allowedBankIds.includes(method.bank.id));

  return <Stack gap={2}>
    <Stack gap={0.2}>
      {filteredUserPaymentMethods.map(method => {
        return <PaymentMethod key={method.id} method={method} states={states} setPaymentMethods={setState.paymentMethods} />
      })}
    </Stack>
    <Stack gap={0.2}>
      {filteredBanks.map(bank => {
        return <BankPreview key={bank.id} bank={bank} currency={states.currency} addPaymentMethod={setState.addPaymentMethod} />
      })}
    </Stack>
  </Stack>
}
