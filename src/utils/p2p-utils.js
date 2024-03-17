export const buildOrderData = (type, assetId, currency, priceType, percentPrice, amount, minSum, time, paymentMethods, comment) => {
  const payments = paymentMethods.map(method => method.id)
  const orderComment = comment === '' ? null : comment

  return {
    "type": type,
    "assetId": assetId,
    "currency": currency,
    "priceType": priceType,
    "price": Number(percentPrice),
    "amount": Number(amount),
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
  if (Number(value) > Number(maxLimit)) {
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

export const orderActionText = (type, myRole) => {
  switch (type) {
    case "SELL":
      return myRole === "maker" ? "Вы продаете" : "Вы покупаете у"
    case "BUY":
      return myRole === "maker" ? "Вы покупаете у" : "Вы продаете"
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

export const getStatusMessage = (states, myRole, amount) => {
  return states.type === "BUY"
    ? myRole === "maker"
      ? `В течение 2 минут сумма ${amount} ${states.crypto} будет зачислена на ваш кошелёк.`
      : `В течение 2 минут сумма ${amount} ${states.crypto} будет списана с вашего кошелька.`
    : states.type === "SELL"
      ? `В течение 2 минут сумма ${amount} ${states.crypto} будет ${myRole === "maker" ? "списана с" : "зачислена на"} ваш кошелька.`
      : "Не удалось определить сообщение";
};


export const inputText = (isCrypto, crypto, currency) => {
  switch (isCrypto) {
    case true:
      return crypto
    case false:
      return currency
    default:
      break;
  }
}

export const countMaxLimit = (inputValue, available, oneTokenPrice, cryptoBalance, type) => {
  if (inputValue === "currency") {
    return (available * oneTokenPrice).toFixed(2);
  }
  if (type === "SELL") {
    return available
  }
  return Math.min(available, parseFloat(cryptoBalance));
}

export const countFinalAmount = (inputValue, amount, tokenPrice) => {
  if (inputValue === "currency") {
    return parseFloat((amount / tokenPrice).toFixed(2))
  }
  return amount
}

export const countFinalAmountInCurrency = (inputValue, amount, tokenPrice) => {
  if (inputValue === "crypto") {
    return parseFloat((amount * tokenPrice).toFixed(2))
  }
  return amount
}

export const createDealData = (type, order, finalAmount, userPayments, oneTokenPrice) => {
  const dealType = switchType(type)
  let price = order.price;
  if (order.priceType === 'FLOATING') {
    price = (order.price / 100) * oneTokenPrice
  }
  let paymentId = '';
  if (dealType === 'BUY') {
    paymentId = Object.values(userPayments)[0].id
  }
  if (dealType === 'SELL') {
    paymentId = userPayments[0].id
  }

  return {
    "type": dealType,
    "orderId": order.id,
    "amount": String(finalAmount),
    "paymentId": paymentId,
    "price": String(price)
  }
}