import { useState, useEffect } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import PriceService from "../../services/price.service";
import EventBus from "../../common/EventBus";
import OrderDetails from "./OrderDetails";
import OrderPaymnetsF from "./OrderPaymentsF";

export default function OrderCreate(props) {
    let [balance, setBalance] = useState(null);
    let [crypto, setCrypto] = useState(null);
    let [currentStep, setCurrentStep] = useState(1);
    let [orderType, setOrderType] = useState("BUY");
    let [currentCrypto, setCurrentCrypto] = useState("WAVES");
    let [currency, setCurrency] = useState("RUB");
    let [priceType, setPriceType] = useState("FLOATING");
    let [currentPrice, setCurrentPrice] = useState(null);
    let [sum, setSum] = useState(null);
    let [minSum, setMinSum] = useState(null);
    let [paymentTime, setPaymentTime] = useState(15);

    let [payments, setPayments] = useState(null);

    let [blur, setBlur] = useState(false);

    let [showAlert, setShowAlert] = useState(false);

    const { history } = props;
    const changeOrderDetails = {
        "setOrderType": setOrderType,
        "setCurrentCrypto": setCurrentCrypto,
        "setCurrency": setCurrency,
        "setPriceType": setPriceType,
        "setCurrentPrice": setCurrentPrice,
        "setSum": setSum,
        "setMinSum": setMinSum,
        "setPaymentTime": setPaymentTime
    };

    const setLocales = (currentCurrency) => {
        PriceService.setPrices(currentCurrency).then(
            response => {
                setCrypto(response.data);
            }, error => {
                if (error.response.status === 403) {
                    EventBus.dispatch("logout");
                    if (!props.isLoggedIn) {
                        history.push("/login");
                        window.location.reload();
                    }
                }
            }

        );
        PriceService.setBalances(JSON.parse(localStorage.getItem("user")).address).then(
            response => {
                setBalance(response.data);
            }, error => {
                if (error.response.status === 403) {
                    EventBus.dispatch("logout");
                    if (!props.isLoggedIn) {
                        history.push("/login");
                        window.location.reload();
                    }
                }
            }
        );
    }

    const clearFileds = () => {
        setCurrentPrice(null);
        setSum(null);
        setMinSum(null);
    }

    const next = () => {
        setCurrentStep(currentStep++);
    }

    const NextButton = () => {
        let price = new Map(Object.entries(crypto.assets)).get(currentCrypto).price;
        if (currentStep===1&&orderType==="SELL") {
            return (<Button id="next-btn" onClick={next} disabled={(new Map(Object.entries(balance.balance)).get(currentCrypto).balance<sum||sum==="")} className="create-order-btn" style={{"height": "48px","width": "100%", "backgroundColor" : "#2EA6A6FF", "borderRadius" : "none!important", "border" : "none", "color" : "white", "fontWeight" : "700"}}>ДАЛЕЕ</Button>);
        } else if (currentStep===1&&priceType==="FLOATING") {
            return (<Button id="next-btn" onClick={next} disabled={!(/^(7[0-9]|[89][0-9]|1[0-4][0-9]|150)$/.test(currentPrice)&&crypto.limit<=price*sum&&crypto.limit<=minSum&&minSum<=sum*price)} className="create-order-btn" style={{"height": "48px","width": "100%", "backgroundColor" : "#2EA6A6FF", "borderRadius" : "none!important", "border" : "none", "color" : "white", "fontWeight" : "700"}}>ДАЛЕЕ</Button>);
        } else if (currentStep===1&&priceType==="FIXED") {
            return (<Button id="next-btn" onClick={next} disabled={!((price*0.7)<=currentPrice&&currentPrice<=(price*1.5)&&crypto.limit<=price*sum&&crypto.limit<=minSum&&minSum<=sum*price)} className="create-order-btn" style={{"height": "48px","width": "100%", "backgroundColor" : "#2EA6A6FF", "borderRadius" : "none!important", "border" : "none", "color" : "white", "fontWeight" : "700"}}>ДАЛЕЕ</Button>);
        }
    }

    useEffect(() => {
        setLocales(currency);
    }, []);

    if (crypto!==null && balance !== null) {
        return (
            <div className="content-container" style={{"filter":`blur(${blur ? "8px" : "0px"})`}}>
                <div className="p2p-body">
                    <Card className="p2p-card">
                        <div className="p2p-order-input p2p-order-blackspace p2p-order-found">
                            <a className="back-arrow" onClick={() => setCurrentStep(currentStep--)}>
                                <svg width="26" height="23" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.6068 12.5702C24.4352 12.5702 25.1068 11.8986 25.1068 11.0702C25.1068 10.2418 24.4352 9.57019 23.6068 9.57019V12.5702ZM1.3325 10.0095C0.74671 10.5953 0.74671 11.5451 1.3325 12.1309L10.8784 21.6768C11.4642 22.2626 12.414 22.2626 12.9998 21.6768C13.5855 21.091 13.5855 20.1413 12.9998 19.5555L4.51448 11.0702L12.9998 2.58491C13.5855 1.99912 13.5855 1.04938 12.9998 0.463589C12.414 -0.122198 11.4642 -0.122198 10.8784 0.463589L1.3325 10.0095ZM23.6068 9.57019L2.39316 9.57019V12.5702L23.6068 12.5702V9.57019Z" fill="gray"/>
                                </svg>
                            </a>
                            <h4 className="mt-3">{currentStep===1&&"Создайте объявление"} {currentStep===2&&"Добавьте методы оплаты"} <font color="gray">{currentStep}/3</font></h4>
                        </div>
                        <OrderDetails clearFileds={clearFileds} crypto={crypto} balance={balance} currency={currency} setLocales={setLocales} changeOrderDetails={changeOrderDetails} currentStep={currentStep} />
                        <OrderPaymnetsF crypto={crypto} currentStep={currentStep} setBlur={setBlur} currency={currency} setPayments={setPayments} />
                    </Card>
                    <NextButton/>
                </div>
            </div>
        );
    }
}