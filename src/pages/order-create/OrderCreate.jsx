// import { useState, useEffect, useCallback } from "react";
// import { Card, Button } from "react-bootstrap";
// import PriceService from "../../services/price.service";
// import EventBus from "../../utils/EventBus";
// import OrderDetails from "../../components/p2p/OrderDetails";
// import OrderPaymnetsF from "../../components/p2p/OrderPaymentsF";
// import { ReactComponent as BackArrow } from '../../images/back-arrow.svg'

import React from 'react'
import { Typography } from "@mui/material";

export const OrderCreate = () => {
    return (
        <Typography>OrderCreate</Typography>
    )
}


// export default function OrderCreate(props) {
//     let [balance, setBalance] = useState(null);
//     let [crypto, setCrypto] = useState(null);
//     let [currentStep, setCurrentStep] = useState(1);
//     let [orderType, setOrderType] = useState("BUY");
//     let [currentCrypto, setCurrentCrypto] = useState("WAVES");
//     let [currency, setCurrency] = useState("RUB");
//     let [priceType, setPriceType] = useState("FLOATING");
//     let [currentPrice, setCurrentPrice] = useState(null);
//     let [sum, setSum] = useState(null);
//     let [minSum, setMinSum] = useState(null);
//     let [paymentTime, setPaymentTime] = useState(15);

//     let [payments, setPayments] = useState(null);
//     console.log(paymentTime, payments)

//     let [blur, setBlur] = useState(false);

//     const { history } = props;
//     const changeOrderDetails = {
//         "setOrderType": setOrderType,
//         "setCurrentCrypto": setCurrentCrypto,
//         "setCurrency": setCurrency,
//         "setPriceType": setPriceType,
//         "setCurrentPrice": setCurrentPrice,
//         "setSum": setSum,
//         "setMinSum": setMinSum,
//         "setPaymentTime": setPaymentTime
//     };

//     const setLocales = useCallback((currentCurrency) => {
//         PriceService.setPrices(currentCurrency).then(
//             response => {
//                 setCrypto(response.data);
//             }, error => {
//                 if (error.response.status === 403) {
//                     EventBus.dispatch("logout");
//                     if (!props.isLoggedIn) {
//                         history.push("/login");
//                         window.location.reload();
//                     }
//                 }
//             }

//         );
//         PriceService.setBalances(JSON.parse(localStorage.getItem("user")).address).then(
//             response => {
//                 setBalance(response.data);
//             }, error => {
//                 if (error.response.status === 403) {
//                     EventBus.dispatch("logout");
//                     if (!props.isLoggedIn) {
//                         history.push("/login");
//                         window.location.reload();
//                     }
//                 }
//             }
//         );
//     }, [history, props.isLoggedIn])

//     const clearFileds = () => {
//         setCurrentPrice(null);
//         setSum(null);
//         setMinSum(null);
//     }

//     const next = () => {
//         setCurrentStep(currentStep++);
//     }

//     const NextButton = () => {
//         let price = new Map(Object.entries(crypto.assets)).get(currentCrypto).price;
//         if (currentStep === 1 && orderType === "SELL") {
//             return (<Button id="next-btn" onClick={next} disabled={(new Map(Object.entries(balance.balance)).get(currentCrypto).balance < sum || sum === "")} className="create-order-btn" style={{ "height": "48px", "width": "100%", "backgroundColor": "#2EA6A6FF", "borderRadius": "none!important", "border": "none", "color": "white", "fontWeight": "700" }}>ДАЛЕЕ</Button>);
//         } else if (currentStep === 1 && priceType === "FLOATING") {
//             return (<Button id="next-btn" onClick={next} disabled={!(/^(7[0-9]|[89][0-9]|1[0-4][0-9]|150)$/.test(currentPrice) && crypto.limit <= price * sum && crypto.limit <= minSum && minSum <= sum * price)} className="create-order-btn" style={{ "height": "48px", "width": "100%", "backgroundColor": "#2EA6A6FF", "borderRadius": "none!important", "border": "none", "color": "white", "fontWeight": "700" }}>ДАЛЕЕ</Button>);
//         } else if (currentStep === 1 && priceType === "FIXED") {
//             return (<Button id="next-btn" onClick={next} disabled={!((price * 0.7) <= currentPrice && currentPrice <= (price * 1.5) && crypto.limit <= price * sum && crypto.limit <= minSum && minSum <= sum * price)} className="create-order-btn" style={{ "height": "48px", "width": "100%", "backgroundColor": "#2EA6A6FF", "borderRadius": "none!important", "border": "none", "color": "white", "fontWeight": "700" }}>ДАЛЕЕ</Button>);
//         }
//     }

//     useEffect(() => {
//         setLocales(currency);
//     }, [setLocales, currency]);

//     if (crypto !== null && balance !== null) {
//         return (
//             <div className="content-container" style={{ "filter": `blur(${blur ? "8px" : "0px"})` }}>
//                 <div className="p2p-body">
//                     <Card className="p2p-card">
//                         <div className="p2p-order-input p2p-order-blackspace p2p-order-found">
//                             <div className="back-arrow" onClick={() => setCurrentStep(currentStep--)}>
//                                 <BackArrow />
//                             </div>
//                             <h4 className="mt-3">{currentStep === 1 && "Создайте объявление"} {currentStep === 2 && "Добавьте методы оплаты"} <font color="gray">{currentStep}/3</font></h4>
//                         </div>
//                         <OrderDetails clearFileds={clearFileds} crypto={crypto} balance={balance} currency={currency} setLocales={setLocales} changeOrderDetails={changeOrderDetails} currentStep={currentStep} />
//                         <OrderPaymnetsF crypto={crypto} currentStep={currentStep} setBlur={setBlur} currency={currency} setPayments={setPayments} />
//                     </Card>
//                     <NextButton />
//                 </div>
//             </div>
//         );
//     }
// }