import React from 'react'
import { Badge, Stack, Typography } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat';
import { FormContentWrapper } from '../../orderCreate-page/Styled'
import { Status } from './Status';
import { DealPayments } from './DealPayments';
import { FormStackSection } from '../../form/FormStackSection';
import { FormStackClickSection } from '../../form/FormStackClickSection';

export const OrderOnlyDeal = ({ deal, states, setState, myRole, hasNewMessages }) => {

  const handleClick = async () => {
    setState.isChat(true)
  }

  return (
    <Stack gap={3}>
      <FormContentWrapper>
        <Stack flexDirection={'row'} gap={2} justifyContent={'center'}>
          <Typography fontSize={48} fontWeight={600}>{deal.amount}</Typography>
          <Typography variant={'gray'} fontSize={32} fontWeight={600} pt={2.7}>{deal.assetAlias}</Typography>
        </Stack>
      </FormContentWrapper>
      {deal.chatAvailable && <FormStackClickSection handleClick={handleClick}>
        <Typography>Перейти в чат</Typography>
        <Badge color="error" variant="dot" invisible={!hasNewMessages}>
          <ChatIcon color='gray' />
        </Badge>
      </FormStackClickSection>}
      <Stack gap={0.2}>
        <Status
          type={states.type}
          deal={deal}
          myRole={myRole}
        />
      </Stack>
      <Stack gap={0.2}>
        <FormStackSection>
          <Typography>Цена за 1 {deal.assetAlias}</Typography>
          <Typography>{deal.price} {states.currency}</Typography>
        </FormStackSection>
        <FormStackSection>
          <Typography>Сумма</Typography>
          <Typography>{deal.sum} {states.currency}</Typography>
        </FormStackSection>
        <FormStackSection>
          <Typography>Метод оплаты</Typography>
          <Typography>{deal.paymentPreview}</Typography>
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