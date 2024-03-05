import React from 'react'
import { Stack } from '@mui/material';
import { FormContentWrapper, FormSectionWrapper } from '../../orderCreate-page/Styled';
import { TradeItemHeader } from './TradeItemHeader';
import { TradeItemUser } from './TradeItemUser';
import { TradeItemDetails } from './TradeItemDetails';

export const P2PTradeItem = ({ states, order, setOrder, setStep }) => {
  const selectedToken = states.cryptoDetails?.find(crypto => crypto.asset === states.crypto)
  const oneTokenPrice = order.priceType === 'FIXED' ? order.price : ((order.price * 0.01) * selectedToken?.price).toFixed(2)
  const maxLimit = (order.available * oneTokenPrice).toFixed(2);

  const handleSelect = () => {
    console.log(order)
    setOrder(order.id)
    setStep(2)
  }

  return (
    <Stack gap={0.2} onClick={handleSelect} sx={{ cursor: 'pointer' }}>
      <TradeItemHeader states={states} oneTokenPrice={oneTokenPrice} />
      <FormSectionWrapper>
        <FormContentWrapper width={'75%'}>
          <TradeItemUser username={order.user.username} deals={order.user.deals} completedPercent={order.user.completedPercent} />
          <TradeItemDetails states={states} order={order} token={states.crypto} maxLimit={maxLimit} />
        </FormContentWrapper>
      </FormSectionWrapper>
    </Stack>
  )
}
