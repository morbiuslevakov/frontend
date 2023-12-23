import React from "react";
import { Offcanvas, Form } from 'react-bootstrap';
import "./ChangeCurrency.css";

export default function ChangeCurrency(props) {
    let { show, currency, handler, close } = props;

    return (
        <Offcanvas placement="end" show={show} onHide={close}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Выберите валюту</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Form>
                    <Form.Check checked={currency === "AED"} name="AED" value="AED" onChange={handler} label="AED" type="radio" id="AED" />
                    <Form.Check checked={currency === "AMD"} name="AMD" value="AMD" onChange={handler} label="AMD" type="radio" id="AMD" />
                    <Form.Check checked={currency === "AZN"} name="AZN" value="AZN" onChange={handler} label="AZN" type="radio" id="AZN" />
                    <Form.Check checked={currency === "BRL"} name="BRL" value="BRL" onChange={handler} label="BRL" type="radio" id="BRL" />
                    <Form.Check checked={currency === "BYN"} name="BYN" value="BYN" onChange={handler} label="BYN" type="radio" id="BYN" />
                    <Form.Check checked={currency === "EUR"} name="EUR" value="EUR" onChange={handler} label="EUR" type="radio" id="EUR" />
                    <Form.Check checked={currency === "GEL"} name="GEL" value="GEL" onChange={handler} label="GEL" type="radio" id="GEL" />
                    <Form.Check checked={currency === "IDR"} name="IDR" value="IDR" onChange={handler} label="IDR" type="radio" id="IDR" />
                    <Form.Check checked={currency === "INR"} name="INR" value="INR" onChange={handler} label="INR" type="radio" id="INR" />
                    <Form.Check checked={currency === "KGS"} name="KGS" value="KGS" onChange={handler} label="KGS" type="radio" id="KGS" />
                    <Form.Check checked={currency === "KZT"} name="KZT" value="KZT" onChange={handler} label="KZT" type="radio" id="KZT" />
                    <Form.Check checked={currency === "RUB"} name="RUB" value="RUB" onChange={handler} label="RUB" type="radio" id="RUB" />
                    <Form.Check checked={currency === "THB"} name="THB" value="THB" onChange={handler} label="THB" type="radio" id="THB" />
                    <Form.Check checked={currency === "TRY"} name="TRY" value="TRY" onChange={handler} label="TRY" type="radio" id="TRY" />
                    <Form.Check checked={currency === "UAH"} name="UAH" value="UAH" onChange={handler} label="UAH" type="radio" id="UAH" />
                    <Form.Check checked={currency === "UZS"} name="UZS" value="UZS" onChange={handler} label="UZS" type="radio" id="UZS" />
                    <Form.Check checked={currency === "VND"} name="VND" value="VND" onChange={handler} label="VND" type="radio" id="VND" />
                </Form>
            </Offcanvas.Body>
        </Offcanvas>
    );
}