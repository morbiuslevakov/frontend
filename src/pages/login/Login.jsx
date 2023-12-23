import React, { Component } from "react";
import { Navigate, useNavigate } from 'react-router-dom';

import { Button, Card, Alert, Form } from 'react-bootstrap';
import { isEmail } from "validator";
import { connect } from "react-redux";
import AuthService from "../../services/auth.service";
import { history } from '../../helpers/history';
import { ReactComponent as BackIcon } from '../../images/back-icon.svg';

const validator = (type, value) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/;
    if (type === "email") {
        return isEmail(value);
    } else if (type === "password") {
        return passwordRegex.test(value)
    }
}

function BackButton() {
    const navigate = useNavigate();

    function handleBack() {
        navigate(-1);
    }

    return (
        <Button onClick={handleBack} className="card-footer-btn">
            <Card.Footer>
                <BackIcon />
                Назад
            </Card.Footer>
        </Button>
    );
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeTotpCode = this.onChangeTotpCode.bind(this);

        this.state = {
            username: "",
            password: "",
            totpCode: "",
            totpCodeRequired: false,
            invalid: false,
            message: "",
            showPassword: "password"
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value,
        });
    }

    onChangeTotpCode(e) {
        this.setState({
            totpCode: e.target.value,
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value,
        });
    }

    passwordVisible = (e) => {
        if (this.state.showPassword === "password") {
            this.setState({
                showPassword: "text"
            });
            return;
        }
        this.setState({
            showPassword: "password"
        });
    }

    handleLogin(e) {
        if (!validator("email", this.state.username)) {
            this.setState({ invalid: true, message: "Введите правильный email." })
            return;
        } else {
            this.setState({ invalid: false })
        }

        AuthService.login(
            this.state.username,
            this.state.password,
            this.state.totpCode
        ).then(
            response => {
                history.push("/wallet");
                window.location.reload();
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                if (error.response.status === 401) {
                    if (error.response.data === "2FA required.") {
                        this.setState({
                            totpCodeRequired: true
                        })
                        return;
                    }
                    if (error.response.data === "Invalid 2FA code.") {
                        this.setState({
                            invalid: true,
                            message: "Неверный код."
                        });
                        return;
                    }
                    this.setState({
                        invalid: true,
                        message: "Неверный пароль."
                    });
                } else {
                    this.setState({
                        invalid: true,
                        message: resMessage
                    });
                }
            }
        );
        e.preventDefault();
    }

    render() {
        const { isLoggedIn } = this.props;

        if (window.location.pathname === "/login" && isLoggedIn) {
            return <Navigate to="/wallet" />;
        } else if (isLoggedIn) {
            window.location.reload();
        }

        return (
            <div className="content-container">
                <div className="text-container">
                    <h1 className="title">Deaslide Network<br />Децентрализованный торговый протокол</h1>
                    <p>Легко покупайте, торгуйте и зарабатывайте на крипте</p>
                </div>
                {!this.state.totpCodeRequired &&
                    <Card className="card main-card">
                        <Card.Body className="main-card-body">
                            <Card.Title className="card-main-title title mt-4 mb-4">Войти в аккаунт</Card.Title>
                            <Form className="mb-4 mt-3" onSubmit={this.handleLogin} ref={(c) => {
                                this.form = c;
                            }}>
                                {this.state.invalid === true &&
                                    (<Alert key="danger" variant="danger">
                                        {this.state.message}
                                    </Alert>)
                                }
                                <Form.Group className="mb-3 form-group" controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        required
                                        size="lg"
                                        type="email"
                                        name="email"
                                        value={this.state.username}
                                        onChange={this.onChangeUsername}
                                        placeholder="Введите email" />
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
                                        placeholder="Введите пароль" />
                                </Form.Group>
                                <div className="form-check mb-3" style={{ "display": "flex", "marginTop": "0" }}>
                                    <input type="checkbox" id="default-checkbox" className="show-password form-check-input"
                                        onChange={this.passwordVisible} />
                                    <label htmlFor="default-checkbox" className="form-check-label show-password-text">Показать
                                        пароль</label>
                                </div>
                                <Button className="submit-btn mt-4" variant="secondary" onClick={this.handleLogin}>
                                    Войти в аккаунт
                                </Button>
                            </Form>
                            <a className="mb-2" style={{ "display": "block" }} href="/register">Забыли пароль?</a>
                            <p className="plain-text">Нет аккаунта? <a href="/register">Создать аккаунт</a></p>
                        </Card.Body>
                        <BackButton />
                    </Card>
                }
                {this.state.totpCodeRequired &&
                    <Card className="card main-card">
                        <Card.Body className="main-card-body">
                            <Card.Title className="card-main-title title mt-4 mb-4">Войти в аккаунт</Card.Title>
                            <Form className="mb-4 mt-3" onSubmit={this.handleLogin} ref={(c) => {
                                this.form = c;
                            }}>
                                {this.state.invalid === true &&
                                    (<Alert key="danger" variant="danger">
                                        {this.state.message}
                                    </Alert>)
                                }
                                <Form.Group className="mb-3 form-group" controlId="formBasicEmail">
                                    <Form.Label>2FA код</Form.Label>
                                    <Form.Control
                                        required
                                        size="lg"
                                        type="text"
                                        name="username"
                                        value={this.state.totpCode}
                                        onChange={this.onChangeTotpCode}
                                        placeholder="Введите 2FA код" />
                                </Form.Group>
                                <Button className="submit-btn mt-4" variant="secondary" onClick={this.handleLogin}>
                                    Войти в аккаунт
                                </Button>
                            </Form>
                            <a className="mb-2" style={{ "display": "block" }} href="/register">Забыли пароль?</a>
                            <p className="plain-text">Нет аккаунта? <a href="/register">Создать аккаунт</a></p>
                        </Card.Body>
                        <BackButton />
                    </Card>
                }
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

export default connect(mapStateToProps)(Login);