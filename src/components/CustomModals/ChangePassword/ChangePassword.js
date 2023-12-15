import { Button, Modal, Form, InputGroup } from 'react-bootstrap';
import React, { useState } from "react";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import "./ChangePassword.css";

export default function ChangePassword(props) {
    let [oldPassword, setOldPassword] = useState("");
    let [newPassword, setNewPassword] = useState("");
    let [passwordConfirm, setPasswordConfirm] = useState("");
    let [oldPasswordVisible, setOldPasswordVisible] = useState(false);
    let [newPasswordVisible, setNewPasswordVisible] = useState(false);
    let [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);

    let [confirmButtonDisabled, setConfirmButtonDisabled] = useState(true);

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменить пароль
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3 form-group" controlId="formBasicPassword">
                    <Form.Label>Старый пароль</Form.Label>
                    <div className="password-container">
                        <Form.Control
                            className="change-password-fields"
                            required
                            size="lg"
                            type={oldPasswordVisible ? "text" : "password"}
                            name="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            placeholder="Введите пароль"/>
                        <i className="fa-solid eye-icon-container" id="eye" onClick={() => setOldPasswordVisible(!oldPasswordVisible)}>
                            {oldPasswordVisible ?
                                <BsEye className="eye-icon"/> :
                                <BsEyeSlash className="eye-icon"/>
                            }
                        </i>
                    </div>
                </Form.Group>
                <Form.Group className="mb-4 form-group" controlId="formBasicPassword">
                    <Form.Label>Новый пароль</Form.Label>
                    <div className="password-container">
                        <Form.Control
                            className="change-password-fields"
                            required
                            size="lg"
                            type={newPasswordVisible ? "text" : "password"}
                            name="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Введите пароль"
                            aria-describedby="passwordHelpBlock"/>
                        <i className="fa-solid eye-icon-container" id="eye" onClick={() => setNewPasswordVisible(!newPasswordVisible)}>
                            {newPasswordVisible ?
                                <BsEye className="eye-icon"/> :
                                <BsEyeSlash className="eye-icon"/>
                            }
                        </i>
                    </div>
                    <Form.Text id="passwordHelpBlock" muted>
                        Пароль должен состоять из не менее чем 8 символов, включая по крайней мере одну строчную и одну заглавную букву, хотя бы одну цифру и специальный символ.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3 form-group" controlId="formBasicPassword">
                    <Form.Label>Подтвердите новый пароль</Form.Label>
                    <div className="password-container">
                        <Form.Control
                            className="change-password-fields"
                            required
                            size="lg"
                            type={passwordConfirmVisible ? "text" : "password"}
                            name="password"
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            placeholder="Введите пароль"/>
                        <i className="fa-solid eye-icon-container" id="eye" onClick={() => setPasswordConfirmVisible(!passwordConfirmVisible)}>
                            {passwordConfirmVisible ?
                                <BsEye className="eye-icon"/> :
                                <BsEyeSlash className="eye-icon"/>
                            }
                        </i>
                    </div>
                </Form.Group>
                <Button className="confirm-pass-change-btn btn-secondary" disabled={((passwordConfirm===newPassword)&&(passwordConfirm!==""||newPassword!=="")&&(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/.test(newPassword))) ? false : true}>Подтвердить</Button>
            </Modal.Body>
        </Modal>
    );
}
