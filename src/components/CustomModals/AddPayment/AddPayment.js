import { Button, Modal, Form, InputGroup, Alert } from 'react-bootstrap';
import React, { useState } from "react";
import "./AddPayment.css";
import UserService from "../../../services/user.service";

export default function AddPayment(props) {
    let {bankName, currency, onHide, show} = props;
    let [account, setAccount] = useState(null);
    let [message, setMessage] = useState(null);

    const addPayment = () => {
        let bank = {
            name: bankName,
            currency: currency
        }
        UserService.addPayment(bank, account).then(
            response => {
                setAccount("");
                onHide();
            }, error => {
                console.log(error)
                if (error.response.status === 400) {
                    setMessage("Метод оплаты уже добавлен.");
                }
            }

        );
    }

    return (
        <Modal
            show={show}
            onHide={() => {
                setAccount("");
                setMessage("");
                onHide();
            }}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h4 className="mt-3">{bankName}</h4>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3 form-group" controlId="formBasicPassword">
                    <Form.Label>Аккаунт, номер карты или телефон</Form.Label>
                    <Form.Control
                        className="change-password-fields"
                        required
                        size="lg"
                        type={"text"}
                        name="password"
                        value={account}
                        onChange={(e) => setAccount(e.target.value)}
                        placeholder="Аккаунт, номер карты или телефон"/>
                </Form.Group>
                {message!==null&&message!=="" && <Alert className="mb-3" key="danger" variant="danger">{message}</Alert>}
                <Button className="confirm-pass-change-btn btn-secondary" disabled={(account!==null&&account!=="") ? false : true} onClick={addPayment}>ДОБАВИТЬ</Button>
            </Modal.Body>
        </Modal>
    );
}
