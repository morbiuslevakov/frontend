import React from 'react'
import { P2PFormOptions } from './P2PFormOptions'
import { CircularProgress, Stack } from '@mui/material'
import { P2PTradeItem } from './p2p-trade-item/P2PTradeItem'

export const OptionsAndList = ({ states, setState }) => {
  return (
    <>
      <P2PFormOptions states={states} setState={setState} />
      {states.isLoading ? <Stack alignItems={'center'} py={10}><CircularProgress /></Stack> : <Stack gap={1} pt={2}>
        {states.orders.map(order => {
          return <P2PTradeItem key={order.id} states={states} order={order} setOrder={setState.order} setStep={setState.step} />
        })}
      </Stack>}
    </>
  )
}
