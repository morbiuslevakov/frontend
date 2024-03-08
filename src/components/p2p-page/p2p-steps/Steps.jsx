import React, { useEffect, useState } from 'react'
import { OrderFullDetails } from './OrderFullDetails'
import { Box } from '@mui/material'
import { FormFooterButton } from '../../buttons/FormFooterButton'
import { InputSection } from './InputSection'
import { OrderDetails } from './OrderDetails'
import { CompleteStep } from './FinalSteps/CompleteStep'
import { WaitingStep } from './FinalSteps/WaitingStep'
import { confirmPaymentApi, initDealToApi, makePaymentsFromApi } from '../../../utils/api-utils'
import { countFinalAmount, countMaxLimit, createDealData, orderButtonText } from '../../../utils/p2p-utils'
import { OrderDeal } from '../orderDeal/OrderDeal'
import { Stomp } from '@stomp/stompjs'
import { OrderPayments } from './OrderPayments'

const isButtonDisabled = (amount, type, payments) => {
  if (type === "BUY") {
    if (amount <= 0) {
      return true
    }
    if (payments.length <= 0) {
      return true
    }
    return false
  }
  return amount <= 0
}

export const Steps = ({ amount, setAmount, currentStep, states, order, setState }) => {
  const [deal, setDeal] = useState({})
  const dealStatus = deal.status

  const isDisabled = isButtonDisabled(amount, states.type, states.paymentMethods)

  console.log(states.type)

  const buttonText = orderButtonText(states.type)

  const cryptoBalance = states.walletInfo.assets[states.crypto].balance

  const selectedToken = states.cryptoDetails?.find(crypto => crypto.asset === states.crypto)
  const oneTokenPrice = order.priceType === 'FIXED' ? order.price : ((order.price * 0.01) * selectedToken.price).toFixed(2)

  const maxLimit = countMaxLimit(states.type, order.available, oneTokenPrice, cryptoBalance)
  const maxLimitInCurrency = (order.available * oneTokenPrice).toFixed(2);

  const handleBack = () => {
    setState.step(2)
  }

  const handleClick = () => {
    setState.step(3)
  }

  const handleInitDeal = async () => {
    const finalAmount = countFinalAmount(states.type, amount, oneTokenPrice)
    const data = createDealData(states.type, order, finalAmount, states.paymentMethods)
    initDealToApi(data).then(res => {
      setDeal(res)
    }).catch(error => {
      console.log(error)
    })
  }

  const handleMakePayment = async () => {
    makePaymentsFromApi(deal.dealId)
  }

  const handleConfirmPayment = async () => {
    confirmPaymentApi(deal.dealId)
  }

  const getFooterButton = (status) => {
    if (status === "PROCESSED") {
      return <Box mt={2}>
        <FormFooterButton text={'Подтвердить платеж'} callback={handleConfirmPayment} />
      </Box>
    }
    if (status === "OPENED") {
      return <Box mt={2}>
        <FormFooterButton text={'Совершить платеж'} callback={handleMakePayment} />
      </Box>
    }
    if (status === "INITIALIZED") {
      return null
    }
    return <Box mt={2}>
      <FormFooterButton text={'Создать сделку'} callback={handleInitDeal} />
    </Box>
  }

  // после idit deal мы берем dealId

  useEffect(() => {
    if (Object.keys(deal).length !== 0) { // Проверяем, что deal не пустой
      const dealId = deal.dealId; // Или как вы получаете dealId из ответа
      const client = Stomp.over(new WebSocket('wss://api.deaslide.com/ws'));

      client.connect({}, () => {
        client.subscribe(`/topic/deal/${dealId}`, async (message) => {
          console.log("Получены данные: ", message.body);
          const data = JSON.parse(message.body);
          // if (data.status === "OPENED") {
          //   console.log(`Статус открыт, выполняем платеж для сделки ${data.dealId}`);
          //   await makePaymentsFromApi(data.dealId);
          // }
          // Обновляем состояние сделки каждый раз, когда получаем сообщение
          setDeal(data);
        });
      }, (error) => {
        console.error("Ошибка соединения", error);
      });

      return () => {
        client.disconnect();
      };
    }
  }, [deal.dealId]); // Зависимость от deal



  if (currentStep === 'payments') {
    return <>
      <OrderPayments order={order} states={states} setState={setState} />
    </>
  }

  if (currentStep === 'details') {
    return <>
      <OrderFullDetails states={states} order={order} oneTokenPrice={oneTokenPrice} maxLimit={maxLimit} />
      <Box mt={2}>
        <FormFooterButton text={'Назад'} callback={handleBack} />
      </Box>
    </>
  }

  if (dealStatus === "COMPLETED") { // поменять потом на complete
    return <>
      <CompleteStep states={states} amount={deal.amount} />
    </>
  }

  if (dealStatus === "CONFIRMED") {
    return <>
      <WaitingStep />
    </>
  }

  console.log('deal ', deal)

  if (currentStep === 2) {
    return <>
      <InputSection amount={amount} setAmount={setAmount} states={states} oneTokenPrice={oneTokenPrice} maxLimit={maxLimit} />
      <OrderDetails cryptoBalance={cryptoBalance} states={states} setState={setState} order={order} maxLimit={maxLimitInCurrency} />
      <Box mt={2}>
        <FormFooterButton text={buttonText} isDisabled={isDisabled} callback={handleClick} />
      </Box>
    </>
  }

  const footerButton = getFooterButton(deal.status)

  if (currentStep === 3) {
    return <>
      <OrderDeal deal={deal} states={states} setState={setState} amount={amount} tokenPrice={oneTokenPrice} order={order} />
      {footerButton}
    </>
  }

}
