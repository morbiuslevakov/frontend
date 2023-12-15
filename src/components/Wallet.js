import React, { Component, useEffect, useState, useReducer, Suspense } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate, useLocation, redirect } from "react-router-dom";
import { Button, Card, Navbar, Nav, Container, Offcanvas, Modal, InputGroup, Form as Fr, OverlayTrigger, Tooltip, Alert } from 'react-bootstrap';
import { connect } from "react-redux";
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AuthService from "../services/auth.service";
import P2PService from "../services/p2p.service";
import PriceService from "../services/price.service";
import EventBus from "../common/EventBus";
import Preloader from './Preloader';
import isLoggedIn from "../common/isLoggedIn";
import { logout } from "../actions/auth";

class Wallet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showGet: false,
            showSend: false,
            isCopied: false,
            assets: [],
            walletAddress: "",
            tokenAmount: 0,
            tokenAlias: "",
            invalid: false,
            fiat: "RUB",
            loaded: false,
            balance: null,
            crypto: null
        }
    }

    onChangeWalletAddress = (e) => {
        this.setState({
            walletAddress: e.target.value
        })
    }
    onChangeTokenAmount = (e) => {
        this.state.assets.map((asset, key) => {
                if (((asset.balance ** asset.decimals) + asset.decimals) < ((asset.decimals ** e.target.value) + asset.decimals)) {
                    this.setState({
                        invalid: true
                    })
                } else {
                    this.setState({
                        invalid: false,
                        tokenAmount: asset.decimals * e.target.value
                    })
                }
            }
        )
    }
    onChangeTokenAlias = (e) => {
        this.setState({
            tokenAlias: e.target.value
        })
    }

    handleCloseGet = () => this.setState({showGet: false});
    handleShowGet = () => {
        this.setState({
            showGet: true
        })
    };

    handleCloseSend = () => {
        this.setState({
            invalid: false,
            showSend: false
        })
    };
    handleShowSend = () => {
        this.setState({
            showSend: true
        })
    };

    copyTextToClipboard = () => {
        if ('clipboard' in navigator) {
            return navigator.clipboard.writeText(this.state.address);
        } else {
            return document.execCommand('copy', true, this.state.address);
        }
    }

    handleCopyClick = () => {
        this.copyTextToClipboard()
            .then(() => {
                this.setState({
                    isCopied: true
                })
                setTimeout(() => {
                    this.setState({
                        isCopied: false
                    })
                }, 1500);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    handleSendTokens = (e) => {
        if (this.state.invalid) {
            return;
        }
        e.preventDefault();
        P2PService.sendTokens(
            this.state.walletAddress.toString(),
            this.state.tokenAmount.toString(),
            this.state.tokenAlias.toString()
        )
    }

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem("user"));
        const { dispatch, history } = this.props;

        PriceService.setPrices(this.state.fiat).then(
            response => {
                this.setState({
                    crypto: response.data
                })
            }, error => {
                if (error.response.status === 403) {
                    EventBus.dispatch("logout");
                    if (!isLoggedIn) {
                        history.push("/login");
                        window.location.reload();
                    }
                }
            }

        );
        PriceService.setBalances(user?.address).then(
            response => {
                this.setState({
                    balance: response.data
                })
            }, error => {
                if (error.response.status === 403) {
                    EventBus.dispatch("logout");
                    if (!user) {
                        history.push("/login");
                        window.location.reload();
                    }
                }
            }
        );
    }

    render() {
        const user = JSON.parse(localStorage.getItem("user"));

        return (
            <Suspense fallback={<Preloader/>}>
                <div className="content-container">
                    <div className="profile">
                        <AccountCircleIcon/>
                        <div className="transaction-buttons">
                            <button className="transaction-btn" onClick={this.handleShowSend}>
                                <svg className="transaction-icon" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="21.9999" cy="22.0702" r="21.516" fill="#6C757D"/>
                                    <path d="M20.5 32.6771C20.5 33.5055 21.1716 34.1771 22 34.1771C22.8284 34.1771 23.5 33.5055 23.5 32.6771L20.5 32.6771ZM23.0607 10.4027C22.4749 9.81696 21.5251 9.81696 20.9393 10.4027L11.3934 19.9487C10.8076 20.5345 10.8076 21.4842 11.3934 22.07C11.9792 22.6558 12.9289 22.6558 13.5147 22.07L22 13.5847L30.4853 22.07C31.0711 22.6558 32.0208 22.6558 32.6066 22.07C33.1924 21.4842 33.1924 20.5345 32.6066 19.9487L23.0607 10.4027ZM23.5 32.6771L23.5 11.4634L20.5 11.4634L20.5 32.6771L23.5 32.6771Z" fill="white"/>
                                </svg>
                                <p>Отправить</p>
                            </button>
                            <button className="transaction-btn" onClick={this.handleShowGet}>
                                <svg className="transaction-icon" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="21.6449" cy="22.0702" r="21.516" fill="#6C757D"/>
                                    <path d="M23.145 11.4634C23.145 10.635 22.4734 9.96344 21.645 9.96344C20.8165 9.96344 20.145 10.635 20.145 11.4634H23.145ZM20.5843 33.7378C21.1701 34.3235 22.1198 34.3235 22.7056 33.7378L32.2516 24.1918C32.8373 23.606 32.8373 22.6563 32.2516 22.0705C31.6658 21.4847 30.716 21.4847 30.1302 22.0705L21.645 30.5558L13.1597 22.0705C12.5739 21.4847 11.6241 21.4847 11.0384 22.0705C10.4526 22.6563 10.4526 23.606 11.0384 24.1918L20.5843 33.7378ZM20.145 11.4634L20.145 32.6771H23.145L23.145 11.4634H20.145Z" fill="white"/>
                                </svg>
                                <p>Получить</p>
                            </button>
                        </div>
                        <Modal show={this.state.showGet} onHide={this.handleCloseGet}>
                            <Modal.Header closeButton>
                                <Modal.Title>Ввод</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <InputGroup className="mb-3">
                                    <Fr.Control
                                        className="modal-form-control"
                                        placeholder="Recipient's address"
                                        aria-label="Address"
                                        aria-describedby="basic-addon2"
                                        value={user===null ? "[NO DATA]" : user.address}
                                        disabled
                                    />
                                    <Button variant="outline-secondary" id="button-addon2" onClick={this.handleCopyClick}>
                                        {this.state.isCopied ?
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                 className="bi bi-clipboard-check" viewBox="0 0 16 16">
                                                <path fillRule="evenodd"
                                                      d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                                                <path
                                                    d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                                                <path
                                                    d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                                            </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                          className="bi bi-clipboard" viewBox="0 0 16 16">
                                                <path
                                                    d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                                                <path
                                                    d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                                            </svg>}
                                    </Button>
                                </InputGroup>
                            </Modal.Body>
                        </Modal>
                        <Modal show={this.state.showSend} onHide={this.handleCloseSend}>
                            <Modal.Header closeButton>
                                <Modal.Title>Вывод</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {this.state.invalid &&
                                    (<Alert key="danger" variant="danger">
                                        Недочтаточно средств
                                    </Alert>)
                                }
                                <Fr>
                                    <Fr.Group className="mb-3" controlId="walletAddress">
                                        <Fr.Label>Адрес кошелька</Fr.Label>
                                        <Fr.Control className="modal-form-control" onChange={this.onChangeWalletAddress} type="text" autoFocus/>
                                    </Fr.Group>
                                    <Fr.Label for="token">Токен</Fr.Label>
                                    <Fr.Select onChange={this.onChangeTokenAlias} className="form-control" id="token" aria-label="Default select example">
                                        {(this.state.crypto!==null && this.state.balance!==null) &&
                                            Array.from(Object.entries(this.state.crypto.assets)).map((value) => {
                                                return <option key={value[0]}>{value[0]}</option>
                                            })
                                        }
                                    </Fr.Select>
                                    <Fr.Group className="mb-3" controlId="tokenAmount">
                                        <Fr.Label>Колличесво</Fr.Label>
                                        <Fr.Control className="modal-form-control" onChange={this.onChangeTokenAmount} type="number" min="1" />
                                        <Fr.Label className="commission-label">Комиссия сети</Fr.Label>
                                        <Fr.Label className="custom-label">{this.state.tokenAlias==="WAVES" ? "0.001 WAVES" : "1 YUSRA"}</Fr.Label>
                                    </Fr.Group>
                                </Fr>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button className="sendTokensButtons" variant="secondary" onClick={this.handleCloseSend}>Отмена</Button>
                                <Button className="sendTokensButtons" variant="primary" onClick={this.handleSendTokens}>Отправить</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                    <TableContainer className="table-container">
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Токен</TableCell>
                                    <TableCell align="left">Цена</TableCell>
                                    <TableCell align="left">Колличество</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(this.state.crypto!==null && this.state.balance!==null) &&
                                    Array.from(Object.entries(this.state.crypto.assets)).map((value) => {
                                        return (
                                            <TableRow key={value[0]} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                                <TableCell align="left">{value[0]}</TableCell>
                                                <TableCell align="left">{value[1].price.toFixed(2)}</TableCell>
                                                <TableCell align="left">
                                                    {this.state.balance!==null &&
                                                        new Map(Object.entries(this.state.balance.balance)).get(value[0]).balance
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Suspense>
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
export default connect(mapStateToProps)(Wallet);