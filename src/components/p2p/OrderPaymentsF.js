import React, { useState } from "react";
import { Form, ListGroup, Button } from 'react-bootstrap';
import AddPayment from "../CustomModals/AddPayment/AddPayment";
import { ReactComponent as ForwardIcon } from '../../images/forward-arrow.svg'

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
                                <ForwardIcon />
                            </ListGroup.Item>
                        </Button>)
                })
            }
        </ListGroup>
    </>);
}