import { Box } from "@mui/material"
import { FormFooterButton } from "../components/buttons/FormFooterButton"

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

export const getFooterButton = (status, handleConfirmPayment, handleMakePayment, handleInitDeal) => {
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

export const isButtonDisabled = (amount, type, payments, minSum, inputValue, minSumIncrypto) => {
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
  return amount <= minValue
}
