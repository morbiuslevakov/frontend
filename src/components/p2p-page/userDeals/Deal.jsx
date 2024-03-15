import React from 'react'
import { Stack, Typography } from '@mui/material'
import { DealButton } from './Styled'
import { transformToDate } from '../../../utils/date-utils'
import { actionType } from '../../../utils/constants/order-create'
import { dealString } from '../../../utils/deal-utils'
import { useNavigate } from 'react-router-dom'

export const Deal = ({ deal }) => {
  const navigate = useNavigate()
  const status = dealString[deal.status]
  const isDisabled = deal.status === "CLOSED" || deal.status === "COMPLETED"
  const fixedAmount = deal.amount.toFixed(2)
  const fixedSum = deal.sum.toFixed(2)
  const date = transformToDate(deal.createdAt)
  const stringType = actionType[deal.type]

  // console.log('deal ', deal)

  const handleNavigate = () => {
    if (deal.type === "SELL") {
      navigate(`/p2p/sell/${deal.dealId}`, { dealId: deal.dealId })
    }
    if (deal.type === "BUY") {
      navigate(`/p2p/buy/${deal.dealId}`, { dealId: deal.dealId })
    }
  }

  return (
    <DealButton disabled={isDisabled} onClick={handleNavigate}>
      <Stack py={'15px'} px={'20px'} width={'100%'} alignItems={'start'}>
        <Typography variant={'gray'}>{status}</Typography>
        <Typography>{stringType} {fixedAmount} {deal.asset} за {fixedSum} {deal.currency}</Typography>
        <Typography variant={'gray'}>Метод оплаты: {deal.payment}</Typography>
        <Typography variant={'gray'}>{date}</Typography>
      </Stack>
    </DealButton>
  )
}
