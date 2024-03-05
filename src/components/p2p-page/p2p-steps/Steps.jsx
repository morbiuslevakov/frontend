import React, { useState } from 'react'
import { OrderFullDetails } from './OrderFullDetails'
import { Box } from '@mui/material'
import { FormFooterButton } from '../../buttons/FormFooterButton'
import { InputSection } from './InputSection'
import { OrderDetails } from './OrderDetails'
import { CompleteStep } from './FinalSteps/CompleteStep'
import { WaitingStep } from './FinalSteps/WaitingStep'
import { initDealToApi } from '../../../utils/api-utils'
import { createDealData } from '../../../utils/p2p-utils'
import { OrderDeal } from '../orderDeal/OrderDeal'

export const Steps = ({ amount, setAmount, currentStep, states, order, setState }) => {
  const [deal, setDeal] = useState({})
  const isDisabled = amount <= 0

  const selectedToken = states.cryptoDetails?.find(crypto => crypto.asset === states.crypto)
  const oneTokenPrice = order.priceType === 'FIXED' ? order.price : ((order.price * 0.01) * selectedToken.price).toFixed(2)

  const maxLimit = (order.available * oneTokenPrice).toFixed(2);

  const handleBack = () => {
    setState.step(2)
  }

  const handleClick = () => {
    setState.step(3)
  }


  const handleInitDeal = async () => {
    const finalAmount = (amount / oneTokenPrice)
    const data = createDealData(states.type, order, finalAmount)
    initDealToApi(data).then(res => {
      console.log(res)
      setDeal(res)
    }).catch(error => {
      console.log(error)
    })
  }

  // после idit deal мы берем dealId

  //   useEffect(() => {
  //     const client = Stomp.over(new WebSocket('wss://api.deaslide.com/ws'));

  //     client.connect({}, () => {
  //         client.subscribe('/topic/deal/65e383ea57c44e38659371f3', async (message) => {
  //             console.log("Получены данные: ", message.body);
  //             const data = JSON.parse(message.body);
  //             if (data.status === "OPENED") {
  //                 console.log(`Статус открыт, выполняем платеж для сделки ${data.dealId}`);
  //                 await makePaymentsFromApi(data.dealId);
  //             }
  //         });
  //     }, (error) => {
  //         console.error("Ошибка соединения", error);
  //     });

  //     return () => {
  //         client.disconnect();
  //     };
  // }, []);

  // useEffect(() => {
  //     confirmPaymentApi('65e383ea57c44e38659371f3').then(res => {
  //         console.log(res)
  //     }).catch(error => {
  //         console.log('error ', error)
  //     })
  // }, [])

  // confirmPaymentApi('65e383ea57c44e38659371f3').then(res => {
  //     console.log(res)
  // }).catch(error => {
  //     console.log('error ', error)
  // })


  if (currentStep === 'details') {
    return <>
      <OrderFullDetails states={states} order={order} oneTokenPrice={oneTokenPrice} maxLimit={maxLimit} />
      <Box mt={2}>
        <FormFooterButton text={'Назад'} callback={handleBack} />
      </Box>
    </>
  }

  if (currentStep === 'complete') { // поменять потом на complete
    return <>
      <CompleteStep states={states} amount={amount} />
    </>
  }

  if (currentStep === 'waiting') { // поменять потом на waiting
    return <>
      <WaitingStep />
    </>
  }

  if (currentStep === 2) {
    return <>
      <InputSection amount={amount} setAmount={setAmount} states={states} oneTokenPrice={oneTokenPrice} maxLimit={maxLimit} />
      <OrderDetails states={states} setState={setState} order={order} maxLimit={maxLimit} />
      <Box mt={2}>
        <FormFooterButton text={'Купить'} isDisabled={isDisabled} callback={handleClick} />
      </Box>
    </>
  }

  if (currentStep === 3) {
    return <>
      <OrderDeal deal={deal} states={states} setState={setState} amount={amount} tokenPrice={oneTokenPrice} order={order} />
      <Box mt={2}>
        <FormFooterButton text={'Создать сделку'} callback={handleInitDeal} />
      </Box>
    </>
  }

}