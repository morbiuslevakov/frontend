import React from 'react'
import { OrderFullDetails } from './OrderFullDetails'
import { Box } from '@mui/material'
import { FormFooterButton } from '../../buttons/FormFooterButton'
import { InputSection } from './InputSection'
import { OrderDetails } from './OrderDetails'
import { OrderFormingDetails } from './OrderFormingDetails'

export const Steps = ({ amount, setAmount, currentStep, states, order, setState }) => {
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
      <InputSection amount={amount} setAmount={setAmount} states={states} oneTokenPrice={oneTokenPrice} maxLimit={maxLimit} />
      <OrderDetails states={states} setState={setState} order={order} maxLimit={maxLimit} />
      <Box mt={2}>
        <FormFooterButton text={'Купить'} isDisabled={isDisabled} callback={handleClick} />
      </Box>
    </>
  }

  if (currentStep === 3) {
    return <>
      <OrderFormingDetails states={states} setState={setState} amount={amount} tokenPrice={oneTokenPrice} />
      <Box mt={2}>
        <FormFooterButton text={'Создать сделку'} callback={handleClick} />
      </Box>
    </>
  }

}
