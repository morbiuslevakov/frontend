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
  return `${Math.min(10 + String(amount).length * 4, 100)}%`;
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

export const createDealData = (type, order, finalAmount) => {
  // const dealType = switchType(type)

  return {
    "type": type,
    "orderId": order.id,
    "amount": finalAmount,
    "paymentId": Object.values(order.payments)[0]
  }
}

const fakeDeal = {
  "dealId": "65e383ea57c44e38659371f3", "status": "OPENED",
  "assetId": "65d305b8ead27cc777095fe8", "assetAlias": "YUSRA",
  "amount": 12.171052631578949, "sum": 222.00000000000003, "price": 18.24,
  "currency": "RUB", "paymentTime": 15, "chatAvailable": true,
  "payment": { "id": "65dcfb727364a9728fbd2ecb", "type": "BANK", "account": "79999999999", "bank": { "id": "65d324fd97ba9a0aac8b07a6", "name": "Тинькофф" } },
  "createdAt": 1709409258637, "maker": { "role": "SELLER", "deals": 0, "completedPercent": 0, "username": "morbiuslevakov" },
  "taker": { "role": "SELLER", "deals": 0, "completedPercent": 0, "username": "howtonik" }
}
