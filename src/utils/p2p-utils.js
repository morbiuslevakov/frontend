export const buildOrderData = (type, assetId, currency, priceType, percentPrice, amount, fee, minSum, time, paymentMethods) => {
  const payments = paymentMethods.map(method => method.id)

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
    "paymentMethods": payments
  }
}

// {
// 	"type": "SELL",
// 	"assetId": "659b080aa8cc125d77d4e380",
// 	"currency": "RUB",
// 	"priceType": "FIXED",
// 	"price": 1000,
// 	"amount": 1000,
// 	"fee": 2.5641,
// 	"minSum": 100,
// 	"paymentTime": 15,
// 	"paymentMethods": [
// 		"659d82f2da858d4c0ebe02e3"
// 	]
// }