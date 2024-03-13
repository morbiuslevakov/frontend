import { Stack } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { UserAndAction } from './UserAndAction';
import { orderActionText } from '../../../utils/p2p-utils';
import { Stomp } from '@stomp/stompjs';
import { acceptDealApi, cancelDealApi, confirmPaymentApi, getDealFromApi, makePaymentsFromApi, proofPaymentApi } from '../../../utils/api-utils';
import { getCancelButton, getFooterButton } from '../../../utils/deal-utils';
import { OrderOnlyDeal } from '../orderDeal/OrderOnlyDeal';
import { CompleteStep } from './FinalSteps/CompleteStep';
import { WaitingStep } from './FinalSteps/WaitingStep';
import UserContext from '../../../context/user-context';
import { Centrifuge } from 'centrifuge';

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
    // if (Object.keys(deal).length !== 0) {
    const centrifuge = new Centrifuge('wss://centrifugo.deaslide.com/connection/websocket');
    centrifuge.connect();
    const subscription = centrifuge.newSubscription(`deal:${dealId}`);
    subscription.on('publication', (message) => {
      console.log("Получены данные: ", message);
      setDeal(message.data);
    });

    subscription.subscribe()

    return () => {
      centrifuge.disconnect();
    };
    // }
  }, [deal.dealId]);

  // useEffect(() => { // надо избавиться от зависимостей. подумать. возможно через хук с подклчюениями + обработкой саба
  //   if (Object.keys(deal).length !== 0) {
  //     const client = Stomp.over(new WebSocket('wss://api.deaslide.com/ws'));

  //     client.connect({}, () => {
  //       client.subscribe(`/topic/deal/${dealId}`, async (message) => {
  //         console.log("Получены данные: ", message.body);
  //         const data = JSON.parse(message.body);
  //         setDeal(data);
  //       });
  //     }, (error) => {
  //       console.error("Ошибка соединения", error);
  //     });

  //     return () => {
  //       client.disconnect();
  //     };
  //   }
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
  // return <>
  //   <WaitingStep />
  // </>

  console.log(deal)

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
