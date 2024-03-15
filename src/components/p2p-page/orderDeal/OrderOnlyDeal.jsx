import React from 'react'
import { Stack, Typography } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat';
import { FormContentWrapper } from '../../orderCreate-page/Styled'
import { Status } from './Status';
import { Time } from './Time';
import { DealPayments } from './DealPayments';
import { FormStackSection } from '../../form/FormStackSection';
import { FormStackClickSection } from '../../form/FormStackClickSection';
// import { getChatFromApi, sendMessageChatApi } from '../../../utils/api-utils';

export const OrderOnlyDeal = ({ deal, states, setState, myRole }) => {

  // console.log(states.type)
  // console.log('deal.paymentdeal.paymentdeal.paymentdeal.paymentdeal.payment ', deal.payment)

  let bankNames = "";

  if (deal.payment) {
    if (states.type === "SELL") {
      bankNames = deal.payment?.bank?.name
      // if (myRole === 'taker') {
      // } else {
      //   bankNames = Object.keys(deal.payments)
      // }
    } else {
      if (myRole === 'maker') {
        // bankNames = Object.keys(deal.payments)
        bankNames = deal.payment?.bank?.name
      } else {
        // bankNames = Object.keys(deal.payments)
        bankNames = deal.payment?.bank?.name
      }
    }
  }

  // const bankNames = deal.payment ? states.type === "SELL" ? deal.payment?.bank?.name : Object.keys(deal.payments) : deal.payment?.bank?.name : ""

  const handleClick = async () => {
    // console.log('chat open click')
    setState.isChat(true)
    // sendMessageChatApi({
    //   "chatId": deal.chatId,
    //   "type": "TEXT",
    //   "replyToMessage": "",
    //   "text": "hello nikita",
    //   "caption": "caption for files"
    // })
    // getChatFromApi(deal.chatId).then(res => { console.log('chat from api ', res) }).catch(error => { console.log(error) })
  }

  return (
    <Stack gap={3}>
      <FormContentWrapper>
        <Stack flexDirection={'row'} gap={2} justifyContent={'center'}>
          <Typography fontSize={48} fontWeight={600}>{deal.amount}</Typography>
          <Typography variant={'gray'} fontSize={32} fontWeight={600} pt={2.7}>{deal.assetAlias}</Typography>
        </Stack>
      </FormContentWrapper>
      <FormStackClickSection handleClick={handleClick}>
        <Typography>Перейти в чат</Typography>
        <ChatIcon color='gray' />
      </FormStackClickSection>
      <Stack gap={0.2}>
        <Status
          type={states.type}
          deal={deal}
          myRole={myRole}
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
          <Typography>{deal.sum} {states.currency}</Typography>
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