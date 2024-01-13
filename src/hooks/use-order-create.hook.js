import { useEffect, useState } from 'react'
import { useP2P } from './use-p2p.hook'

export const useOrderCreate = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [orderAction, setOrderAction] = useState('Продать')
  const [selectedToken, setSelectedToken] = useState("YUSRA")
  const [priceType, setPriceType] = useState("float")
  const { walletInfo, allTokens, isLoading, allCurrencies, currency, setCurrency, limit } = useP2P()

  const [percentPrice, setPercentPrice] = useState('')
  const [amount, setAmount] = useState('')
  const [dealSum, setDealSum] = useState('')
  const [isAvailableNext, setIsAvailableNext] = useState(false)
  const [time, setTime] = useState(15)

  const [paymentMethod, setPaymentMethod] = useState(null)

  const [percentPriceError, setPercentPriceError] = useState("")
  const [amountError, setAmountError] = useState("")
  const [dealSumError, setDealSumError] = useState("")
  const [customTokenPrice, setCustomTokenPrice] = useState(0)
  const selectedTokenPrice = allTokens.find(token => token.alias === selectedToken)?.price?.toFixed(2)

  const errors = {
    percentPrice: percentPriceError,
    amount: amountError,
    dealSum: dealSumError
  }

  useEffect(() => {
    setPercentPriceError("")
    setCustomTokenPrice(Number(selectedTokenPrice * Number(percentPrice) / 100).toFixed(2))
  }, [percentPrice, selectedTokenPrice])

  useEffect(() => {
    setAmountError("")
  }, [amount])

  useEffect(() => {
    setDealSumError("")
  }, [dealSum])

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (Number(percentPrice) < 70 || Number(percentPrice) > 150) {
        setPercentPriceError("Введите % в диапазоне от 70 до 150")
        return;
      }
      if (Number(dealSum) < limit) {
        setDealSumError(`Минимальная сумма сделки ${limit} ${currency}`)
        return;
      }
      const minAmount = (limit / Number(selectedTokenPrice)).toFixed(2)
      if (Number(amount) < minAmount) {
        setAmountError(`Минимальная сумма ${minAmount} ${selectedToken}`)
        return;
      }
      const hightDealSum = (Number(amount) * selectedTokenPrice).toFixed(2)
      if (Number(dealSum) > hightDealSum) {
        setDealSumError(`Максимальная сумма сделки ${hightDealSum} ${currency}`)
        return;
      }
    }
    if (currentStep === 3) {
      return;
    }
    setCurrentStep(currentStep + 1)
  }

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const buyHandler = () => {
    setOrderAction("Купить")
  }

  const sellHandler = () => {
    setOrderAction("Продать")
  }

  const handleTokenSelect = (event) => {
    setSelectedToken(event.target.value)
  }

  const handleTimeSelect = (event) => {
    setTime(event.target.value)
  }

  const handlePriceTypeSelect = (event) => {
    setPriceType(event.target.value)
  }

  const handleCurrencySelect = (value) => {
    setCurrency(value)
  }

  useEffect(() => {
    if (currentStep === 1) {
      if (percentPrice && amount && dealSum) {
        setIsAvailableNext(true)
      } else {
        setIsAvailableNext(false)
      }
    } else if (currentStep === 2) {
      if (paymentMethod) {
        setIsAvailableNext(true)
      } else {
        setIsAvailableNext(false)
      }
    }
  }, [percentPrice, amount, dealSum, currentStep, paymentMethod])

  const handlers = {
    prevStep: handlePreviousStep,
    nextStep: handleNextStep,
    buy: buyHandler,
    sell: sellHandler,
    tokenSelect: handleTokenSelect,
    selectPriceType: handlePriceTypeSelect,
    selectCurrency: handleCurrencySelect,
    selectTime: handleTimeSelect
  }

  const orderButtonName = currentStep === 3 ? "Создать объявление" : "Далее"

  const states = {
    walletInfo,
    currentStep,
    orderAction,
    selectedToken,
    percentPrice,
    amount,
    dealSum,
    isAvailableNext,
    paymentMethod,
    allTokens,
    orderButtonName,
    priceType,
    currency,
    allCurrencies,
    time,
    limit,
    customTokenPrice
  }

  const setState = {
    percentPrice: setPercentPrice,
    amount: setAmount,
    dealSum: setDealSum,
    paymentMethod: setPaymentMethod,
    priceType: setPriceType,
    currency: setCurrency,
    time: setTime
  }

  return { isLoading, states, setState, errors, handlers }
}
