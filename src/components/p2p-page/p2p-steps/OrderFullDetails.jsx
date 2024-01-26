import React from 'react'
import { Stack, Typography } from '@mui/material'
import { FormContentWrapper } from '../../orderCreate-page/Styled'
import { CommentSection } from './CommentSection';
import { FormStackSection } from '../../form/FormStackSection';

export const OrderFullDetails = ({ states, order, oneTokenPrice, maxLimit }) => {
  return (
    <Stack gap={0.2}>
      <FormStackSection>
        <Typography>Цена за 1 {states.crypto} </Typography>
        <Typography>{oneTokenPrice} {states.currency}</Typography>
      </FormStackSection>
      <FormStackSection>
        <Typography>Доступно</Typography>
        <Typography>{order.available} {states.crypto}</Typography>
      </FormStackSection>
      <FormStackSection>
        <Typography>Лимиты</Typography>
        <Typography>{order.minSum} ~ {maxLimit} {states.currency}</Typography>
      </FormStackSection>
      <FormStackSection>
        <Typography>Методы оплаты</Typography>
        <Typography>{order.payments}</Typography>
      </FormStackSection>
      <FormStackSection>
        <Typography>Время на оплату</Typography>
        <Typography>15 мин</Typography>
      </FormStackSection>
      <CommentSection comment={order.comment} />
      <FormContentWrapper>
        <Typography variant='gray' fontSize={14}>ДАННЫЕ ПРОДАВЦА</Typography>
      </FormContentWrapper>
      <FormStackSection>
        <Typography>Имя пользователя</Typography>
        <Typography>{order.user.username}</Typography>
      </FormStackSection>
      <FormStackSection>
        <Typography>Статистика торгов</Typography>
        <Typography>{order.user.deals} сделок · {order.user.completedPercent}%</Typography>
      </FormStackSection>
    </Stack>
  )
}
