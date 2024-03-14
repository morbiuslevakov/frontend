import { Stack, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { UserAndAction } from './UserAndAction';
import { orderActionText } from '../../../utils/p2p-utils';
// import { Stomp } from '@stomp/stompjs';
import { acceptDealApi, cancelDealApi, confirmPaymentApi, getDealFromApi, makePaymentsFromApi, proofPaymentApi } from '../../../utils/api-utils';
import { getCancelButton, getFooterButton } from '../../../utils/deal-utils';
import { OrderOnlyDeal } from '../orderDeal/OrderOnlyDeal';
import { CompleteStep } from './FinalSteps/CompleteStep';
import { WaitingStep } from './FinalSteps/WaitingStep';
import UserContext from '../../../context/user-context';
import { Centrifuge } from 'centrifuge';
import { Chat } from '../chat/Chat';

export const P2PDealSteps = ({ states, setState, dealId }) => {
  const { user } = useContext(UserContext)
  const username = user.username
  const [deal, setDeal] = useState([])
  const dealStatus = deal.status

  const currentStep = states.step;
  const makerUsername = deal.maker?.username
  const takerUsername = deal.taker?.username
  const myRole = makerUsername === username ? "maker" : "taker"

  const actionText = orderActionText(states.type, myRole)


  const [chatMessages, setChatMessages] = useState([]) // Добавленный стейт для хранения сообщений чата

  // console.log('deal ', deal)

  useEffect(() => {
    const fetchDeal = async () => {
      const dealFromApi = getDealFromApi(dealId)
      return dealFromApi
    }
    fetchDeal().then(res => {
      setDeal(res)
    }).catch(error => { console.log(error) })
  }, [dealId])

  useEffect(() => {
    const centrifuge = new Centrifuge('wss://centrifugo.deaslide.com/connection/websocket');
    centrifuge.connect();
    const dealSubscription = centrifuge.newSubscription(`deal:${dealId}`);
    dealSubscription.on('publication', (message) => {
      console.log("Получены данные сделки: ", message);
      setDeal(message.data);

      // Проверяем, существует ли подписка на чат, прежде чем создавать новую
      const chatChannel = `chat:${message.data.chatId}`;
      let chatSubscription = centrifuge.getSubscription(chatChannel);

      if (!chatSubscription) {
        // Подписка не найдена, создаем новую
        chatSubscription = centrifuge.newSubscription(chatChannel);
        chatSubscription.on('publication', (chatMessage) => {
          console.log("Получены данные чата: ", chatMessage);
          setChatMessages(prevMessages => [...prevMessages, chatMessage.data]); // Добавление сообщения в стейт
        });
        chatSubscription.subscribe();
      }
    });

    dealSubscription.subscribe()

    return () => {
      centrifuge.disconnect();
    };
  }, [dealId]); // Использование dealId как зависимость

  // useEffect(() => {
  //   // if (Object.keys(deal).length !== 0) {
  //   const centrifuge = new Centrifuge('wss://centrifugo.deaslide.com/connection/websocket');
  //   centrifuge.connect();
  //   const subscription = centrifuge.newSubscription(`deal:${dealId}`);
  //   subscription.on('publication', (message) => {
  //     console.log("Получены данные: ", message);
  //     setDeal(message.data);
  //   });

  //   subscription.subscribe()

  //   return () => {
  //     centrifuge.disconnect();
  //   };
  //   // }
  // }, [deal.dealId]);

  if (dealStatus === "COMPLETED") {
    return <>
      <CompleteStep states={states} amount={deal.amount} myRole={myRole} />
    </>
  }

  if (dealStatus === "CONFIRMED" && myRole === 'maker' && states.type === "BUY") {
    return <>
      <WaitingStep />
    </>
  }

  if (dealStatus === "CONFIRMED" && myRole === 'taker' && states.type === "SELL") {
    return <>
      <WaitingStep />
    </>
  }

  const handleMakePayment = async () => {
    makePaymentsFromApi(dealId)
  }

  const handleConfirmPayment = async () => {
    confirmPaymentApi(dealId)
  }

  const handleProofPayment = async () => {
    proofPaymentApi(dealId)
  }

  const handleAcceptDeal = async () => {
    acceptDealApi(dealId)
  }

  const handleCancelDeal = async () => {
    cancelDealApi(dealId)
  }

  const footerButton = getFooterButton(states.type, deal.status, handleAcceptDeal, handleConfirmPayment, handleMakePayment, handleProofPayment, myRole)
  const cancelButton = getCancelButton(deal.status, handleCancelDeal, myRole, states.type)

  if (states.isChat) {
    // Предполагаем, что chatMessage это последнее сообщение из центрифуги
    const lastMessage = chatMessages[chatMessages.length - 1];
    return <Chat deal={deal} chatId={deal.chatId} myRole={myRole} lastMessage={lastMessage} />
  }

  return (
    <Stack>
      {(myRole === 'maker' && takerUsername) && <UserAndAction step={currentStep} username={takerUsername} text={actionText} />}
      {(myRole === 'taker' && makerUsername) && <UserAndAction step={currentStep} username={makerUsername} text={actionText} />}
      <>
        <OrderOnlyDeal deal={deal} states={states} setState={setState} myRole={myRole} />
        {cancelButton}
        {footerButton}
      </>
    </Stack>
  )
}
