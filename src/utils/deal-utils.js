import { Box } from "@mui/material"
import { FormFooterButton } from "../components/buttons/FormFooterButton"
import { CancelButton } from "../components/buttons/CancelButton"

export const dealString = {
  "INITIALIZED": "ОЖИДАЕТ ПОДТВЕРЖДЕНИЯ",
  "OPENED": "ОЖИДАЕТ ОПЛАТЫ",
  "PROCESSED": "В ПРОЦЕССЕ ОПЛАТЫ",
  "CONFIRMED": "ОЖИДАЕТ ВЫПУСКА СРЕДСТВ",
  "COMPLETED": "ЗАВЕРШЕНО",
  "REJECTED": "ОТКЛОНЕНО",
  "CANCELED": "ОТМЕНЕНО",
  "APPEAL": "АПЕЛЛЯЦИЯ",
  "CLOSED": "ЗАКРЫТО",
}

export const getFooterButton = (type, status, handleAcceptDeal, handleConfirmPayment, handleMakePayment, handleProofPayment, myRole) => {
  if (status === "INITIALIZED") {
    return myRole === "maker" ? <Box mt={2}>
      <FormFooterButton text={'Принять'} callback={handleAcceptDeal} />
    </Box> : null
  }
  if (status === "OPENED") {
    if (type === "BUY") {
      return myRole === "maker" ? <Box mt={2}>
        <FormFooterButton text={'Совершить платеж'} callback={handleMakePayment} />
      </Box> : null
    }
    return myRole === "maker" ? null : <Box mt={2}>
      <FormFooterButton text={'Совершить платеж'} callback={handleMakePayment} />
    </Box>
  }
  if (status === "PROCESSED") {
    if (type === "BUY") {
      return myRole === "maker" ? <Box mt={2}>
        <FormFooterButton text={'Совершить платеж'} callback={handleConfirmPayment} />
      </Box> : null
    }
    return myRole === "maker" ? null : <Box mt={2}>
      <FormFooterButton text={'Совершить платеж'} callback={handleConfirmPayment} />
    </Box>
  }
  if (status === "CONFIRMED") {
    return <Box mt={2}>
      <FormFooterButton text={'Подтвердить платеж'} callback={handleProofPayment} />
    </Box>
  }
  return null
}

export const getCancelButton = (status, callback, myRole, type) => {
  if (status === "OPENED") {
    return null
  }
  if (status === "INITIALIZED") {
    return <Box mt={2}>
      <CancelButton text={'Отменить'} callback={callback} />
    </Box>
  }
  if (status === "PROCESSED") {
    if (type === "BUY" && myRole === 'taker') {
      return null
    }
    if (type === "SELL" && myRole === 'maker') {
      return null
    }
    return <Box mt={2}>
      <CancelButton text={'Отменить'} callback={callback} />
    </Box>
  }
  if (status === "CONFIRMED") {
    if (type === "BUY" && myRole === 'taker') {
      return null
    }
    if (type === "SELL" && myRole === 'maker') {
      return null
    }
    return <Box mt={2}>
      <CancelButton text={'Отменить'} callback={callback} />
    </Box>
  }
  return null
}

export const isButtonDisabled = (amount, type, payments, minSum, inputValue, minSumIncrypto) => {

  console.log(' payments      ', payments.length)

  const minValue = inputValue === "crypto" ? minSumIncrypto : minSum
  if (type === "BUY") {
    if (amount <= minValue) {
      return true
    }
    if (payments.length <= 0) {
      return true
    }
    return false
  }
  if (type === "SELL") {
    if (payments.length <= 0) {
      return true
    }
    return false
  }
  return amount <= minValue
}
