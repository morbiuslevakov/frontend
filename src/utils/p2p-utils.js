export const buildOrderData = (type, assetId, currency, priceType, percentPrice, amount, fee, minSum, time, paymentMethods, comment) => {
  const payments = paymentMethods.map(method => method.id)
  const orderComment = comment === '' ? null : comment

  return {
    "type": type,
    "assetId": assetId,
    "currency": currency,
    "priceType": priceType,
    "price": Number(percentPrice),
    "amount": Number(amount),
    "fee": Number(fee),
    "minSum": Number(minSum),
    "paymentTime": Number(time),
    "payments": payments,
    "comment": orderComment
  }
}

export const calcutaleInputWidth = (amount) => {
  return `400px`;
}

export const P2PInputHandleChange = (event, setAmount, maxLimit) => {
  const value = event.target.value;
  if (value.length > 10) {
    return;
  }
  if (Number(value) > maxLimit) {
    return;
  }
  let formattedValue = value.startsWith('0') && !value.startsWith('0.') && value.length > 1 ? value.substring(1) : value;
  formattedValue = formattedValue === '' ? '0' : formattedValue;

  if (!isNaN(formattedValue)) {
    setAmount(formattedValue);
  }
}

export const buildOrdersPayload = (type, currency, crypto, paymentMethods) => {
  return {
    "type": type,
    "currency": currency,
    "assetId": crypto,
    "bankIds": paymentMethods
  }
}

export const switchType = (type) => {
  switch (type) {
    case "SELL":
      return "BUY"
    case "BUY":
      return "SELL"
    default:
      break;
  }
}

export const orderActionText = (type) => {
  switch (type) {
    case "SELL":
      return "Вы покупаете у"
    case "BUY":
      return "Вы продаете"
    default:
      break;
  }
}

export const orderButtonText = (type) => {
  switch (type) {
    case "SELL":
      return "Купить"
    case "BUY":
      return "Продать"
    default:
      break;
  }
}

export const inputText = (type, crypto, currency) => {
  switch (type) {
    case "SELL":
      return currency
    case "BUY":
      return crypto
    default:
      break;
  }
}

export const countMaxLimit = (type, available, oneTokenPrice, cryptoBalance) => {
  if (type === "SELL") {
    return (available * oneTokenPrice).toFixed(2);
  }
  return Math.min(available, parseFloat(cryptoBalance));
}

export const countFinalAmount = (type, amount, tokenPrice) => {
  if (type === "SELL") {
    return parseFloat((amount / tokenPrice).toFixed(2))
  }
  return amount
}

export const countFinalAmountInCurrency = (type, amount, tokenPrice) => {
  if (type === "BUY") {
    return parseFloat((amount * tokenPrice).toFixed(2))
  }
  return amount
}

export const createDealData = (type, order, finalAmount, userPayments) => {
  const dealType = switchType(type)
  let paymentId = Object.values(order.payments)[0];
  if (dealType === 'SELL') {
    paymentId = userPayments[0].id
  }

  return {
    "type": dealType,
    "orderId": order.id,
    "amount": String(finalAmount),
    "paymentId": paymentId
  }
}