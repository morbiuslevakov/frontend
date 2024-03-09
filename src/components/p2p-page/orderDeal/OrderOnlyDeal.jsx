import React from 'react'
import { Stack, Typography } from '@mui/material'
import { FormContentWrapper } from '../../orderCreate-page/Styled'
import { Status } from './Status';
import { Time } from './Time';
import { DealPayments } from './DealPayments';
import { FormStackSection } from '../../form/FormStackSection';

export const OrderOnlyDeal = ({ deal, states }) => {
  const bankNames = deal.payment ? states.type === "BUY" ? Object.keys(deal.payments) : deal.payment?.bank?.name : ""

  return (
    <Stack gap={3}>
      <FormContentWrapper>
        <Stack flexDirection={'row'} gap={2} justifyContent={'center'}>
          <Typography fontSize={48} fontWeight={600}>{deal.amount}</Typography>
          <Typography variant={'gray'} fontSize={32} fontWeight={600} pt={2.7}>{deal.assetAlias}</Typography>
        </Stack>
      </FormContentWrapper>
      <Stack gap={0.2}>
        <Status
          type={states.type}
          deal={deal}
        />
        <Time />
      </Stack>
      <Stack gap={0.2}>
        <FormStackSection>
          <Typography>Цена за 1 {deal.assetAlias}</Typography>
          <Typography>{deal.amount} {deal.assetAlias}</Typography>
        </FormStackSection>
        <FormStackSection>
          <Typography>Сумма</Typography>
          <Typography>{deal.amount} {states.currency}</Typography>
        </FormStackSection>
        <FormStackSection>
          <Typography>Методы оплаты</Typography>
          <Typography>{bankNames}</Typography>
        </FormStackSection>
        <FormStackSection>
          <Typography>Время на оплату</Typography>
          <Typography>{deal.paymentTime} мин</Typography>
        </FormStackSection>
      </Stack>
      <DealPayments
        payment={deal.payment} />
    </Stack>
  )
}
