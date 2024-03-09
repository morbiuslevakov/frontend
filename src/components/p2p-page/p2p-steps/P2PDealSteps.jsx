import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { UserAndAction } from './UserAndAction';
import { Steps } from './Steps';
import { orderActionText } from '../../../utils/p2p-utils';
import { Stomp } from '@stomp/stompjs';
import { confirmPaymentApi, getDealFromApi, makePaymentsFromApi } from '../../../utils/api-utils';
import { OrderDeal } from '../orderDeal/OrderDeal';
import { getFooterButton } from '../../../utils/deal-utils';
import { OrderOnlyDeal } from '../orderDeal/OrderOnlyDeal';
import { CompleteStep } from './FinalSteps/CompleteStep';
import { WaitingStep } from './FinalSteps/WaitingStep';

export const P2PDealSteps = ({ states, setState, dealId }) => {
  const [deal, setDeal] = useState([])
  const dealStatus = deal.status

  const currentStep = states.step;
  const username = deal.maker?.username
  // const [amount, setAmount] = useState(0)
  // const selectedOrder = states.orders.find(order => order.id === states.selectedOrder)
  const actionText = orderActionText(states.type)

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
    if (Object.keys(deal).length !== 0) {
      const client = Stomp.over(new WebSocket('wss://api.deaslide.com/ws'));

      client.connect({}, () => {
        client.subscribe(`/topic/deal/${dealId}`, async (message) => {
          console.log("Получены данные: ", message.body);
          const data = JSON.parse(message.body);
          setDeal(data);
        });
      }, (error) => {
        console.error("Ошибка соединения", error);
      });

      return () => {
        client.disconnect();
      };
    }
  }, [deal.dealId]);

  console.log('deal in p2p deal steps ', deal)

  if (dealStatus === "COMPLETED") {
    return <>
      <CompleteStep states={states} amount={deal.amount} />
    </>
  }

  if (dealStatus === "CONFIRMED") {
    return <>
      <WaitingStep />
    </>
  }


  const handleInitDeal = () => { }

  const handleMakePayment = async () => {
    makePaymentsFromApi(dealId)
  }

  const handleConfirmPayment = async () => {
    confirmPaymentApi(dealId)
  }

  const footerButton = getFooterButton(deal.status, handleConfirmPayment, handleMakePayment, handleInitDeal)

  return (
    <Stack>
      {username && <UserAndAction step={currentStep} username={username} text={actionText} />}
      <>
        <OrderOnlyDeal deal={deal} states={states} setState={setState} />
        {footerButton}
      </>
      {/* <Steps amount={amount} setAmount={setAmount} currentStep={currentStep} states={states} order={selectedOrder} setState={setState} /> */}
    </Stack>
  )
}
