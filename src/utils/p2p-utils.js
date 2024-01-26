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
    "paymentMethods": payments,
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
    "asset": crypto,
    "paymentMethods": paymentMethods
  }
}