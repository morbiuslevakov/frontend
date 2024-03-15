import React from 'react'
import { Stack, Typography } from '@mui/material';
import { FormStackSection } from '../form/FormStackSection';
import { FormContentWrapper, FormSectionWrapper } from '../orderCreate-page/Styled';
import { actionType } from '../../utils/constants/order-create';
import { OrderCancelButton } from './OrderCancelButton';

export const OrderItem = ({ order, rates }) => {
  const tokentPrice = (rates[0]?.price)?.toFixed(2)
  const maxLimit = (order.available * tokentPrice).toFixed(2);

  return <Stack gap={0.2}>
    <FormStackSection justifyContent="space-between">
      <Stack>
        <Typography>{tokentPrice} {order.currency}</Typography>
        <Typography variant='gray'>Цена за 1 {order.asset}</Typography>
      </Stack>
      <OrderCancelButton orderId={order.orderId} status={order.status} />
    </FormStackSection>
    <FormSectionWrapper>
      <FormContentWrapper width={'80%'}>
        <Stack pt={2} gap={0.7}>
          <Stack flexDirection={'row'} justifyContent={'space-between'}>
            <Typography variant='gray'>Доступно</Typography>
            <Typography>{order.available} {order.asset}</Typography>
          </Stack>
          <Stack flexDirection={'row'} justifyContent={'space-between'}>
            <Typography variant='gray'>Лимиты</Typography>
            <Typography>{order.minSum} - {maxLimit} {order.currency}</Typography>
          </Stack>
          <Stack flexDirection={'row'} justifyContent={'space-between'}>
            <Typography variant='gray'>Методы оплаты</Typography>
            <Stack flexDirection={'row'}>
              <Typography >{order.bankNames.join(', ')}</Typography>
            </Stack>
          </Stack>
          <Stack flexDirection={'row'} justifyContent={'space-between'}>
            <Typography variant='gray'>Тип сделки</Typography>
            <Typography>{actionType[order.type]}</Typography>
          </Stack>
        </Stack>
      </FormContentWrapper>
    </FormSectionWrapper>
  </Stack>
}
