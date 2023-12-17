import React, { useState } from "react";
import { Form, ListGroup, Button } from 'react-bootstrap';
import AddPayment from "../CustomModals/AddPayment/AddPayment";

export default function OrderDetails(props) {
    let { currentStep, crypto, setBlur, currency } = props;
    let [modalShow, setModalShow] = useState(false);
    let [bank, setBank] = useState(null);
    let [payments, setPayments] = useState([]);
    console.log(setPayments)

    if (currentStep !== 2) {
        return null;
    }

    const onChangePayments = (e) => {
        let newPayment = JSON.parse(e.target.value);
        const index = payments.findIndex(payment =>
            payment.account === newPayment.account &&
            payment.bank.name === newPayment.bank.name
        );

        if (index !== -1) {
            payments = payments.slice(index, 1);
            console.log(payments)
            return;
        }
        payments.push(newPayment);
        console.log(payments);
    }

    return (<>
        <AddPayment show={modalShow} onHide={() => {
            setBlur(false);
            setModalShow(false)
        }} bankName={bank} currency={currency} />
        <ListGroup>
            {JSON.parse(localStorage.getItem("user")).payments !== null &&
                JSON.parse(localStorage.getItem("user")).payments.map((payment) => {
                    return (
                        <div className="user-payments-block">
                            <ListGroup.Item style={{ "borderBottom": "none!important" }} className="user-payments">
                                <h4 className="payment-method-title">{payment.bank.name}</h4>
                                <p className="payment-method-text text-muted">{payment.bank.name} · {payment.bank.currency}</p>
                                <p className="payment-method-account text-muted">{payment.account}</p>
                            </ListGroup.Item>
                            <Form.Check value={JSON.stringify(payment)} onChange={(e) => onChangePayments(e)} type="switch" id="switch"></Form.Check>
                        </div>
                    )
                })
            }
            <div style={{ "backgroundColor": "#000", "float": "left!important" }} className="p2p-order-input p2p-order-blackspace"></div>
            {
                crypto.bankList.map((value) => {
                    return (
                        <Button className="payment-add-btn" value={value.name} style={{ "border-radius": "none!important" }} onClick={() => {
                            setBlur(true);
                            setBank(value.name);
                            setModalShow(true);
                        }}>
                            <ListGroup.Item className="banks-list" style={{ "border-radius": "none!important" }}>
                                {value.name}
                                <svg className="drop-left" width="10" height="20" viewBox="0 0 14 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                        d="M8.57335 12L1.43414 4.3551C0.580323 3.4408 0.580323 1.95842 1.43414 1.04412C2.28796 0.129823 3.67228 0.129823 4.5261 1.04412L13.151 10.28C13.5931 10.7533 13.8062 11.3789 13.7906 11.9991C13.8067 12.6199 13.5935 13.2462 13.1511 13.72L4.52615 22.9559C3.67233 23.8702 2.28801 23.8702 1.43419 22.9559C0.580369 22.0416 0.58037 20.5592 1.43419 19.6449L8.57335 12Z"
                                        fill="gray" />
                                </svg>
                            </ListGroup.Item>
                        </Button>)
                })
            }
        </ListGroup>
    </>);
}