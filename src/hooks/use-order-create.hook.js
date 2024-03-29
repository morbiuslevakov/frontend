import { useEffect, useState } from 'react'
import { useP2P } from './use-p2p.hook'
import { buildOrderData } from '../utils/p2p-utils'
import { postOrderToApi } from '../utils/api-utils'
import { useNavigate } from 'react-router-dom'

export const useOrderCreate = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [orderAction, setOrderAction] = useState('SELL')
  const [selectedToken, setSelectedToken] = useState("YUSRA")
  const [priceType, setPriceType] = useState("FLOATING")
  const { walletInfo, allTokens, isLoading, allCurrencies, currency, setCurrency, limit, userDetails } = useP2P()

  const [percentPrice, setPercentPrice] = useState('')
  const [amount, setAmount] = useState('')
  const [dealSum, setDealSum] = useState('')
  const [isAvailableNext, setIsAvailableNext] = useState(false)
  const [time, setTime] = useState(15)
  const [comment, setComment] = useState("")

  const [paymentMethods, setPaymentMethods] = useState([])

  const [percentPriceError, setPercentPriceError] = useState("")
  const [amountError, setAmountError] = useState("")
  const [dealSumError, setDealSumError] = useState("")
  const [customTokenPrice, setCustomTokenPrice] = useState(0)

  const [isCreated, setIsCreated] = useState(false)
  const [orderError, setOrderError] = useState('')

  const selectedTokenId = allTokens.find(token => token.alias === selectedToken)?.id
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
      if (priceType === "FLOATING") {
        if (Number(percentPrice) < 70 || Number(percentPrice) > 150) {
          setPercentPriceError("Введите % в диапазоне от 70 до 150")
          return;
        }
        const hightDealSum = (Number(amount) * selectedTokenPrice * Number(percentPrice) / 100).toFixed(2)
        if (Number(dealSum) > hightDealSum) {
          setDealSumError(`Максимальная сумма сделки ${hightDealSum} ${currency}`)
          return;
        }
      }
      if (priceType === "FIXED") {
        if (Number(percentPrice) < ((0.7 * selectedTokenPrice).toFixed(0)) || Number(percentPrice) > ((1.5 * selectedTokenPrice).toFixed(0))) {
          setPercentPriceError(`Введите сумму в диапазоне от 70% до 150% рыночной цены (от ${(0.7 * selectedTokenPrice).toFixed(0)} до ${(1.5 * selectedTokenPrice).toFixed(0)})`)
          return;
        }
        const hightDealSum = (Number(amount) * Number(percentPrice)).toFixed(2)
        if (Number(dealSum) > hightDealSum) {
          setDealSumError(`Максимальная сумма сделки ${hightDealSum} ${currency}`)
          return;
        }
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
      const selectedTokenBalance = walletInfo?.assets[selectedToken]?.balance?.toFixed(3)
      if (orderAction === "SELL" && Number(amount) > selectedTokenBalance) {
        setAmountError(`Максимальная сумма ${selectedTokenBalance} ${selectedToken}`)
        return;
      }
    }
    if (currentStep === 4) {
      const orderData = buildOrderData(orderAction, selectedTokenId, currency, priceType, percentPrice, amount, dealSum, time, paymentMethods, comment)

      postOrderToApi(orderData).then(() => {
        setIsCreated(true)
      }).catch(() => {
        setOrderError('Ваш аккаунт не подтвержден (подтвердите почту в письме после регистрации)')
      })
      return;
    }
    setCurrentStep(currentStep + 1)
  }

  const handlePreviousStep = () => {
    if (currentStep === 1) {
      navigate('/p2p')
    }
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  useEffect(() => {
    if (currentStep === 1) {
      if (percentPrice && amount && dealSum) {
        setIsAvailableNext(true)
      } else {
        setIsAvailableNext(false)
      }
    } else if (currentStep === 2) {
      if (paymentMethods.length) {
        setIsAvailableNext(true)
      } else {
        setIsAvailableNext(false)
      }
    }
  }, [percentPrice, amount, dealSum, currentStep, paymentMethods])

  const handlers = {
    prevStep: handlePreviousStep,
    nextStep: handleNextStep,
  }

  const states = {
    walletInfo,
    currentStep,
    orderAction,
    selectedToken,
    percentPrice,
    amount,
    dealSum,
    isAvailableNext,
    paymentMethods,
    allTokens,
    priceType,
    currency,
    allCurrencies,
    time,
    limit,
    customTokenPrice,
    userDetails,
    selectedTokenPrice,
    isCreated,
    orderError,
    comment
  }

  const setState = {
    percentPrice: setPercentPrice,
    orderAction: setOrderAction,
    amount: setAmount,
    dealSum: setDealSum,
    paymentMethods: setPaymentMethods,
    priceType: setPriceType,
    currency: setCurrency,
    time: setTime,
    token: setSelectedToken,
    orderError: setOrderError,
    comment: setComment
  }

  return { isLoading, states, setState, errors, handlers }
}
