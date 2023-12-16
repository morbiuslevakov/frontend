import React, { useState, useEffect } from "react";
import { InputGroup, Form } from 'react-bootstrap';
import ChangeCurrency from "../CustomModals/ChangeCurrency/ChangeCurrency";

export default function OrderDetails(props) {
    let { crypto, balance, currentStep, changeOrderDetails } = props;
    let [modalShow, setModalShow] = useState(false);
    let [orderType, setOrderType] = useState("BUY");
    let [currentCrypto, setCurrentCrypto] = useState("WAVES");
    let [currency, setCurrency] = useState(props.currency);
    let [priceType, setPriceType] = useState("FLOATING");
    let [currentPrice, setCurrentPrice] = useState(null);
    let [sum, setSum] = useState(null);
    let [minSum, setMinSum] = useState(null);
    let [paymentTime, setPaymentTime] = useState(15);

    let [sumInv, setSumInv] = useState(false);
    let [currentPriceInv, setCurrentPriceInv] = useState(false);
    let [minSumInv, setMinSumInv] = useState(false);

    let [noteId, setNoteId] = useState(null);

    const changeCurrency = (e) => {
        clearFileds();
        setCurrency(e.target.value);
        changeOrderDetails.setCurrency(e.target.value);
        props.setLocales(e.target.value);
        setModalShow(false);
    }

    const clearFileds = () => {
        props.clearFileds();
        setCurrentPrice(null);
        setSum(null);
        setMinSum(null);
        setSumInv(false);
        setCurrentPriceInv(false);
        setMinSumInv(false);
    }

    if (currentStep !== 1) {
        return null;
    }

    return (<>
        <div className="p2p-order-input" style={{ "borderBottom": "1px solid #000" }}>
            <div className="p2p-order-text">
                <h5 className="p2p-order-title">Я хочу</h5>
            </div>
            <div className="order-type-ratio">
                <button name="orderType" value="BUY" onClick={(e) => {
                    clearFileds();
                    changeOrderDetails.setOrderType(e.target.value);
                    setOrderType(e.target.value);
                }}
                    className="order-type-button" style={orderType === "BUY" ? {
                        "borderBottom": "2px solid aqua",
                        "color": "aqua"
                    } : { "borderBottom": "2px solid #2D2E2F", "color": "gray" }}>Купить
                </button>
                <button name="orderType" value="SELL" onClick={(e) => {
                    clearFileds();
                    changeOrderDetails.setOrderType(e.target.value);
                    setOrderType(e.target.value);
                }}
                    className="order-type-button" style={orderType === "SELL" ? {
                        "borderBottom": "2px solid aqua",
                        "color": "aqua"
                    } : { "borderBottom": "2px solid #2D2E2F", "color": "gray" }}>Продать
                </button>
            </div>
        </div>
        <div className="p2p-order-input" style={{ "borderBottom": "1px solid #000" }}>
            <div className="p2p-order-text">
                <h5 className="p2p-order-title">{orderType === "BUY" ? "Купить криптовалюту" : "Продать криптовалюту"}</h5>
            </div>
            <div className="order-type-ratio dropstart">
                <Form.Select name="crypto" value={currentCrypto} onChange={(e) => {
                    clearFileds();
                    changeOrderDetails.setCurrentCrypto(e.target.value);
                    setCurrentCrypto(e.target.value);
                }}
                    className="crypto-select">
                    {
                        Array.from(Object.entries(crypto.assets)).map((crypto) => <option key={crypto[0]}
                            value={crypto[0]}>{crypto[0]}</option>)
                    }
                </Form.Select>
            </div>
        </div>

        <div className="p2p-order-input" style={{ "borderBottom": "1px solid #000" }}>
            <div className="p2p-order-text">
                <h5 className="p2p-order-title">Фиатная валюта</h5>
            </div>
            <div className="order-type-ratio dropstart">
                <button onClick={() => setModalShow(true)} className="crypto-select">{currency}</button>
                <ChangeCurrency show={modalShow} currency={currency} handler={changeCurrency}
                    close={() => setModalShow(false)} />
            </div>
        </div>
        <div className="p2p-order-input" style={{ "borderBottom": "1px solid #000" }}>
            <div className="p2p-order-text">
                <h5 className="p2p-order-title">Тип цены</h5>
            </div>
            <div className="order-type-ratio dropstart">
                <Form.Select name="priceType" onChange={(e) => {
                    changeOrderDetails.setPriceType(e.target.value);
                    setPriceType(e.target.value);
                }} className="crypto-select">
                    <option key="FLOATING" value="FLOATING">Плавающая</option>
                    <option key="FIXED" value="FIXED">Фиксированная</option>
                </Form.Select>
            </div>
        </div>
        <div style={{ "backgroundColor": "#000", "float": "left!important" }}
            className="p2p-order-input p2p-order-blackspace"></div>
        <div className="p2p-order-input-field p2p-order-input" style={{ "borderBottom": "1px solid #000" }}>
            <div className="p2p-order-text mb-1 mt-2">
                <h5 style={{ "color": "aqua", "float": "left!important" }}
                    className="p2p-order-title">{priceType === "FIXED" ? "Фиксированная цена" : "Процент от рыночной цены"}</h5>
            </div>
            <InputGroup className="p2p-order-input-group mb-2">
                <Form.Control type="number" name="currentPrice" value={currentPrice === null ? "" : currentPrice}
                    onChange={(e) => {
                        let price = new Map(Object.entries(crypto.assets)).get(currentCrypto).price;
                        let bool = price * 0.7 <= e.target.value && e.target.value <= price * 1.5
                        if (priceType === "FLOATING")
                            setCurrentPriceInv(priceType === "FLOATING" && !/^(7[0-9]|[89][0-9]|1[0-4][0-9]|150)$/.test(e.target.value));
                        if (priceType === "FIXED")
                            setCurrentPriceInv(priceType === "FIXED" && !bool);
                        changeOrderDetails.setCurrentPrice(e.target.value);
                        setCurrentPrice(e.target.value);

                        /**function for showing notifications**/

                    }} className={`p2p-order-field ${currentPriceInv ? "is-invalid" : ""}`}
                    placeholder={priceType === "FIXED" ? `За 1 ${currentCrypto}` : "70 ~ 150"} />
            </InputGroup>
        </div>
        <div id="price" className="p2p-order-input p2p-order-blackspace p2p-order-found">
            <font color="gray">Рыночная цена: <font color="white">
                {(new Map(Object.entries(crypto.assets)).get(currentCrypto).price * 1).toFixed(2)} {crypto.symbol} за
                1 {currentCrypto}</font><br />Ваша цена: <font color="white">{priceType === "FLOATING" ? (new Map(Object.entries(crypto.assets)).get(currentCrypto).price * (currentPrice * 0.01)).toFixed(2) : (currentPrice === "" ? "0.00" : currentPrice)} {crypto.symbol} за
                    1 {currentCrypto}</font>
            </font>
        </div>
        <div className="p2p-order-input-field p2p-order-input" style={{ "borderBottom": "1px solid #000" }}>
            <div className="p2p-order-text mb-1 mt-2">
                <h5 style={{ "color": "aqua" }} className="p2p-order-title">Сумма</h5>
            </div>
            <InputGroup className="p2p-order-input-group mb-2">
                <Form.Control type="number" name="sum" value={sum === null ? "" : sum}
                    onChange={(e) => {
                        let bool = !(crypto.limit <= (new Map(Object.entries(crypto.assets)).get(currentCrypto).price * e.target.value));

                        if (bool) {
                            setSumInv(bool);
                        } else if (orderType === "SELL" && new Map(Object.entries(balance.balance)).get(currentCrypto).balance < e.target.value) {
                            setSumInv(true);
                        } else {
                            setSumInv(false);
                        }

                        /**function for showing notifications**/
                        changeOrderDetails.setSum(e.target.value);
                        setSum(e.target.value);
                    }} className={`p2p-order-field ${sumInv ? "is-invalid" : ""}`}
                    placeholder={`1 ${currentCrypto}`} />
            </InputGroup>
        </div>
        <div className="p2p-order-input p2p-order-blackspace p2p-order-found">
            <font color="gray">Ваш баланс:
                <font color="white">
                    {" " + new Map(Object.entries(balance.balance)).get(currentCrypto).balance + " " + currentCrypto}
                </font>
                {orderType === "SELL" ? (<button className="maximum-button"
                    onClick={(e) => setSum(new Map(Object.entries(balance.balance)).get(currentCrypto).balance)}> ·
                    Макс.</button>) : ""}
                <br />
                <span>Комиссия:
                    <font color="white">{currentCrypto === "WAVES" ? " 0.001 WAVES" : " 2 YUSRA"}</font>
                </span>
            </font>
        </div>
        <div className="p2p-order-input-field p2p-order-input" style={{ "borderBottom": "1px solid #000" }}>
            <div className="p2p-order-text mb-1 mt-2">
                <h5 style={{ "color": "aqua" }} className="p2p-order-title">Мин. сумма сделки</h5>
            </div>
            <InputGroup className="p2p-order-input-group mb-2">
                <Form.Control type="number" name="minSum" value={minSum === null ? "" : minSum}
                    onChange={(e) => {
                        setMinSumInv(!(crypto.limit <= e.target.value && e.target.value <= sum * new Map(Object.entries(crypto.assets)).get(currentCrypto).price));



                        /**function for showing notifications**/



                        changeOrderDetails.setMinSum(e.target.value);
                        setMinSum(e.target.value);
                    }} className={`p2p-order-field ${minSumInv ? "is-invalid" : ""}`}
                    placeholder={`Мин. ${crypto.limit}`} />
            </InputGroup>
        </div>
        <div style={{ "backgroundColor": "#000" }} className="p2p-order-input p2p-order-blackspace"></div>
        <div className="p2p-order-input" style={{ "borderBottom": "1px solid #000" }}>
            <div className="p2p-order-text">
                <h5 className="p2p-order-title">Время на оплату</h5>
            </div>
            <div className="order-type-ratio dropstart">
                <Form.Select value={paymentTime} name="paymentTime" onChange={(e) => {
                    changeOrderDetails.setPaymentTime(e.target.value);
                    setPaymentTime(e.target.value);
                }}
                    className="crypto-select">
                    <option key="15" value={15}>15 мин</option>
                    <option key="30" value={30}>30 мин</option>
                    <option key="45" value={45}>45 мин</option>
                    <option key="60" value={60}>1 час</option>
                    <option key="120" value={120}>2 часа</option>
                    <option key="180" value={180}>3 часа</option>
                </Form.Select>
            </div>
        </div>
    </>);
}