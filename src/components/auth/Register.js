import React, { Component } from "react";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import { Button, Card, Navbar, Nav, Container, Offcanvas, CardFooter, Form, Alert, InputGroup } from 'react-bootstrap';
import { useState } from 'react';
import { connect } from "react-redux";
import { register } from "../../actions/auth";
import AuthService from "../../services/auth.service";
import { history } from '../../helpers/history';

function BackButton() {
    const navigate = useNavigate();

    function handleBack() {
        navigate(-1);
    }

    return (
        <Button onClick={handleBack} className="card-footer-btn">
            <Card.Footer>
                <svg className="back-svg" width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.3397 7.14593L7.69625 2.48078C8.21728 1.92285 8.21728 1.01826 7.69626 0.460321C7.17523 -0.0976136 6.33047 -0.0976135 5.80945 0.460321L0.546247 6.09634C0.276474 6.38522 0.146382 6.76704 0.155969 7.14555C0.146192 7.52431 0.276278 7.90643 0.546227 8.19551L5.80943 13.8315C6.33046 14.3895 7.17521 14.3895 7.69624 13.8315C8.21726 13.2736 8.21726 12.369 7.69624 11.8111L3.3397 7.14593Z" fill="#898989"/>
                </svg>
                Назад
            </Card.Footer>
        </Button>
    );
}

const validator = (type, value) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/;
    if (type==="email") {
        return isEmail(value);
    } else if (type==="password") {
        return passwordRegex.test(value)
    }
}

class RegisterEmail extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            validated:false,
            setValidated:false,
            username: "",
            email: "",
            password: "",
            successful: false,
            message: "",
            invalid: false,
            showPassword: "password"
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value,
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value,
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value,
        });
    }

    passwordVisible = (e) => {
        if(this.state.showPassword==="password") {
            this.setState({
                showPassword: "text"
            });
            return;
        }
        this.setState({
            showPassword: "password"
        });
    }

    handleRegister = (e) => {
        if (!validator("email", this.state.email)) {
            this.setState({invalid: true, message: "Введите правильный email."})
            return;
        } else if (!validator("password", this.state.password)) {
            this.setState({invalid: true, message: "Пароль должен состоять из не менее чем 8 символов, включая по крайней мере одну строчную и одну заглавную букву, хотя бы одну цифру и специальный символ."})
            return;
        } else {
            this.setState({invalid: false})
        }

        AuthService.register(
            this.state.username,
            this.state.email,
            this.state.password
        ).then(response => {
                history.push("/wallet");
                window.location.reload();
            }, error => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                this.setState({
                    message: resMessage,
                    invalid: true
                });
            }
        );

        e.preventDefault();
    }

    render() {
        const { isLoggedIn, message } = this.props;

        if(this.state.successful===true) {
            return <Navigate to="/login"/>
        }

        if (isLoggedIn) {
            return <Navigate to="/wallet" />;
        }
        return (
            <div className="content-container">
                <div className="text-container">
                    <h1 className="title">Deaslide Network<br/>Децентрализованный торговый протокол</h1>
                    <p>Легко покупайте, торгуйте и зарабатывайте на крипте</p>
                </div>
                <Card className="card main-card">
                    <Card.Body className="main-card-body">
                        <Card.Title className="card-main-title title mt-4 mb-4">Создать аккаунт</Card.Title>
                        <Form className="mb-4 mt-3" onSubmit={this.handleRegister} ref={(c) => {
                            this.form = c;
                        }}>
                            {this.state.invalid === true &&
                                (<Alert key="danger" variant="danger">
                                    {this.state.message}
                                </Alert>)
                            }
                            <Form.Group className="mb-3 form-group" controlId="formBasicUsername">
                                <Form.Label>Имя пользователя</Form.Label>
                                <Form.Control required size="lg" type="text" name="username" value={this.state.username} onChange={this.onChangeUsername} placeholder="Придумайте имя пользователя" />
                            </Form.Group>
                            <Form.Group className="mb-3 form-group" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control required size="lg" type="email" name="email" value={this.state.email} onChange={this.onChangeEmail} placeholder="Введите email" />
                            </Form.Group>
                            <Form.Group className="mb-3 form-group" controlId="formBasicPassword">
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control
                                    required
                                    size="lg"
                                    type={this.state.showPassword}
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
                                    placeholder="Введите пароль"
                                    aria-describedby="passwordHelpBlock"
                                />
                                <Form.Text id="passwordHelpBlock" muted>
                                    Пароль должен состоять из не менее чем 8 символов, включая по крайней мере одну строчную и одну заглавную букву, хотя бы одну цифру и специальный символ.
                                </Form.Text>
                            </Form.Group>
                            <div className="form-check mb-3" style={{"display":"flex", "margin-top":"0"}}>
                                <input type="checkbox" id="default-checkbox" className="show-password form-check-input" onChange={this.passwordVisible}/>
                                <label htmlFor="default-checkbox" className="form-check-label show-password-text">Показать пароль</label>
                            </div>
                            <Button className="submit-btn mt-4" variant="secondary" onClick={this.handleRegister}>
                                Создать аккаунт
                            </Button>
                        </Form>
                        <p className="plain-text">Уже заргестрированы? <a href="/login">Войти</a></p>
                    </Card.Body>
                    <BackButton/>
                </Card>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { isLoggedIn } = state.auth;
    const { message } = state.message;
    return {
        isLoggedIn,
        message
    };
}

export default connect(mapStateToProps)(RegisterEmail);