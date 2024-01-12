import React from 'react'
import { Stack } from '@mui/material'
import { ControlSection } from './first-step-sections/ControlSection'
import { TokenSection } from './first-step-sections/TokenSection'
import { CurrencySection } from './first-step-sections/CurrencySection'
import { PriceTypeSection } from './first-step-sections/PriceTypeSection'
import { PercentPriceSection } from './first-step-sections/PercentPriceSection'
import { PricesInfoSection } from './first-step-sections/PricesInfoSection'
import { AmountSection } from './first-step-sections/AmountSection'
import { BalanceSection } from './first-step-sections/BalanceSection'
import { MinAmountSection } from './first-step-sections/MinAmountSection'
import { TimeSection } from './first-step-sections/TimeSection'

export const FirstStep = ({ states, handlers, setState, errors }) => {
  return (
    <>
      <Stack gap={0.2}>
        <ControlSection orderAction={states.orderAction} buyHandler={handlers.buy} sellHandler={handlers.sell} />
        <TokenSection orderAction={states.orderAction} allTokens={states.allTokens} handleTokenSelect={handlers.tokenSelect} />
        <CurrencySection allCurrencies={states.allCurrencies} currency={states.currency} handleCurrencySelect={handlers.selectCurrency} />
        <PriceTypeSection selectPriceType={handlers.selectPriceType} />
      </Stack>
      <PercentPriceSection errorMessage={errors.percentPrice} percentPrice={states.percentPrice} setPercentPrice={setState.percentPrice} />
      <PricesInfoSection states={states} />
      <AmountSection errorMessage={errors.amount} amount={states.amount} setAmount={setState.amount} selectedToken={states.selectedToken} />
      <BalanceSection states={states} setState={setState} />
      <MinAmountSection errorMessage={errors.dealSum} states={states} setDealSum={setState.dealSum} />
      <TimeSection time={states.time} handleTimeSelect={handlers.selectTime} />
    </>
  )
}
