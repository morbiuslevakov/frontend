import React from 'react'
import { Stack } from '@mui/material'
import { PaymentPreview } from './second-step-sections/PaymentPreview'

const mockPayments = [
  { id: 696969, name: "Сбербанк", currency: "RUB", number: "79999999999" },
  { id: 109245, name: "Тинькоф", currency: "RUB", number: "+79956327213" },
  { id: 456386, name: "Альфа-банк", currency: "RUB", number: "79999912345" },
  { id: 982536, name: "СБП", currency: "RUB", number: "+79956327213" }
]

export const SecondStep = ({ states, setState }) => {
  return (
    <>
      <Stack gap={0.2}>
        {mockPayments.map(payment => {
          return <PaymentPreview key={payment.id} payment={payment} selectedMehod={states.paymentMethod} setPayment={setState.paymentMethod} />
        })}
      </Stack>
    </>
  )
}
