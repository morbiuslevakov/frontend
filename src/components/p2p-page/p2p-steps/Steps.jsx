import React, { useState } from 'react'
import { OrderFullDetails } from './OrderFullDetails'
import { Box } from '@mui/material'
import { FormFooterButton } from '../../buttons/FormFooterButton'
import { InputSection } from './InputSection'
import { OrderDetails } from './OrderDetails'
import { initDealToApi } from '../../../utils/api-utils'
import { countFinalAmount, countMaxLimit, createDealData, orderButtonText } from '../../../utils/p2p-utils'
import { OrderDeal } from '../orderDeal/OrderDeal'
import { OrderPayments } from './OrderPayments'
import { isButtonDisabled } from '../../../utils/deal-utils'
import { useNavigate } from 'react-router-dom'
import { OrderErrorModal } from '../../orderCreate-page/third-step-sections/OrderErrorModal'

export const Steps = ({ amount, setAmount, currentStep, states, order, setState }) => {
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const buttonText = orderButtonText(states.type)

  const cryptoBalance = states.walletInfo.assets[states.crypto].balance

  const selectedToken = states.cryptoDetails?.find(crypto => crypto.asset === states.crypto)
  const oneTokenPrice = order.priceType === 'FIXED' ? order.price : ((order.price * 0.01) * selectedToken.price).toFixed(2)

  const maxLimit = countMaxLimit(states.inputValue, order.available, oneTokenPrice, cryptoBalance, states.type)
  const maxLimitInCurrency = (order.available * oneTokenPrice).toFixed(2);

  const minSumIncrypto = parseFloat((order.minSum / oneTokenPrice).toFixed(2))

  const isDisabled = isButtonDisabled(amount, states.type, states.paymentMethods, order.minSum, states.inputValue, minSumIncrypto)

  const handleBack = () => {
    setState.step(2)
  }

  const handleClick = () => {
    setState.step(3)
  }

  const handleInitDeal = async () => {
    const finalAmount = countFinalAmount(states.inputValue, amount, oneTokenPrice)
    const data = createDealData(states.type, order, finalAmount, states.paymentMethods, oneTokenPrice)
    initDealToApi(data).then(res => {
      if (states.type === "SELL") {
        navigate(`/p2p/buy/${res.dealId}`, { dealId: res.dealId })
      }
      if (states.type === "BUY") {
        navigate(`/p2p/sell/${res.dealId}`, { dealId: res.dealId })
      }
    }).catch(error => {
      setError(error)
    })
  }

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

  if (currentStep === 2) {
    return <>
      <InputSection amount={amount} setAmount={setAmount} states={states} setState={setState} oneTokenPrice={oneTokenPrice} maxLimit={maxLimit} order={order} />
      <OrderDetails cryptoBalance={cryptoBalance} states={states} setState={setState} order={order} maxLimit={maxLimitInCurrency} />
      <Box mt={2}>
        <FormFooterButton text={buttonText} isDisabled={isDisabled} callback={handleClick} />
      </Box>
    </>
  }

  if (currentStep === 3) {
    return <>
      <OrderErrorModal error={error} setError={setError} />
      <OrderDeal deal={{}} states={states} setState={setState} amount={amount} tokenPrice={oneTokenPrice} order={order} />
      <Box mt={2}>
        <FormFooterButton text={'Создать сделку'} callback={handleInitDeal} />
      </Box>
    </>
  }
}
