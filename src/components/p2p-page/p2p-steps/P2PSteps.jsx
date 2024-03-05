import React, { useState } from 'react'
import { Stack } from '@mui/material'
import { UserAndAction } from './UserAndAction'
import { Steps } from './Steps'

export const P2PSteps = ({ states, setState }) => {
  const currentStep = states.step;
  const [amount, setAmount] = useState(0)
  const selectedOrder = states.orders.find(order => order.id === states.selectedOrder)

  return (
    <Stack>
      <UserAndAction step={currentStep} username={selectedOrder.user.username} text="Вы отправляете" />
      <Steps amount={amount} setAmount={setAmount} currentStep={currentStep} states={states} order={selectedOrder} setState={setState} />
    </Stack>
  )
}
