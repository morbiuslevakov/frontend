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

export const FirstStep = ({ states, setState, errors }) => {
  return (
    <>
      <Stack gap={0.2}>
        <ControlSection orderAction={states.orderAction} setOrderAction={setState.orderAction} />
        <TokenSection orderAction={states.orderAction} allTokens={states.allTokens} setToken={setState.token} />
        <CurrencySection allCurrencies={states.allCurrencies} currency={states.currency} setCurrency={setState.currency} />
        <PriceTypeSection setPriceType={setState.priceType} />
      </Stack>
      <PercentPriceSection errorMessage={errors.percentPrice} percentPrice={states.percentPrice} type={states.priceType} setPercentPrice={setState.percentPrice} />
      <PricesInfoSection states={states} />
      <AmountSection errorMessage={errors.amount} states={states} setAmount={setState.amount} />
      <BalanceSection states={states} setState={setState} />
      <MinAmountSection errorMessage={errors.dealSum} states={states} setDealSum={setState.dealSum} />
      <TimeSection setTime={setState.time} />
    </>
  )
}
